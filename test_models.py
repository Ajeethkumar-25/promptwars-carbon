# pyrefly: ignore [missing-import]
import google.generativeai as genai
import os
# pyrefly: ignore [missing-import]
from dotenv import load_dotenv
load_dotenv(dotenv_path=".env")
genai.configure(api_key=os.getenv("VITE_GEMINI_API_KEY"))
for m in genai.list_models():
    if 'generateContent' in m.supported_generation_methods:
        print(m.name)
