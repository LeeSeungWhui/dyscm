import React, { useState } from 'react';

import { useBizInfoContext } from '../common/BizInfoContext';
import * as AppConfig from '../common/config';
import Header, { HeaderHeight } from '../common/Header';
import * as Basic from '../common/basic'
import InputArea from '../common/InputArea';
import LeftSidebar from '../common/LeftSidebar';
import { boxOrderData } from '../common/InitDataSet';

const BoxOrder = () => {
    /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ 
    1. 변수 및 state 선언
    -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    const LocalFooterHeight = '100px';
    // 상자주문 사용할 dataset: 상태관리를 통해 값 변경시 바로 UI에 반영
    // [key, { title, value, visible, description, type, useBorder, useImage, color='lightgrey' }]
    const [dataState, setDataState] = useState(Basic.AppMap.fromArray(boxOrderData));

    // 사이드바 클릭시 스크롤, 포커스에 사용할 ref 상태 선언
    const [scrollRefs, setScrollRefs] = useState({});
    const [focusRefs, setFocusRefs] = useState({});

    /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ 
    2. state간 연결
    -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    // leftsidebar key와 inputcontainer key를 연결하는 참조배열 생성
    useEffect(() => {
        const visibleItems = Array.from(listItems).filter(([, value]) => value.inputVisible);
        const nextScrollRefs = { ...scrollRefs };
        const nextFocusRefs = { ...focusRefs };

        visibleItems.forEach(([key, _]) => {
            const realKey = (key === 'NM_PARTNER' ? 'NO_COMPANY' : key);
            if (!nextScrollRefs[realKey]) {
                nextScrollRefs[realKey] = React.createRef();
            }
            if (!nextFocusRefs[realKey]) {
                nextFocusRefs[realKey] = React.createRef();
            }
        });

        setScrollRefs(nextScrollRefs);
        setFocusRefs(nextFocusRefs);
    }, [dataState]);
    /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ 
    3. 함수 선언
    -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

    /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ 
    4. 이벤트 핸들러
    -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    const handleSignUpButtonClick = (event) => {

    };

    const handleDataStateClick = () => {

    }

    /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ 
    5. 동적 컴포넌트
    -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    const renderInputField = (key, data, focusRef) => {
        // type에 따라서 각각 버튼, 콤보박스, 인풋박스(패스워드모드 별도)를 렌더링
        switch (data.type) {
            case 'button':
                return (
                    <div></div>
                );
        }
    };

    /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ 
    6. 화면 출력
    -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    return (
        <div className="d-flex flex-column vh-100" style={{ backgroundColor: 'white' }} > {/* 전체 배경 */}
            {/* Top에 헤더 표출 */}
            <Header leftContent={{ image: "/resource/images/icons/header/ic-history.svg", text: "상자 주문" }}
                useRightContent={true} style={{ border: '1px solid lightgrey' }} /> {/* Top에 헤더 표출 */}

            <div className="d-flex flex-fill" style={{ height: `calc(100vh - ${HeaderHeight} - ${LocalFooterHeight})` }}> {/* 높이를 동적으로 계산 */}
                <div className="d-flex flex-column" style={{ width: '486px' }}> {/* 사이드바 너비 고정 */}
                    <div className="flex-grow-1 overflow-auto" style={{ marginBottom: '10px', backgroundColor: 'white' }}> {/* overflow-auto를 통해 스크롤 적용 */}
                        <LeftSidebar items={dataState} onItemClick={handleDataStateClick} /> {/* LeftSidebar 클릭시 항목 이동을 위해 핸들러 연결 */}
                    </div>
                    <div className="d-flex flex-row" style={{ height: LocalFooterHeight, backgroundColor: 'white' }}> {/* 하단 고정 영역 */}
                        <Basic.AppButton onClick={(event) => handleSignUpButtonClick(event)}
                            style={{ height: `${LocalFooterHeight}`, border: `1px solid ${AppConfig.APP_THEME_COLOR}`, backgroundColor: 'white', color: 'black' }}>
                            바로 주문하기
                        </Basic.AppButton>
                        <Basic.AppButton onClick={(event) => handleSignUpButtonClick(event)}
                            style={{ height: `${LocalFooterHeight}` }}>
                            장바구니 담기
                        </Basic.AppButton>
                    </div>
                </div>
                <div className="flex-grow-1 overflow-auto" style={{ marginBottom: '50px', backgroundColor: 'white' }}> {/* overflow-auto를 통해 스크롤 적용 */}
                    <InputArea items={dataState} scrollRef={scrollRefs} focusRef={focusRefs} >
                        {renderInputField}
                    </InputArea>
                </div>
            </div>
        </div >
    )
}

export default BoxOrder; 