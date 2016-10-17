# Neighborhood Map - Montreal Metro
Project #7 done for the Udacity Front-End Nanodegree.

## Introduction
This is a map of all the 68 metro stations on **Montreal, QC, Canada**. 
There are 4 different colored lines that goes throughout the city, '
interconnecting through 4 intersecting stations. For more information about 
the metro service itself, go to the [Societe de Transport de Montreal's Webpage](http://www.stm.info/en/info/networks/metro).

## Navigation
The map app will display every single station with a marker colored to it's 
respective line. (i.e. green marker goes through the green line). Red markers however,
indicates that there's an intersection between two or more lines.

![Map Screen](http://image.prntscr.com/image/206eb247f8b04c89b93b860d4fc4a728.png)


The markers can be filtered by it's color line.

![Map Filter](http://image.prntscr.com/image/84c21c3489cb4eb48b4568aafcbc8700.png)


When a filter has been selected, the map will only display the stations of the selected metro line.
The map will also draw a path in which the metro goes through in the city. Futhermore, the sidebar list
will also display the list of stations of the selected metro line.

![Map Filter Green](http://image.prntscr.com/image/cc7a9e53e20e4cb6beda8308ea368ba6.png)


If a marker is selected, it will display a pop-up sign with the name of the station, and a relevant
image of either the neiborhood in which the stations is at, or the metro line itself. A station can 
be selected clicking directly at a marker, or selecting an option in the sidebar list.

![Infowindow](http://image.prntscr.com/image/5cbff42215cb4075a5503b86657d82f5.png)


## Running this code

#### Web Mirror
- [Live Demo](http://giemper.com/Udacity/Map/)

#### GitHub*
[Repository](https://github.com/Giemper/UdacityFrontEnd/tree/master/MainProjects/7%20Neighborhood%20Map)

Cloning the repo or Download the zip. Contains all the projects from the Udacity Front-End Nanodegree

![GitHub Clone](http://image.prntscr.com/image/10ddd47b37e24f149532164e15abf2e2.png)


This project will be found at *Main Projects > 7 Neighborhood Map*. The entry point to run the app is *index.html*.
In order to run the app correctly with all the necessaries resources, a local server must be setup.


- Windows
    * Open Command Prompt and write "python -m http.server 8080"
    * Access to the app with a web browser through "localhost:8080"
- Mac/Linux
    * Open Terminal and write "python -m SimpleHTTPServer 8080"
    * Access to the app with a web browser through "localhost:8080"

## Resources Used
- [Google Maps API](https://developers.google.com/maps/)
- [Google Custom Search API](https://developers.google.com/custom-search/) - Disabled
- [Flickr API](https://www.flickr.com/services/api/)
- [JQuery](https://jquery.com/)
- [KnockoutJS](http://knockoutjs.com/)


10/15/16