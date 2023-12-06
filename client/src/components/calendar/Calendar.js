import { useState } from 'react';
import './calendar.css';

const Calendar = ({ year, date, month, schedule }) => {
  const [isDetail, setIsDetail] = useState(true)
  const years = new Date().getFullYear()

  const msg = (new Date(year, month - 1, date) - new Date()) / (1000 * 60 * 60 * 24)

  const targetDate = () => {
    return new Date(year, month, 0).getDate()
  }

  const endDate = () => {
    return new Date(year, month, date).getDate()
  }

  const firstDate = () => {
    return new Date(year, month - 1, 1).getDay()
  }

  const selectYear = Array(5).fill('').map((_, idx) => (years + 1) - idx)
  const selectMonth = Array(12).fill('').map((_, idx) => 1 + idx)
  const selectDate = Array(targetDate() + firstDate()).fill('').map((_, idx) => idx < firstDate() ? 0 : idx - firstDate() + 1)

  const dayName = ['일', '월', '화', '수', '목', '금', '토']
  const MonthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  // const onClickHandle = () => {
  //   setIsDetail(prev => !prev)
  // }

  return (
    <section className='calendar__calendar-section' >
      <div className='calendar__calendar-wrap'>
        <div
          // onClick={()=>onClickHandle()} 
          className='calendar__calendar-title'>
          <span>{years}</span>
          <span>{!isDetail ? `${month}월 ${targetDate()}일` : MonthName[month - 1]}</span>
        </div>
        {isDetail ?
          <div className='calendar__date-wrap'>
            {dayName.map(i =>
              <div key={i} className='calendar__date-name'>
                {i}
              </div>)}
            {selectDate.map((i, idx) =>
              <div key={i.toString() + dayName[idx % 7]} className={`calendar__date-num${endDate() === i ? ' target' : ''}`}>
                {/* ${days === i ? ' active' : ''} */}
                <span className='calendar__date-num-'>
                  {i === 0 ? '' : i}
                </span>
              </div>)}
          </div> :
          ''}
      </div>
    </section>
  );
}
{/* <p className='calendar__txt'>
        {msg <= 0 ?
          <>
            이미 종료되었습니다.
            </>
          :
          <>
            <span>{Math.floor(msg)}</span>일 남았어요.
            </>
        }
      </p> */}
export default Calendar;