export default function ActionButton(props) {
  return (
    <button
      class="flex flex-row w-fit text-white justify-center items-center p-2 pl-4 pr-4 rounded-full bg-gray-700 hover:bg-gray-800 shadow-md transition ease-in-out duration-100"
      onclick={props.funk}
    >
      <i class={`${props.icon} text-3xl`}></i>
      <span class="text-2xl ml-4 ">{props.text}</span>
    </button>
  );
}
