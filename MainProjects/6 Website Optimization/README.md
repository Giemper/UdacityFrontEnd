# Project 6: Website Optimization
Projects done in the Udacity Front-End Nanodegree.

## index.html
[PageSpeed Insights Test](https://developers.google.com/speed/pagespeed/insights/?url=http%3A%2F%2Fgiemper.com%2FUdacity%2FOptimize%2F&tab=mobile)

**Mobile:** 95/100
**Desktop:** 95/100
**Optimizations:**
- Added two media queries (Print and max-width: 480px)
- Optimized the pizzeria image.
- Minimized and inlined "style"
- Added async to analytics.js
- Removed Google Font

## main.js for views/pizza.html

- Removed function *determineDx()* as it wasn't necesary to read the slider for every single *pizza* object.
- Modified function *changePizzaSizes()* by removing repetitive queries and reading the slider once before making changes to all the *pizza* objects.
- Modified function *updatePositions()* by repositioning repetitive steps from the *for* loop.
- Moved *var pizzaDiv* from *for loop* in line 456.

## Running these code

#### Web Mirror
- [Index.html Demo](http://giemper.com/Udacity/Optimize/)
- [Pizza.html Demo](http://giemper.com/Udacity/Optimize/views/pizza.html)

#### GitHub*
[Repository](https://github.com/Giemper/UdacityFrontEnd/tree/master/MainProjects/6%20Website%20Optimization)

Cloning the repo or Download the zip
![GitHub Clone](http://image.prntscr.com/image/10ddd47b37e24f149532164e15abf2e2.png)

This project will be found at *Main Projects > 6 Website Optimization*. The entry point is *index.html*.

*Contains all the projects from the Udacity Front-End Nanodegree