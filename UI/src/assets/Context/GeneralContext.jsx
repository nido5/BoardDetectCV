import {
  createContext,
  createEffect,
  createSignal,
  useContext,
} from "solid-js";
import { createStore } from "solid-js/store";
import { connect2WS } from "../../connection";
import pako from "pako";

export const GlobalContext = createContext();

export function GlobalContextProvider(props) {
  const [imgStream, setimgStream] = createSignal();
  const [Time, setTime] = createSignal();
  const [recentImage, setRecentImage] = createSignal([]);
  const [websocket, setWebsocket] = createStore({
    enable: false,
    connected: false,
  });
  const [parameters, setParameters] = createStore([]);

  function toggleWebsocket(toggle) {
    console.log(toggle);
    setWebsocket("enable", toggle);
    connect2WS(toggle, setWebsocket, readWebsocket);
  }

  function updateParameters(newValues) {
    parameters().forEach((parameter) => {});
  }

  function readWebsocket(message) {
    const obj = JSON.parse(message);
    const timestamp = new Date().getTime();
    console.log(timestamp - Time());
    setTime(timestamp);

    switch (obj.action) {
      case "parameters":
        console.log("parametersRecieved");
        setParameters(obj.data);
        break;

      case "image":
        console.log("ImageRecieved");
        setimgStream(obj.data);
        break;
      case "state":
        setRecentImage(obj.data.recentImages);
        break;
    }
  }

  createEffect(() => {});

  return (
    <GlobalContext.Provider
      value={{
        websocket,
        toggleWebsocket,
        parameters,
        setParameters,
        imgStream,
        recentImage,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
