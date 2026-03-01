function convertToIEEE754DoublePrecision(decimalNumber) {
  const binaryRepresentation = [];
  const signBit = decimalNumber < 0 ? 1 : 0;

  // Convert decimal number to binary
  let integerPart = Math.floor(Math.abs(decimalNumber));
  let fractionalPart = Math.abs(decimalNumber) - integerPart;

  // Convert integer part to binary
  while (integerPart > 0) {
    binaryRepresentation.unshift(integerPart % 2);
    integerPart = Math.floor(integerPart / 2);
  }

  // Add sign bit
  binaryRepresentation.unshift(signBit);

  // Add exponent (biased by 1023)
  let exponent = 1023;
  while (exponent > 0) {
    binaryRepresentation.push(exponent % 2);
    exponent = Math.floor(exponent / 2);
  }

  // Add fractional part
  let precision = 52;
  while (precision > 0) {
    fractionalPart *= 2;
    const bit = Math.floor(fractionalPart);
    binaryRepresentation.push(bit);
    fractionalPart -= bit;
    precision--;
  }

  // Pad with zeros if needed
  while (binaryRepresentation.length < 64) {
    binaryRepresentation.push(0);
  }

  // Return the binary representation as a string
  return binaryRepresentation.join('');
}

// -------------------------------
// Demonstration of floating error
// -------------------------------

const a = 0.1;
const b = 0.2;
const result = a + b;

console.log('\n--- Floating Point Demonstration ---');

console.log('a =', a);
console.log('b =', b);
console.log('a + b =', result);

console.log('\nBinary representation (approximate):');

console.log(`0.1    ->		${convertToIEEE754DoublePrecision(a)}`);
console.log(`0.2    ->		${convertToIEEE754DoublePrecision(b)}`);
console.log(`result ->		${convertToIEEE754DoublePrecision(result)}`);

// Compare with expected 0.3
const expected = 0.3;
const difference = result - expected;

console.log('\nExpected 0.3 =', expected);
console.log('Actual result =', result);
console.log('Difference =', difference);

if (difference !== 0) {
  console.log(
    '\nDifference exists because 0.1 and 0.2 cannot be represented exactly in binary.',
  );
}
