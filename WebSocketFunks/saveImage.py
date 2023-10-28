import base64
from datetime import datetime

def saveImage(base_64_img):

    try:
        # Get the current timestamp
        timestamp = datetime.now().strftime("%Y%m%d_%H_%M_%S")

        # Create a filename using the timestamp
        file_name = f"Data/RecentImages/{timestamp}.jpg"

        # Decode the base64 data
        img_data = base64.b64decode(base_64_img)

        # Write the binary data to the file with the timestamp in the name
        with open(file_name, 'wb') as file:
            file.write(img_data)
        print(f"Image saved as {file_name}")
    except Exception as e:
        print(f"Error saving image: {e}")