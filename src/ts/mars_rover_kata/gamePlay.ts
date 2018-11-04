import {Command, Direction, Planet, Position, Result, Rover} from "./data";
import {none, Option, Some} from "fp-ts/lib/Option";

export function handleCommands(rover: Rover, cs: Command[]): Result {
    if (cs.length > 0) {
        let roverOption = handleCommand(rover, cs[0]);

        return roverOption.fold(
                    {hitObstacle: true, rover},
                    (nextRover) => handleCommands(nextRover, cs.slice(1))
                );
    } else {
        return {hitObstacle: false, rover};
    }
}

function handleCommand(r: Rover, c: Command): Option<Rover> {
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
}

const rotate: (r: Rover, direction: (intial: Direction) => Direction) => Rover =
    (r, direction) => Object.assign(r, {direction: direction(r.direction)});

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

function moveForward(r: Rover): Option<Position> {
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
}

function moveBackward(r: Rover): Option<Position> {
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
}

function moveSouth(position: Position, planet: Planet): Option<Position> {
    const newX = (position.x + 1) % planet.height;
    return validatePosition(planet, Object.assign({}, position, {x: newX}));
}

function moveNorth(position: Position, planet: Planet): Option<Position> {
    const newX = position.x > 0 ? position.x - 1 : planet.height - 1;
    return validatePosition(planet, Object.assign({}, position, {x: newX}));
}

function moveEast(position: Position, planet: Planet): Option<Position> {
    const newY = (position.y + 1) % planet.width;
    return validatePosition(planet, Object.assign({}, position, {y: newY}));
}

function moveWest(position: Position, planet: Planet): Option<Position> {
    const newY = position.y > 0 ? position.y - 1 : planet.width - 1;
    return validatePosition(planet, Object.assign({}, position, {y: newY}));
}

function validatePosition(planet: Planet, newPosition: Position): Option<Position> {
    if (planet.obstacles.find((p) => p.x === newPosition.x && p.y === newPosition.y))
        return none;
    else
        return new Some(newPosition);
}