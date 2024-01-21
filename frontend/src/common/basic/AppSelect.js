import React from 'react';
import Select from 'react-select';

import * as AppConfig from '../config';

export const AppSelect = React.forwardRef(({ options, value, width, height, marginLeft, marginRight, border, borderColor, backgroundColor,
    fontSize, fontWeight, fontColor, innerMarginLeft, innerMarginRight,
    optionHeight, optionFontSize, optionFontColor, optionFontWeight,
    optionHoverFontColor, optionHoverBackgroundColor, defaultOption, onChange,
    controlStyles, singleValueStyles, valueContainerStyles, optionStyles, ...props }, ref) => {

    const controlBorderColor = borderColor || AppConfig.APP_THEME_COLOR;
    const controlShadowCOlor = AppConfig.lightenColor(controlBorderColor, 0.7);

    // 박스 스타일
    const defaultControlStyles = {
        width: width,
        height: height || '55px',
        marginLeft: marginLeft,
        marginRight: marginRight,
        border: border || `2px solid ${controlBorderColor}`,
        borderRadius: '6px',
        backgroundColor: backgroundColor || 'white',
        fontSize: fontSize || '16px',
        fontWeight: fontWeight || 'bold',
        display: 'flex',
        alignItems: 'center',
        ':hover': {
            border: border || `1px solid ${controlBorderColor}`,
            boxShadow: `0 0 0 0.2rem ${controlShadowCOlor}`
        },
        ':focus': {
            border: border || `1px solid ${controlBorderColor}`,
            boxShadow: `0 0 0 0.2rem ${controlShadowCOlor}`
        }
    };

    // 단일선택시 스타일
    const defaultSingleValueStyles = {
        color: fontColor || AppConfig.APP_THEME_COLOR,
    };

    // 박스내부 스타일
    const defaultValueContainerStyles = {
        marginLeft: innerMarginLeft || '20px',
        marginRight: innerMarginRight
        // 추가적인 스타일링 옵션
    };

    // option 스타일
    const defaultOptionStyles = {
        height: optionHeight || '55px',
        fontSize: optionFontSize || '16px',
        fontWeight: optionFontWeight || 'bold',
        color: optionFontColor || 'black',
        display: 'flex',
        alignItems: 'center',
        ':hover': {
            backgroundColor: optionHoverBackgroundColor || AppConfig.APP_THEME_COLOR,
            color: optionHoverFontColor || 'white',
        }
        // 추가적인 옵션 스타일링
    };

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            ...defaultControlStyles,
            ...controlStyles,
            border: state.menuIsOpen ? `1px solid ${controlBorderColor}` : controlStyles ? controlStyles.border : defaultControlStyles.border,
            boxShadow: state.menuIsOpen ? `0 0 0 0.2rem ${controlShadowCOlor}` : controlStyles ? controlStyles.boxShadow : defaultControlStyles.boxShadow,
        }),
        singleValue: (provided) => ({
            ...provided,
            ...defaultSingleValueStyles,
            ...singleValueStyles
        }),
        valueContainer: (provided) => ({
            ...provided,
            ...defaultValueContainerStyles,
            ...valueContainerStyles
        }),
        option: (provided, state) => ({
            ...provided,
            ...defaultOptionStyles,
            ...optionStyles,
            backgroundColor: state.isFocused ? optionHoverBackgroundColor || AppConfig.APP_THEME_COLOR : optionStyles ? optionStyles.backgroundColor : defaultOptionStyles.backgroundColor,
            color: state.isFocused ? optionHoverFontColor || 'white' : optionStyles ? optionStyles.color : defaultOptionStyles.color,
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
        })
    };
    // 기본 메시지
    const optionsWithDefault = options && options.length > 0 ? options : [{ value: "", label: defaultOption }];
    return <Select styles={customStyles} ref={ref} value={value} options={optionsWithDefault} {...props} onChange={(selectedOption) => onChange(selectedOption)} />;
});