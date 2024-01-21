import React, { useState } from 'react';

import { useBizInfoContext } from '../common/BizInfoContext';
import * as AppConfig from '../common/config';
import Header, { HeaderHeight } from '../common/Header';
import * as Basic from '../common/basic'
import InputArea from '../common/InputArea';
import LeftSidebar from '../common/LeftSidebar';

const BoxOrder = () => {
    /* 1. 변수 및 state 선언------------------------------------------------------------------------------------------------------------------------------------------------*/
    const LocalFooterHeight = '100px';
    // 상자주문 사용할 dataset: 상태관리를 통해 값 변경시 바로 UI에 반영
    const [listItems, setListItems] = useState(new Basic.AppMap
        // [key, { title, value, visible, description, type, children, color='lightgrey' }]
        ([
            ['ITEM_INFO',
                { title: "제품정보", value: "", listVisible: true, inputVisible: false, description: "제품을 검색해주세요.", useBorder: false, type: "button" }],
            ['CD_ITEM',
                { title: "제품코드(상자코드)", value: "", listVisible: true, description: "", useBorder: false, useImage: false }],
            ['NM_ITEM',
                { title: "제품명", value: "", listVisible: true, inputVisible: true, description: "", useBorder: false, useImage: false }],
            ['GOL_TYPE',
                { title: "골유형", value: "", listVisible: true, description: "", useBorder: false, useImage: false }],
            ['GOL',
                { title: "골", value: "", listVisible: true, description: "", useBorder: false, useImage: false }],
            ['BOX_SIZE',
                { title: "상자규격(장*폭*고)", value: "", listVisible: true, description: "", useBorder: false, useImage: false }],
            ['NM_OUT_PARTNER',
                { title: "납품처", value: "", listVisible: true, description: "", useBorder: false, useImage: false }],
        ]));

    // 사이드바 클릭시 스크롤, 포커스에 사용할 ref 상태 선언
    const [scrollRefs, setScrollRefs] = useState({});
    const [focusRefs, setFocusRefs] = useState({});
    /* 2. state간 연결------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 3. 함수 선언 ------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 4. 이벤트핸들러------------------------------------------------------------------------------------------------------------------------------------------------*/
    const handleSignUpButtonClick = (event) => {

    };

    const handleListItemClick = () => {

    }

    /* 5. 동적 컴포넌트------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 6. 화면 출력------------------------------------------------------------------------------------------------------------------------------------------------*/

    return (
        <div className="d-flex flex-column vh-100" style={{ backgroundColor: 'white' }} > {/* 전체 배경 */}
            {/* Top에 헤더 표출 */}
            <Header leftContent={{ image: "/resource/images/icons/header/ic-history.svg", text: "상자 주문" }}
                useRightContent={true} style={{ border: '1px solid lightgrey' }} /> {/* Top에 헤더 표출 */}

            <div className="d-flex flex-fill" style={{ height: `calc(100vh - ${HeaderHeight} - ${LocalFooterHeight})` }}> {/* 높이를 동적으로 계산 */}
                <div className="d-flex flex-column" style={{ width: '486px' }}> {/* 사이드바 너비 고정 */}
                    <div className="flex-grow-1 overflow-auto" style={{ marginTop: '20px', marginBottom: '10px', backgroundColor: 'white' }}> {/* overflow-auto를 통해 스크롤 적용 */}
                        <LeftSidebar items={listItems} onItemClick={handleListItemClick} /> {/* LeftSidebar 클릭시 항목 이동을 위해 핸들러 연결 */}
                    </div>
                    <div className="mt-auto" style={{ height: LocalFooterHeight, backgroundColor: 'white' }}> {/* 하단 고정 영역 */}
                        <Basic.AppButton onClick={(event) => handleSignUpButtonClick(event)}
                            style={{ height: `${LocalFooterHeight}` }}>
                            회원가입 요청하기
                        </Basic.AppButton>
                    </div>
                </div>
                <div className="flex-grow-1 overflow-auto" style={{ marginBottom: '50px', backgroundColor: 'blue' }}> {/* overflow-auto를 통해 스크롤 적용 */}
                    <InputArea items={listItems} scrollRef={scrollRefs} focusRef={focusRefs} >
                        {/*renderInputField*/}
                    </InputArea>
                </div>
            </div>
        </div>
    )
}

export default BoxOrder; 