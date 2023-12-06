import React from "react";
import { Carousel } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import "bootstrap/dist/css/bootstrap.min.css";

function MainPage() {
  return (
    <>

      {/* 메인 사진 */}
      <Carousel>
        <Carousel.Item>
          <div className='slidercontents'></div>
        </Carousel.Item>
        <Carousel.Item>
          <div className='slidercontents1'></div>
        </Carousel.Item>
      </Carousel>
      <br /><br />


      {/* 입양 절차 */}
      <div>
        <ul>
          <h2>입양 절차 안내</h2><br />
          <ul>
            <div>
              <h5>1. 입양 전 확인</h5>
              <h6>홈페이지에서 '입양 대기 동물'을 확인합니다.</h6>
              <p />
              <h5>2. 입양 상담 예약</h5>
              <h6>방문 전 유선으로 일정 예약을 해주시고 센터로 방문하여 주세요.</h6>
              <p />
              <h5>3. 입양 진행</h5>
              <h6>입양은 1~2회 입양 상담 및 개체 만남을 통해 진행됩니다.</h6>
              <h6>(입양 후 파양은 불가합니다. 만남을 통해 신중하게 결정해주세요.)</h6>
              <p />
              <h5>4. 입양 후기 공유</h5>
              <h6>보호자님과 입양된 반려견, 반려묘의 행복한 일상을 주기적으로 올려주세요.</h6>
              <h6>입양 대기 중인 아이들의 입양과 인식 개선에 많은 도움이 됩니다.</h6>
              <p />
            </div>
          </ul>
        </ul>
      </div>
      <br />

      {/* 가족이 되어주세요 */}
      <hr class="g-brd-secondary-light-v1 my-0"></hr>
      <br />

      <div>
        <ul>
          <div>
            <div>
              <h3>가족이 되어주세요</h3>
            </div>
            <div>
              <a href="/" className="_fade_link">
                <span className="plain-name" data-hover>자세히 알아보기</span>
              </a>
            </div>
          </div>
        </ul>
        <section>
          <div className="container">
            <div className="row">
              <div class="col-md-3 g-mb-30 g-pr-5--lg">
                <div className="u-block-hover text-center g-parent g-md-10">
                  <a href="https://www.animals.or.kr/center/adopt/65243" target="_self">
                    <img className="img-fluid g-transform-scale-1_1--parent-hover g-transition--ease-in-out"
                      src="https://www.animals.or.kr/api/files/images/65243-a397d935-3beb-4208-8610-11105f4cccd2.jpeg"></img>
                  </a>
                </div>
                <h5 className="font-weight-bold g-font-size-16">용자</h5>
              </div>
              <div class="col-md-3 g-mb-30 g-pr-5--lg">
                <div className="u-block-hover text-center g-parent g-md-10">
                  <a href="" target="_self">
                    <img className="img-fluid g-transform-scale-1_1--parent-hover g-transition--ease-in-out"
                      src="https://www.animals.or.kr/api/files/images/65256-5088d039-c339-422c-bfa5-efe56ff1d5dd.jpeg"></img>
                  </a>
                </div>
                <h5 className="font-weight-bold g-font-size-16">수코</h5>
              </div>
              <div class="col-md-3 g-mb-30 g-pr-5--lg">
                <div className="u-block-hover text-center g-parent g-md-10">
                  <a href="" target="_self">
                    <img className="img-fluid g-transform-scale-1_1--parent-hover g-transition--ease-in-out"
                      src="https://www.animals.or.kr/api/files/images/62522-a36d74b7-ff5f-42e3-bca0-d4c68ffcc433.jpeg"></img>
                  </a>
                </div>
                <h5 className="font-weight-bold g-font-size-16">여비</h5>
              </div>
              <div class="col-md-3 g-mb-30 g-pr-5--lg">
                <div className="u-block-hover text-center g-parent g-md-10">
                  <a href="" target="_self">
                    <img className="img-fluid g-transform-scale-1_1--parent-hover g-transition--ease-in-out"
                      src="https://www.animals.or.kr/api/files/images/65228-351e5f1b-7d89-4e4b-a8c5-1cd1c06497d6.jpeg"></img>
                  </a>
                </div>
                <h5 className="font-weight-bold g-font-size-16">퍼지</h5>
              </div>
            </div>
          </div>
        </section>



        {/* FAQ */}
        <hr class="g-brd-secondary-light-v1 my-0"></hr><br />
        <ul>
          <div>
            <h2>FAQ</h2><br />
          </div>
        </ul>

        <ul>
          <div>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header> 1. 한 마리에게 여러 명의 입양 희망자가 생길 경우 어떻게 하나요? </Accordion.Header>
                <Accordion.Body>
                  <strong>센터 관리자들이 회의를 거쳐 선정하게 됩니다. </strong> 선택이 안 되더라도 양해해 주시기 바랍니다.
              </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>2. 입양을 진행하면서 필요한 필수 용품은 뭐가 있나요?</Accordion.Header>
                <Accordion.Body>
                  <strong>안전문, 방묘창, 리드줄, 하네스, 사료, 식기, 패드 등등. </strong>
                필요 물품들을 준비하여 편안한 가정환경을 만들어주시기 바랍니다.
              </Accordion.Body>
              </Accordion.Item>
            </Accordion><br />
            <h6> 입양 후 파양은 불가합니다. 가족 구성원 모두가 신중하게 생각하시고 입양을 결정해주세요.</h6>
          </div><br />
        </ul>


        {/* footer */}
        <hr class="g-brd-secondary-light-v1 my-0"></hr>

        <ul>
          <div>
            <h2>풋터</h2>
          </div>
        </ul>

      </div>
    </>

  );
}

export default MainPage;