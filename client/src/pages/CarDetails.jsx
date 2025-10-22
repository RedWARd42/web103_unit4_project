import React, { useEffect, useState } from 'react'
import { getCarById } from '../services/CarsAPI'
import { useParams, useNavigate } from 'react-router-dom'

export default function CarDetails() {
  const { id } = useParams()
  const [car, setCar] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchCar() {
      const data = await getCarById(id)
      setCar(data)
    }
    fetchCar()
  }, [id])

  if (!car) return <p>Loading...</p>

  const features = car.features ? (typeof car.features === 'string'
      ? JSON.parse(car.features)
      : car.features) : {}

  return (
    <div className="page">
      <h1>{car.name}</h1>
      <p>Base Price: ${car.base_price}</p>
      <p>Total Price: ${car.total_price}</p>
      <p>Color: {features.color || '—'}</p>
      <p>Wheels: {features.wheels || '—'}</p>
      <button onClick={() => navigate(`/edit/${car.id}`)}>Edit</button>
      <button onClick={() => navigate('/customcars')}>Back to List</button>
    </div>
  )
}
