const generateRange = (rangeStart: number, rangeEnd: number): number[] => {
  let range = [...Array(rangeEnd + 1).keys()];
  range = range.slice(rangeStart, rangeEnd);
  return range;
};

export default generateRange;
