import {Command, Direction, Planet, Position, Result, Rover} from "./data";
import {none, Option, Some} from "fp-ts/lib/Option";
import {head, tail} from "fp-ts/lib/Array";

export const handleCommands: (rover: Rover, cs: Command[]) => Result = (rover: Rover, cs: Command[]) =>
    head(cs).fold(
        {hitObstacle: false, rover},
        (c) => handleCommand(rover, c)
            .fold(
                {hitObstacle: true, rover},
                (nextRover) => handleCommands(nextRover, tail(cs).getOrElse([]))
            )
    );

const handleCommand: (r: Rover, c: Command) => Option<Rover> = (r: Rover, c: Command) => {
    switch (c) {
        case Command.TurnRight:
            return new Some(rotateRight(r));
        case Command.TurnLeft:
            return new Some(rotateLeft(r));
        case Command.MoveForward:
            return moveForward(r).map((p) => Object.assign({}, r, {position: p}));
        case Command.MoveBackward:
            return moveBackward(r).map((p) => Object.assign({}, r, {position: p}));
        case Command.Unknown:
            return new Some(r)
    }
};

const rotate: (r: Rover, direction: (intial: Direction) => Direction) => Rover =
    (r, direction) => Object.assign({}, r, {direction: direction(r.direction)});

const rotateRight = (r: Rover) => rotate(r, right);

const rotateLeft = (r: Rover) => rotate(r, left);

const right = (direction: Direction) => {
    switch (direction) {
        case Direction.N:
            return Direction.E;
        case Direction.E:
            return Direction.S;
        case Direction.S:
            return Direction.W;
        case Direction.W:
            return Direction.N;
    }
};

const left = (direction: Direction) => {
    switch (direction) {
        case Direction.N:
            return Direction.W;
        case Direction.W:
            return Direction.S;
        case Direction.S:
            return Direction.E;
        case Direction.E:
            return Direction.N;
    }
};

const moveForward: (r: Rover) => Option<Position> = (r: Rover) => {
    switch (r.direction) {
        case Direction.S :
            return moveSouth(r.position, r.planet);
        case Direction.N :
            return moveNorth(r.position, r.planet);
        case Direction.E :
            return moveEast(r.position, r.planet);
        case Direction.W :
            return moveWest(r.position, r.planet);
    }
};

const moveBackward: (r: Rover) => Option<Position> = (r: Rover) => {
    switch (r.direction) {
        case Direction.S:
            return moveNorth(r.position, r.planet);
        case Direction.N:
            return moveSouth(r.position, r.planet);
        case Direction.E:
            return moveWest(r.position, r.planet);
        case Direction.W:
            return moveEast(r.position, r.planet);
    }
};

const moveSouth: (position: Position, planet: Planet) => Option<Position> = (position: Position, planet: Planet) => {
    const newX = (position.x + 1) % planet.height;
    return validatePosition(planet, Object.assign({}, position, {x: newX}));
};

const moveNorth: (position: Position, planet: Planet) => Option<Position> = (position: Position, planet: Planet) => {
    const newX = position.x > 0 ? position.x - 1 : planet.height - 1;
    return validatePosition(planet, Object.assign({}, position, {x: newX}));
};

const moveEast: (position: Position, planet: Planet) => Option<Position> = (position: Position, planet: Planet) => {
    const newY = (position.y + 1) % planet.width;
    return validatePosition(planet, Object.assign({}, position, {y: newY}));
};

const moveWest: (position: Position, planet: Planet) => Option<Position> = (position: Position, planet: Planet) => {
    const newY = position.y > 0 ? position.y - 1 : planet.width - 1;
    return validatePosition(planet, Object.assign({}, position, {y: newY}));
};

const validatePosition: (planet: Planet, next: Position) => Option<Position> = (planet: Planet, next: Position) => {
    if (planet.obstacles.find((p) => p.x === next.x && p.y === next.y))
        return none;
    else
        return new Some(next);
};