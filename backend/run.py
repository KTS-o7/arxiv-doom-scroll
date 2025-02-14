from hypercorn.config import Config
from hypercorn.asyncio import serve
import asyncio
from server.app import app

config = Config()
config.bind = ["0.0.0.0:5000"]

if __name__ == "__main__":
    asyncio.run(serve(app, config)) 