import { sum } from "../sum.js";

describe("sum", () => {
  it("1 + 2 = 3", () => {
    expect(sum(1, 2)).toBe(5);
  });
});
