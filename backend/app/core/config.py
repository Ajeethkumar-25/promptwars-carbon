import os
from dotenv import load_dotenv

# Load environment variables (from the parent directory's .env file)
load_dotenv(dotenv_path="../../.env")

class Settings:
    GEMINI_API_KEY: str = os.getenv("VITE_GEMINI_API_KEY", "")
    MODEL_NAME: str = "gemini-flash-latest"

settings = Settings()
