import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useBizInfoContext } from './BizInfoContext';
import { Navbar, Nav, NavLink } from 'react-bootstrap';
import * as Basic from './basic';

export const HeaderHeight = '75px'
const HeaderComponent = ({ leftContent, useRightContent, style }) => {
    /* 1. 변수 및 state 선언------------------------------------------------------------------------------------------------------------------------------------------------*/

    // 공통 모듈
    const navigate = useNavigate();
    const { bizListState, setBizListState, getItemList, setItemList, currentBiz, currentItem, headerLoadState } = useBizInfoContext();

    //네비게이션 바 기본 스타일
    const defaultStyle = { backgroundColor: 'white', paddingLeft: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: HeaderHeight };

    // 현재 화면이 상자 발주 화면인지 확인
    const isBoxOrderPage = useLocation().pathname === '/dyscm/order/boxOrder';
    // 현재 화면이 원단 발주 화면인지 확인
    const isSrcOrderPage = useLocation().pathname === '/dyscm/order/srcOrder';

    /* 2. state간 연결------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 3. 함수 선언 ------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 4. 이벤트핸들러------------------------------------------------------------------------------------------------------------------------------------------------*/
    // 뒤로가기 버튼
    const handleLeftNavClick = (e) => {
        e.preventDefault();
        navigate(-1); // 뒤로 가기
    };

    // 주 사업장 선택 이벤트
    const hadleBizSelectChange = (selectedOption) => {
        // 새로운 상태 계산
        const newBizListState = bizListState.map(bizItem => {
            // 현재 사업장의 품목 리스트를 업데이트
            let updatedItemList = bizItem.itemList.map(itemItem => ({
                ...itemItem,
                SELECTED: itemItem.CD_BOX_SRC_DIV === currentItem().CD_BOX_SRC_DIV
            }));
            // 현재 사업장의 품목 중에서 SELECTED가 true인 항목이 없으면 첫 번째 항목을 true로 설정
            if (!updatedItemList.some(item => item.SELECTED) && updatedItemList.length > 0) {
                updatedItemList[0].SELECTED = true;
            }
            // 사업장 항목을 업데이트
            return {
                ...bizItem,
                SELECTED: bizItem.CD_REG_BIZ_AREA === selectedOption.CD_REG_BIZ_AREA,
                itemList: updatedItemList
            };
        });
        // 상태 업데이트
        setBizListState(newBizListState);
    }

    // 주 품목 선택 이벤트
    const hadleItemSelectChange = (selectedOption) => {
        const updatedItemList = getItemList().map(item => ({
            ...item,
            SELECTED: item.CD_BOX_SRC_DIV === selectedOption.CD_BOX_SRC_DIV
        }));

        setItemList(updatedItemList);
    }

    /* 5. 동적 컴포넌트------------------------------------------------------------------------------------------------------------------------------------------------*/
    // 좌측 상단 컴포넌트
    const renderLeftContent = () => {
        let content = [];

        if (leftContent) {
            if (leftContent) {
                content.push(
                    <NavLink href="#" key="topLeftContent" style={{
                        paddingLeft: '50px',
                        background: `url(${leftContent.image}) ${leftContent.imageStyle || 'left center/40px no-repeat'}`,
                        fontSize: '22px',
                        lineHeight: '110%',
                        width: leftContent.width,
                        height: leftContent.height,
                        letterSpacing: '-0.84px',
                        color: '#45474A',
                        fontWeight: 'bold'
                    }} onClick={handleLeftNavClick}>
                        {leftContent.text}</NavLink>
                );
            }
        }

        return content;
    };

    // 우측 상단 컴포넌트
    const renderRightContent = () => (
        <Nav className='ml-auto flex-row' style={{ alignItems: 'center' }}>
            {headerLoadState && <Basic.AppLoading style={{ marginRight: '250px' }} />}
            {!headerLoadState && (
                <>
                    <Basic.AppLabel text={'사업장'} />
                    {/* 사업장 선택 박스*/}
                    {renderBizSelect()}
                    {/* 품목 선택 박스*/}
                    {renderItemSelect()}
                </>
            )}
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

    // 사업장 선택 박스 렌더링 함수
    const renderBizSelect = () => {
        // 특정 페이지일 때 특정 옵션만 비활성화
        const modifiedOptions = bizListState.map(option => ({
            ...option,
            isDisabled: (isBoxOrderPage && !option.itemList.some(item => item.CD_BOX_SRC_DIV === 'A' || item.CD_BOX_SRC_DIV === 'B')) ||
                (isSrcOrderPage && !option.itemList.some(item => item.CD_BOX_SRC_DIV === 'A' || item.CD_BOX_SRC_DIV === 'S'))
        }));

        // 비활성된 옵션을 적용하여 선택 박스 렌더링
        return (
            <Basic.AppSelect width='250px' height='40px' placeholder='주 사업장' defaultOption='거래처 없음'
                options={modifiedOptions} getOptionValue={(option) => option.CD_REG_BIZ_AREA} getOptionLabel={(option) => option.NM_REG_BIZ_AREA}
                value={currentBiz()} onChange={hadleBizSelectChange}
                border='transparent' borderColor='transparent' fontColor='black' fontSize='19px' innerMarginLeft='0px' innerMarginRight='0px'
            />
        );
    };

    // 품목 선택 박스 렌더링 함수
    const renderItemSelect = () => {
        // 특정 페이지일 때 특정 옵션만 비활성화
        const modifiedOptions = getItemList() && getItemList().map(option => ({
            ...option,
            isDisabled: (isBoxOrderPage || isSrcOrderPage)
        }));

        // 비활성된 옵션을 적용하여 선택 박스 렌더링
        return (<Basic.AppSelect marginLeft='20px' width='110px' height='40px' placeholder='품목' defaultOption='없음'
            options={modifiedOptions} getOptionValue={(option) => option.CD_BOX_SRC_DIV} getOptionLabel={(option) => option.NM_BOX_SRC_DIV}
            value={currentItem()} onChange={hadleItemSelectChange}
            border='transparent' borderColor='transparent' fontColor='black' fontSize='19px' innerMarginLeft='0px' innerMarginRight='0px'
        />
        );
    };

    /* 6. 화면 출력------------------------------------------------------------------------------------------------------------------------------------------------*/
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
