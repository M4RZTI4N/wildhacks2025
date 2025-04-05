from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GEMNI_KEY")

client = genai.Client(api_key=API_KEY)

chat = client.chats.create(model="gemini-2.0-flash")

response = chat.send_message("this is a test of my gemni api code")
print(response.text)

print("=======")
response = chat.send_message("what do you think")
print(response.text)
