from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables (from the parent directory's .env file)
load_dotenv(dotenv_path="../.env")

app = FastAPI()

API_KEY = os.getenv("VITE_GEMINI_API_KEY")
if API_KEY:
    genai.configure(api_key=API_KEY)

# Simple in-memory storage for footprints
footprint_db = {}

class ChatRequest(BaseModel):
    message: str
    context: dict = None

class FootprintData(BaseModel):
    total: float
    transport: float
    energy: float
    food: float

@app.post("/api/chat")
async def chat(request: ChatRequest):
    if not API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API Key not configured")

    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        
        context_msg = "You are EcoTrack AI, a helpful, smart, and dynamic assistant focused on helping users understand and reduce their carbon footprint. Provide concise, logical, and actionable advice."
        
        if request.context:
            context_msg += f" The user has a daily carbon footprint of {request.context.get('total', 0):.1f} kg CO2e (Transport: {request.context.get('transport', 0):.1f}kg, Energy: {request.context.get('energy', 0):.1f}kg, Food: {request.context.get('food', 0):.1f}kg). Tailor your advice to this context."

        prompt = f"{context_msg}\n\nUser: {request.message}"
        
        # Note: google-generativeai generate_content is synchronous or async via generate_content_async
        result = await model.generate_content_async(prompt)
        
        return {"response": result.text}
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        raise HTTPException(status_code=500, detail="Error generating AI response")

@app.post("/api/footprint")
async def save_footprint(data: FootprintData):
    # For now, store it under a static "user" key since we have no auth
    footprint_db["default_user"] = data.dict()
    return {"status": "success", "data": footprint_db["default_user"]}

@app.get("/api/footprint")
async def get_footprint():
    data = footprint_db.get("default_user")
    if not data:
        # Return none or empty
        return {"data": None}
    return {"data": data}
