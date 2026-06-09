from pydantic import BaseModel
from typing import Optional, Dict, Any

class ChatRequest(BaseModel):
    message: str
    context: Optional[Dict[str, Any]] = None

class FootprintData(BaseModel):
    total: float
    transport: float
    energy: float
    food: float
