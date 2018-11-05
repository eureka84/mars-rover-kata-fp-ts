import {ask} from "../ioOps";

describe('ask', () => {

	let stdin: { send: (arg0: string) => void; };

	beforeEach(function () {
		stdin = require('mock-stdin').stdin();
	});

	it('should provide the given answer',  () => {

		expect.assertions(1);
		let expectedAnswer = "answer";

		process.nextTick(function mockResponse() {
			stdin.send(expectedAnswer);
		});

		ask("A question").run()
			.then((answer) => {
				expect(answer).toBe(expectedAnswer);
			});
	});

	it('asks a question', function () {
		process.nextTick(function mockResponse() {
			stdin.send('response');
		});
		return askPromise('question: test')
			.then(function (response) {
				console.assert(response === 'response');
			});
	});


	function askPromise(question: string) {
		console.log(question);
		return new Promise(function (resolve) {
			process.stdin.once('data', function (data) {
				resolve(data.toString().trim());
			});
		});
	}

});