import React from 'react';

import * as AppConfig from '../config'

export function AppToggle({ type, height, width, backgroundColor, border, beforFontColor, afterFontColor, fontSize, fontWeight, style, name, checked, onChange, children }) {
    // 기본 스타일 설정
    const defaultStyle = {
        height: height || '40px',
        width: width || '150px',
        backgroundColor: checked ? backgroundColor || `${AppConfig.APP_THEME_COLOR}` : 'white',
        border: '2px solid',
        borderColor: checked ? 'transparent' : border || `${AppConfig.APP_THEME_COLOR}`,
        borderRadius: '10px',
        cursor: 'pointer',
        marginLeft: '5px',
    };

    // 부모 컴포넌트에서 전달된 style이 있는 경우 기본 스타일에 덮어씌움
    const combinedStyle = style ? { ...defaultStyle, ...style } : defaultStyle;

    // 입력 타입 설정 (체크박스 또는 라디오)
    const inputType = type === 'toggle-radio' ? 'radio' : 'checkbox';

    return (
        <div style={combinedStyle}>
            <label style={{
                justifyContent: 'center', alignItems: 'center', cursor: 'pointer', display: 'flex', width: '100%', height: '100%',
                color: checked ? afterFontColor || 'white' : beforFontColor || `${AppConfig.APP_THEME_COLOR}`,
                fontSize: fontSize || '16px', fontWeight: fontWeight || 'bold'
            }}>
                <input
                    type={inputType}
                    checked={checked}
                    name={name}
                    onChange={onChange}
                    style={{ display: 'none' }} // Hide the checkbox visually
                />
                {children}
            </label>
        </div>
    );
}