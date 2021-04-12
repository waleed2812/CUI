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

plt.plot(x, np.tan(x))
plt.show()