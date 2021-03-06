import {task, Task} from 'fp-ts/lib/Task'

/** reads from standard input */
export const reads: Task<string> =
	() => new Promise(resolve => {
		process.stdin.once('data', function (data) {
			resolve(data.toString().trim());
		});
	});

/** writes to standard output */
export const puts = (message: string): Task<void> =>
	() => new Promise(resolve => {
		process.stdout.write(`${message}\n`);
		resolve();
	});

export const ask: (message: string) => Task<string> =
	(message) => task.chain(puts(message), () => reads);
