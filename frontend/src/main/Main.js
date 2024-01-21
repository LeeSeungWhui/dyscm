import React from 'react';

import { useBizInfoContext } from '../common/BizInfoContext';
import * as AppConfig from '../common/config';
import Header, { HeaderHeight } from '../common/Header';
import Footer, { FooterHeight } from '../common/Footer';
import * as Basic from '../common/basic'

const Main = () => {
    /* 1. 변수 및 state 선언------------------------------------------------------------------------------------------------------------------------------------------------*/
    // 현재 품목 상태
    const { currentItem, headerLoadState } = useBizInfoContext();

    // 이미지 감쌀 div 스타일
    const orderItemStyle = {
        position: 'relative',
        textAlign: 'center',
        borderRadius: '14px',
        marginRight: '20px',
        padding: 0,
        height: '165px',
        overflow: 'hidden'
    };
    // 이미지 아래 문구 스타일
    const orderParagraphStyle = {
        position: 'absolute',
        bottom: 0,
        left: 0,
        color: 'white',
        fontWeight: 'bold',
        fontSize: '21px',
        width: '100%', // 컨테이너 너비에 맞춤
        padding: 4,
        margin: 0
    };

    /* 2. state간 연결------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 3. 함수 선언 ------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 4. 이벤트핸들러------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 5. 동적 컴포넌트------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 6. 화면 출력------------------------------------------------------------------------------------------------------------------------------------------------*/
    return (
        <div className="d-flex flex-column vh-100" style={{ backgroundColor: 'white' }} > {/* 전체 배경 */}
            {/* Top에 헤더 표출 */}
            <Header leftContent={{ image: "/resource/images/logo/header-logo.svg", imageStyle: 'left center/150px no-repeat', height: '60px', width: '150px' }}
                useRightContent={true} style={{ border: '1px solid lightgrey' }} /> {/* Top에 헤더 표출 */}

            {/* 가운데 영역에 메인 내용 */}
            <div className="d-flex flex-fill" style={{ height: `calc(100vh - ${HeaderHeight} - ${FooterHeight})` }}> {/* 높이를 동적으로 계산 */}

                {/* 58:42 비율의 첫 번째 섹션 */}
                <div style={{ flex: 3, overflow: 'auto', padding: '20px 30px 0', backgroundColor: 'white' }}>

                    {/* 이미지를 가로로 2개 띄우는 섹션 */}
                    <div style={{ display: 'flex' }}>
                        {headerLoadState && <Basic.AppLoading size='165px' style={{ flex: 1 }} />}
                        {!headerLoadState && (
                            <>
                                {currentItem() && (currentItem().CD_BOX_SRC_DIV === 'A' || currentItem().CD_BOX_SRC_DIV === 'S') && (
                                    <div style={orderItemStyle}>
                                        <a href="#">
                                            <img src="/resource/images/main/order-paper.png" alt="" />
                                            <p style={{ ...orderParagraphStyle, backgroundColor: AppConfig.APP_THEME_COLOR }}>원단주문</p>
                                        </a>
                                    </div>
                                )}

                                {currentItem() && (currentItem().CD_BOX_SRC_DIV === 'A' || currentItem().CD_BOX_SRC_DIV === 'B') && (
                                    <div style={orderItemStyle}>
                                        <a href="#">
                                            <img src="/resource/images/main/order-box.png" alt="" />
                                            <p style={{ ...orderParagraphStyle, backgroundColor: AppConfig.APP_SUB_COLOR }}>상자주문</p>
                                        </a>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* 이미지 아래의 리스트 */}
                    <div style={{ marginTop: '30px' }}>
                        <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#45474A' }}>주문 TOP 10</h2>
                    </div>
                </div>

                {/* 58:42 비율의 두 번째 섹션 */}
                <div style={{ flex: 2, overflow: 'auto', padding: '30px 0', backgroundColor: 'white' }}>
                    <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#45474A' }}>최근 주문 이력</h2>
                </div>
            </div>

            {/* Bottom에 푸터 표출 */}
            <Footer />
        </div >
    )
};

export default Main;