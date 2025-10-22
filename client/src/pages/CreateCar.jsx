import React, { useState, useEffect } from 'react'
import { createCar } from '../services/CarsAPI'
import { calculateTotalPrice } from '../utilities/calcPrice'
import { validateFeatureCombination } from '../utilities/validateOptions'
import { useNavigate } from 'react-router-dom'

export default function CreateCar() {
  const [form, setForm] = useState({
    name: '',
    base_price: 20000,
    color: '',
    wheels: '',
    interior: '',
    total_price: 20000
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // recalculate total when features change
  useEffect(() => {
    const total = calculateTotalPrice(Number(form.base_price), form)
    setForm(f => ({ ...f, total_price: total }))
  }, [form.color, form.wheels, form.interior, form.base_price])

  function handleChange(e) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validationError = validateFeatureCombination(form)
    if (validationError) {
      setError(validationError)
      return
    }

    await createCar({
      name: form.name,
      base_price: Number(form.base_price),
      features: JSON.stringify({
        color: form.color,
        wheels: form.wheels,
        interior: form.interior
      }),
      total_price: form.total_price
    })
    navigate('/customcars')
  }

  return (
    <div className="page">
      <h1>Create a Custom Car</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Car Name" value={form.name} onChange={handleChange} />
        <input name="base_price" type="number" value={form.base_price} onChange={handleChange} />
        <select name="color" value={form.color} onChange={handleChange}>
          <option value="">Select color</option>
          <option value="red">Red (+$500)</option>
          <option value="blue">Blue (+$300)</option>
        </select>
        <select name="wheels" value={form.wheels} onChange={handleChange}>
          <option value="">Select wheels</option>
          <option value="sport">Sport (+$1200)</option>
          <option value="luxury">Luxury (+$2000)</option>
        </select>
        <select name="interior" value={form.interior} onChange={handleChange}>
          <option value="">Select interior</option>
          <option value="leather">Leather (+$1500)</option>
          <option value="suede">Suede (+$1000)</option>
        </select>
        <p><strong>Total Price: ${form.total_price}</strong></p>
        <button type="submit">Create Car</button>
      </form>
    </div>
  )
}

