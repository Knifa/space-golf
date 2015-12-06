import Vector from '../src/vector'

describe("Vector", function() {
  it("constructs", function() {
    var v = new Vector();

    expect(v.x).toBe(0);
    expect(v.y).toBe(0);
  })

  it("constructs with parameters", function() {
    var v = new Vector(5, 10);

    expect(v.x).toBe(5);
    expect(v.y).toBe(10);
  })
})
