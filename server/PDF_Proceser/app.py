from flask import Flask, request, jsonify, send_file
from flask import send_from_directory
from flask_cors import CORS
import fitz  # PyMuPDF
import os
import pickle
import math
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
# import os
import warnings

warnings.filterwarnings('ignore')

app = Flask(__name__)
CORS(app)


TEXT_FILE = "text.txt"
IMG_FOLDER = "images"

os.makedirs(IMG_FOLDER, exist_ok=True)


# @app.route("/process", methods=["POST"])
# def process_pdf():

#     if "file" not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400

#     pdf_file = request.files["file"]
#     pdf_path = "uploaded.pdf"
#     pdf_file.save(pdf_path)

#     doc = fitz.open(pdf_path)

#     texts = []
#     img_count = 0
#     seen_xrefs = set()

#     for page in doc:

#         # Extract text
#         text = page.get_text()
#         lines = text.split("\n")
#         texts.extend([line for line in lines if line.strip()])

#         # Extract images
#         images = page.get_images(full=True)

#         for img in images:
#             xref = img[0]

#             if xref in seen_xrefs:
#                 continue

#             seen_xrefs.add(xref)

#             base_img = doc.extract_image(xref)
#             img_bytes = base_img["image"]
#             img_ext = base_img["ext"]

#             img_name = f"{IMG_FOLDER}/img_{img_count}.{img_ext}"

#             with open(img_name, "wb") as f:
#                 f.write(img_bytes)

#             img_count += 1

#     # Save text file
#     with open(TEXT_FILE, "w", encoding="utf-8") as f:
#         for line in texts:
#             f.write(line + "\n")

#     # Close PDF
#     doc.close()

#     # Delete uploaded pdf
#     if os.path.exists(pdf_path):
#         os.remove(pdf_path)

#     return jsonify({
#         "message": "PDF processed successfully",
#         "text_lines": len(texts),
#         "images_extracted": img_count
#     })

@app.route("/process", methods=["POST"])
def process_pdf():
    try:
        # Check file
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        pdf_file = request.files["file"]

        if pdf_file.filename == "":
            return jsonify({"error": "Empty file name"}), 400

        if not pdf_file.filename.lower().endswith(".pdf"):
            return jsonify({"error": "Only PDF files allowed"}), 400

        # Read file directly into memory (no disk usage)
        pdf_bytes = pdf_file.read()

        if not pdf_bytes:
            return jsonify({"error": "File is empty"}), 400

        texts = []
        img_count = 0
        seen_xrefs = set()

        # Remove old images and Texts before processing new PDF
        for file in os.listdir(IMG_FOLDER):
            os.remove(os.path.join(IMG_FOLDER, file))

        if os.path.exists(TEXT_FILE):
            os.remove(TEXT_FILE)

        # Open PDF from memory
        with fitz.open(stream=pdf_bytes, filetype="pdf") as doc:

            for page in doc:
                # -------- TEXT EXTRACTION --------
                text = page.get_text("text")
                lines = text.split("\n")
                texts.extend([line.strip() for line in lines if line.strip()])

                # -------- IMAGE EXTRACTION --------
                images = page.get_images(full=True)

                for img in images:
                    xref = img[0]

                    if xref in seen_xrefs:
                        continue

                    seen_xrefs.add(xref)

                    base_img = doc.extract_image(xref)
                    img_bytes = base_img["image"]
                    img_ext = base_img["ext"]

                    img_name = os.path.join(
                        IMG_FOLDER, f"img_{img_count}.{img_ext}"
                    )

                    with open(img_name, "wb") as f:
                        f.write(img_bytes)

                    img_count += 1

        # -------- SAVE TEXT --------
        with open(TEXT_FILE, "w", encoding="utf-8") as f:
            f.write("\n".join(texts))

        return jsonify({
            "message": "PDF processed successfully",
            "text_lines": len(texts),
            "images_extracted": img_count
        })

    except Exception as e:
        return jsonify({
            "error": "Processing failed",
            "details": str(e)
        }), 500


# For Model evaluation 

clf_svm = pickle.load(open('clf.pkl','rb'))
tfidf = pickle.load(open('tfidf.pkl','rb'))

@app.route('/predict', methods=['GET'])
def predict():
    # text_data = ""
    lines = []
    with open("text.txt", "r", encoding="utf-8") as f:
        lines = [line.strip() for line in f.readlines() if line.strip()]

    ai_lines_count = 0
    # ai_lines = []

    for line in lines:
        vector = tfidf.transform([line])
        result = clf_svm.predict(vector)
        if result == 1:
            ai_lines_count += 1
            # ai_lines.append(line)


    # if result == 1:
        # prediction = "AI-generated"
        # score = clf_svm.decision_function(vector)[0]
        # prob = 1 / (1 + math.exp(-score))  # sigmoid
        # percentage = round(prob * 100, 2)
    # else:
    #     prediction = "Human-written"
    #     score = clf_svm.decision_function(vector)[0]
    #     prob = 1 / (1 + math.exp(-score))  # sigmoid
    #     percentage = round(prob * 100, 2)

    linePercentage = round((ai_lines_count / len(lines)) * 100, 2)
    if linePercentage > 50:
        prediction = "AI-generated"
    else:
        prediction = "Human-written"
    
    # print(f"AI Lines: {ai_lines_count}, Total Lines: {len(lines)}, Percentage: {linePercentage}%, Prediction: {prediction}")

    return jsonify({
        "ai_lines": ai_lines_count,
        "total_lines": len(lines),
        "percentage": linePercentage,
        "prediction": prediction
    })

