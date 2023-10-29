import { onMount } from "solid-js";
import { useGlobalContext } from "../Context/GeneralContext";

export default function NavBar() {
  const { websocket, toggleWebsocket } = useGlobalContext();
  onMount(() => {
    toggleWebsocket(true);
  });
  return (
    <div
      class="h-screen w-56 bg-gray-900 items-center flex flex-col"
      style={{ "box-shadow": "0 25px 50px -12px rgb(0 0 0 / 0.25)" }}
    >
      <a class="text-yellow-400 font-bold italic text-8xl m-8 ml-0">N</a>
      <nav class="w-full flex-col flex text-xl">
        <a class="text-white hover:bg-gray-700 pl-4  transition ease-in-out duration-200 cursor-pointer">
          Cam
        </a>
        <a class="text-white hover:bg-gray-700 pl-4  transition ease-in-out duration-200 cursor-pointer">
          State
        </a>
        <a class="text-white hover:bg-gray-700 pl-4  transition ease-in-out duration-200 cursor-pointer">
          History
        </a>
        <a class="text-white hover:bg-gray-700 pl-4  transition ease-in-out duration-200 cursor-pointer">
          Settings
        </a>
      </nav>
      <div class="flex flex-row mt-56">
        <input
          class="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault01"
          oninput={(e) => {
            toggleWebsocket(e.target.checked);
          }}
        />
        <div
          class="h-4 w-4 rounded-full m-auto ml-4"
          classList={{
            "bg-green-400": websocket.connected,
            "bg-red-400": !websocket.connected,
          }}
        ></div>
        <span class="text-white ml-2">Websocket</span>
      </div>
    </div>
  );
}
