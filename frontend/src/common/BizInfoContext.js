import React, { createContext, useState, useContext, useEffect } from 'react';
import * as AppConfig from './config';
import * as Basic from './basic';

// 업체별 거래공장/품목 리스트를 각 화면에 공유할 컨텍스트
export const BizInfoContext = createContext();

export const BizInfoProvider = ({ children }) => {
    /* 1. 변수 및 state 선언------------------------------------------------------------------------------------------------------------------------------------------------*/
    // 거래공장리스트를 저장할 state
    const [bizListState, setBizListState] = useState([]);
    // [
    //      [0, {'CD_REG_BIZ_AREA': '1700', 'NM_REG_BIZ_AREA': '대양제지공업(주)달성', 'CD_COMPANY': '1000', 'SELECTED': true, 'type':'select', 
    //              itemList : [        
    //                              [0, {'CD_BOX_SRC_DIV':'A', 'NM_BOX_SRC_DIV':'전체', 'SELECTED':true}]
    //                              , ...
    //                         ]
    //            }
    //      ]
    //      , ... 
    // ]

    // 헤더 로딩 상태
    const [headerLoadState, setHeaderLoadState] = useState(false);

    /* 2. state간 연결------------------------------------------------------------------------------------------------------------------------------------------------*/
    // 선택 바뀔 시에 디비테이블 변경
    useEffect(() => {
        async function updateHeaderData() {
            if (bizListState.length > 0) { // 리스트가 비어있지 않은 경우에만 요청
                setHeaderLoadState(true);
                const CD_REG_BIZ_AREA = currentBiz().CD_REG_BIZ_AREA;
                const CD_COMPANY = currentBiz().CD_COMPANY;
                const CD_BOX_SRC_DIV = currentItem().CD_BOX_SRC_DIV;

                try {
                    const result = await AppConfig.ajax('/dyscm/common/updateHeaderDataProc.do', 'POST', {
                        CD_DFLT_REG_BIZ_AREA: CD_REG_BIZ_AREA,
                        CD_DFLT_COMPANY: CD_COMPANY,
                        CD_DFLT_ITEM: CD_BOX_SRC_DIV
                    });
                    setHeaderLoadState(false);
                    if (result.code != 'SUCC' && result.code != 'NONE') {
                        alert(result.msg);
                    }
                } catch (error) {
                    alert("문제가 발생하였습니다. 관리자에게 문의하세요.");
                }
            }
        }
        updateHeaderData();
    }, [bizListState]); // bizListState가 변경될 때마다 실행

    /* 3. 함수 선언 ------------------------------------------------------------------------------------------------------------------------------------------------*/
    function currentBiz() {
        return bizListState ? bizListState.find(item => item.SELECTED === true) : undefined;
    }

    function getItemList() {
        return currentBiz() ? currentBiz().itemList : undefined;
    }

    function setItemList(newItemList) {
        const newBizListState = bizListState.map(bizItem => {
            if (bizItem.CD_REG_BIZ_AREA === currentBiz().CD_REG_BIZ_AREA) {
                return {
                    ...bizItem,
                    itemList: newItemList
                };
            }
            return bizItem;
        });

        setBizListState(newBizListState); // 새로운 상태로 bizListState를 업데이트합니다.
    }

    function currentItem() {
        return currentBiz() ? currentBiz().itemList.find(item => item.SELECTED === true) : undefined;
    }
    /* 4. 이벤트핸들러------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 5. 동적 컴포넌트------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 6. 화면 출력------------------------------------------------------------------------------------------------------------------------------------------------*/
    return (
        <BizInfoContext.Provider value={{ bizListState, setBizListState, getItemList, setItemList, currentBiz, currentItem, headerLoadState, setHeaderLoadState }}>
            {children}
        </BizInfoContext.Provider>
    );
};

export const useBizInfoContext = () => useContext(BizInfoContext);

