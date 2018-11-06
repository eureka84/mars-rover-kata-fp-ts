export interface Planet {
    width: number
    height: number
    obstacles: Position[]
}

export const planetWithObstacles: (planet: Planet, obs: Position[]) => Planet = (planet: Planet, obs: Position[]) => {
    return Object.assign({}, planet, {obstacles: obs})
};

export interface Position {
    x: number
    y: number
}

export interface Rover {
    planet: Planet
    position: Position
    direction: Direction
}

export const makeRover: (position: Position, planet: Planet, direction?: Direction) => Rover =
    (position: Position, planet: Planet, direction = Direction.N) => {
        return {
            planet,
            position,
            direction
        }
    };

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