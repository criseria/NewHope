import React from "react";
import MapTest from "../components/MapTest";
import "./Intro.css";
import Footer from "../components/Footer";

function Intro() {
    return (
        <div className="project-intro">
            <ul>
                <li>
                    <h1>New Hope는</h1>
                    <h5>함께하는 행복, 나누는 기쁨 - New Hope를 소개합니다.</h5>
                </li>
                <li>
                    <video width="100%" height="100%" controls autoplay muted>
                        <source src="animalcare-pr.mp4" type="video/mp4" />
                    </video>
                </li>
                <li>
                    <h2>NH란</h2>
                    <br/>
                    <h5>'NH'란 'New Hope'의 줄임말로 동물과 사람 모두에게 새로운 희망을 주고자 하는 유기동물 보호센터입니다.</h5>
                    <h5>버려진 동물들에게 건강한 몸과 마음으로 새로운 삶을 누릴 수 있도록 노력합니다. </h5>
                    <h5>봉사를 통해 유기 동물은 아프고 키우기 힘들 거라는 사회의 인식을 개선하고, 입양을 장려하고자 하는 것에 목적을 담고 있습니다. </h5>
                </li>
                <li>
                    <h2>설립 목적</h2>
                    <br/>
                    <h5>매년 전국적으로 10만 마리 이상의 유기 동물들이 보호소로 구조되고 있습니다.</h5>
                    <h5>안타깝게도 이 중 절반 이상이 안락사되거나 자연사하고 있습니다.</h5>
                    <h5>봉사와 입양을 통해 반려동물에 대한 인식이 개선되면서 최종적으로 반려동물 유기 문제가 사라지기를 바랍니다.</h5>
                    <h5>동물과 사람 모두가 행복한 세상이 되면 좋겠습니다.</h5>
                    
                </li>

                <li>
                    <h2>찾아 오시는 길</h2>
                    <br/>
                    <MapTest></MapTest>
                </li>
                <br/>
                <li>
                    <h2>센터 정보</h2>
                    <table className="center-info-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>마포 센터</th>
                                <th>구로 센터</th>
                                <th>동대문 센터</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>주소</td>
                                <td>마포구 매봉산로 31 시너지움 지하 1층<br></br>
                                    (상암동,에스플렉스센터)</td>
                                <td>구로구 경인로 472<br></br>
                                    (구로동,전 서울반려동물교육센터)</td>
                                <td>동대문구 무학로 201, 1층</td>
                            </tr>
                            <tr>
                                <td>대중교통 <br></br>이용</td>
                                <td>6호선 디지털미디어시티역 2번출구<br></br>
                                    - 도보 약 20분 소요<br></br>
                                    - 2번 출구 건너편에서 버스(7016) →<br></br>
                                    에스플렉스센터 정류장 하차(약 5분 소요)<br></br>
                                </td>
                                <td>1호선 구일역 1번출구<br></br>
                                    - 1번출구 왼쪽 뒷길(철교 아래길)로 도보이동 (약 7분 소요)<br></br>
                                </td>
                                <td>6호선 안암역 3번 출구<br></br>
                                    - 도보 약 8분 소요<br></br>
                                </td>
                            </tr>
                            <tr>
                                <td>자가용 <br></br>이용</td>
                                <td>지하주차장 있음(시간당 3,000원)<br></br>
                                <span style={{ color: 'red' }}>* 주차요금이 지원되지 않습니다.</span>
                                </td>
                                <td>주차장 없음<br></br>
                                <span style={{ color: 'red' }}>* 대중교통 이용 바랍니다.</span>
                                </td>
                                <td>지상주차장 있음<br></br>
                                <span style={{ color: 'red' }}>* 자리가 협소하므로 가급적 대중교통 이용을 바랍니다.</span>
                                </td>
                            </tr>
                            <tr>
                                <td>문의 <br></br>연락처</td>
                                <td>02-2124-2839</td>
                                <td>02-2636-7645</td>
                                <td>02-921-2415</td>
                            </tr>
                        </tbody>
                    </table>
                </li>

                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </ul>
            <Footer/>
        </div>     
    );
}

export default Intro;