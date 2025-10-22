import React, { useEffect, useState } from 'react'
import { getAllCars, deleteCar } from '../services/CarsAPI'
import { useNavigate } from 'react-router-dom'

export default function ViewCars() {
  const [cars, setCars] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchCars() {
      try {
        const data = await getAllCars()
        setCars(data)
      } catch (err) {
        console.error('Error loading cars:', err)
      }
    }
    fetchCars()
  }, [])

  async function handleDelete(id) {
    await deleteCar(id)
    setCars(cars.filter(c => c.id !== id))
  }

  return (
    <div className="page">
      <h1>My Custom Cars</h1>
      <button onClick={() => navigate('/')}>➕ Create New Car</button>
      <ul>
        {cars.map(car => (
          <li key={car.id}>
            <strong>{car.name}</strong> – ${car.total_price}
            <button onClick={() => navigate(`/customcars/${car.id}`)}>View</button>
            <button onClick={() => navigate(`/edit/${car.id}`)}>Edit</button>
            <button onClick={() => handleDelete(car.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
