import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import * as AppConfig from '../common/config';
import * as Basic from '../common/basic'
import * as Container from '../common/container'
import LeftSidebar from '../common/LeftSidebar';
import Header, { HeaderHeight } from '../common/Header';
import InputArea from '../common/InputArea';


const SignUp = () => {
    /* 1. 변수 및 state 선언------------------------------------------------------------------------------------------------------------------------------------------------*/
    const navigate = useNavigate();
    // 컴포넌트 크기 및 커스텀 placeholdr스타일
    const CheckboxHeight = '90px';
    const ButtonHeight = '100px';
    const LocalFooterHeight = CheckboxHeight + ButtonHeight;

    // 회원가입에 사용할 dataset: 상태관리를 통해 값 변경시 바로 UI에 반영
    const [listItems, setListItems] = useState(new Basic.AppMap
        // [key, { title, value, visible, description, type, color='lightgrey' }]
        ([
            ['CD_PARTNER',
                { title: "업체코드", value: "", listVisible: false, inputVisible: false }],
            ['NM_PARTNER',
                { title: "업체명", value: "", listVisible: true, inputVisible: false, description: "사업자등록번호를 검색해주세요.", type: "button" }],
            ['NO_COMPANY',
                { title: "업체명", value: "", listVisible: false, inputVisible: true, description: "사업자등록번호를 검색해주세요.", type: "button" }],
            ['CD_REG_BIZ_AREA_LIST',
                { title: "승인 요청 사업장코드", value: "", listVisible: false, inputVisible: false }],
            ['NM_REG_BIZ_AREA_LIST',
                { title: "승인 요청 사업장", value: "", listVisible: true, inputVisible: true, description: "승인 요청할 사업장을 선택해주세요.", type: "toggle-check" }],
            ['CD_DFLT_REG_BIZ_AREA',
                { title: "주 사업장코드", value: "", listVisible: false, inputVisible: false }],
            ['CD_DFLT_COMPANY',
                { title: "주 사업장 법인코드", value: "", listVisible: false, inputVisible: false }],
            ['NM_DFLT_REG_BIZ_AREA',
                { title: "주 사업장", value: "", listVisible: true, inputVisible: true, description: "주 사업장을 선택해주세요.", type: "select" }],
            ['ID_MEMBER',
                { title: "아이디", value: "", listVisible: true, inputVisible: true, description: "아이디를 입력해주세요.", type: "button" }],
            ['LOGIN_PWD',
                { title: "비밀번호", value: "", listVisible: true, inputVisible: true, description: "비밀번호를 입력해주세요.", type: "password" }],
            ['LOGIN_PWD_CHK',
                { title: "비밀번호 확인", value: "", listVisible: true, inputVisible: true, description: "비밀번호를 확인해주세요.", type: "password" }],
            ['NM_MEMBER',
                { title: "이름", value: "", listVisible: true, inputVisible: true, description: "이름을 입력해주세요.", type: "text" }],
            ['NO_PHONE',
                { title: "휴대폰", value: "", listVisible: true, inputVisible: true, description: "휴대폰번호를 입력해주세요.", type: "button" }],
            ['EMAIL',
                { title: "이메일", value: "", listVisible: true, inputVisible: true, description: "이메일주소를 입력해주세요.", type: "text" }],
            ['YN_ALL',
                { title: "전체 동의", value: "", listVisible: false, inputVisible: false, type: "checkbox" }],
            ['YN_TOU',
                { title: "(필수)이용약관", value: "", listVisible: false, inputVisible: false, type: "checkbox", description: "이용약관에 동의해주세요." }],
            ['YN_PRIVACY',
                { title: "(필수)개인정보", value: "", listVisible: false, inputVisible: false, type: "checkbox", description: "개인정보활용에 동의해주세요." }],
            ['YN_AD',
                { title: "(필수)광고성", value: "", listVisible: false, inputVisible: false, type: "checkbox", description: "광고성활용에 동의해주세요." }],
            ['YN_EMAIL_RCV',
                { title: "(선택)메일수신", value: "", listVisible: false, inputVisible: false, type: "checkbox" }],
            ['YN_SMS_RCV',
                { title: "(선택)SMS수신", value: "", listVisible: false, inputVisible: false, type: "checkbox" }]
        ]));

    // 각 항목별 백엔드 요청 결과 상태 [key, { requestd, isLoading, result }]
    const [apiResponses, setApiResponses] = useState(new Basic.AppMap
        ([
            ['NO_COMPANY', { url: "dyscm/member/signUp/searchPartnerProc.do", isLoading: false, result: null }],
            ['NM_REG_BIZ_AREA_LIST', { url: "dyscm/member/signUp/searchCompanyListProc.do", isLoading: false, result: null }],
            ['ID_MEMBER', { url: "dyscm/member/signUp/idCheckProc.do", isLoading: false, result: null }],
            ['SIGNUP', { url: "dyscm/member/signUp/signUpProc.do", isLoading: false, result: null }],
        ]));

    // 이용약관 체크박스 상태
    const [agreeCheckedState, setAgreeCheckedState] = useState({});

    // 업체명 박스 선택여부 상태
    const [partnerClicked, setPartnerClicked] = useState(false);

    // 승인요청사업장 토글 상태
    const [regBizAreaToggleState, setRegBizAreaToggleState] = useState({});

    // 사이드바 클릭시 스크롤, 포커스에 사용할 ref 상태 선언
    const [scrollRefs, setScrollRefs] = useState({});
    const [focusRefs, setFocusRefs] = useState({});

    /* 2. state간 연결------------------------------------------------------------------------------------------------------------------------------------------------*/
    // agreeCheckedState와 listItems 연결
    useEffect(() => {
        let newListItems = listItems;
        for (const key in agreeCheckedState) {
            if (agreeCheckedState.hasOwnProperty(key)) {
                newListItems = newListItems.set(key, { ...newListItems.get(key), value: agreeCheckedState[key] });
            }
        }
        setListItems(newListItems);
    }, [agreeCheckedState]);

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
    }, [listItems]);

    /* 3. 함수 선언 ------------------------------------------------------------------------------------------------------------------------------------------------*/

    // 백엔드 요청 함수, 상태가 업데이트 되기 전에 호출되므로 최신의 listItems를 인자로 받아야 함.
    const fetchBackendData = async (key, currentListItems) => {
        let currentApiResponses = new Basic.AppMap();
        if (apiResponses.get(key)) {
            currentApiResponses = apiResponses.set(key, { ...apiResponses.get(key), isLoading: true });
            try {
                const response = await fetch(`${AppConfig.API_ENDPOINT}/${apiResponses.get(key).url}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(currentListItems.toJSON('value')) // {key: value, ..} 형태의 json으로 변형하여 전송
                });
                const result = await response.json();
                currentApiResponses = currentApiResponses.set(key, { ...currentApiResponses.get(key), isLoading: false, result: result });
            } catch (error) {
                currentApiResponses = currentApiResponses.set(key, { ...currentApiResponses.get(key), isLoading: false, result: { 'msg': '정보 요청 중 오류가 발생했습니다.' } });
            }
            setApiResponses(currentApiResponses);
            return currentApiResponses;
        }
    };

    // key값을 가진 inputarea로 스크롤&포커스 하는 함수
    const scrollToAndFocus = (key) => {
        // 업체명<->사업자번호검색 간에 key 차이가 있으므로 맞춰줌
        const realKey = (key === 'NM_PARTNER' ? 'NO_COMPANY' : key);

        if (scrollRefs[realKey]?.current && typeof scrollRefs[realKey].current.scrollIntoView === 'function') {
            scrollRefs[realKey].current.scrollIntoView({ behavior: 'smooth' });
        }
        if (focusRefs[realKey]?.current && typeof focusRefs[realKey].current.focus === 'function') {
            focusRefs[realKey].current.focus();
        }
    }

    /* 4. 이벤트핸들러------------------------------------------------------------------------------------------------------------------------------------------------*/
    // LeftSidabar에서 클릭된 항목에 해당하는 InputContainer로 스크롤 로직
    const handleListItemClick = (key) => {
        scrollToAndFocus(key);
    };

    // 이용약관 체크 이벤트
    const handleAgreeCheckedChange = (event, checkKey) => {
        // 체크 상태 업데이트
        if (checkKey === 'YN_ALL') {
            // 모든 변경 사항을 저장할 임시 객체를 생성
            const newAgreeCheckedState = {};
            // checkboxItems를 순회하면서 임시 객체에 변경 사항을 저장
            listItems.forEach((value, key) => {
                if (key.startsWith("YN")) {
                    newAgreeCheckedState[key] = event.target.checked;
                }
            })
            // 상태 한 번에 업데이트
            setAgreeCheckedState(newAgreeCheckedState)
        } else {
            setAgreeCheckedState({ ...agreeCheckedState, [checkKey]: event.target.checked });
        }
    }

    // 버튼 클릭시 apiResponses에서 key값에 해당하는 요청 호출
    const handleButtonClick = (event, key) => {
        // 값 입력안할 시 alert띄우고 포커스 이동
        if (!listItems.get(key).value) {
            alert(listItems.get(key).description)
            scrollToAndFocus(key);
            return;
        }
        let valid = true;
        switch (key) {
            case 'NO_COMPANY':
                setPartnerClicked(false);
                fetchBackendData(key, listItems);
                break;
            case 'ID_MEMBER':
                const idPattern = /^[A-Za-z0-9]+$/;
                valid = idPattern.test(listItems.get(key).value)
                if (!valid) {
                    alert("아이디는 영문과 숫자만을 사용해주세요.");
                    setListItems(listItems.set('ID_MEMBER', {
                        ...listItems.get('ID_MEMBER'),
                        color: 'red'
                    }));
                    scrollToAndFocus(key);
                    return;
                }
                fetchBackendData(key, listItems).then((currentApiResponses) => {
                    if (currentApiResponses.get(key).result) {
                        alert(currentApiResponses.get(key).result.msg);
                        setListItems(listItems.set('ID_MEMBER', {
                            ...listItems.get('ID_MEMBER'),
                            color: `${currentApiResponses.get(key).result.data === 'VALID' ? AppConfig.APP_THEME_COLOR : 'red'}`
                        }));
                    }
                })
                break;
            case 'NO_PHONE':
                alert("인증 끝.");
                setListItems(listItems.set('NO_PHONE', {
                    ...listItems.get('NO_PHONE'),
                    color: valid ? AppConfig.APP_THEME_COLOR : 'red'
                }));
            default:
        }
    };

    // 업체명정보박스 선택시 이벤트
    const handlePartnerClicked = (event, key) => {
        const data = apiResponses.get(key).result.data;
        setPartnerClicked(true);
        // 데이터 업데이트
        const updatedListItems1 = listItems.set('NM_PARTNER', { ...listItems.get('NM_PARTNER'), value: data.NM_PARTNER, color: `${AppConfig.APP_THEME_COLOR}` });
        const updatedListItems2 = updatedListItems1.set('CD_PARTNER', { ...updatedListItems1.get('CD_PARTNER'), value: data.CD_PARTNER });
        // 상태 업데이트
        setListItems(updatedListItems2);

        // 승인 요청할 공장 목록 가져오기
        // 최신 상태의 listItems를 fetchBackendData 함수에 전달
        fetchBackendData('NM_REG_BIZ_AREA_LIST', updatedListItems2);
    };

    // 승인 요청 사업장 토글 이벤트
    const handleRegBizAreaToggleChange = (event, toggleKey) => {
        // 승인요청 사업장 체크박스
        const newRegBizAreaToggleState = regBizAreaToggleState;
        newRegBizAreaToggleState[toggleKey] = event.target.checked;
        setRegBizAreaToggleState(newRegBizAreaToggleState);

        //사업장코드 저장
        const cdRegBizAreaList = apiResponses.get("NM_REG_BIZ_AREA_LIST").result.data
            .filter(item => Object.keys(newRegBizAreaToggleState).includes(item.NM_DFLT_REG_BIZ_AREA))
            .map(item => item.CD_DFLT_REG_BIZ_AREA);

        //사업장명 저장
        var nmBizAreaList = "";
        Object.entries(newRegBizAreaToggleState).forEach(([index, value]) => {
            if (value) {
                nmBizAreaList += index + " / ";
            }
        });
        nmBizAreaList = nmBizAreaList.substring(0, nmBizAreaList.length - 3);

        // 데이터 업데이트
        const updatedListItems1 =
            listItems.set('NM_REG_BIZ_AREA_LIST', { ...listItems.get('NM_REG_BIZ_AREA_LIST'), value: nmBizAreaList, color: (nmBizAreaList ? `${AppConfig.APP_THEME_COLOR}` : 'lightgrey') });
        const updatedListItems2 =
            updatedListItems1.set('CD_REG_BIZ_AREA_LIST', { ...updatedListItems1.get('CD_REG_BIZ_AREA_LIST'), value: cdRegBizAreaList });
        // 상태 업데이트
        setListItems(updatedListItems2);
    }

    // Input에 입력 가능한 값 필터링, 아이디 입력시 따로 처리(중복 확인 해야하니깐)
    const handleInputChange = (event, key) => {
        const newValue = event.target.value;
        if (key === 'NO_COMPANY' || key === 'NO_PHONE') {
            // 숫자만 허용
            if (/^\d*$/.test(newValue)) {
                setListItems(listItems.set(key, { ...listItems.get(key), value: newValue }));
            }
        }
        else {
            // 다른 타입의 경우에는 일반적인 처리                
            setListItems(listItems.set(key, { ...listItems.get(key), value: newValue, color: (key === 'NM_MEMBER') ? AppConfig.APP_THEME_COLOR : 'lightgrey' }));
        }
    };

    // Input 포커스 잃을 때 이벤트 핸들러
    const handleInputLoseFocus = (event, key) => {
        const newValue = event.target.value;
        if (newValue.length === 0) return;
        let valid = false;
        switch (key) {
            case 'LOGIN_PWD':
                const pwPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~?!@#$%^&*_-]).{8,}$/;
                valid = pwPattern.test(newValue)
                if (!valid) {
                    // alert("비밀번호는 8자 이상, 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다.");
                    valid = true;
                }
                break;
            case 'LOGIN_PWD_CHK':
                valid = (listItems.get('LOGIN_PWD').value === newValue);
                if (!valid) {
                    alert("비밀번호가 일치하지 않습니다.");
                }
                break;
            case 'EMAIL':
                const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
                valid = emailPattern.test(newValue)
                if (!valid) {
                    alert("이메일 형식이 올바르지 않습니다.");
                }
                break;
            default:
                return;
        }
        setListItems(listItems.set(key, { ...listItems.get(key), color: (valid ? AppConfig.APP_THEME_COLOR : 'red') }));
    }

    // 주 사업장 선택 이벤트
    const handleSelectChange = (selectedOption) => {
        // 데이터 업데이트
        const updatedListItems1 = listItems.set('NM_DFLT_REG_BIZ_AREA', { ...listItems.get('NM_DFLT_REG_BIZ_AREA'), value: selectedOption.label, color: `${AppConfig.APP_THEME_COLOR}` });
        const updatedListItems2 = updatedListItems1.set('CD_DFLT_REG_BIZ_AREA', { ...updatedListItems1.get('CD_DFLT_REG_BIZ_AREA'), value: selectedOption.value });
        // 상태 업데이트
        setListItems(updatedListItems2);
    }

    // 회원가입버튼
    const handleSignUpButtonClick = (event) => {
        for (let [key, value] of listItems) {
            if (value.listVisible && (!value.value || value.color === 'red')) {
                alert(listItems.get(key).description)
                setListItems(listItems.set(key, { ...listItems.get(key), color: 'red' }));
                scrollToAndFocus(key);
                return;
            }
            if ((key === 'YN_TOU' || key === 'YN_PRIVACY' || key === 'YN_AD') &&
                !value.value) {
                alert(listItems.get(key).description)
                return;
            }
        }
        fetchBackendData('SIGNUP', listItems).then((currentApiResponses) => {
            if (currentApiResponses.get('SIGNUP').result) {
                alert(currentApiResponses.get('SIGNUP').result.msg);
                if (currentApiResponses.get('SIGNUP').result.code === 'SUCC') {
                    navigate('/dyscm/login');
                }
            }
        })
    }

    /* 5. 동적 컴포넌트------------------------------------------------------------------------------------------------------------------------------------------------*/
    // InputArea 내부에 각 항목 type별로 동적 컴포넌트 렌더링
    const renderInputField = (key, data, focusRef) => {
        // type에 따라서 각각 버튼, 콤보박스, 인풋박스(패스워드모드 별도)를 렌더링
        switch (data.type) {
            case 'button':
                return (
                    <div> {/* 기본 렌더링 */}
                        <Basic.AppInput ref={focusRef} value={data.value} maxLength={key === 'NO_COMPANY' ? 10 : undefined}
                            placeholder={data.description} onChange={(event) => handleInputChange(event, key)} />
                        <Basic.AppButton backgroundColor={'#404040'} onClick={(event) => handleButtonClick(event, key)} style={{ marginTop: '15px' }}>
                            {(key === 'NO_COMPANY') ? '검색' : (key === 'ID_MEMBER') ? '아이디 중복 확인' : (key === 'NO_PHONE') ? '인증번호 전송' : '버튼'}
                        </Basic.AppButton>

                        {/* 버튼 클릭하여 백엔드 요청 후 결과값이 있을 때 아래 렌더링 */}
                        {apiResponses.get(key) && (
                            <div>
                                {/* 로딩 중일 때만 로딩 중 표시 */}
                                {apiResponses.get(key).isLoading && <p>로딩 중...</p>}

                                {/* 요청 응답이 실패했을 때 띄우는 메시지 */}
                                {apiResponses.get(key).result && (apiResponses.get(key).result.code != 'SUCC') &&
                                    <Basic.AppInput value={apiResponses.get(key).result.msg} readOnly={true} style={{ fontWeight: 'bold', marginTop: '15px' }} />}

                                {/* 요청 응답 성공시 동작 */}
                                {apiResponses.get(key).result && apiResponses.get(key).result.code == 'SUCC' &&
                                    afterRequestAction(key)
                                }
                            </div>
                        )}
                    </div >
                );
            case 'toggle-check':
                return (
                    <div ref={focusRef}>
                        {apiResponses.get(key) && (
                            <div >
                                {!apiResponses.get(key).result &&
                                    <Basic.AppInput value='업체를 선택해주세요.' readOnly={true} style={{ fontWeight: 'bold', marginTop: '15px' }} />
                                }
                                {apiResponses.get(key).result && apiResponses.get(key).result.code == 'SUCC' &&
                                    afterRequestAction(key)
                                }
                            </div>)}
                    </div>
                );
            case 'text':
                return (
                    <Basic.AppInput ref={focusRef} value={data.value} placeholder={data.description}
                        onChange={(event) => handleInputChange(event, key)} onBlur={(event) => handleInputLoseFocus(event, key)} />
                );
            case 'password':
                return (
                    <Basic.AppInput ref={focusRef} type="password" value={data.value} placeholder={data.description}
                        onChange={(event) => handleInputChange(event, key)} onBlur={(event) => handleInputLoseFocus(event, key)} />
                );
            case 'select': // select타입이 하나뿐이므로 하드코딩...
                const bizAreaResponse = apiResponses.get('NM_REG_BIZ_AREA_LIST').result;
                let selectItems = new Basic.AppMap();

                if (bizAreaResponse && bizAreaResponse.code === 'SUCC') {
                    // 데이터에서 옵션 목록을 생성합니다.
                    // api요청에서 type이 toggle-check로 되어서 토글버튼이 생성되고,
                    // 토글버튼을 클릭하여 regBizAreaToggleState에 해당값이 true로 된것만 가져와서 목록으로 표출
                    bizAreaResponse.data.forEach(item => {
                        if (item.type === 'toggle-check' && regBizAreaToggleState[item.NM_DFLT_REG_BIZ_AREA]) {
                            selectItems = selectItems.set(item.NM_DFLT_REG_BIZ_AREA, { ...item, type: 'select' });
                        }
                    });
                }
                return (
                    <div>
                        <Container.SelectContainer ref={focusRef} placeholder='주 사업장을 선택해주세요.' defaultOption='승인 요청할 사업장을 선택해주세요.'
                            valueAttr='CD_DFLT_REG_BIZ_AREA' labelAttr='NM_DFLT_REG_BIZ_AREA' items={selectItems} onSelectChange={handleSelectChange} />
                    </div>
                )
            default:
                return null;
        }
    };

    // 사업자번호 검색 후 업체정보 보여줄 컴포넌트
    const PartnerInfoRow = ({ label, value }) => (
        <Row>
            <Col xs={4}>
                <strong style={{ fontSize: '15px', color: '#848C94' }}>{label}</strong>
            </Col>
            <Col>
                <dd style={{ textAlign: 'right', fontSize: '15px', color: '#848C94' }}>{value}</dd>
            </Col>
        </Row>
    );

    // 백엔드 요청 성공시 각 항목별로 수행할 동작
    const afterRequestAction = (key) => {
        const data = apiResponses.get(key).result.data;
        switch (key) {
            case 'NO_COMPANY': // 사업자 번호 조회시 업체정보박스 표출
                return (<div style={{
                    display: 'flex', flexDirection: 'column', padding: '20px', borderRadius: '6px',
                    border: '1px solid #E2E2E2', background: '#FFF', gap: '10px', marginTop: '15px',
                    maxWidth: '600px', border: '2px solid blue', border: partnerClicked ? '2px solid #17BE94' : 'none',
                    cursor: 'pointer' // 클릭 가능함을 나타내는 마우스 커서 스타일
                }} onClick={(event) => handlePartnerClicked(event, key)}>
                    <Row>
                        <Col>
                            <strong style={{ fontSize: '15px' }}>{apiResponses.get(key).result.data.NM_PARTNER}</strong>
                        </Col>
                    </Row>
                    <PartnerInfoRow label="주소" value={apiResponses.get(key).result.data.ADDR_KOR} />
                    <PartnerInfoRow label="대표" value={apiResponses.get(key).result.data.NM_CEO} />
                    <PartnerInfoRow label="사업자 번호" value={apiResponses.get(key).result.data.NO_COMPANY} />
                    <PartnerInfoRow label="전화번호" value={apiResponses.get(key).result.data.NO_TEL} />
                    <PartnerInfoRow label="팩스번호" value={apiResponses.get(key).result.data.NO_FAX} />
                </div>)
            case 'NM_REG_BIZ_AREA_LIST':
                const toggleData = Basic.AppMap.fromJsonArray(data);
                return (
                    <Container.ToggleContainer items={toggleData} toggleState={regBizAreaToggleState} onToggleChange={handleRegBizAreaToggleChange} useAttr='NM_DFLT_REG_BIZ_AREA' />
                )
            default:

        }
    }

    /* 6. 화면 출력------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* Header를 위에, LeftSidebar를 왼쪽에, 그리고 오른쪽에 각 입력항목들 렌더링 */
    return (
        <div className="d-flex flex-column vh-100" style={{ backgroundColor: `${AppConfig.APP_BACKGROUND_COLOR}` }} > {/* 전체 배경 */}
            {/* Top에 헤더 표출 */}
            <Header leftContent={{ image: "/resource/images/icons/header/ic-history.svg", text: "회원가입" }} useRightContent={false}
                style={{ border: '1px solid lightgrey' }} />
            <div className="d-flex flex-fill" style={{ height: `calc(100vh - (${HeaderHeight} + ${LocalFooterHeight})` }}> {/* 높이를 동적으로 계산 */}
                <div className="d-flex flex-column" style={{ width: '486px' }}> {/* 사이드바 너비 고정 */}
                    <div className="flex-grow-1 overflow-auto" style={{ marginBottom: '10px' }}> {/* overflow-auto를 통해 스크롤 적용 */}
                        <LeftSidebar items={listItems} onItemClick={handleListItemClick} /> {/* LeftSidebar 클릭시 항목 이동을 위해 핸들러 연결 */}
                    </div>
                    <div className="mt-auto" style={{ height: LocalFooterHeight, backgroundColor: 'white' }}> {/* 하단 고정 영역 */}
                        <div style={{ height: `${CheckboxHeight}`, paddingTop: '15px' }}> {/* 체크박스 컨트롤 목록 렌더링 */}
                            <Container.CheckboxContainer items={listItems} useAttr='title' checkedState={agreeCheckedState} onCheckedChange={handleAgreeCheckedChange} />
                        </div>
                        <Basic.AppButton onClick={(event) => handleSignUpButtonClick(event)}
                            style={{ height: `${ButtonHeight}` }}>
                            회원가입 요청하기
                        </Basic.AppButton>
                    </div>
                </div>
                <div className="flex-grow-1 overflow-auto" style={{ marginBottom: '50px' }}> {/* overflow-auto를 통해 스크롤 적용 */}
                    <InputArea items={listItems} scrollRef={scrollRefs} focusRef={focusRefs} >
                        {renderInputField}
                    </InputArea>
                </div>
            </div>
        </div>

    );
};

export default SignUp;