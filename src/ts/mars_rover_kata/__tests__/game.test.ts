import {run} from "../game";

describe('rover', () => {

    it("should execute a list of commands", async () => {
        await assertRun(
            ["5x5", noObstacles, "0,0", "rrffflbb"],
            [
                "Welcome to the Mars Rover Kata!",
                "What is the size of the planet?",
                "Where are the obstacles?",
                "What is the position of the rover?",
                "Waiting commands...",
                "E:3,3"
            ]
        );

    });

    // it("should discard invalid commands and keep going", () => {
    //     let execution = assertRun(["5x5", noObstacles, "2,3", "frzffxrbbylbll"]);
    //
    //     assert.deepStrictEqual(execution, [
    //         "Welcome to the Mars Rover Kata!",
    //         "What is the size of the planet?",
    //         "Where are the obstacles?",
    //         "What is the position of the rover?",
    //         "Waiting commands...",
    //         "W:4,4"
    //     ]);
    // });
    //
    // it("should stop when hit an obstacle", () => {
    //     let execution = assertRun(["5x5", "0,0/2,2", "0,2", "lfff"]);
    //
    //     assert.deepStrictEqual(execution, [
    //         "Welcome to the Mars Rover Kata!",
    //         "What is the size of the planet?",
    //         "Where are the obstacles?",
    //         "What is the position of the rover?",
    //         "Waiting commands...",
    //         "O:W:0,1"
    //     ]);
    // });
    //
    // it("should move forward", () => {
    //     let execution = assertRun(["10x10", noObstacles, "5,5", "ff"]);
    //
    //     assert.deepStrictEqual(execution, [
    //         "Welcome to the Mars Rover Kata!",
    //         "What is the size of the planet?",
    //         "Where are the obstacles?",
    //         "What is the position of the rover?",
    //         "Waiting commands...",
    //         "N:3,5"
    //     ]);
    // });
    //
    // it("should move backward", () => {
    //     let execution = assertRun(["10x10", noObstacles, "5,5", "bb"]);
    //
    //     assert.deepStrictEqual(execution, [
    //         "Welcome to the Mars Rover Kata!",
    //         "What is the size of the planet?",
    //         "Where are the obstacles?",
    //         "What is the position of the rover?",
    //         "Waiting commands...",
    //         "N:7,5"
    //     ]);
    // });
    //
    // it("should turn 90 to the right", () => {
    //     let execution = assertRun(["2x2", noObstacles, "0,0", "r"]);
    //
    //     assert.deepStrictEqual(execution, [
    //         "Welcome to the Mars Rover Kata!",
    //         "What is the size of the planet?",
    //         "Where are the obstacles?",
    //         "What is the position of the rover?",
    //         "Waiting commands...",
    //         "E:0,0"
    //     ]);
    // });
    //
    // it("should turn 180 to the right", () => {
    //     let execution = assertRun(["2x2", noObstacles, "0,0", "rr"]);
    //
    //     assert.deepStrictEqual(execution, [
    //         "Welcome to the Mars Rover Kata!",
    //         "What is the size of the planet?",
    //         "Where are the obstacles?",
    //         "What is the position of the rover?",
    //         "Waiting commands...",
    //         "S:0,0"
    //     ]);
    // });
    //
    // it("should turn 270 to the right", () => {
    //     let execution = assertRun(["2x2", noObstacles, "0,0", "rrr"]);
    //
    //     assert.deepStrictEqual(execution, [
    //         "Welcome to the Mars Rover Kata!",
    //         "What is the size of the planet?",
    //         "Where are the obstacles?",
    //         "What is the position of the rover?",
    //         "Waiting commands...",
    //         "W:0,0"
    //     ]);
    // });
    //
    // it("should turn 360 to the right", () => {
    //     let execution = assertRun(["2x2", noObstacles, "0,0", "rrrr"]);
    //
    //     assert.deepStrictEqual(execution, [
    //         "Welcome to the Mars Rover Kata!",
    //         "What is the size of the planet?",
    //         "Where are the obstacles?",
    //         "What is the position of the rover?",
    //         "Waiting commands...",
    //         "N:0,0"
    //     ]);
    // });
    //
    // it("should turn 90 to the left", () => {
    //     let execution = assertRun(["2x2", noObstacles, "0,0", "l"]);
    //
    //     assert.deepStrictEqual(execution, [
    //         "Welcome to the Mars Rover Kata!",
    //         "What is the size of the planet?",
    //         "Where are the obstacles?",
    //         "What is the position of the rover?",
    //         "Waiting commands...",
    //         "W:0,0"
    //     ]);
    // });
    //
    // it("should turn 180 to the left", () =>
    //     let execution = assertRun(["2x2", noObstacles, "0,0", "ll"]);
    //
    //     assert.deepStrictEqual(execution, [
    //         "Welcome to the Mars Rover Kata!",
    //         "What is the size of the planet?",
    //         "Where are the obstacles?",
    //         "What is the position of the rover?",
    //         "Waiting commands...",
    //         "S:0,0"
    //     ]);
    // });
    //
    // it("should turn 270 to the left", () => {
    //     let execution = assertRun(["2x2", noObstacles, "0,0", "lll"]);
    //
    //     assert.deepStrictEqual(execution, [
    //         "Welcome to the Mars Rover Kata!",
    //         "What is the size of the planet?",
    //         "Where are the obstacles?",
    //         "What is the position of the rover?",
    //         "Waiting commands...",
    //         "E:0,0"
    //     ]);
    // });
    //
    // it("should turn 360 to the left", () => {
    //     let execution = assertRun(["2x2", noObstacles, "0,0", "llll"]);
    //
    //     assert.deepStrictEqual(execution, [
    //         "Welcome to the Mars Rover Kata!",
    //         "What is the size of the planet?",
    //         "Where are the obstacles?",
    //         "What is the position of the rover?",
    //         "Waiting commands...",
    //         "N:0,0"
    //     ]);
    // });

    const assertRun = (inputs: string[], outputs : string[]) => {
        const stdin = require("mock-stdin").stdin();
        const stdout = require("test-console").stdout;

        process.nextTick(() => {
            stdin.send(inputs);
        });

        let inspect = stdout.inspect();

        expect.assertions(1);

        let promise = run();

        promise
            .then(() => expect(inspect.output).toEqual(outputs))
            .catch(() => fail());

        inspect.restore();
    };

    const noObstacles = "";
});

