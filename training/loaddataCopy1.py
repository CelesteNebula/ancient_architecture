import torch
from torchvision import datasets, transforms
import os
import shutil

class DataLoader:
    def __init__(self, data_dir, batch_size):
        self.data_dir = data_dir
        self.batch_size = batch_size
        self.clean_data_dir()  # 在初始化时清理数据目录

    def clean_data_dir(self):
        # 移除无效文件夹
        for root, dirs, files in os.walk(self.data_dir):
            for dir_name in dirs:
                if dir_name.startswith('.'):
                    shutil.rmtree(os.path.join(root, dir_name))

    def load_data(self, train=True):
        if train:
            transform = transforms.Compose([
                transforms.RandomResizedCrop(224),
                transforms.RandomHorizontalFlip(),
                transforms.RandomVerticalFlip(),
                transforms.ColorJitter(brightness=0.2, contrast=0.2, saturation=0.2, hue=0.2),
                transforms.ToTensor(),
                transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
            ])
        else:
            transform = transforms.Compose([
                transforms.Resize(256),
                transforms.CenterCrop(224),
                transforms.ToTensor(),
                transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
            ])

        data = datasets.ImageFolder(
            root=self.data_dir,
            transform=transform,
            is_valid_file=lambda path: any(path.endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.ppm', '.bmp', '.pgm', '.tif', '.tiff', '.webp'])
        )

        data_loader = torch.utils.data.DataLoader(data, batch_size=self.batch_size, shuffle=train)
        return data_loader
