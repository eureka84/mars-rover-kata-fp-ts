import {ask, puts} from "./ioOps";
import {task, Task} from "fp-ts/lib/Task";
import {parseCommands, parseObstacles, parsePlanet, parsePosition} from "./dataParsers";
import {Command, Direction, Planet, Position, Result} from "./data";

export const welcome: () => Task<void> =
    () => puts("Welcome to the Mars Rover Kata!");

export const readPlanet: () => Task<Planet> =
    () => task.map(ask("What is the size of the planet?"), parsePlanet);

export const readObstacles: () => Task<Position[]> =
    () => task.map(ask("Where are the obstacles?"), parseObstacles);

export const readPosition: () => Task<Position> =
    () => task.map(ask("What is the position of the rover?"), parsePosition);

export const readCommands: () => Task<Command[]> =
    () => task.map(ask("Waiting commands..."), parseCommands);

export const display: (result: Result) => Task<void> = (result) => {
    const {hitObstacle, rover} = result;
    const prefix = hitObstacle ? "O:" : "";
    return puts(`${prefix}${Direction[rover.direction]}:${rover.position.x},${rover.position.y}`);
};
