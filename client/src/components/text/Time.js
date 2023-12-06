import React from 'react'

const Time = ({ year, month, date, cls = '' }) => {
  return (
    <div className={`time__tag ${cls === '' ? '' : cls}`}>
      <time dateTime={`${new Date(year, month, date)}`}>
        {`${year}-${month}-${date}`}
      </time>
    </div>
  )
}

export default Time
