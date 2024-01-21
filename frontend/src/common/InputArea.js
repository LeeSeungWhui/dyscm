import React from 'react';
import { InputContainer } from './container';

const InputArea = React.forwardRef(({ items, children, scrollRef, focusRef }, ref) => {
    // 화면에 보여줄 데이터 목록(visible true로 설정된 것만 보여줌)
    const visibleItems = Array.from(items).filter(([, value]) => value.inputVisible);

    return (
        <div>
            {visibleItems.map(([key, data], index) => (
                <div ref={scrollRef[key]} key={key}>
                    <InputContainer ref={scrollRef[key]} key={key} title={data.title} description={data.description}
                        currentRecord={index + 1} totalRecords={visibleItems.length}>
                        {children(key, data, focusRef[key])}
                    </InputContainer>
                </div>
            ))}
        </div>
    );
});

export default InputArea;
