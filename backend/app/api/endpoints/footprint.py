from fastapi import APIRouter, Query
from app.models.schemas import FootprintData
from app.services import storage_service

router = APIRouter()

@router.post("/footprint")
async def save_footprint(data: FootprintData, user_id: str = Query(..., description="The username identifier")):
    saved_data = storage_service.save_footprint_data(user_id, data)
    return {"status": "success", "data": saved_data}

@router.get("/footprint")
async def get_footprint(user_id: str = Query(..., description="The username identifier")):
    data = storage_service.get_footprint_data(user_id)
    return {"data": data}
