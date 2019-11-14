import {ask} from "../ioOps";
import {Task} from "fp-ts/lib/Task";

describe('ask', () => {

	it('should provide the given answer',  (done) => {
        const bddStdin = require('bdd-stdin');

        bddStdin("answer");

        let stringTask: Task<string> = ask("A question");
        stringTask.run()
			.then((answer) => {
				expect(answer).toBe("answer");
				done();
			});
	});

	it('should provide the given answers',  (done) => {
		const bddStdin = require('bdd-stdin');

		bddStdin('answer', 'yes');

		ask("A question")
			.chain((answer1) => {
				expect(answer1).toBe("answer");
				return ask(`was ${answer1} your answer`);
			})
			.run()
			.then((answer) => {
				expect(answer).toBe("yes");
				done();
			});
	});

});