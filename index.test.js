const ReservedSubdomains = require('./index');

describe('ReservedSubdomains', () => {
  it('catches valid and invalid domains', () => {
    const valid = "this-is-valid";
    const invalid = "www";
    const invalid2 = "www2"

    expect(ReservedSubdomains.isValid(valid)).toBe(true);
    expect(ReservedSubdomains.isValid(invalid)).toBe(false);
    expect(ReservedSubdomains.isValid(invalid2)).toBe(false);
    expect(ReservedSubdomains.isNotValid(valid)).toBe(false);
    expect(ReservedSubdomains.isNotValid(invalid)).toBe(true);
    expect(ReservedSubdomains.isNotValid(invalid2)).toBe(true);
  })

  it('is case sensitive because it is developer responsibility to lowercase the inputs', () => {
    const invalid = "www";
    const invalidUpper = "WWW";
    expect(ReservedSubdomains.isValid(invalid)).toBe(false);
    expect(ReservedSubdomains.isValid(invalidUpper)).toBe(true);
  })

  it('validates against regex', () => {
    const invalid = "server123";
    expect(ReservedSubdomains.isValid(invalid)).toBe(false);
  })

  it('validates against badwords', () => {
    const invalid = "wank-lo";
    expect(ReservedSubdomains.isValid(invalid)).toBe(false);
  })

  it('validates against webwords', () => {
    const invalid = "pro-duct";
    const valid = "jimlam";

    expect(ReservedSubdomains.isValid(invalid)).toBe(false);
    expect(ReservedSubdomains.isValid(valid)).toBe(true);
  })
})
