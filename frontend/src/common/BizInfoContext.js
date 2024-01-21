import React, { createContext, useState, useContext } from 'react';
import * as Basic from './basic';

// 업체별 거래공장/품목 리스트를 각 화면에 공유할 컨텍스트
export const BizInfoContext = createContext();

export const BizInfoProvider = ({ children }) => {
    // 거래공장리스트를 저장할 AppMap state
    const [bizListState, setBizListState] = useState(new Basic.AppMap());
    // [['0', {'CD_REG_BIZ_AREA': '1700', 'NM_REG_BIZ_AREA': '대양제지공업(주)달성', 'SELECTED': true, 'type':'select'}]
    // , ... ]]

    // 품목리스트를 저장할 AppMap state
    const [itemListState, setItemListState] = useState(new Basic.AppMap());
    // [['0', {'CD_BOX_SRC_DIV': 'A', 'NM_BOX_SRC_DIV': '전체', 'SELECTED': true, 'type':'select'}]
    // , ... ]]

    function currentBiz() {
        return bizListState.find(value => value[1].SELECTED === true);
    }

    function currentItem() {
        return itemListState.find(value => value[1].SELECTED === true);
    }

    return (
        <BizInfoContext.Provider value={{ bizListState, setBizListState, itemListState, setItemListState, currentBiz, currentItem }}>
            {children}
        </BizInfoContext.Provider>
    );
};

export const useBizInfoContext = () => useContext(BizInfoContext);

