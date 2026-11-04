import { runCallbacksDemo } from './src/callbacks.js';
import { runPromisesDemo } from './src/promises.js';
import { runAsyncAwaitDemo } from './src/asyncAwait.js';

const SECTIONS = {
  callbacks: () => new Promise((resolve) => runCallbacksDemo(resolve)),
  promises: runPromisesDemo,
  async: runAsyncAwaitDemo,
};

async function main() {
  const requested = process.argv[2];

  if (requested && !(requested in SECTIONS)) {
    console.error(`Неизвестная секция "${requested}". Доступны: ${Object.keys(SECTIONS).join(', ')}`);
    process.exitCode = 1;
    return;
  }

  const sectionNames = requested ? [requested] : Object.keys(SECTIONS);

  for (const name of sectionNames) {
    console.log(`\n==================== ${name.toUpperCase()} ====================`);
    try {
      await SECTIONS[name]();
    } catch (error) {
      console.error(`Секция "${name}" упала:`, error);
      process.exitCode = 1;
    }
  }
}

main();
