"use strict";

const createMinHeap = require("./create-min-heap");

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  const minHeap = createMinHeap();

  for (let i = 0; i < logSources.length; i++) {
    const logSource = logSources[i];
    minHeap.push({ logSource, log: logSource.pop() });
  }

  while (minHeap.size() > 0) {
    const el = minHeap.pop();
    printer.print(el.log);

    if (!el.logSource.drained) {
      const log = el.logSource.pop();
      if (log) {
        minHeap.push({ logSource: el.logSource, log });
      }
    }
  }

  return console.log("Sync sort complete.");
};
