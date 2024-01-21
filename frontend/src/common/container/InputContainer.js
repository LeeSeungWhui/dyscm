import React, { forwardRef, useRef, useImperativeHandle } from 'react';

export const InputContainer = React.forwardRef(({ urrentRecord, totalRecords, title, description, children, ...props }, ref) => {

    return (
        <div style={{ padding: '30px 30px 0', margin: '15px 0 15px 0' }}>
            {/* 레코드 표시 span */}
            {/*<span style={{ fontSize: '21px' }}>{currentRecord} / {totalRecords}</span>*/}
            <h2 style={{ fontSize: '23px', fontWeight: 'bold', marginTop: '20px', color: '#45474A' }}>{title}</h2>
            <p style={{ fontSize: '17px', marginTop: '10px', color: '#45474A' }}>{description}</p>
            {/* 다른 컴포넌트를 넣을 수 있는 공간 */}
            {children}
        </div>
    );
});
