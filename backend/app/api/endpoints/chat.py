from fastapi import APIRouter, HTTPException
from app.models.schemas import ChatRequest
from app.services.gemini_service import generate_chat_response

router = APIRouter()

@router.post("/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        response_text = await generate_chat_response(request.message, request.context)
        return {"response": response_text}
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        raise HTTPException(status_code=500, detail="Error generating AI response")
