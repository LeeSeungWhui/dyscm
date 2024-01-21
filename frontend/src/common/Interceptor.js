import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useBizInfoContext } from './BizInfoContext';
import * as AppConfig from './config'

// 라우트 변경을 추적하는 컴포넌트
function Interceptor() {
    /* 1. 변수 및 state 선언------------------------------------------------------------------------------------------------------------------------------------------------*/
    const location = useLocation();
    const { bizListState, setBizListState, setHeaderLoadState } = useBizInfoContext();

    /* 2. state간 연결------------------------------------------------------------------------------------------------------------------------------------------------*/
    useEffect(() => {
        if (location.pathname != '/dyscm/member/signUp' && location.pathname != '/' && location.pathname != '/dyscm/login') {
            // 헤더 셀렉트 박스 생성
            makeHeaderData();
        }
        console.log("라우트가 변경되었습니다:", location.pathname);
    }, [location]);

    /* 3. 함수 선언 ------------------------------------------------------------------------------------------------------------------------------------------------*/
    async function makeHeaderData() {
        try {
            setHeaderLoadState(true);
            const result = await AppConfig.ajax('/dyscm/common/makeHeaderDataProc.do', 'GET', undefined)
            setHeaderLoadState(false);
            if (result.code === "SUCC") {
                const newBizListState = result.data;
                if (!arraysEqual(bizListState, newBizListState)) {
                    setBizListState(newBizListState);
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

    /* 4. 이벤트핸들러------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 5. 동적 컴포넌트------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 6. 화면 출력------------------------------------------------------------------------------------------------------------------------------------------------*/
    return null; // UI를 렌더링하지 않습니다.
}

export default Interceptor;