import {createInterface} from 'readline'
import {Task} from 'fp-ts/lib/Task'

/** reads from standard input */
export const reads: Task<string> = new Task(
    () => new Promise(resolve => {
        const rl = createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('> ', answer => {
            rl.close();
            resolve(answer)
        })
    })
);

/** writes to standard output */
export const puts = (message: string): Task<void> => new Task(
    () => new Promise(resolve => {
        resolve(console.log(message))
    })
);

export const ask: (message: string) => Task<string> =
    (message) => puts(message).chain(() => reads);
