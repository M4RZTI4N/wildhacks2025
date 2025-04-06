from google import genai
from google.genai import types
import os
from dotenv import load_dotenv
from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit
load_dotenv()

API_KEY = os.getenv("GEMINI_KEY")

client = genai.Client(api_key=API_KEY)
model = 'models/gemini-1.5-flash-001'
prompt = """
            Your job is explain to the user about the topic that will be sent in a future message along with the user experience level, explain the topic in a way that someone at that experience level should be able to understand in a kind but informative manner. 

            A user will ask you a question 

            You will provide 5 sentences, question 1 will be the most simple, question 5 will be the most complex. This is done to gauge the user's experience level. 

            Once the user inputs a number 1-5 you will then teach/answer the user's question with jargon/ complexity appropriate to the user's experience level in the subject. 
            """
# cache = client.caches.create(
#     model=model,
#     config=types.CreateCachedContentConfig(
#         display_name="living textbooks",
#         system_instruction=(
#             """
#             Your job is explain to the user about the topic that will be sent in a future message along with the user experience level, explain the topic in a way that someone at that experience level should be able to understand in a kind but informative manner. 

#             A user will ask you a question 

#             You will provide 5 sentences, question 1 will be the most simple, question 5 will be the most complex. This is done to gauge the user's experience level. 

#             Once the user inputs a number 1-5 you will then teach/answer the user's question with jargon/ complexity appropriate to the user's experience level in the subject. 
#             """
#         )
#     )
# )
chat = client.chats.create(
    model = model
)
response = chat.send_message_stream(message=prompt)
for chunk in response:
    print(chunk.text)
    print('-'*40)
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
    return render_template("input.html")

@app.route("/chat")
def chatfunc():
    return "chat"

@app.route("/question")
def question():
    return "question"

@app.route("/level")
def level():
    return "level" 

@app.route('/debug')
def debug():
    return render_template("home.html")
@socketio.on('connect')
def connect(auth):
    print("client connected")
    print(auth)

@socketio.on("user-input")
def handle_user_input(data):
    global chat
    print(data)
    response = chat.send_message(message=data['data'])
    print(response.text)
    emit("server-response", (response.text))

if __name__ == '__main__':
    socketio.run(app,allow_unsafe_werkzeug=True)