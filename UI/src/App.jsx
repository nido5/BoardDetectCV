import { connect2WS, sendMessage } from "./connection";
import { Show, createEffect, createSignal, onMount } from "solid-js";
import { createStore } from "solid-js/store";

function App() {
  let imgDivRef;
  let square1Ref;

  const [selectedImage, setSelectedImage] = createSignal(null);
  const [rgbArray, setRgbArray] = createSignal(null);
  const [selectedImage2, setSelectedImage2] = createSignal(null);
  const [rgbArray2, setRgbArray2] = createSignal(null);
  const [height, setHeight] = createSignal(null);
  const [height2, setHeight2] = createSignal(null);
  const [width, setWidth] = createSignal(null);
  const [width2, setWidth2] = createSignal(null);
  const [x_cord, setx_cord] = createSignal(0);

  const [square, setSquare] = createStore({ x: 0, y: 0, height: 0, width: 0 });

  const [mousePosition, setMousePosition] = createSignal({ x: 0, y: 0 });

  onMount(() => {
    // connect2WS();
  });

  // Function to handle file selection
  function handleFileSelect(event, image) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        image === "image1"
          ? setSelectedImage(e.target.result)
          : setSelectedImage2(e.target.result);

        // Once the image is loaded, get its RGB array
        getImageRgbArray(e.target.result, image);
      };

      reader.readAsDataURL(file);
    }
  }

  // Function to get the RGB array of an image
  function getImageRgbArray(dataURL, image) {
    const img = new Image();
    img.src = dataURL;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;

      const rgbArrayData = [];
      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        rgbArrayData.push([b, g, r]);
      }
      if (image === "image1") {
        setRgbArray(rgbArrayData);
        setHeight(canvas.height);
        setWidth(canvas.width);
      } else {
        setRgbArray2(rgbArrayData);
        setHeight2(canvas.height);
        setWidth2(canvas.width);
      }
    };
  }

  function sendDataHandle() {
    var payload = {
      image1: {
        array: rgbArray(),
        height: height(),
        width: width(),
      },
      image2: {
        array: rgbArray2(),
        height: height2(),
        width: width2(),
      },
    };

    console.log("send", payload);

    sendMessage({ action: "calc", data: payload });
  }

  function handleImageClick(event, image) {
    const imgElement = image === "image1" ? imgDivRef : imgDivRef2;
    const imgRect = imgElement.getBoundingClientRect();

    // Calculate the click position relative to the image
    const x = event.clientX - imgRect.left;
    const y = event.clientY - imgRect.top;

    console.log(`Click position in ${image}: x=${x}, y=${y}`);

    // Update the square position (for example)
    if (image === "image1") {
      if (square.height != 0 || square.width != 0) {
        setSquare("height", 0);
        setSquare("width", 0);
        setSquare("x", 0);
        setSquare("y", 0);
        return;
      }

      if (square.x === 0 || square.y === 0) {
        setSquare("x", x);
        setSquare("y", y);
        return;
      }
      if (square.x !== 0 && square.y !== 0) {
        setSquare("height", Math.abs(square.y - y));
        setSquare("width", Math.abs(square.x - x));
        y < square.y ? setSquare("y", y) : "";
        x < square.x ? setSquare("x", x) : "";

        return;
      }
    } else {
      // Handle the second image or any other logic here
    }
  }

  return (
    <div class="flex flex-col justify-center items-center">
      <div class=" flex flex-col items-center m-auto">
        <h1>action buttons</h1>
        <div>
          <button
            class="bg-slate-200 rounded-full p-4 text-xl hover:bg-slate-300"
            onclick={sendDataHandle}
          >
            SEND
          </button>
          <button class="bg-slate-200 rounded-full p-4 text-xl hover:bg-slate-300">
            BOX
          </button>
        </div>
      </div>
      <div class="flex flex-row justify-center w-8/12 bg-red-100">
        <div class="flex flex-col w-full">
          {" "}
          <h1>First image</h1>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileSelect(e, "image1")}
          />
          <Show when={selectedImage()}>
            <div class="w-full ">
              <h2>
                Selected Image: {square.y} x {square.x}
              </h2>
              <div
                class="relative bg-blue-200"
                onClick={(e) => handleImageClick(e, "image1")}
              >
                <div
                  ref={square1Ref}
                  class={`absolute border-8 border-green-400   `}
                  style={{
                    top: `${square.y}px`,
                    left: `${square.x}px`,
                    height: `${square.height}px`,
                    width: `${square.width}px`,
                  }}
                ></div>
                <img
                  ref={imgDivRef}
                  class="w-full"
                  src={selectedImage()}
                  alt="Selected Image"
                />
              </div>
            </div>
          </Show>
        </div>
        <div class="flex flex-col w-full">
          {" "}
          <h1>First image</h1>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileSelect(e, "image2")}
          />
          <Show when={selectedImage2()}>
            {" "}
            <div class="w-full">
              <h2>Selected Image:</h2>
              <img class="w-full" src={selectedImage2()} alt="Selected Image" />
            </div>
          </Show>
        </div>
      </div>
    </div>
  );
}

export default App;
