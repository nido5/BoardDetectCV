import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSliders } from "@fortawesome/free-solid-svg-icons";

export default function ImageInsert() {
  let imgDivRef;
  const [selectedImage, setSelectedImage] = createSignal(null);
  const [rgbArray, setRgbArray] = createSignal(null);
  const [width, setWidth] = createSignal(null);
  const [height, setHeight] = createSignal(null);
  const [square, setSquare] = createStore({ x: 0, y: 0, height: 0, width: 0 });

  function handleFileSelect(event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        // Once the image is loaded, get its RGB array
        getImageRgbArray(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  }

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

      setRgbArray(rgbArrayData);
      setHeight(canvas.height);
      setWidth(canvas.width);
    };
  }

  function handleImageClick(event) {
    const imgElement = imgDivRef;
    const imgRect = imgElement.getBoundingClientRect();

    // Calculate the click position relative to the image
    const x = event.clientX - imgRect.left;
    const y = event.clientY - imgRect.top;

    console.log(`Click position: x=${x}, y=${y}`);

    // Update the square position (for example)

    if (square.height != 0 || square.width != 0) {
      setSquare("height", 0);
      setSquare("width", 0);
      setSquare("x", 0);
      setSquare("y", 0);
      console.log(square);
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
  }

  return (
    <div class="w-2/3 bg-blue-200">
      <input
        class="shadow-2xl"
        type="file"
        accept="image/*"
        onChange={(e) => handleFileSelect(e, "image1")}
      />
      <Show when={selectedImage()}>
        <div class="relative w-full " onclick={(e) => handleImageClick(e)}>
          <div
            class="absolute border-8 border-green-400 w-16 h-16"
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
      </Show>
    </div>
  );
}
