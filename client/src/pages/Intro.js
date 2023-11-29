import React from "react";
import MapTest from "../components/MapTest";

function Intro() {

    return (
        <div className="App">
            <br></br>
            <div className="title"></div>
            <div doz_type="inside" className="inside">
                <h3>NH란</h3>
                <p>'NH'란 'New Hope'의 줄임말로 동물과 사람 모두에게 새로운 희망을 주겠다는 의미입니다.</p>
                <br/>
                <h3>설립 목적</h3>
                <p>
                    매년 전국적으로 10만 마리 이상의 유기 동물들이 보호소로 구조되고 있습니다.
                    안타깝게도 이 중 절반 이상이 안락사되거나 자연사하고 있습니다.
                    가족을 찾아주고자 합니다.
                </p>
                <br></br>
                <h3>찾아 오시는 길</h3>
                <MapTest></MapTest>
            </div>
        </div>
    );
}

export default Intro;