Your Task 
=========

You’re part of the team that explores Mars by sending remotely controlled vehicles to the surface of the planet. Develop an API that translates the commands sent from earth to instructions that are understood by the rover.

Requirements
============

You are given the initial starting point (x,y) of a rover and the direction (N,S,E,W) it is facing.

The rover receives a character array of commands.

Implement commands that move the rover forward/backward (f,b).

Implement commands that turn the rover left/right (l,r).

Implement wrapping from one edge of the grid to another. (planets are spheres after all)

Implement obstacle detection before each move to a new square. If a given sequence of commands encounters an obstacle, the rover moves up to the last possible point, aborts the sequence and reports the obstacle.


Project
========

To run  the tests execute
    
`npm test`

To try the game from console execute 

`npm start` 

## Questions
- The size of the planet (eg: `5x10`)
- The position of obstacles `x,y` (eg: `0,0/2,2` -> separe obstacles using `/`)
- The position of the rover `x,y` (eg: `1,1`)
- A list of commands `l|r|f|b` (eg: `lfrb` -> turn left 90 deg, move forward, turn right 90 deg, move backward)