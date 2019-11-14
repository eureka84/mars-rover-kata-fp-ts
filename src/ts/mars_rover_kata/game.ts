import {Task, task} from "fp-ts/lib/Task";
import {handleCommands} from "./gamePlay";
import {Command, makeRover, planetWithObstacles, Position} from "./data";
import {display, readCommands, readObstacles, readPlanet, readPosition, welcome} from "./gameInteractions";
import {pipe, pipeable} from "fp-ts/lib/pipeable";


const _ = pipeable(task);
const game: Task<void> = pipe(
    welcome(),
    _.chain(readPlanet),
    _.chain(planet => _.map((obs: Position[]) => planetWithObstacles(planet, obs))(readObstacles())),
    _.chain(planet => _.map((pos: Position) => makeRover(pos, planet))(readPosition())),
    _.chain(rover => _.map((cs: Command[]) => handleCommands(rover, cs))(readCommands())),
    _.chain(display)
);

export function run(): Promise<void> {
    return game();
}
