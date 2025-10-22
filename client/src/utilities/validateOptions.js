export function validateFeatureCombination(features) {
  // Example rule: red cars cannot have luxury wheels
  if (features.color === 'red' && features.wheels === 'luxury') {
    return 'Red cars cannot be paired with luxury wheels.'
  }

  // Example rule: suede interior not available with sport wheels
  if (features.interior === 'suede' && features.wheels === 'sport') {
    return 'Suede interior cannot be combined with sport wheels.'
  }

  return null // everything is valid
}