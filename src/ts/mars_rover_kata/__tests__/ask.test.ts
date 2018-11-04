import {ask} from "../ioOps";

describe('ask', () => {

    it('should provide the given answer', () => {
        const stdin = require("mock-stdin").stdin();

        expect.assertions(1);
        let expectedAnswer = "answer";

        process.nextTick(() => {
            stdin.send(expectedAnswer);
        });

        ask("A question")
            .run()
            .then((answer) => expect(answer).toBe(expectedAnswer));
    });

});