import {run} from "../game";
import DoneCallback = jest.DoneCallback;

describe('rover', () => {

	const noObstacles = "\n";

	it("should execute a list of commands", (done) => {
		const inputs = ["5x5", noObstacles, "0,0", "rrffflbb"];
		const expectedOutputs = [
			"Welcome to the Mars Rover Kata!\n",
			"What is the size of the planet?\n",
			"Where are the obstacles?\n",
			"What is the position of the rover?\n",
			"Waiting commands...\n",
			"E:3,3\n"
		];

		runGameAndVerifyOutputs(inputs)(expectedOutputs)(done);
	});

	it("should discard invalid commands and keep going", (done) => {
		const inputs = ["5x5", noObstacles, "2,3", "frzffxrbbylbll"];
		const expectedOutputs = [
			"Welcome to the Mars Rover Kata!\n",
			"What is the size of the planet?\n",
			"Where are the obstacles?\n",
			"What is the position of the rover?\n",
			"Waiting commands...\n",
			"W:4,4\n"
		];

		runGameAndVerifyOutputs(inputs)(expectedOutputs)(done);
	});

	it("should stop when hit an obstacle", (done) => {
		const inputs = ["5x5", "0,0/2,2", "0,2", "lfff"];
		const expectedOutputs = [
			"Welcome to the Mars Rover Kata!\n",
			"What is the size of the planet?\n",
			"Where are the obstacles?\n",
			"What is the position of the rover?\n",
			"Waiting commands...\n",
			"O:W:0,1\n"
		];

		runGameAndVerifyOutputs(inputs)(expectedOutputs)(done);
	});

	it("should move forward", (done) => {
		const inputs = ["10x10", noObstacles, "5,5", "ff"];
		const expectedOutputs = [
			"Welcome to the Mars Rover Kata!\n",
			"What is the size of the planet?\n",
			"Where are the obstacles?\n",
			"What is the position of the rover?\n",
			"Waiting commands...\n",
			"N:3,5\n"
		];

		runGameAndVerifyOutputs(inputs)(expectedOutputs)(done);
	});

	it("should move backward", (done) => {
		const inputs = ["10x10", noObstacles, "5,5", "bb"];
		const expectedOutputs = [
			"Welcome to the Mars Rover Kata!\n",
			"What is the size of the planet?\n",
			"Where are the obstacles?\n",
			"What is the position of the rover?\n",
			"Waiting commands...\n",
			"N:7,5\n"
		];

		runGameAndVerifyOutputs(inputs)(expectedOutputs)(done);
	});

	it("should turn 90 to the right", (done) => {
		const inputs = ["2x2", noObstacles, "0,0", "r"];
		const expectedOutputs = [
			"Welcome to the Mars Rover Kata!\n",
			"What is the size of the planet?\n",
			"Where are the obstacles?\n",
			"What is the position of the rover?\n",
			"Waiting commands...\n",
			"E:0,0\n"
		];

		runGameAndVerifyOutputs(inputs)(expectedOutputs)(done);
	});

	it("should turn 180 to the right", (done) => {
		const inputs = ["2x2", noObstacles, "0,0", "rr"];
		const expectedOutputs = [
			"Welcome to the Mars Rover Kata!\n",
			"What is the size of the planet?\n",
			"Where are the obstacles?\n",
			"What is the position of the rover?\n",
			"Waiting commands...\n",
			"S:0,0\n"
		];

		runGameAndVerifyOutputs(inputs)(expectedOutputs)(done);
	});

	it("should turn 270 to the right", (done) => {
		const inputs = ["2x2", noObstacles, "0,0", "rrr"];
		const expectedOutputs = [
			"Welcome to the Mars Rover Kata!\n",
			"What is the size of the planet?\n",
			"Where are the obstacles?\n",
			"What is the position of the rover?\n",
			"Waiting commands...\n",
			"W:0,0\n"
		];

		runGameAndVerifyOutputs(inputs)(expectedOutputs)(done);
	});

	it("should turn 360 to the right", (done) => {
		const inputs = ["2x2", noObstacles, "0,0", "rrrr"];
		const expectedOutputs = [
			"Welcome to the Mars Rover Kata!\n",
			"What is the size of the planet?\n",
			"Where are the obstacles?\n",
			"What is the position of the rover?\n",
			"Waiting commands...\n",
			"N:0,0\n"
		];

		runGameAndVerifyOutputs(inputs)(expectedOutputs)(done);
	});

	it("should turn 90 to the left", (done) => {
		const inputs = ["2x2", noObstacles, "0,0", "l"];
		const expectedOutputs = [
			"Welcome to the Mars Rover Kata!\n",
			"What is the size of the planet?\n",
			"Where are the obstacles?\n",
			"What is the position of the rover?\n",
			"Waiting commands...\n",
			"W:0,0\n"
		];

		runGameAndVerifyOutputs(inputs)(expectedOutputs)(done);
	});

	it("should turn 180 to the left", (done) => {
		const inputs = ["2x2", noObstacles, "0,0", "ll"];
		const expectedOutputs = [
			"Welcome to the Mars Rover Kata!\n",
			"What is the size of the planet?\n",
			"Where are the obstacles?\n",
			"What is the position of the rover?\n",
			"Waiting commands...\n",
			"S:0,0\n"
		];

		runGameAndVerifyOutputs(inputs)(expectedOutputs)(done);
	});

	it("should turn 270 to the left", (done) => {
		const inputs = ["2x2", noObstacles, "0,0", "lll"];
		const expectedOutputs = [
			"Welcome to the Mars Rover Kata!\n",
			"What is the size of the planet?\n",
			"Where are the obstacles?\n",
			"What is the position of the rover?\n",
			"Waiting commands...\n",
			"E:0,0\n"
		];

		runGameAndVerifyOutputs(inputs)(expectedOutputs)(done);
	});

	it("should turn 360 to the left", (done) => {
		const inputs = ["2x2", noObstacles, "0,0", "llll"];
		const expectedOutputs = [
			"Welcome to the Mars Rover Kata!\n",
			"What is the size of the planet?\n",
			"Where are the obstacles?\n",
			"What is the position of the rover?\n",
			"Waiting commands...\n",
			"N:0,0\n"
		];

		runGameAndVerifyOutputs(inputs)(expectedOutputs)(done);
	});

	const runGameAndVerifyOutputs = (ins: string[]) => (outs: string[]) => (done: DoneCallback) => {
		const bddStdin = require('bdd-stdin');
		const stdout = require('test-console').stdout;

		bddStdin(...ins, "\n");

		const inspect = stdout.inspect();

		run().then(() => {
			inspect.restore();
			expect(inspect.output).toEqual(outs);
			done();
		});
	};

});

