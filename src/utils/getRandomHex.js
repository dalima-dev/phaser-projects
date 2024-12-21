export function getRandomHex() {
  return Number(`0xff${Math.floor(Math.random() * 100000000)}`);
}
