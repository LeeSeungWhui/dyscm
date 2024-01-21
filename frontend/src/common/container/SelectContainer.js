import React, { useState } from 'react';

import { AppSelect } from '../basic/AppSelect';
import { AppMap } from '../basic/AppMap';

export function SelectContainer({ items, valueAttr, labelAttr, defaultOption, placeholder, onSelectChange, ...props }) {

    // type속성이 select인 것만 필터링
    let selectItems = [];
    if (items instanceof AppMap) {
        // AppMap 인스턴스인 경우
        selectItems = Array.from(items) // 또는 items.entries() 등
            .filter(([, value]) => value.type == 'select')
            .map(([key, value]) => ({ key, ...value }));
    } else if (Array.isArray(items)) {
        // 배열인 경우
        selectItems = items
            .filter(item => item.type == 'select')
            .map(item => ({ ...item }));
    }

    // valueAttr을 value로, labelAttr을 label로 가져와서 드롭다운 메뉴에 추가
    const optionItems = selectItems.map(item => ({
        value: item[valueAttr],
        label: item[labelAttr]
    }));

    // SELECTED 속성이 true인 항목을 찾아 초기 상태로 설정
    const defaultSelected = selectItems.find(item => item.SELECTED);

    const [selectState, setSelectState] = useState(defaultSelected ? {
        value: defaultSelected[valueAttr],
        label: defaultSelected[labelAttr]
    } : undefined);
    // 현재 값 설정
    const currentValue = selectState ? optionItems.find(item => item.value === selectState.value) : undefined;

    const handleOnChange = (selectedOption) => {
        // 셀렉트 값 변경
        setSelectState(selectedOption);
        onSelectChange(selectedOption);
    }

    return (
        <div>
            <AppSelect placeholder={placeholder} options={optionItems} defaultOption={defaultOption} onChange={handleOnChange} value={currentValue} {...props} />
        </div>
    )
}
