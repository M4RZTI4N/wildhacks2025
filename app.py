from google import genai
import os
from dotenv import load_dotenv
from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit
load_dotenv()

API_KEY = os.getenv("GEMINI_KEY")

client = genai.Client(api_key=API_KEY)

# chat = client.chats.create(model="gemini-2.0-flash")

# response = chat.send_message("this is a test of my gemni api code")
# print(response.text)

# print("=======")
# response = chat.send_message("what do you think")
# print(response.text)


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route("/")
def home():
    return render_template("hometest.html")

@app.route("/chat")
def chat():
    return "chat"

@app.route("/question")
def question():
    return "question"

@app.route("/level")
def level():
    return "level" 

@socketio.on('connect')
def connect(auth):
    print("client connected")
    print(auth)

@socketio.on("user-input")
def handle_user_input(data):
    print(data)
    emit("server-response", ("i recieved: " + data['data']))

if __name__ == '__main__':
    socketio.run(app)