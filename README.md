![ga_cog_large_red_rgb](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)

# Amazing Movies


# Intro
This project is a Movies API project, the purpose is to successfully create an application using an external API using React. This project has been executed via pair programming in 2 days, and is my second project whilst studying at General Assembly in the Software Engineering Immersive.


## Motivation
As this is a pair programming project, my partner and I decided to go with a key interest of ours, movies. We use [The Movies Database](https://www.themoviedb.org/documentation/api) API heavily throughout to create an application which functions as a movie finder.


# Table of Contents
- [Deployment](##deployment)
- [Tech Used](##tech-used)
- [Getting Started](##getting-started)
- [Game Architecture](##game-architecture)
- [Challenges & Future Improvements](##challenges-&-future-improvements)
- [Creator](##creator)


## Deployment
The game is deployed on GitHub Pages and it can be found here: https://github.com/missreems/react-movies-project
The application can be found here: http://amazing-movies.herokuapp.com/

## Tech used
* HTML
* CSS5
* JavaScript
* React


## Getting Started
Download the source code of the application using the clone button on the GitHub page. To view the application, visit the Heroku link provided in [Deployment](##deployment). If any issues arise, check the console. All images used within the application have been requested and gained via the API. 


## Game Architecture

Amazing Movies is an application created for the purpose of simplifying the process of searching for movies to watch.


The application has a main page containing lists of movies and a filter functionality on the sidebar, as well as a display page for each specific movie. The structure is functional and simple to keep the main attention on the main feature of the application, the filter sidebar. It is able to filter and sort the movies in various ways using checkboxes, radio buttons and a input field for numbers.


Jelly Invaders is a game where the user moves the player and attempts to shoot all the moving jellies on the 10x10 grid before it reaches the bottom.

![readme-one](assets/screenshots/starting-page.png)

The game currently has one wave of jellies.

![readme-one](assets/screenshots/jellies.png)


When the game begins, the computer releases the wave of jellies onto the grid. The jellies move across the grid from left to right, when it reaches the end of each line on the grid the jellies will move from left to right on the next line until they reach the red line indicated on the grid.

<!-- screenshot of red line -->

The player's sprite is at the bottom of the grid, it is allowed to move left and right via the arrow keys, one cell at a time. The player can shoot the jellies via the 'V' key and releases a bullet only one at a time. The jellies move slighlty slower than the speed of the bullet.

After every bullet is shot by the player, the game checks for a 'win' by verifying if any jellies are left. If the result 'false' is returned from the length of the array of jellies, the player wins.

The game can be won by shooting all the jellies on the grid, else the screen will show the sign 'Game Over' if any jelly reaches the red line.

![readme-one](assets/screenshots/winning-page.png) ![readme-one](assets/screenshots/losing-page.png)

An example of the function...used for ... :
<!-- screenshot of code for the function chosen to show -->


## Challenges & Future Improvements
The main challenge of this project was creating the game logic for each feature. Each feature introduced in the game allowed me to understand a little bit more about how to piece together code to produce a fully-working feature in the game. Also, connecting features together so they all worked well together was quite challenging.

<!-- what was difficult specifically and what strategy was used to overcome this -->
<!-- EXAMPLE - This strategy was effective as it allowed to easily debug which columns were being played on correctly or not. However, the code is quite long and it makes Squidward's move reliant on Spongebob's last one rather then looking at the whole game so far.-->

In the future, I hope to refactor my key functions so the game works smoothly. I'd like to give the jellies the functionality of shooting at the player and adding an additional condition for losing the game.


## Creator
Reema Patel
<!--  - Link to first project here: website link  -->