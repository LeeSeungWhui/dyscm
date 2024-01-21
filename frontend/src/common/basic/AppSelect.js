import React from 'react';
import Select, { components } from 'react-select';
import * as AppConfig from '../config';

export const AppSelect = React.forwardRef(({ options, value, width, height, marginLeft, marginRight, border, borderColor, backgroundColor,
    fontSize, fontWeight, fontColor, innerMarginLeft, innerMarginRight, isSearchable,
    optionHeight, optionFontSize, optionFontColor, optionFontWeight,
    optionHoverFontColor, optionHoverBackgroundColor, defaultOption, onChange,
    controlStyles, singleValueStyles, valueContainerStyles, optionStyles, dropdownStyles, ...props }, ref) => {
    /* 1. 변수 및 state 선언------------------------------------------------------------------------------------------------------------------------------------------------*/
    const controlBorderColor = borderColor || AppConfig.APP_THEME_COLOR;
    const controlShadowCOlor = AppConfig.lightenColor(controlBorderColor, 0.7);
    // 드롭다운화살표 변경
    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <img src={`${process.env.PUBLIC_URL}/resource/images/icons/ic-arrow-bottom.svg`} alt="arrow" />
            </components.DropdownIndicator>
        );
    };
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
    // dropdownStyles
    const defaultDropdownStyles = {
        color: 'black',
        marginLeft: '0px',
        marginRight: '7px',
        padding: 0,
        ':hover': { color: 'black' },
        // 크기 조절을 위한 스타일
        width: '35px', // 예시 크기
        height: '35px', // 예시 크기
        // SVG 아이콘 크기를 조절하기 위한 스타일
        '& svg': {
            width: '100%',
            height: '100%'
        }
    }
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
            color: state.isDisabled ? 'lightgrey' : (state.isFocused ? optionHoverFontColor || 'white' : optionStyles ? optionStyles.color : defaultOptionStyles.color),
            pointerEvents: state.isDisabled ? 'none' : 'auto', // 비활성화된 옵션에 대한 클릭 이벤트 제거
            ':hover': state.isDisabled ? {} : {
                backgroundColor: state.isFocused ? optionHoverBackgroundColor || AppConfig.APP_THEME_COLOR : optionStyles ? optionStyles.backgroundColor : defaultOptionStyles.backgroundColor,
                color: state.isFocused ? optionHoverFontColor || 'white' : optionStyles ? optionStyles.color : defaultOptionStyles.color,
            }
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            ...defaultDropdownStyles,
            ...dropdownStyles
        }),
        indicatorSeparator: () => null
    };
    // 기본 메시지
    const optionsWithDefault = options && options.length > 0 ? options : [{ value: "", label: defaultOption }];
    /* 2. state간 연결------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 3. 함수 선언 ------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 4. 이벤트핸들러------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 5. 동적 컴포넌트------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 6. 화면 출력------------------------------------------------------------------------------------------------------------------------------------------------*/
    return <Select isSearchable={isSearchable || false} components={{ DropdownIndicator }} styles={customStyles} ref={ref} value={value} options={optionsWithDefault} {...props} onChange={(selectedOption) => onChange(selectedOption)} />;
});