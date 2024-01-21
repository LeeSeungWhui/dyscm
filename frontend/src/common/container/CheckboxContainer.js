import React from 'react';
import { Form } from 'react-bootstrap';

import * as Basic from '../basic'

export function CheckboxContainer({ items, checkedState, useAttr, onCheckedChange }) {

    // type속성이 checkbox인 것만 필터링
    const checkboxItems = Array.from(items)
        .filter(([, value]) => value.type == 'checkbox')
        .map(([key, value]) => ({ key, ...value }));

    return (
        <div> {/* 체크박스 컨트롤 목록 렌더링 */}
            {checkboxItems.map((item, index) => (
                <div key={index} className="d-inline-block" style={{ marginLeft: '15px', marginBottom: '10px' }}> {/*div로 감싸고 marginBottom을 줘서 줄간격 설정 */}
                    <Basic.AppCheck
                        inline
                        label={<span style={{ fontWeight: 'bold' }}>{item[useAttr]}</span>}
                        id={`checkbox-${item.key}`}
                        checked={checkedState[item.key] || false}
                        onChange={(event) => onCheckedChange(event, item.key)} />
                </div>
            ))}
        </div>
    );
}
