### Submission  

## Binder: (https://mybinder.org/v2/gh/waleedbutt98/A3_CS2AI.git/HEAD)

## Colab: (https://colab.research.google.com/github/waleedbutt98/A3_CS2AI/blob/master/A3.ipynb)

from matplotlib import pyplot as plt
from sklearn.datasets import make_gaussian_quantiles
import numpy as np

def load_extra_datasets():
    N = 200
    gaussian_quantiles = make_gaussian_quantiles(
        mean=None,
        cov=0.7,
        n_samples=N,
        n_features=2,
        n_classes=2,
        shuffle=True,
        random_state=None
    ) 
    return gaussian_quantiles 

gaussian_quantiles= load_extra_datasets()
X, Y = gaussian_quantiles
X, Y = X.T, Y.reshape(1, Y.shape[0]) 
# Visualize the data
plt.scatter(X[0, :], X[1, :], c=Y, s=40, cmap=plt.cm.Spectral); 

# activation function
def sigmoid(x):
    return(1/(1 + np.exp(-x)))

# Input Layer: (1, 2)
# 2nd layer: Hidden layer 1(1, 3)
# 3rd layer: Hidden layer 2(1, 4)
# 4th layer: Output layer(1, 1)

# Length of Each Layer
input_length = 2
hidden1 = 3
hidden2 = 4
out = 1

# Randomizing Weights according to Layer Length

w0 = np.random.randn(hidden1, input_length) * 0.05
b0 = np.zeros(shape=(hidden1, 1))

w1 = np.random.randn(hidden2, hidden1) * 0.05
b1 = np.zeros(shape=(hidden2, 1))

w2 = np.random.randn(out, hidden2) * 0.05
b2 = np.zeros(shape=(out, 1))

# Learning Rate
lr = 3

final = 1

# Training
for i in range(1000):

    # Hidden Layer 1
    temp1 = np.dot(w0, X) + b0 # Input for Hidden Layer 1
    temp2 = sigmoid(temp1) # Output of Hidden Layer 1

    # Hidden Layer 2
    temp3 = np.dot(w1, temp2) + b1 # Input Layer for Hidden Layer 2
    temp4 = np.tanh(temp3) # Output of Hidden Layer 2

    # Output Layer
    temp5 = np.dot(w2, temp4) + b2 # Input for Output Layer
    temp6 = sigmoid(temp5) # Final Output
    final = temp6

    m = (X.shape[1]) # Size of Training Samples
    logprobs = np.multiply(np.log(temp6), Y) + np.multiply((1 - Y), np.log(1 - temp6))
    cost = - np.sum(logprobs) / m

    print("Cost After Iteration %i: %f" %(i, cost))
    
    # Updating Bias and Weight 2
    diff2 = temp6 - Y
    dw2 = (1 / m) * np.dot(diff2, temp4.T)
    db2 = (1 / m) * np.sum(diff2, axis=1, keepdims=True)

    # Updating Bias and Weight 1
    diff1 = np.multiply(np.dot(w2.T, diff2), 1 - np.power(temp4, 2))
    dw1 = (1 / m) * np.dot(diff1, temp2.T)
    db1 = (1 / m) * np.sum(diff1, axis=1, keepdims=True)

    # Updating Bias and Weight 0
    diff0 = np.multiply(np.dot(w1.T, diff1), 1 - np.power(temp2, 2))
    dw0 = (1 / m) * np.dot(diff0, X.T)
    db0 = (1 / m) * np.sum(diff0, axis=1, keepdims=True)
    
    # Update the parameters
    w0 = w0 - lr * dw0
    b0 = b0 - lr * db0

    w1 = w1 - lr * dw1
    b1 = b1 - lr * db1

    w2 = w2 - lr * dw2
    b2 = b2 - lr * db2


accuracy = float((np.dot(Y, final.T) + np.dot(1-Y, 1-final.T))/float(Y.size)*100)
print('Accuracy: %d' %accuracy+'%')

# now plot the predictions
Y_hat = final > 0.5

fig, (ax1, ax2) = plt.subplots(1, 2)
ax1.scatter(X[0, :], X[1, :], c=Y[0,:], s=40, cmap=plt.cm.Spectral)
ax1.set_title('Original')
ax2.scatter(X[0, :], X[1, :], c=Y_hat[0,:], s=40, cmap=plt.cm.Spectral)
ax2.set_title('Output - Accuracy: %d' %accuracy+'%')
plt.show()