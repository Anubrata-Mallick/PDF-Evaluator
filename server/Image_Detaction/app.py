from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import os
import warnings

warnings.filterwarnings('ignore')

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# -----------------------------
# Load ResNet50 Model
# -----------------------------
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

model = models.resnet50(pretrained=False)

# Change final layer (IMPORTANT)
# model.fc = nn.Linear(model.fc.in_features, 1)
model.fc = nn.Sequential(
    nn.Linear(model.fc.in_features, 256),
    nn.ReLU(),
    nn.Dropout(0.5),
    nn.Linear(256, 2)
)

# Load weights
model.load_state_dict(
    torch.load("Models/resnet50Part1.pth", map_location=device)
)

model.to(device)
model.eval()

# -----------------------------
# Image Preprocessing
# -----------------------------
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# -----------------------------
@app.route("/")
def home():
    return "PyTorch AI Image Detection API Running!"

# -----------------------------
@app.route("/predict", methods=["POST"])
def predict():

    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    # Load image
    image = Image.open(filepath).convert("RGB")
    image = transform(image).unsqueeze(0).to(device)

    # Prediction
    with torch.no_grad():
        output = model(image)
        # prob = torch.sigmoid(output).item()
        prob = torch.softmax(output, dim=1)
        confidence, pred = torch.max(prob, 1)

    # label = "Real" if prob > 0.5 else "Fake"
    # confidence = prob if prob > 0.5 else 1 - prob
    # class_name = idx_to_class[pred.item()]
    class_names = ['Fake', 'Real']
    label, conf = class_names[pred.item()], confidence.item()

    return jsonify({
        "prediction": label,
        "confidence": round(conf * 100, 2)
    })


if __name__ == "__main__":
    app.run(debug=True)