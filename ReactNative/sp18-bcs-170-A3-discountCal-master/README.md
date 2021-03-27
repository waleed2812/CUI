# Mobile Application Development
# Assignment 03 (CLO-3)

## Problem:
When we go out for shopping especially when there is sale on different shops and outlets. Most of the times, discount percentage is specified along with original price. Every time we need to calculate the price after discount, and we do this repeatedly for each item on sale.
## Solution:
To solve this issue, we are going to develop a small React Native Application which will calculate the discount. Application will also maintain the history of calculated discounts for later review.
Requirements:
Application contains multiple screens. Manage the screens with the help of React Navigation (https://reactnavigation.org/).
### 1.	Start Screen
This is the first screen of the application which contains following input fields:  
* Original Price
* Discount Percentage  

As soon as user type the Original Price or Discount Percentage, following will be calculated and shown on the screen:

* You Save
* Final Price

### 2.	Look and Feel of the App
Design and improve the look and feel of the App (Add nice header on the top, Color Scheme, Alignment of the Content, Font-Size etc).  

Adding constraints on the input fields, such as, it can take only Numbers and Positive Numbers, Discount cannot be greater than 100. Calculated amount should be 2 decimal points.

### 3.	Save the Calculation
This feature is not present in most of the apps available on App Stores. Sometimes, we move around during shopping and want to come back and see the after-discount price again of the item, to avoid typing again the required inputs, we want to maintain a history of the calculations we performed.  

Now, the question is, when do we save the calculations? We can provide a Save Button to save the calculations and View History.  

In this task, we save the calculations with the save button. Button should remain disabled when any of the input fields is empty. It should enable when data is input. To avoid multiple save of same calculation, we should disable the button when user pressed the button and enable again when user changes something in the text fields.
### 4.	View History Screen
A button on the top right corner of the header of **Start Screen** will help the user to navigate to the history screen. Use **React Navigation** to manage the screens and the data flow.  

History Screen should contain a list of calculations performed. following information can be displayed as single list item: 
* Original Price
* Discount Percentage
* Price After Discount  

History could show something like this  
```  
Original Price    –    Discount    =    Final Price  
5000    –   25% =   4000  
4000    – 	10% =   3600  
1000    –   10% =   900  
```

You can use any third-party component to display history. One of the example is DataTable (https://callstack.github.io/react-native-paper/data-table.html)  

### 5.	Delete Item
There is an option to delete an item from a History Screen (just like TODO App demonstration).

### 6.	Clear History
A button on the top right corner of the header on History Screen should clear the list. Ask user before clearing the history.

## Submission:
1.	Submit GitHub repository link  
2.	Record 3 minutes long video explaining code and functionality of the application. Upload on YouTube as Unlisted video and submit the video link

## Plagiarism Punishment:
Plagiarism in any means will result in cancellation of this assignment and future assignments. You can get guide from online tutorials but exactly copying and reusing their code will considered as plagiarism.
In case of peer plagiarism, both, source code provider and copier will be punished equally.
Reporting a plagiarism is also appreciated.