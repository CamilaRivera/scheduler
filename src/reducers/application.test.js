import reduceState from "./application";


describe("Application Reducer", () => {
  it("thows an error with an unsupported type", () => {
    expect(() => reduceState({}, { type: null })).toThrowError(
      /tried to reduce with unsupported action type/i
    );
  });
});