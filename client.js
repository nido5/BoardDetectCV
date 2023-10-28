const WebSocket = require("ws");

const websocket = new WebSocket("ws://localhost:8765"); // Replace with your WebSocket server address

// Event handler for when the connection is established
websocket.addEventListener("open", (event) => {
  console.log("WebSocket connection opened:", event);

  // Send a message to the server (optional)
  websocket.send("Hello from the client!");
});

// Event handler for incoming messages
websocket.addEventListener("message", (event) => {
  console.log("Received message:", event.data);

  // You can process the received message here
  // For example, you can display it on the web page
  // or perform any other desired actions.
});

// Event handler for when the connection is closed
websocket.addEventListener("close", (event) => {
  if (event.wasClean) {
    console.log(
      "WebSocket connection closed cleanly, code:",
      event.code,
      "reason:",
      event.reason
    );
  } else {
    console.error("WebSocket connection abruptly closed");
  }
});

// Event handler for errors
websocket.addEventListener("error", (event) => {
  console.error("WebSocket error:", event);
});
