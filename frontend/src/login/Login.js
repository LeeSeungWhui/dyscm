import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image, Form } from 'react-bootstrap';
import * as AppConfig from '../common/config';
import * as Basic from '../common/basic';

const Login = () => {
  /* 1. 변수 및 state 선언------------------------------------------------------------------------------------------------------------------------------------------------*/
  const navigate = useNavigate();

  // 백엔드로 요청할 데이터를 상태로 선언
  const [dataState, setDataState] = useState(new Basic.AppMap
    // [key, { value, description, type }]
    ([
      ['ID_MEMBER',
        { value: "", description: "아이디를 입력해주세요.", type: "text" }],
      ['LOGIN_PWD',
        { value: "", description: "비밀번호를 입력해주세요.", type: "password" }],
      ['LOGIN_SAVE',
        { value: "false", description: "로그인 정보 기억하기", type: "checkbox" }]
    ]));

  /* 2. state간 연결------------------------------------------------------------------------------------------------------------------------------------------------*/
  /* 3. 함수 선언 ------------------------------------------------------------------------------------------------------------------------------------------------*/
  /* 4. 이벤트핸들러------------------------------------------------------------------------------------------------------------------------------------------------*/
  // Input에 입력시 데이터 상태 업데이트
  const handleInputChange = (event, key) => {
    const newValue = event.target.value;
    setDataState(dataState.set(key, { ...dataState.get(key), value: newValue }));
  };

  // 로그인 정보 저장 체크박스
  const handleCheckChange = (event, key) => {
    const newValue = event.target.value;
    setDataState(dataState.set(key, { ...dataState.get(key), value: newValue }));
  }

  const handleLoginButtonClick = async (event) => {
    event.preventDefault();
    if (!dataState["ID_MEMBER"].value || !dataState["LOGIN_PWD"].value) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    // 로그인 요청
    try {
      const result = await AppConfig.ajax('/dyscm/member/loginProc.do', 'POST', dataState.toJSON('value'))
      if (result.code === "SUCC") {
        navigate('/dyscm/main');
      } else {
        alert(result.msg);
      }
    } catch (error) {
      console.error(error);
      alert("문제가 발생하였습니다. 관리자에게 문의하세요.");
    }
  };

  const handleSignUpButtonClick = (event) => {
    navigate("/dyscm/member/signUp");
  }

  /* 5. 동적 컴포넌트------------------------------------------------------------------------------------------------------------------------------------------------*/
  /* 6. 화면 출력------------------------------------------------------------------------------------------------------------------------------------------------*/
  return (
    <Container fluid>
      <Row style={{ minHeight: '100vh' }}>
        <Col style={{ backgroundColor: `${AppConfig.APP_THEME_COLOR}` }} className="d-flex justify-content-center align-items-center flex-column" xs={6}>
          <Image src="/resource/images/login/guide-image-1.png" fluid />
          <b style={{ color: 'white', textAlign: 'center', fontSize: '20px' }}>간단하게 터치하여<br />원하는 제품을 주문할 수 있어요.</b>
        </Col>
        <Col className="d-flex justify-content-center align-items-center flex-column" xs={6}>
          <div style={{ width: '100%', maxWidth: '400px' }} className="d-flex flex-column align-items-start">
            <img style={{ width: '75px', marginBottom: '10px' }} src="/resource/images/logo/ic-daeyang.svg" alt="" />
            <img style={{ marginBottom: '20px' }} src="/resource/images/logo/ic-daeyang-word.svg" alt="" />
          </div>
          <Form style={{ width: '100%', maxWidth: '400px' }}>
            <Form.Group className="mb-3">
              <Basic.AppInput value={dataState.get("ID_MEMBER").value} placeholder={dataState.get("ID_MEMBER").description}
                type={dataState.get("ID_MEMBER").type} onChange={(event) => handleInputChange(event, "ID_MEMBER")} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Basic.AppInput value={dataState.get("LOGIN_PWD").value} placeholder={dataState.get("LOGIN_PWD").description}
                type={dataState.get("LOGIN_PWD").type} onChange={(event) => handleInputChange(event, "LOGIN_PWD")} />
            </Form.Group>
            <Basic.AppButton onClick={(event) => handleLoginButtonClick(event)}>
              로그인
            </Basic.AppButton>
            <Form.Group className="mb-3 d-flex justify-content-between" style={{ marginTop: '10px' }} >
              <Basic.AppCheck width="25px" height="25px" id="LOGIN_SAVE" label={<span style={{ marginLeft: '5px' }}>로그인 정보 기억하기</span>}
                onChange={(event) => handleCheckChange(event, "LOGIN_SAVE")} />
              <a href="#" className="text-black">아이디/비밀번호 찾기</a>
            </Form.Group>
            <p style={{ marginTop: '15px', position: 'relative', width: '100%', textAlign: 'center' }}>
              <span style={{ backgroundColor: 'white', fontSize: '14px', color: '#747474' }}>
                ─────── 거래처 등록이 필요하신가요? ───────
              </span>
            </p>
            <Basic.AppButton backgroundColor='white' borderColor={AppConfig.APP_THEME_COLOR}
              onClick={(event) => handleSignUpButtonClick(event)} style={{ color: AppConfig.APP_THEME_COLOR }}>거래처 회원가입</Basic.AppButton>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;