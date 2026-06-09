import os
from pathlib import Path
from functools import lru_cache
from dotenv import load_dotenv

@lru_cache()
def get_settings():
    """Load settings and cache them for efficiency."""
    env_path = Path(__file__).resolve().parent.parent.parent.parent / ".env"
    load_dotenv(dotenv_path=env_path)
    
    class Settings:
        GEMINI_API_KEY: str = os.getenv("VITE_GEMINI_API_KEY", "")
        MODEL_NAME: str = "gemini-flash-latest"
        
    return Settings()

settings = get_settings()
