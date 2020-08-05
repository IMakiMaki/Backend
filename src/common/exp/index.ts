/**
 * A custom type guard function that determines whether
 * `value` is an array that only contains numbers.
 */
function isNumberArray(value: unknown): value is number[] {
  return Array.isArray(value) && value.every((element) => typeof element === 'number');
}

const unknownValue: unknown = [15, 23, 8, 4, 42, 16];

if (isNumberArray(unknownValue)) {
  // Within this branch, `unknownValue` has type `number[]`,
  // so we can spread the numbers as arguments to `Math.max`
  const max = Math.max(...unknownValue);
  console.log(max);
}

type Result = { success: true; value: unknown } | { success: false; error: Error };
