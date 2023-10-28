import cv2

def captureCam():

# Initialize the webcam
    cap = cv2.VideoCapture(0)  # 0 represents the default webcam, you can specify a different number for multiple webcams.

    if not cap.isOpened():
        print("Error: Could not access the webcam.")
        exit()

# Capture a frame from the webcam
    ret, frame = cap.read()

    if not ret:
        print("Error: Could not capture an image from the webcam.")
    else:
    # Save the captured frame as an image
        cv2.imwrite("captured_image.jpg", frame)
        print("Image captured and saved as 'captured_image.jpg'")

# Release the webcam and close any OpenCV windows
    cap.release()
    cv2.destroyAllWindows()