import numpy as np
import math
from matplotlib import pyplot as plt

x = np.linspace(-math.pi, math.pi, 2000)
y = np.sin(x)


# Random initialize weights
a = np.random.randn()
b = np.random.randn()
c = np.random.randn()
d = np.random.randn()

print('a, b, c, d before learning: ')
print(a, b, c, d)

learning_rate = 1e-6

for t in range(2000):
    # Forward pass: compute predicted y
    # y = a + bx + cx^2 + dx^3

    y_pred = a + b*x + c*x**2 + d*x**3

    # Compute and print loss
    loss = np.square(y_pred - y).sum()

    if t % 100 == 99:
        print(t, loss)


    # Backprop to compute gradients of a, b, c, d with respect to loss
    grad_y_pred = 2.0 * (y_pred - y)
    grad_a = grad_y_pred.sum() # d(loss)/da = d(loss)/d(ypred) * d(ypred)/da
    grad_b = (grad_y_pred * x).sum()
    grad_c = (grad_y_pred * x ** 2).sum() 
    grad_d = (grad_y_pred * x ** 3).sum() 

    # Update Weights
    a -= learning_rate *  grad_a
    b -= learning_rate *  grad_b
    c -= learning_rate *  grad_c
    d -= learning_rate *  grad_d
    
print('a, b, c, d after learning: ')
print(a, b, c, d)


#plt.plot(x, np.tan(x))
#plt.show()