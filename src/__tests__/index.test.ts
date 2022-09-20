describe("with two numbers to multiply", () => {
  it("returns the result", () => {
    const five = new Dollar(5);
    five.times(2);

    expect(five.amount).toEqual(10);
  })
})