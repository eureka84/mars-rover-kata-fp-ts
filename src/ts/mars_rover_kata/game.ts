import {task, Task} from "fp-ts/lib/Task";
import {handleCommands} from "./gamePlay";
import {makeRover, Planet, planetWithObstacles, Result, Rover} from "./data";
import {display, readCommands, readObstacles, readPlanet, readPosition, welcome} from "./gameInteractions";

const addObstacles = (planet: Planet) => task.map(readObstacles(), (obs) => planetWithObstacles(planet, obs));

const readPlanetWithObstacles: () => Task<Planet> = () => task.chain(readPlanet(), addObstacles);

const readRover: (planet: Planet) => Task<Rover> =
    (planet: Planet) => task.map(readPosition(), (pos) => makeRover(pos, planet));

const readInitialSetup: () => Task<Rover> = () => task.chain(readPlanetWithObstacles(), readRover);

const moveRover: (rover: Rover) => Task<Result> =
    (rover: Rover) => task.map(readCommands(), cs => handleCommands(rover, cs));

const computeResult: () => Task<Result> = () => task.chain(
    readInitialSetup(),
    moveRover
);

const game: Task<void> =
    task.chain(
        welcome(),
        () => task.chain(
            computeResult(),
            display
        )
    );

export function run(): Promise<void> {
    return game();
}
