import os
from pathlib import Path
# pyrefly: ignore [missing-import]
from dotenv import load_dotenv

# Load environment variables
env_path = Path(__file__).resolve().parent.parent.parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

class Settings:
    GEMINI_API_KEY: str = os.getenv("VITE_GEMINI_API_KEY", "")
    MODEL_NAME: str = "gemini-flash-latest"

settings = Settings()
