from flask import Flask, request, jsonify, session
from flask_cors import CORS
from pymongo import MongoClient
from pymongo.server_api import ServerApi
import bcrypt
import certifi
import requests
import random
import smtplib

app = Flask(__name__)
CORS(app)
url = "mongodb+srv://dpuser:dpuser1234@study-app.hmoxuz2.mongodb.net/?retryWrites=true&w=majority&appName=study-app"
verification_codes = {}

client = MongoClient(
    url,
    tls=True,
    tlsCAFile=certifi.where(),
    server_api=ServerApi('1')
)
db = client["myDatabase"]
users = db["users"]

def send_email(to_email, code):
    company_email = "generatorgenerator100@gmail.com"
    password = "wmukyqawkbsonmvi"
    subject = "Verification Code"
    body = f"Your verification code is: {code}"
    message = f"Subject: {subject}\n\n{body}"

    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(company_email, password)
    server.sendmail(company_email, to_email, message)
    server.quit()


@app.route("/forgot-password", methods=["POST"])
def forgot_password():
    data = request.get_json()
    email = data.get("email")
    user = users.find_one({"email": email})
    if not user:
        return jsonify({"message": "Email not found"}), 400

    code = str(random.randint(100000, 999999))
    verification_codes[email] = code
    send_email(email, code)
    return jsonify({"message": "Verification code has been sent."})

@app.route("/verify-code", methods=["POST"])
def verify_code():
    data = request.get_json()
    email = data.get("email")
    code = data.get("code")
    if verification_codes.get(email) == code:
        return jsonify({"verified": True})
    return jsonify({"verified": False})

@app.route("/reset-password", methods=["POST"])
def reset_password():
    data = request.get_json()
    email = data.get("email")
    new_password = data.get("password")

    hashed = bcrypt.hashpw(new_password.encode("utf-8"), bcrypt.gensalt())
    users.update_one({"email": email}, {"$set": {"password": hashed}})
    verification_codes.pop(email, None)

    return jsonify({"message": "Password updated successfully"})

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    full_name = data.get("fullName")
    username = data.get("username")
    password = data.get("password")
    email = data.get("email")

    if users.find_one({"username": username}):
        return jsonify({"message": "Username have been taken."})

    if users.find_one({"email": email}):
        return jsonify({"message": "Email has already been used."}), 400
    
    hash_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    users.insert_one(
        {
            "fullName": full_name,
            "username": username,
            "password": hash_password,
            "email": email
        }
    )
    return jsonify({"message": "User have been inserted."})

@app.route("/", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    user = users.find_one({"username": username})
    
    if not user:
        return jsonify({"message": "User Not Found."}), 400

    if bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        return jsonify({
            "message":"Login Sucessful.",
            "user": user["fullName"]
        }), 200 
    else:
        return jsonify({"message": "Invalid."}), 400
    
#=====================Contact us=============================
@app.route("/contact-us", methods=["POST"])
def contact_us():
    data = request.get_json()
    username = data.get("username")
    title = data.get("title")
    description = data.get("description")

    user = users.find_one({"username": username})
    user_email = user["email"]
    company_email = "generatorgenerator100@gmail.com"
    password = "wmukyqawkbsonmvi"

    subject = f"Contact Us - {title}"
    body = f"From: {user_email}\n\n{description}"
    message = f"Subject: {subject}\n\n{body}"

    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(company_email, password)
    server.sendmail(company_email, company_email, message)
    server.quit()
    return jsonify({"message": "Your issue has been submitted successfully!"}), 200
#======================Chat Bot===========================
API_KEY = "AIzaSyCKcgVy1bJ7JZO4RyYx2IkZ4AuRUJNdCEQ"
url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

headers = {
    "Content-Type": "application/json",
    "x-goog-api-key": API_KEY,
}

@app.route("/chatbot")
def home():
    question = "Explain Artificial Intelligence in a few elegant words."

    data = {
        "contents": [
            {
                "parts": [
                    {"text": question}
                ]
            }
        ]
    }

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        result = response.json()
        answer = result["candidates"][0]["content"]["parts"][0]["text"].strip()
        return f"<h2>Question:</h2><p>{question}</p><h2>Answer:</h2><p>{answer}</p>"
    else:
        return f"Error {response.status_code}: {response.text}"



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)