console.log('1. sync: начало скрипта');

setTimeout(() => {
  console.log('7. macrotask: setTimeout #1');
  Promise.resolve().then(() => console.log('8. microtask: then внутри setTimeout #1'));
}, 0);

setTimeout(() => console.log('9. macrotask: setTimeout #2'), 0);

Promise.resolve()
  .then(() => console.log('4. microtask: Promise.then #1'))
  .then(() => console.log('6. microtask: Promise.then #2 (ставится в очередь только после #1)'));

async function asyncTask() {
  console.log('2. sync: async-функция до await выполняется синхронно');
  await null;
  console.log('5. microtask: код после await');
}
asyncTask();

console.log('3. sync: конец скрипта');
