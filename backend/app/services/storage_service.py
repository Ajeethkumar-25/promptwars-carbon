import json
import os
from typing import Dict, Any
from app.models.schemas import FootprintData

DB_FILE = "footprint_db.json"

def _load_db() -> Dict[str, Any]:
    if os.path.exists(DB_FILE):
        with open(DB_FILE, "r") as f:
            return json.load(f)
    return {}

def _save_db(db: Dict[str, Any]):
    with open(DB_FILE, "w") as f:
        json.dump(db, f)

def save_footprint_data(user_id: str, data: FootprintData):
    db = _load_db()
    db[user_id] = data.model_dump() if hasattr(data, 'model_dump') else data.dict()
    _save_db(db)
    return db[user_id]

def get_footprint_data(user_id: str):
    db = _load_db()
    return db.get(user_id)
