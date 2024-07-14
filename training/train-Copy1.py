# 导入训练相关库
import torch
import torch.nn as nn
import torch.optim as optim
from loaddataCopy1 import DataLoader
from torchvision.models import densenet121, DenseNet121_Weights
import copy
import os
from tqdm import tqdm

class Trainer:
    def __init__(self, data_dir="./古建筑数据集", batch_size=128, num_epochs=20, learning_rate=0.001, model_path="ancient_architecture_DenseNet.pth"):
        self.data_dir = data_dir
        self.batch_size = batch_size
        self.num_epochs = num_epochs
        self.lr = learning_rate
        self.model_path = model_path
        self.device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

        self.model = self.initialize_model()
        self.criterion = nn.CrossEntropyLoss()
        self.optimizer = optim.Adam(self.model.parameters(), lr=self.lr)
        self.scheduler = optim.lr_scheduler.ReduceLROnPlateau(self.optimizer, mode='max', factor=0.5, patience=3, verbose=True)
        self.data_loader = DataLoader(self.data_dir, self.batch_size)
        self.dataloaders = {
            'train': self.data_loader.load_data(train=True),
            'val': self.data_loader.load_data(train=False)
        }

    def initialize_model(self):
        weights = DenseNet121_Weights.IMAGENET1K_V1
        model = densenet121(weights=weights)
        model.classifier = nn.Linear(model.classifier.in_features, 18)
        model = model.to(self.device)

        if os.path.exists(self.model_path):
            print(f"Loading model from {self.model_path}")
            model.load_state_dict(torch.load(self.model_path, map_location=self.device))

        return model

    def train_model(self):
        best_model_wts = copy.deepcopy(self.model.state_dict())
        best_acc = 0.0

        for epoch in range(self.num_epochs):
            print(f'Epoch {epoch}/{self.num_epochs - 1}')

            for phase in ['train', 'val']:
                if phase == 'train':
                    self.model.train()
                else:
                    self.model.eval()

                running_loss = 0.0
                running_corrects = 0

                for inputs, labels in tqdm(self.dataloaders[phase], desc=f"{phase} Epoch {epoch+1}/{self.num_epochs}"):
                    inputs = inputs.to(self.device)
                    labels = labels.to(self.device)

                    self.optimizer.zero_grad()

                    with torch.set_grad_enabled(phase == 'train'):
                        outputs = self.model(inputs)
                        _, preds = torch.max(outputs, 1)
                        loss = self.criterion(outputs, labels)

                        if phase == 'train':
                            loss.backward()
                            self.optimizer.step()

                    running_loss += loss.item() * inputs.size(0)
                    running_corrects += torch.sum(preds == labels.data)

                epoch_loss = running_loss / len(self.dataloaders[phase].dataset)
                epoch_acc = running_corrects.double() / len(self.dataloaders[phase].dataset)

                if phase == 'val':
                    # 输出当前轮次和准确率
                    print(f'{phase} Epoch {epoch}/{self.num_epochs - 1}, Loss: {epoch_loss:.4f}, Acc: {epoch_acc:.4f}, lr: {self.lr}')
                    print('')
                    
                    # 检查并保存模型
                    if epoch_acc > best_acc or epoch_acc >= 0.5:
                        best_acc = epoch_acc
                        best_model_wts = copy.deepcopy(self.model.state_dict())
                        self.save_model()
                
                if phase == 'train':
                    self.scheduler.step(epoch_acc)

        self.model.load_state_dict(best_model_wts)
        self.save_model()
        return self.model

    def save_model(self):
        torch.save(self.model.state_dict(), self.model_path)
        print(f"Model saved to {self.model_path}")

if __name__ == '__main__':
    data_dir = "./古建筑数据集"
    batch_size = 128
    num_epochs = 20
    learning_rate = 0.001
    model_path = "ancient_architecture_DenseNet.pth"

    trainer = Trainer(data_dir, batch_size, num_epochs, learning_rate, model_path)
    trained_model = trainer.train_model()
