import React from 'react';
import { Form } from 'react-bootstrap';
/** @jsxImportSource @emotion/react */ // 인라인 css를 위해 반드시 필요
import { css } from '@emotion/react';

import * as AppConfig from '../config'

export const AppInput = React.forwardRef(({ value, type, placeholder, maxLength, caretColor, readOnly, style, onChange, ...props }, ref) => {

    const APP_INPUT = css`
    & {
    caret-color: ${readOnly ? 'transparent' : 'auto'};
    }
    &:focus {
    border-color: ${readOnly ? 'lightgrey' : AppConfig.APP_THEME_COLOR};
    box-shadow: ${readOnly ? 'none' : `0 0 0 0.2rem ${AppConfig.APP_SHADOW_COLOR}`};
    }
    ::placeholder { color: lightgrey;}
    `;

    // 기본 스타일 설정
    const defaultStyle = {
        height: '55px',
        paddingLeft: '30px',
    };

    // 부모 컴포넌트에서 전달된 style이 있는 경우 기본 스타일에 덮어씌움
    const combinedStyle = style ? { ...defaultStyle, ...style } : defaultStyle;

    return (
        <Form.Control
            {...props}
            type={type || 'text'}
            value={value}
            maxLength={maxLength}
            placeholder={placeholder || '기본 텍스트를 입력하세요'}
            css={APP_INPUT}
            style={combinedStyle}
            onChange={onChange}
            readOnly={readOnly}
            ref={ref}
        />
    );
});
