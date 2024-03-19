"use strict";

const { Heap } = require("heap-js");

const earliestDateComparator = (a, b) => a.log.date - b.log.date;

module.exports = () => {
  return new Heap(earliestDateComparator);
};
