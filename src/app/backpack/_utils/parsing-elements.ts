export function parsingElements(data: number): number[] {
  return [
    data & 0x00000f,
    (data & 0x0000f0) >> 4,
    (data & 0x000f00) >> 8,
    (data & 0x00f000) >> 12,
    (data & 0x0f0000) >> 16,
  ].filter((item) => item !== 0);
}
