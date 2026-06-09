import google.generativeai as genai
from app.core.config import settings

if settings.GEMINI_API_KEY:
    genai.configure(api_key=settings.GEMINI_API_KEY)

async def generate_chat_response(message: str, context: dict = None) -> str:
    if not settings.GEMINI_API_KEY:
        raise ValueError("Gemini API Key not configured")

    model = genai.GenerativeModel(settings.MODEL_NAME)
    
    context_msg = "You are EcoTrack AI, a helpful, smart, and dynamic assistant focused on helping users understand and reduce their carbon footprint. Provide concise, logical, and actionable advice."
    
    if context:
        context_msg += f" The user has a daily carbon footprint of {context.get('total', 0):.1f} kg CO2e (Transport: {context.get('transport', 0):.1f}kg, Energy: {context.get('energy', 0):.1f}kg, Food: {context.get('food', 0):.1f}kg). Tailor your advice to this context."

    prompt = f"{context_msg}\n\nUser: {message}"
    
    result = await model.generate_content_async(prompt)
    return result.text
