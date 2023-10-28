import os
import glob
import base64

def getRecentImage():
    folder_path = './Data/RecentImages' 
    try:
        # List all .jpg files in the specified folder
        jpg_files = glob.glob(os.path.join(folder_path, '*.jpg'))

        # Sort the list of files by their creation time (most recent first)
        jpg_files.sort(key=os.path.getctime, reverse=True)

        if jpg_files:
            # Get the path of the most recent .jpg file
            most_recent_jpg = jpg_files[0]

            # Read the most recent .jpg file
            with open(most_recent_jpg, 'rb') as file:
                jpg_data = file.read()

            # Convert the .jpg data to base64
            jpg_base64 = base64.b64encode(jpg_data).decode('utf-8')

            return jpg_base64
        else:
            return None  # No .jpg files found in the folder
    except Exception as e:
        print(f"Error: {str(e)}")
        return None
    
