import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

# Load env variables
load_dotenv()

async def test_write():
    mongo_url = os.getenv("MONGO_URL")
    db_name = os.getenv("DATABASE_NAME", "voice2gov")
    
    print(f"Connecting to MongoDB: {mongo_url}")
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    # Test record
    test_doc = {
        "userId": "model_test",
        "description": "This is a diagnostic test record created by the AI assistant.",
        "status": "pending",
        "createdAt": "2026-04-05T10:30:00Z"
    }
    
    try:
        # Ping
        await client.admin.command('ping')
        print("✅  Ping successful")
        
        # Insert
        result = await db["complaints"].insert_one(test_doc)
        print(f"✅  Insert successful! ID: {result.inserted_id}")
        
    except Exception as e:
        print(f"❌  Error: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(test_write())
