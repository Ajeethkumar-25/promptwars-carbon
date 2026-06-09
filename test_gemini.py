import asyncio
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=".env")
genai.configure(api_key=os.getenv("VITE_GEMINI_API_KEY"))

async def main():
    try:
        model = genai.GenerativeModel("gemini-1.5-flash-latest")
        res = await model.generate_content_async("Hello")
        print("Response:", res.text)
    except Exception as e:
        print("Error with flash-latest:", e)
        
    try:
        model = genai.GenerativeModel("gemini-pro")
        res = await model.generate_content_async("Hello")
        print("Response:", res.text)
    except Exception as e:
        print("Error with pro:", e)

asyncio.run(main())
