import React from 'react';
import { Form } from 'react-bootstrap';
/** @jsxImportSource @emotion/react */ // 인라인 css를 위해 반드시 필요
import { Global, css } from '@emotion/react';

import * as AppConfig from '../config'

export const AppCheck = React.forwardRef(({ width, height, inline, id, label, checked, onChange, ...props }, ref) => {
    /* 1. 변수 및 state 선언------------------------------------------------------------------------------------------------------------------------------------------------*/
    // 커스텀 인라인 css
    const APP_CHECK = css`
    // 체크박스 크기 조절
    .form-check-input {
    width: ${width};   // 너비
    height: ${height};  // 높이
    }
    .form-check-label {
        // 레이블 세로 중앙 정렬
        display: inline-block;
        vertical-align: middle;
        line-height: ${height}; // 체크박스의 높이에 맞춰 조절
    }
    .form-check-input:focus {
    border-color: #2f995d !important;
    box-shadow: 0 0 0 0.2rem ${AppConfig.APP_SHADOW_COLOR};
    }
    .form-check-input:checked {
    background-color: ${AppConfig.APP_THEME_COLOR} !important; /* 체크박스 배경색 변경 */
    border-color: ${AppConfig.APP_THEME_COLOR} !important; /* 체크박스 테두리색 변경 */
    }
    `;
    /* 2. state간 연결------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 3. 함수 선언 ------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 4. 이벤트핸들러------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 5. 동적 컴포넌트------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 6. 화면 출력------------------------------------------------------------------------------------------------------------------------------------------------*/
    return (
        <div>
            <Global styles={APP_CHECK} />
            <Form.Check
                inline={inline}
                label={label}
                type="checkbox"
                id={id}
                htmlFor={id}
                checked={checked}
                onChange={onChange}
                {...props}
            />
        </div>
    )
});