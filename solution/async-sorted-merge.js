"use strict";

const createMinHeap = require("./create-min-heap");

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = (logSources, printer) => {
  return new Promise(async (resolve, reject) => {
    const minHeap = createMinHeap();

    for (const logSource of logSources) {
      const log = await logSource.popAsync();
      minHeap.push({ logSource, log });
    }

    while (minHeap.size() > 0) {
      const el = minHeap.pop();
      printer.print(el.log);

      if (!el.logSource.drained) {
        const log = await el.logSource.popAsync();
        if (log) {
          minHeap.push({ logSource: el.logSource, log });
        }
      }
    }

    resolve(console.log("Async sort complete."));
  });
};
