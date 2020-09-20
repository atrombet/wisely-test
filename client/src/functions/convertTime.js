/**
 * Takes in a 24hr time string and returns a readable 12 hr time 
 * EX: '12:00 PM' or '4:00 PM'
 * @param time - A 24hr time string EX: '04:00' or '14:30'
 */
export const convertTime = (time) => {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  // The actual date doesn't matter since we only care about the time string.
  return new Date(`2020-09-01 ${time}`).toLocaleString('en-US', options);
};
