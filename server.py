import asyncio
import json
import cv2
#from websockets.server import serve
import websockets
import numpy as np
import base64

from WebSocketFunks.sendParameters import getParametersFromFile
from WebSocketFunks.updateParameters import updateParameters
from WebSocketFunks.saveImage import saveImage 
from WebSocketFunks.getRecentImage import getRecentImage

connected_clients = []
recentImage = ""

async def stateUpdate():
    while True:
        await broadcast({"action": "state", "data": {"recentImage": getRecentImage()}})
        await asyncio.sleep(1)  # Sleep for 1 second


async def capture_and_broadcast():
    cap = cv2.VideoCapture(0)  # Initialize the webcam

    while True:
        try: 
            _, frame = cap.read()
            if _:
                # Resize the captured frame if needed
                # frame = cv2.resize(frame, (width, height))

                # Convert the frame to bytes and send it to all connected clients
                image_data = cv2.imencode('.jpg', frame)[1].tobytes()
                base64_image = base64.b64encode(image_data).decode('utf-8')  # Encode the image data as base64

                global recentImage
                recentImage = base64_image

                global connected_clients
                global counter
                connected_clients = [client for client in connected_clients if client.open]

                clientCount = 0

                jsonEncode = json.dumps({"action": "image", "data": base64_image})

                for client in connected_clients:
                    try:
                        await client.send(jsonEncode)
                    except:
                        print("Error sending image")
        except: print("camera reading error")

        await asyncio.sleep(0.2)  # Capture an image every 100ms


async def broadcast(data):
    global connected_clients
    connected_clients = [client for client in connected_clients if client.open]

    jsonEncode = json.dumps(data)

    for client in connected_clients:
        try:
            await client.send(jsonEncode)
        except:
            print("Error sending image")


async def echo(websocket):

    connected_clients.append(websocket)

    async for message in websocket:
      #  print(f"Received message: {message}")

        try:
            message_obj = json.loads(message)
           
            if "action" in message_obj:

                if message_obj["action"] == "calc":
                    print("calc")
                elif message_obj["action"] == "getParameters":
                        print("recieved")
                        try:
                            parameters = getParametersFromFile()
                            await websocket.send(json.dumps({"action": "parameters", "data": parameters}))
                            print("send data")
                        except NameError: print(NameError)
                elif message_obj["action"] =="setParameters":
                        updateParameters(message_obj["payload"])
                        parameters = getParametersFromFile()
                        await broadcast({"action": "parameters", "data": parameters})
                elif message_obj["action"] =="saveImage":
                        saveImage(recentImage)
                print("no action")
        except ValueError:
            print("Received invalid input. Please send a valid number:")

async def main():

    capture_task = asyncio.create_task(capture_and_broadcast())
    broadcast_state_task = asyncio.create_task(stateUpdate())

    max_message_size = 100 * 1024 * 1024
    async with websockets.serve(echo, "192.168.10.10", 8765, max_size=max_message_size):
        await asyncio.gather(capture_task,broadcast_state_task)

asyncio.run(main())