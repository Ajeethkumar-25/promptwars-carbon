from fastapi import FastAPI
from app.api.endpoints import chat, footprint

app = FastAPI(title="Carbon Footprint API")

app.include_router(chat.router, prefix="/api", tags=["Chat"])
app.include_router(footprint.router, prefix="/api", tags=["Footprint"])
