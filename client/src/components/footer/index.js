import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router'
import './footer.css'

export const pages = [{ kor: "홈", route: '/' }, { kor: "유기 동물 소개", route: '/animal' }, { kor: "게시판", route: '/board' }, { kor: "봉사 활동 티켓", route: '/product' }]

const Footer = () => {
  const { pathname } = useLocation()
  const [page, setPage] = useState('')
  useEffect(() => {
    setPage((prev) => pathname)
  }, [pathname])
  console.log(page)
  return (
    <footer style={{ paddingBottom: page === '/cart' ? "100px" : "auto" }}>
      <section className='footer_section'>
        <div className={'footer_page_wrap'}>
          <p className=''>사이트 내 페이지 목록</p>
          <ul className={'footer_page_list'}>
            {pages.map((i, idx) => (
              <li key={idx} className={'footer_page_item'}>
                <Link to={i.route}>
                  {i.kor}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={'footer_page_wrap'}>
          <ul className={'footer_page_list'}>
            <li className={'footer_page_item'}>
              이메일 :
            </li>
            <li className={'footer_page_item'}>
              <address>
                주소 :
              </address>
            </li>
          </ul>
        </div>
        <div className={'footer_page_wrap'}>
          <p className='footer_copyright'>
            Copyright © {new Date().getFullYear()} NewHope. All rights reserved.
          </p>
        </div>
      </section>
    </footer>
  )
}

export default Footer
