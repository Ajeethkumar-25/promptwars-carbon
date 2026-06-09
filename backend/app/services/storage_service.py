from app.models.schemas import FootprintData

# Simple in-memory storage for footprints
footprint_db = {}

def save_footprint_data(user_id: str, data: FootprintData):
    footprint_db[user_id] = data.model_dump() if hasattr(data, 'model_dump') else data.dict()
    return footprint_db[user_id]

def get_footprint_data(user_id: str):
    return footprint_db.get(user_id)
