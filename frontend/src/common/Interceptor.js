import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useBizInfoContext } from './BizInfoContext';
import * as AppConfig from './config'

// 라우트 변경을 추적하는 컴포넌트
function Interceptor() {
    const location = useLocation();
    const { bizListState, setBizListState, itemListState, setItemListState } = useBizInfoContext();

    useEffect(() => {
        if (location.pathname != '/dyscm/member/signUp' && location.pathname != '/' && location.pathname != '/dyscm/login') {
            // 헤더 셀렉트 박스 생성
            makeHeaderData();
        }
        console.log("라우트가 변경되었습니다:", location.pathname);
    }, [location]);

    async function makeHeaderData() {
        try {
            const result = await AppConfig.ajax('/dyscm/common/makeHeaderDataProc.do', 'GET', undefined)
            if (result.code === "SUCC") {
                const newBizListState = result.data['bizList'];
                const newItemListState = result.data['itemList'];
                if (!arraysEqual(bizListState, newBizListState)) {
                    setBizListState(newBizListState);
                }
                if (!arraysEqual(itemListState, newItemListState)) {
                    setItemListState(newItemListState);
                }
            } else {
                alert(result.msg);
            }
        } catch (error) {
            console.error(error);
            alert("문제가 발생하였습니다. 관리자에게 문의하세요.");
        }
    }

    function arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }

    return null; // UI를 렌더링하지 않습니다.
}

export default Interceptor;