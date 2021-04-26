import numpy as np
from matplotlib import pyplot as plt
import cv2



if __name__ == '__main__':

    # Read Image
    img = cv2.imread('./img/DSC_0195 1x1.jpg')

    # Show Image Dimensions
    print('Orignal Image shape: ', img.shape)

    # Show Image
    cv2.imshow('orig_img', img)

    # Show Until User presses any Key
    cv2.waitKey(0)
    cv2.destroyAllWindows()

    # Convert or GrayScale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Show Gray Scale
    cv2.imshow('black_white', gray)

    # Show Until User presses any Key
    cv2.waitKey(0)
    cv2.destroyAllWindows()

    # Swap Blue With Green
    temp = img[:, :, 0]
    img[:, :, 0] = img[:, :, 1]
    img[:, :, 1] = temp

    # Show Image
    cv2.imshow('blue_green_swapped', img)

    # Show Until User presses any Key
    cv2.waitKey(0)
    cv2.destroyAllWindows()

    # Show using matplotlib
    plt.imshow(img)
    plt.show()

    # Darken specific region
    img[100:500, 300:450] = 0

    # Show using matplotlib
    plt.imshow(img)
    plt.show()

    x = np.uint8([250])
    y = np.uint8([8])
    print("numpy", x+y) # 250 + 8 = 258 % 256 = 2
    print("opencv", cv2.add(x, y)) # 250 + 8 = 258 => 255
    
    # Show Until User presses any Key
    cv2.waitKey(0)
    cv2.destroyAllWindows()
