import React, { useEffect, useState } from 'react'
import { getCarById, updateCar } from '../services/CarsAPI'
import { useParams, useNavigate } from 'react-router-dom'

export default function EditCar() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', base_price: 0, features: {}, total_price: 0 })

  useEffect(() => {
    async function loadCar() {
      const car = await getCarById(id)
      setForm({
        ...car,
        color: car.features?.color || '',
        wheels: car.features?.wheels || ''
      })
    }
    loadCar()
  }, [id])

  function handleChange(e) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const data = {
      name: form.name,
      base_price: Number(form.base_price),
      total_price: Number(form.total_price),
      features: JSON.stringify({ color: form.color, wheels: form.wheels })
    }
    await updateCar(id, data)
    navigate(`/customcars/${id}`)
  }

  return (
    <div className="page">
      <h1>Edit Car</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} />
        <input name="base_price" type="number" value={form.base_price} onChange={handleChange} />
        <input name="color" value={form.color || ''} onChange={handleChange} />
        <input name="wheels" value={form.wheels || ''} onChange={handleChange} />
        <input name="total_price" type="number" value={form.total_price} onChange={handleChange} />
        <button type="submit">Update Car</button>
      </form>
    </div>
  )
}