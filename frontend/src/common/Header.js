import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBizInfoContext } from './BizInfoContext';
import { Navbar, Nav, NavLink } from 'react-bootstrap';
import * as Container from './container';
import * as Basic from './basic';

export const HeaderHeight = '75px'
const HeaderComponent = ({ leftContent, useRightContent, style }) => {

    // 공통 모듈
    const navigate = useNavigate();
    const { bizListState, setBizListState, itemListState, setItemListState } = useBizInfoContext();

    // 뒤로가기 버튼
    const handleLeftNavClick = (e) => {
        e.preventDefault();
        navigate(-1); // 뒤로 가기
    };

    // 주 사업장 선택 이벤트
    const hadleBizSelectChange = (selectedOption) => {
        // 셀렉트 값 변경

        // // 데이터 업데이트
        // const updatedListItems1 = listItems.set('NM_DFLT_REG_BIZ_AREA', { ...listItems.get('NM_DFLT_REG_BIZ_AREA'), value: selectedOption.label, color: `${AppConfig.APP_THEME_COLOR}` });
        // const updatedListItems2 = updatedListItems1.set('CD_DFLT_REG_BIZ_AREA', { ...updatedListItems1.get('CD_DFLT_REG_BIZ_AREA'), value: selectedOption.value });
        // // 상태 업데이트
        // setListItems(updatedListItems2);
    }

    const renderLeftContent = () => {
        let content = [];

        if (leftContent) {
            if (leftContent) {
                content.push(
                    <NavLink href="#" key="topLeftContent" style={{
                        paddingLeft: '60px',
                        background: `url(${leftContent.image}) ${leftContent.imageStyle || 'left center/24px no-repeat'}`,
                        fontSize: '19px',
                        lineHeight: '115%',
                        width: leftContent.width,
                        height: leftContent.height,
                        letterSpacing: '-0.84px',
                        marginLeft: '-10px',
                        color: '#45474A',
                        fontWeight: 700
                    }} onClick={handleLeftNavClick}>
                        {leftContent.text}</NavLink>
                );
            }
        }

        return content;
    };
    const defaultStyle = { backgroundColor: 'white', paddingLeft: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: HeaderHeight };

    const renderRightContent = () => (
        <Nav className='ml-auto flex-row' style={{ alignItems: 'center' }}>
            <Container.SelectContainer width='250px' height='40px' placeholder='주 사업장' defaultOption='거래처 없음'
                valueAttr='CD_REG_BIZ_AREA' labelAttr='NM_REG_BIZ_AREA' items={bizListState} onSelectChange={hadleBizSelectChange}
                border='transparent' fontColor='black' />
            <Container.SelectContainer marginLeft='10px' width='130px' height='40px' placeholder='품목' defaultOption='없음'
                valueAttr='CD_BOX_SRC_DIV' labelAttr='NM_BOX_SRC_DIV' items={itemListState} onSelectChange={hadleBizSelectChange} />
            <NavLink href="#" style={{ marginLeft: '25px', marginRight: '10px' }}>
                <img src="/resource/images/icons/header/ic-bell.svg" alt="" />
            </NavLink>
            <NavLink href="#" style={{ marginRight: '10px' }}>
                <img src="/resource/images/icons/header/ic-cart.svg" alt="" />
            </NavLink>
            <NavLink href="#" style={{ marginRight: '10px' }}>
                <img src="/resource/images/icons/header/ic-profile.svg" alt="" />
            </NavLink>
        </Nav>
    );

    return (
        <Navbar expand="lg" style={{ ...defaultStyle, ...style }}>
            <Nav>
                {leftContent && renderLeftContent()}
            </Nav>
            {useRightContent && renderRightContent()}
        </Navbar>
    );
};

export default HeaderComponent;
