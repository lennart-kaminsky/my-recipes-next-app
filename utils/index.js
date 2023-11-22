export function kebabCase(string) {
  return string
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .join("-")
    .toLowerCase();
}

export function checkDecimal(number) {
  if (number % 1 != 0) return number.toFixed(1);
  return number.toFixed(0);
}
