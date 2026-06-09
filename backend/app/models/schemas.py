from pydantic import BaseModel, Field
from typing import Optional, Dict, Any

class ChatRequest(BaseModel):
    message: str = Field(..., max_length=1000, description="The user message")
    context: Optional[Dict[str, Any]] = Field(default=None, description="Optional context")

class FootprintData(BaseModel):
    total: float = Field(..., ge=0, description="Total carbon footprint")
    transport: float = Field(..., ge=0, description="Transport footprint")
    energy: float = Field(..., ge=0, description="Energy footprint")
    food: float = Field(..., ge=0, description="Food footprint")
