from fastapi import APIRouter
from app.models.schemas import FootprintData
from app.services import storage_service

router = APIRouter()

@router.post("/footprint")
async def save_footprint(data: FootprintData):
    saved_data = storage_service.save_footprint_data("default_user", data)
    return {"status": "success", "data": saved_data}

@router.get("/footprint")
async def get_footprint():
    data = storage_service.get_footprint_data("default_user")
    return {"data": data}
