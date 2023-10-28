let websocket = null; // Declare the websocket variable

export async function connect2WS(Enable, stateFunk, readDataFunk) {
  if (Enable) {
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      console.log("WebSocket connection is already open.");
      stateFunk("connected", true);
    }

    websocket = new WebSocket("ws://192.168.1.208:8765"); // Replace with your WebSocket server address

    websocket.addEventListener("open", (event) => {
      console.log("WebSocket connection opened:", event);
      stateFunk("connected", true);
    });

    websocket.addEventListener("message", (event) => {
      console.log("Received message:");
      readDataFunk(event.data);
      // You can process the received message here
    });

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
      stateFunk("connected", false);
      // Automatically attempt to reconnect after a delay
      setTimeout(connect2WS, 1000); // Adjust the delay as needed
    });

    websocket.addEventListener("error", (event) => {
      console.error("WebSocket error:", event);
      // Automatically attempt to reconnect after a delay
      setTimeout(connect2WS, 1000); // Adjust the delay as needed
    });
  } else {
    // Disable the WebSocket connection
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      websocket.close();
      stateFunk("connected", false);
    }
  }
}

export function sendMessage(payload) {
  if (websocket && websocket.readyState === WebSocket.OPEN) {
    websocket.send(JSON.stringify(payload));
  } else {
    console.error("WebSocket is not open or initialized");
  }
}
