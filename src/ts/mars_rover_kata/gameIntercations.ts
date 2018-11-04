import {ask, puts} from "./ioOps";
import {Task} from "fp-ts/lib/Task";
import {parseCommands, parseObstacles, parsePlanet, parsePosition} from "./dataParsers";
import {Position, Planet, Command, Result, Direction} from "./data";

export const welcome: () => Task<void> =
    () => puts("Welcome to the Mars Rover Kata!");

export const readPlanet: () => Task<Planet> =
    () => ask("What is the size of the planet?").map(parsePlanet);

export const readObstacles: () => Task<Position[]> =
    () => ask("Where are the obstacles?").map(parseObstacles);

export const readPosition: () => Task<Position> =
    () => ask("What is the position of the rover?").map(parsePosition);

export const readCommands: () => Task<Command[]> =
    () => ask("Waiting commands...").map(parseCommands);

export const display: (result: Result) => Task<void > = (result) => {
    let {hitObstacle, rover} = result;
    let prefix = hitObstacle ? "O:" : "";
    return puts(`${prefix}${Direction[rover.direction]}:${rover.position.x},${rover.position.y}`)
};
