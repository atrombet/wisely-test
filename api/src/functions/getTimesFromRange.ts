/**
 * Takes in a range of integers between 0 and 95 and calculates a set of 15 minute intervals within that range.
 * EX: Input: [0, 3], Output: [12:00 AM, 12:15 AM, 12:30 AM, 12:45 AM]
 * @param range - An array of 2 integers between 0 and 95. EX: [15, 67]
 */
export const getTimesFromRange: (range: number[]) => string[] = (range) => {
  const [ first, last ] = range;
  const times: string[] = [];
  for (let tick = first; tick <= last; tick++) {
    const hour24 = Math.floor(tick / 4);
    const minutes = (tick % 4) * 15;
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    times.push(new Date(2020, 1, 1, hour24, minutes).toLocaleString('en-US', options));
  }
  return times;
}