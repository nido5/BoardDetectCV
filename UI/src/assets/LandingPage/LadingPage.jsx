import ImageInsert from "../ImageInsert/ImageInsert";
import { Modal, Ripple, initTE, Input } from "tw-elements";
import { createSignal, onMount, For, createEffect, onCleanup } from "solid-js";
import { Parameters } from "../Conts";
import ActionButton from "../Components/ActionButton";
import { sendMessage } from "../../connection";
import { useGlobalContext } from "../Context/GeneralContext";
import InputTE from "../Components/InputTE";
import { createStore } from "solid-js/store";

export default function LandingPage() {
  const { imgStream, recentImage } = useGlobalContext();
  return (
    <div class="bg-gray-100 w-full h-full flex flex-row justify-around pl-10">
      <div class="flex flex-col justify-start w-1/2 items-center">
        <div class="flex flex-col mb-6  mt-8 w-full ">
          <p class="text-3xl flex justify-center items-center ">Cam Stream</p>
          <div class="h-12 flex flex-row justify-center  w-full space-x-10 mt-6">
            {" "}
            <ParametersButton />
            <ActionButton
              text="capture"
              icon="fa-solid fa-camera"
              funk={() =>
                sendMessage({
                  action: "saveImage",
                })
              }
            />
            <ActionButton
              text="start"
              icon="fa-solid fa-play"
              funk={() => {}}
            />
          </div>
        </div>
        <div class="">
          <img
            src={`data:image/jpeg;base64,${imgStream()}`}
            alt="Captured Image"
            class="w-[600px]"
          ></img>
        </div>
      </div>

      <div class="flex flex-col justify-start w-1/2 items-center bg-amber-100">
        <div class="flex flex-col  mb-6 mt-8 w-full justify-center items-center">
          <p class="text-3xl flex justify-center items-center ">
            Recent Images
          </p>
          <img
            src={`data:image/jpeg;base64,${recentImage()[0]}`}
            alt="Captured Image"
            class="w-[600px]"
          ></img>
        </div>
        <div class="flex flex-col  mb-6 mt-8 w-full justify-center items-center ">
          <img
            src={`data:image/jpeg;base64,${recentImage()[1]}`}
            alt="Captured Image"
            class="w-[600px]"
          ></img>
        </div>
      </div>
    </div>
  );
}

function ParametersButton() {
  const { parameters, setParameters } = useGlobalContext();
  const [newValues, setNewValues] = createSignal(parameters);
  onMount(() => {
    initTE({ Modal, Ripple });
  });

  return (
    <>
      <div class="w-1/4 flex justify-center items-center">
        <button
          class="flex flex-row  text-white justify-center items-center h-full pl-4 pr-4 rounded-full bg-gray-700 hover:bg-gray-800 shadow-md transition ease-in-out duration-100"
          data-te-toggle="modal"
          data-te-target="#exampleModalCenter"
          onclick={() => sendMessage({ action: "getParameters" })}
        >
          <i class="fa-solid fa-sliders text-3xl"></i>
          <span class="text-2xl ml-4 ">parameters</span>
        </button>
      </div>

      <div
        data-te-modal-init
        class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="exampleModalCenter"
        tabindex="-1"
        aria-labelledby="exampleModalCenterTitle"
        aria-modal="true"
        role="dialog"
      >
        <div
          data-te-modal-dialog-ref
          class="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[800px]"
        >
          <div class="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
            <div class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <h5
                class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                id="exampleModalCenterTitle"
              >
                Parameters
              </h5>

              <button
                type="button"
                class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-modal-dismiss
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div class="relative p-4">
              <ParametersTable
                params={parameters}
                newValues={newValues()}
                setNewValues={setNewValues}
              />
            </div>

            <div class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <button
                type="button"
                class="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                data-te-modal-dismiss
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Close
              </button>
              <button
                type="button"
                class="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
                onclick={() => {
                  console.log(newValues());
                  sendMessage({
                    action: "setParameters",
                    payload: newValues(),
                  });
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ParametersTable(props) {
  return (
    <>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full text-left text-sm font-light">
                <thead class="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" class="px-6 py-4 ">
                      Parameter
                    </th>

                    <th scope="col" class="px-6 py-4 ">
                      description
                    </th>
                    <th scope="col" class="px-6 py-4 text-center">
                      current value
                    </th>
                    <th scope="col" class="px-6 py-4 text-center">
                      new value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {props.params.map((param, i) => (
                    <tr
                      key={i}
                      className="border-b dark:border-neutral-500 hover:bg-gray-100"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {param.name}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        {param.description}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 items-center">
                        <div
                          className="relative m-auto mb-3 w-12"
                          data-te-input-wrapper-init
                        >
                          <input
                            type="text"
                            className="peer block min-h-[auto] w-full border-1 border-black rounded bg-neutral-100 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:bg-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id={`exampleFormControlInput${i}`}
                            placeholder="Disabled input"
                            aria-label="Disabled input example"
                            disabled
                          />
                          <label
                            htmlFor={`exampleFormControlInput${i}`}
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-black font-semibold transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                          >
                            {param.value}
                          </label>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="m-auto w-16">
                          <InputTE
                            ID={param + "_" + i}
                            value={param.newValue}
                            placeholder={`${param.min}-${param.max}`}
                            onChangeFunk={(value) => {
                              props.setNewValues((prevArray) => {
                                // Find the object by 'name' and update 'newValue'

                                return prevArray.map((item) => {
                                  console.log(item.name + "_" + param.name);
                                  if (item.name === param.name) {
                                    return { ...item, newValue: value };
                                  }
                                  return item;
                                });
                              });
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
