from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from pymongo.server_api import ServerApi
import bcrypt
import certifi

app = Flask(__name__)
CORS(app)
url = "mongodb+srv://dpuser:dpuser1234@study-app.hmoxuz2.mongodb.net/?retryWrites=true&w=majority&appName=study-app"

client = MongoClient(
    url,
    tls=True,
    tlsCAFile=certifi.where(),
    server_api=ServerApi('1')
)
db = client["myDatabase"]
users = db["users"]

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    full_name = data.get("fullName")
    username = data.get("username")
    password = data.get("password")
    birthday = data.get("birthday")

    if users.find_one({"username": username}):
        return jsonify({"message": "Username have been taken."})

    hash_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    users.insert_one(
        {
            "fullName": full_name,
            "username": username,
            "password": hash_password,
            "birthday": birthday
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
        })
    else:
        return jsonify({"message": "Invalid."}), 400

if __name__ == "__main__":
    app.run(port=5000,debug=True)