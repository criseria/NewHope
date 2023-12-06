import React from 'react'

const ProductDate = ({ text, id, year, month, date, setYear, setMonth, setDate }) => {
  const currentYear = new Date().getFullYear()
  const yearOption = Array(5).fill(0).map((_, idx) => currentYear + idx)
  const monthOption = Array(12).fill(0).map((_, idx) => idx + 1)
  const lastDay = () => {
    return new Date(year, month, 0).getDate()
  }
  const dayOption = Array(lastDay()).fill(0).map((_, idx) => idx + 1)
  return (
    <div className={'product__create-input-item'}>
      <label htmlFor={id} >
        {text}
      </label>
      <div className={'product__create-date'}>
        <select value={year} onChange={setYear}>
          {yearOption.map(i => (
            <option value={i} key={i}>
              {i}년
            </option>
          ))}
        </select>
        <select value={month} onChange={setMonth}>
          {monthOption.map(i => (
            <option value={i} key={i}>
              {i}월
            </option>
          ))}
        </select>
        <select value={date} onChange={setDate}>
          {dayOption.map(i => (
            <option value={i} key={i}>
              {i}일
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ProductDate
