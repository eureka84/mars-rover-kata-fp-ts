import {Command, Planet, Position} from "./data";

export function parsePlanet(s: string): Planet {
    let tokens = s.split("x");
    return {
        width: parseInt(tokens[0]),
        height: parseInt(tokens[1]),
        obstacles: []
    }
}

export function parseObstacles(input: string): Position[] {
    return input
        ? input.split("/").map(parsePosition)
        : [];
}

export function parsePosition(s: string): Position {
    const tokens = s.split(",");
    return {
        x: parseInt(tokens[0]),
        y: parseInt(tokens[1])
    }
}

export function parseCommands(s: string): Command[] {
    return s.split("").map(parseCommand)
}

function parseCommand(c: string): Command {
    switch(c) {
        case "l":  return Command.TurnLeft;
        case "r":  return Command.TurnRight;
        case "f":  return Command.MoveForward;
        case "b":  return Command.MoveBackward;
        default:   return Command.Unknown
    }
}