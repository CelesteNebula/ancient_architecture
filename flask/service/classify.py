from torchvision.models import densenet121, DenseNet121_Weights
import torch


class AncientArchitectureRecognizer:
    def __init__(self, module_file='./ancient_architectureM2.pth'):
        super(AncientArchitectureRecognizer, self).__init__()
        self.module_file = module_file
        self.CUDA = torch.cuda.is_available()
        self.net = densenet121(weights=DenseNet121_Weights.IMAGENET1K_V1)  # 使用DenseNet121并设置预训练权重
        self.net.classifier = torch.nn.Linear(self.net.classifier.in_features, 18)  # 修改类别数为18

        if self.CUDA:
            self.net.cuda()
            device = 'cuda'
        else:
            device = 'cpu'

        state = torch.load(self.module_file, map_location=device)
        self.net.load_state_dict(state)
        print("模型加载完毕！")
        self.net.eval()

    @torch.no_grad()
    def recognize(self, img):
        if self.CUDA:
            img = img.cuda()
        img = img.view(-1, 3, 224, 224)
        y = self.net(img)
        y = torch.nn.functional.softmax(y, dim=1)  # 18 概率
        # 获取前三大概率及其索引
        top_p, top_cls_idx = torch.topk(y, 3, dim=1)
        return top_p.cpu(), top_cls_idx.cpu()
