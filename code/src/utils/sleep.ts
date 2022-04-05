/**
 * Wait the time in seconds for the next Promise.
 * 
 * @param seconds The time in seconds to wait.
 * @returns A Promise that resolves after the time in seconds.
 */

export const sleep = (seconds = 0.5) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));
