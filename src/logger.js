const DEFAULT_PREVIEW_SIZE = 3;

export function printResult(title, data, previewSize = DEFAULT_PREVIEW_SIZE) {
  console.log(`\n✔ ${title}: всего ${data.length}, первые ${Math.min(previewSize, data.length)}:`);
  console.dir(data.slice(0, previewSize), { depth: null });
}

export function printError(title, error) {
  console.error(`\n✖ ${title}: ${error.message}`);
}
