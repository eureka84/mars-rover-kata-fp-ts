import {Command, Planet, Position} from "./data";

export const parsePlanet: (s: string) => Planet = (s: string) => {
    const tokens = s.split("x");
    return {
        width: parseInt(tokens[0]),
        height: parseInt(tokens[1]),
        obstacles: []
    }
};

export const parseObstacles: (input: string) => Position[] = (input: string) => {
    return input
        ? input.split("/").map(parsePosition)
        : [];
};

export const parsePosition: (s: string) => Position = (s: string) => {
    const tokens = s.split(",");
    return {
        x: parseInt(tokens[0]),
        y: parseInt(tokens[1])
    }
};

export const parseCommands: (s: string) => Command[] = (s: string) => {
    return s.split("").map(parseCommand)
};

const parseCommand: (c: string) => Command = (c: string) => {
    switch(c) {
        case "l":  return Command.TurnLeft;
        case "r":  return Command.TurnRight;
        case "f":  return Command.MoveForward;
        case "b":  return Command.MoveBackward;
        default:   return Command.Unknown
    }
};