# Mobile Application Development

## Assignment 04 (CLO-3)

## Requirements:

Develop a React Native application to display COVID-19 statistics.  

Use following APIs to fetch the information:  
a) COVID-19: [Rapid Api - covid-19-data](https://rapidapi.com/Gramzivi/api/covid-19-data)  
b) World Population: [Rapid Api - world-population](https://rapidapi.com/aldair.sr99/api/world-population)  

### 1. World Statistics Screen
This is the first screen of the application which displays
**COVID-19 statistics**. Along with total number you should also 
**display the percentage** with respect to the population.  

For example: Total Confirmed Cases of the World are 77,740,380 and Total World Population is
7,79,47,98,739. Along with the Total Number, we should also calculate and display the
percentage for each of the following:  
* Confirmed Cases  
* Recovered  
* Critical Cases  
* Deaths  
* Last Updated  

### 2. Country Statistics Screen
This screen will first show a **list of Countries** (both APIs provide endpoints which returns list of
countries). User can **filter the country** by typing the name in a search box on the top of the
screen or just scroll the list and select the country.  

When user taps on the country name, it navigates to the Statistics screen and will show the
statistics of the selected country just like World Statistics Screen.  

In this screen, you should give an option to **Save the country into your favorites**. 
So that user
can directly navigate from Saved List Screen to view the statistics of the country.  

### 3. Save County in Favourites
This option is provided in the country details screen where user can save the country in
favourites. Save the country name in persistent storage.  

For better UI, display empty star on the top right header of the screen and 
when user clicks
on it, save in the storage and fill the star.  

### 4. Favourite Countries
Display a list of favourite countries along with filled star (or any other way which tells that this country is in your favourite list). The information should be retrieved from the storage.
User should be able to unfavourite the country to **remove from the favourites list**.

### 5. Country Statistics Screen
When user tap on any of the favourite country, it navigates to the country statistics and display the details (you will need an API call to get the statistics).  

You can reuse the Country Statistics Screen here.

### 6. Drawer Navigator
App should contain a drawer navigator which should help navigating to the screens:  
1. World Statistics Screen  
2. Country Statistics Screen  
3. Favourite Countries Screen  

### 7. Look and Feel of the App  
It is recommended to use any third-party components library for better look and feel of the App. Use professional colour scheme and icons for the app.  

## Submission:
1. Submit **GitHub** repository link  
2. Record 3 minutes long video explaining code and functionality of the application. Upload on YouTube as Unlisted video and submit the video link  

## Plagiarism Punishment:
Plagiarism in any means will result in cancellation of this assignment and future assignments. You can get guide from online tutorials but exactly copying and reusing their code will considered as plagiarism.  

In case of peer plagiarism, both, source code provider and copier will be punished equally.  

Reporting a plagiarism is also appreciated.
