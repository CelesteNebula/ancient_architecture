from torchvision.models import densenet121, DenseNet121_Weights
import torch
from torchvision.transforms import Resize, Compose, ToTensor, Normalize
from PIL import Image


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


class returnResult:
    def result(self, image):
        transform = Compose(
            [
                Resize((224, 224)),
                ToTensor(),  # 张量
                Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
            ]
        )

        # 确认文件路径
        img = Image.open(image).convert("RGB")
        img = transform(img)

        recognizer = AncientArchitectureRecognizer()
        top_p, top_cls = recognizer.recognize(img)
        # 类别下标和概率，类别下标需要转换为具体类别
        top_cls = top_cls.numpy()[0]  # 获取类别下标
        top_p = top_p.numpy()[0]  # 获取对应概率

        # 定义类别字典
        categories = {
            0: '伊斯兰建筑',
            1: '北方四合院',
            2: '印度建筑',
            3: '古希腊建筑',
            4: '哥特式建筑',
            5: '埃及古建筑',
            6: '岭南建筑',
            7: '川西民居',
            8: '巴洛克建筑',
            9: '徽派建筑',
            10: '拜占庭建筑',
            11: '晋派建筑',
            12: '洛可可建筑',
            13: '维多利亚建筑',
            14: '罗曼式建筑',
            15: '苏州园林',
            16: '装饰艺术建筑',
            17: '闽南建筑'
        }

        result_list = []
        # 打印前三的类别和对应的概率
        for i in range(3):
            cls = top_cls[i]
            p = top_p[i]
            labels = categories[cls]
            result_list.append({'label': labels, 'probability': int(p * 100)})

        return result_list
