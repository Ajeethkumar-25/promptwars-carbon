# pyrefly: ignore [missing-import]
import pytest
# pyrefly: ignore [missing-import]
from httpx import AsyncClient, ASGITransport
from app.main import app
from app.models.schemas import FootprintData

@pytest.mark.asyncio
async def test_save_footprint():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        data = {
            "total": 10.5,
            "transport": 5.0,
            "energy": 3.0,
            "food": 2.5
        }
        response = await ac.post("/api/footprint?user_id=test_user", json=data)
    assert response.status_code == 200
    assert response.json()["status"] == "success"

@pytest.mark.asyncio
async def test_get_footprint():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/footprint?user_id=test_user")
    assert response.status_code == 200
    assert "data" in response.json()

@pytest.mark.asyncio
async def test_chat_validation_error():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        # Test max length constraint
        response = await ac.post("/api/chat", json={"message": "a" * 2000})
    assert response.status_code == 422 # Pydantic validation error

@pytest.mark.asyncio
async def test_footprint_validation_error():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        # Test negative value constraint
        data = {"total": -10.5, "transport": 5.0, "energy": 3.0, "food": 2.5}
        response = await ac.post("/api/footprint?user_id=test_user", json=data)
    assert response.status_code == 422 # Pydantic validation error
