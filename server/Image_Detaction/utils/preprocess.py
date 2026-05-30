from torchvision import transforms
from PIL import Image
import torch

# ImageNet preprocessing for ResNet50
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

def preprocess_image(img_path, device):
    image = Image.open(img_path).convert("RGB")
    image = transform(image)
    image = image.unsqueeze(0)   # add batch dimension
    return image.to(device)