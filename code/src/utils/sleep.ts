export const sleep = (seconds = 0.5) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));
