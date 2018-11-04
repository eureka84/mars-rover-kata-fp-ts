import {Task} from "fp-ts/lib/Task";
import {handleCommands} from "./gamePlay";
import {makeRover, planetWithObstacles} from "./data";
import {display, readCommands, readObstacles, readPlanet, readPosition, welcome} from "./gameIntercations";

const game: Task<void> =
    welcome()
        .chain(readPlanet)
        .chain((planet) => readObstacles().map((obs) => planetWithObstacles(planet, obs)))
        .chain((planet) => readPosition().map((pos) => makeRover(pos, planet)))
        .chain((rover) => readCommands().map(cs => handleCommands(rover, cs)))
        .chain((result) => display(result));

export function run(): Promise<void> {
   return game.run();
}
