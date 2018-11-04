import {ask} from "../ioOps";

describe('ask', () => {

    it('should provide the given answer', () => {
        expect.assertions(1);
        let expectedAnswer = "answer";

        process.nextTick(() => {
            process.stdin.push(expectedAnswer);
        });

        ask("A question")
            .run()
            .then((answer) => expect(answer).toBe(expectedAnswer));
    });

});