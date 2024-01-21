import React from 'react';
/** @jsxImportSource @emotion/react */ // 인라인 css를 위해 반드시 필요
import { css } from '@emotion/react';

import * as AppConfig from '../config'
export const AppButton = React.forwardRef(({ backgroundColor, borderColor, style, onClick, children }, ref) => {
    /* 1. 변수 및 state 선언------------------------------------------------------------------------------------------------------------------------------------------------*/
    // 기본배경색
    const defaultBg = backgroundColor || AppConfig.APP_THEME_COLOR;
    // 호버배경색
    const hoverBg = AppConfig.lightenColor(defaultBg, 0.2);
    // 클릭배경색
    const activeBg = AppConfig.lightenColor(defaultBg, 0.4);

    // 테두리색
    const defaultBo = borderColor || 'transparent';
    const APP_BUTTON = css`
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    background-color: ${defaultBg}; // 기본 배경색, 없으면 부트스트랩 파란색 사용
    border: 1px solid ${defaultBo}; // 기본 테두리색, 없으면 투명 사용
    padding: 0.375rem 0.75rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:hover {
        background-color: ${hoverBg}; // 마우스 오버 시 배경색 어둡게
    }

    &:active {
        background-color: ${activeBg}; // 클릭 시 배경색 더 어둡게
    }
`;

    // 기본 스타일 설정
    const defaultStyle = {
        height: '55px',
        width: '100%',
        fontWeight: 'bold',
        fontSize: '20px',
        color: 'white'
    };

    // 부모 컴포넌트에서 전달된 style이 있는 경우 기본 스타일에 덮어씌움
    const combinedStyle = style ? { ...defaultStyle, ...style } : defaultStyle;

    /* 2. state간 연결------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 3. 함수 선언 ------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 4. 이벤트핸들러------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 5. 동적 컴포넌트------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 6. 화면 출력------------------------------------------------------------------------------------------------------------------------------------------------*/
    return (
        <button
            css={APP_BUTTON}
            style={combinedStyle}
            onClick={onClick}
            ref={ref}
        >
            {children}
        </button>
    );
});