@app.route("/highlight-pdf", methods=["POST"])
def highlight_pdf():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        pdf_file = request.files["file"]
        pdf_bytes = pdf_file.read()

        with fitz.open(stream=pdf_bytes, filetype="pdf") as doc:

            for page in doc:
                text_instances = page.get_text("blocks")

                for block in text_instances:
                    line = block[4].strip()
                    if not line:
                        continue

                    # Predict each line
                    vector = tfidf.transform([line])
                    pred = clf_svm.predict(vector)[0]
                    score = clf_svm.decision_function(vector)[0]

                    prob = 1 / (1 + math.exp(-score))

                    if pred == 1:  # AI-generated
                        rect = fitz.Rect(block[:4])
                        highlight = page.add_highlight_annot(rect)

                        # Optional: color (yellow/red)
                        highlight.set_colors(stroke=(1, 0, 0))  # red
                        highlight.update()

            # Save highlighted PDF
            output_path = "highlighted.pdf"
            doc.save(output_path)

        return send_file(output_path, as_attachment=True)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -----------------------------
# Image prediction Routes
# -----------------------------

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

model = models.resnet50(pretrained=False)
model.fc = nn.Sequential(
    nn.Linear(model.fc.in_features, 256),
    nn.ReLU(),
    nn.Dropout(0.5),
    nn.Linear(256, 2)
)

model.load_state_dict(
    torch.load("resnet50Part1.pth", map_location=device)
)

model.to(device)
model.eval()
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])
@app.route("/images-predict", methods=["GET"])
def images_predict():
    total_img = 0
    ai_img = 0
    ai_images_list = []
    for file in os.listdir(IMG_FOLDER):
        img_path = os.path.join(IMG_FOLDER, file)
        image = Image.open(img_path).convert("RGB")
        image = transform(image).unsqueeze(0).to(device)

        with torch.no_grad():
            output = model(image)
            prob = torch.softmax(output, dim=1)
            confidence, pred = torch.max(prob, 1)
        class_names = ['Fake', 'Real']
        label, conf = class_names[pred.item()], confidence.item()
        if label == 'Fake':
            ai_img += 1
            # image_url = f"http://127.0.0.1:5000/images/{file}"
            ai_images_list.append({
                "filename": file,
                "prediction": label,
                "confidence": round(conf * 100, 2),
                # "image_url": image_url
            })
        total_img += 1
    img_percentage = round((ai_img / total_img) * 100, 2) if total_img > 0 else 0
    if img_percentage > 50:
        prediction = "AI-generated"
    else:
        prediction = "Real Images"
    
    return jsonify({
        "ai_images": ai_img,
        "total_images": total_img,
        "percentage": img_percentage,
        "prediction": prediction,
        "ai_detected_images": ai_images_list,
    })


@app.route("/stats", methods=["GET"])
def stats():

    text_lines = 0
    if os.path.exists(TEXT_FILE):
        with open(TEXT_FILE, "r", encoding="utf-8") as f:
            text_lines = len(f.readlines())

    img_count = len(os.listdir(IMG_FOLDER))

    return jsonify({
        "total_text_lines": text_lines,
        "total_images": img_count
    })

@app.route('/images/<filename>')
def get_image(filename):
    return send_from_directory(IMG_FOLDER, filename)

# @app.route("/img/<int:no>", methods=["GET"])
# def get_image(no):

#     files = sorted(os.listdir(IMG_FOLDER))

#     if no >= len(files):
#         return jsonify({"error": "Image not found"}), 404

#     img_path = os.path.join(IMG_FOLDER, files[no])
#     return send_file(img_path)


@app.route("/text/<int:no>", methods=["GET"])
def get_text(no):

    if not os.path.exists(TEXT_FILE):
        return jsonify({"error": "Text file not found"}), 404

    with open(TEXT_FILE, "r", encoding="utf-8") as f:
        lines = f.readlines()

    if no >= len(lines):
        return jsonify({"error": "Line not found"}), 404

    return jsonify({
        "line_number": no,
        "text": lines[no].strip()
    })

@app.route("/cleared", methods=["POST"])
def clear_data():

    
    if os.path.exists(TEXT_FILE):
        os.remove(TEXT_FILE)

    
    if os.path.exists(IMG_FOLDER):
        for file in os.listdir(IMG_FOLDER):
            file_path = os.path.join(IMG_FOLDER, file)
            os.remove(file_path)

    return jsonify({
        "message": "Stored text and images cleared successfully"
    })

if __name__ == "__main__":
    app.run(debug=True)