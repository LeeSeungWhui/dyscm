import React from 'react';
/** @jsxImportSource @emotion/react */ // 인라인 css를 위해 반드시 필요
import { css } from '@emotion/react';

import * as AppConfig from '../config';
import { AppToggle } from '../basic/AppToggle';

export function ToggleContainer({ items, toggleState, useAttr, onToggleChange }) {
    /* 1. 변수 및 state 선언------------------------------------------------------------------------------------------------------------------------------------------------*/
    // 커스텀 인라인 css
    const APP_CHECK = css`
.form-check-input:focus {
  border-color: #2f995d !important;
  box-shadow: 0 0 0 0.2rem ${AppConfig.APP_SHADOW_COLOR};
}
.form-check-input:checked {
  background-color: ${AppConfig.APP_THEME_COLOR} !important; /* 체크박스 배경색 변경 */
  border-color: ${AppConfig.APP_THEME_COLOR} !important; /* 체크박스 테두리색 변경 */
}
`;
    // type속성이 toggle로 시작하는 것만 필터링
    const toggleItems = Array.from(items)
        .filter(([, value]) => value.type && value.type.startsWith("toggle"))
        .map(([key, value]) => ({ key, ...value }));

    /* 2. state간 연결------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 3. 함수 선언 ------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 4. 이벤트핸들러------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 5. 동적 컴포넌트------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* 6. 화면 출력------------------------------------------------------------------------------------------------------------------------------------------------*/
    return (
        <div> {/* 체크박스 컨트롤 목록 렌더링 */}
            {toggleItems.map((item, index) => (
                <div key={index} className="d-inline-block" style={{ marginBottom: '10px' }}> {/*div로 감싸고 marginBottom을 줘서 줄간격 설정 */}
                    <AppToggle type={item.type} name={useAttr} checked={toggleState[item[useAttr]] || false} onChange={(event) => onToggleChange(event, item[useAttr])}>
                        {item[useAttr]}
                    </AppToggle>
                </div>
            ))}
        </div>
    );
}
