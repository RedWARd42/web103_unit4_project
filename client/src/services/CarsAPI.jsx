// client/src/services/CustomItemsAPI.jsx
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/items"

// GET all custom cars
export async function getAllCars() {
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error("Failed to fetch cars")
  return await res.json()
}

// GET one car by id
export async function getCarById(id) {
  const res = await fetch(`${API_URL}/${id}`)
  if (!res.ok) throw new Error("Failed to fetch car")
  return await res.json()
}

// POST new car
export async function createCar(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error("Failed to create car")
  return await res.json()
}

// PUT update existing car
export async function updateCar(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error("Failed to update car")
  return await res.json()
}

// DELETE a car
export async function deleteCar(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error("Failed to delete car")
  return await res.json()
}
