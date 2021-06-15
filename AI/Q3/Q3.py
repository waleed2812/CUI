## Submission  

## Binder: (https://mybinder.org/v2/gh/waleedbutt98/Q3_CS2AI.git/HEAD)

## Colab: (https://colab.research.google.com/github/waleedbutt98/Q3_CS2AI/blob/master/Q3.ipynb)

from matplotlib import pyplot as plt
import numpy as np
import numpy.matlib as mb

# Train Samples
x = np.array([[0.5, 0.7, 0.2], [0.4, 0.1, 0.5]])
y = np.array([[0.6, 0.3, 0.4]])

# Weights and Bias
w1 = np.array([[0.2, 0.15], [0.1, 0.2]])
w2 = np.array([[0.3, 0.7]])
j = np.array([[0.5, 0.8]])
b = np.array([[0.2, 0.1]])
m=3

# Normalize with zero mean variation
x = (x - np.mean(x))/np.std(x)

# Learning Rates
lr = 0.5

for i in range(3):
    
    # Inpur to hidden layer 2
    z = w1.dot(x)
    print('\n1. Values of W1 = '+str(w1))
    print('\n2. Values of Z  = '+str(z))
    print('\n3. Values of Z mean = '+str(np.mean(z)))
    print('\n4. Values of Z Variance = '+str(np.var(z)))

    # Normalize with zero mean variation
    z_norm = (z - np.mean(z))/np.std(z)
    print('\n5. Values of Z Normalized = '+str(z_norm))

    # Scaling with j and biasing with b
    z_batch = np.array([j[0][0]*z_norm[0,:] + b[0][0], j[0][1]*z_norm[1,:] + b[0][1]])
    print('\n6. Values of Z Bach Normalized = '+str(z_batch))
    print('\n7. Values of J  = '+str(j))
    print('\n8. Values of B  = '+str(b))
    print('\n9. Values of W2 = '+str(w2))
    
    # Relu Activation
    a1 = np.copy(z_batch)
    a1[a1<0] = 0
    y_hat = w2.dot(a1)
    print('\n10. Values of Yhat  = '+str(y_hat))
    
    cost = np.sum((z - y)**2) / y.size
    print("\nCost After Iteration %i: %f" %(i, cost))

    # Back Propogation
    dJdYhat=-2*(y-y_hat)
    dYdw2=np.conjugate(a1).T
    dJdw2=np.matmul(dJdYhat,dYdw2)
    temp = w2.conj().transpose()
    dYda=np.tile(temp,(1 ,3))
    dadzBatch = np.ones(z_batch.shape)
    dadzBatch[z_batch<0] = 0
    dJdzBatch = (mb.repmat(dJdYhat, w2.shape[1], 1) * dYda * dadzBatch)
    dzBatchdj=z_norm
    dJdj = np.sum(dJdzBatch*dzBatchdj, 1)
    dJdb = np.sum(dJdzBatch*1, 1)
    dzBatchdzNorm = np.tile(j, (1,m))
    temp = np.array([[1/z[0].std(), 1/z[1].std()]])
    dzNormdz = np.tile(temp.T, (1,m))
    dzBatchdzNorm = dzBatchdzNorm.reshape((3, 2))
    dJdz = np.matmul(np.matmul(dJdzBatch, dzBatchdzNorm), dzNormdz)
    dzdw1= x.conj().T
    dzdw1 = x.conj().T
    dJdw1 = np.matmul(dJdz,dzdw1)
    w2=w2-lr*dJdw2
    j=np.array([j[0].T-lr*dJdj])
    b=np.array([b[0]-lr*dJdb])
    w1=w1-lr*dJdw1