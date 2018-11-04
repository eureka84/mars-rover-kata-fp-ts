export interface Planet {
    width: number
    height: number
    obstacles: Position[]
}

export function planetWithObstacles(planet: Planet, obs: Position[]) : Planet {
    return Object.assign(planet, {obstacles: obs})
}

export interface Position {
    x: number
    y: number
}

export interface Rover {
    planet: Planet
    position: Position
    direction: Direction
}

export function makeRover(position: Position, planet: Planet, direction = Direction.N) {
    return {
        planet,
        position,
        direction
    }
}

export enum Direction {
    N, S, E, W
}

export enum Command {
    TurnLeft,
    TurnRight,
    MoveForward,
    MoveBackward,
    Unknown
}

export interface Result {
    hitObstacle: boolean,
    rover: Rover
}