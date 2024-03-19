"use strict";

const createMinHeap = require("./create-min-heap");

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  const minHeap = createMinHeap();

  for (let i = 0; i < logSources.length; i++) {
    const logSource = logSources[i];
    minHeap.push({ logIndex: i, log: logSource.pop() });
  }

  while (minHeap.size() > 0) {
    const el = minHeap.pop();
    printer.print(el.log);

    if (!logSources[el.logIndex].drained) {
      const log = logSources[el.logIndex].pop();
      if (log) {
        minHeap.push({ logIndex: el.logIndex, log });
      }
    }
  }
  return console.log("Sync sort complete.");
};
