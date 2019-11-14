import {ask} from "../ioOps";
import {task} from "fp-ts/lib/Task";

describe('ask', () => {

    it('should provide the given answer', (done) => {
        const bddStdin = require('bdd-stdin');

        bddStdin("answer");

        ask("A question")()
            .then((answer) => {
                expect(answer).toBe("answer");
                done();
            });
    });

    it('should provide the given answers', (done) => {
        const bddStdin = require('bdd-stdin');

        bddStdin('answer', 'yes');

        task.chain(
            ask("A question"),
            (answer1) => {
                expect(answer1).toBe("answer");
                return ask(`was ${answer1} your answer`);
            }
        )().then((answer) => {
            expect(answer).toBe("yes");
            done();
        });
    });

});