import asyncio
import json
import cv2



async def main():

    capture_task = asyncio.create_task(capture_and_broadcast())
    broadcast_state_task = asyncio.create_task(stateUpdate())

    max_message_size = 100 * 1024 * 1024
    async with websockets.serve(echo, "192.168.1.208", 8765, max_size=max_message_size):
        await asyncio.gather(capture_task,broadcast_state_task)

asyncio.run(main())