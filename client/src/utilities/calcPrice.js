export function calculateTotalPrice(basePrice, features = {}) {
  let total = basePrice

  // example feature-based pricing rules
  if (features.color === 'red') total += 500
  if (features.color === 'blue') total += 300

  if (features.wheels === 'sport') total += 1200
  if (features.wheels === 'luxury') total += 2000

  if (features.interior === 'leather') total += 1500
  if (features.interior === 'suede') total += 1000

  return total
}