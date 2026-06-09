import asyncio
from app.services.gemini_service import generate_chat_response
async def main():
    try:
        res = await generate_chat_response("Hello")
        print("Response:", res)
    except Exception as e:
        import traceback
        traceback.print_exc()
        print("Error:", e)
asyncio.run(main())
