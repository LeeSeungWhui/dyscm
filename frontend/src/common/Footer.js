import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
/** @jsxImportSource @emotion/react */ // 인라인 css를 위해 반드시 필요
import { css } from '@emotion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useBizInfoContext } from './BizInfoContext';
import * as Basic from '../common/basic'

export const FooterHeight = '75px'
const Footer = (style) => {
    /* 1. 변수 및 state 선언------------------------------------------------------------------------------------------------------------------------------------------------*/
    // 이미지 경로는 프로젝트 구조에 맞게 조정해야 함
    const homeIcon = '/resource/images/icons/footer/ic-home.svg';
    const srcIcon = '/resource/images/icons/footer/ic-paper.svg';
    const boxIcon = '/resource/images/icons/footer/ic-box.svg';
    const listIcon = '/resource/images/icons/footer/ic-list.svg';
    const myIcon = '/resource/images/icons/footer/ic-my.svg';

    // 화면 이동에 사용
    const navigate = useNavigate();
    const currentComponent = useLocation().pathname;

    // 현재 품목 상태
    const { currentItem, headerLoadState } = useBizInfoContext();

    const handleNavigation = (path) => {
        console.log(path);
        navigate(path);
    };

    const footerStyleaa = css`

        ul {
            display: flex;
            padding: 14px 30px;
            justify-content: space-between;

            li {
                flex: 1;
                opacity: 0.3;
                &.active {
                    opacity: unset;
                }

                img, span {
                    margin: auto;
                    text-align: center;
                    display: block;
                }

                span {
                    margin-top: 5px;
                    font: 400 16px/normal var(--font);
                    color: #222222;
                }
            }
        }
    `;

    const footerStyle = {
        position: 'fixed', backgroundColor: 'white', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', height: FooterHeight, borderTop: '1px solid lightgrey'
    };
    /* 2. state간 연결------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 3. 함수 선언 ------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 4. 이벤트핸들러------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 5. 동적 컴포넌트------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 6. 화면 출력------------------------------------------------------------------------------------------------------------------------------------------------*/

    return (
        <Navbar expand="lg" style={{ ...footerStyle, ...style, display: 'flex', justifyContent: 'center' }}>
            {headerLoadState && <Basic.AppLoading style={{ flex: 0 }} />}
            {!headerLoadState && (
                <>
                    <Nav className="justify-content-center d-flex" style={{ flex: 1, opacity: currentComponent === '/dyscm/main' ? '1' : '0.4' }}>
                        <Nav.Item style={{ flex: 1 }}>
                            <Nav.Link onClick={() => handleNavigation('/dyscm/main')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={homeIcon} alt="홈" />
                                <span>홈</span>
                            </Nav.Link>
                        </Nav.Item>
                        {/* 나머지 네비게이션 아이템들도 이와 같은 방식으로 추가 */}
                    </Nav>
                    {currentItem() && (currentItem().CD_BOX_SRC_DIV === 'A' || currentItem().CD_BOX_SRC_DIV === 'S') &&
                        <Nav className="justify-content-center d-flex" style={{ flex: 1, opacity: currentComponent === '/dyscm/order/srcOrder' ? '1' : '0.4' }}>
                            <Nav.Item style={{ flex: 1 }}>
                                <Nav.Link href="#" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src={srcIcon} alt="원단주문" />
                                    <span>원단주문</span>
                                </Nav.Link>
                            </Nav.Item>
                            {/* 나머지 네비게이션 아이템들도 이와 같은 방식으로 추가 */}
                        </Nav>
                    }
                    {currentItem() && (currentItem().CD_BOX_SRC_DIV === 'A' || currentItem().CD_BOX_SRC_DIV === 'B') &&
                        <Nav className="justify-content-center d-flex" style={{ flex: 1, opacity: currentComponent === '/dyscm/order/boxOrder' ? '1' : '0.4' }}>
                            <Nav.Item style={{ flex: 1 }}>
                                <Nav.Link onClick={() => handleNavigation('/dyscm/order/boxOrder')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src={boxIcon} alt="상자주문" />
                                    <span>상자주문</span>
                                </Nav.Link>
                            </Nav.Item>
                            {/* 나머지 네비게이션 아이템들도 이와 같은 방식으로 추가 */}
                        </Nav>
                    }
                    <Nav className="justify-content-center d-flex" style={{ flex: 1, opacity: currentComponent === '/dyscm/orderHist' ? '1' : '0.4' }}>
                        <Nav.Item style={{ flex: 1 }}>
                            <Nav.Link href="#" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={listIcon} alt="주문이력" />
                                <span>주문이력</span>
                            </Nav.Link>
                        </Nav.Item>
                        {/* 나머지 네비게이션 아이템들도 이와 같은 방식으로 추가 */}
                    </Nav>
                    <Nav className="justify-content-center d-flex" style={{ flex: 1, opacity: currentComponent === '/dyscm/myPage' ? '1' : '0.3' }}>
                        <Nav.Item style={{ flex: 1 }}>
                            <Nav.Link href="#" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={myIcon} alt="마이페이지" />
                                <span>마이페이지</span>
                            </Nav.Link>
                        </Nav.Item>
                        {/* 나머지 네비게이션 아이템들도 이와 같은 방식으로 추가 */}
                    </Nav>
                </>
            )}
        </Navbar>
    );
};

export default Footer;
