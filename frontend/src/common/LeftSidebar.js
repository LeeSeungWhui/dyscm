import React from 'react';
import * as Basic from './basic'
import { ListGroup } from 'react-bootstrap';

const LeftSidebar = ({ items, onItemClick }) => {
  /* 1. 변수 및 state 선언------------------------------------------------------------------------------------------------------------------------------------------------*/
  const visibleItems = Array.from(items).filter(([, value]) => value.listVisible);

  /* 2. state간 연결------------------------------------------------------------------------------------------------------------------------------------------------*/
  /* 3. 함수 선언 ------------------------------------------------------------------------------------------------------------------------------------------------*/
  /* 4. 이벤트핸들러------------------------------------------------------------------------------------------------------------------------------------------------*/
  function handleListItemClick(key) {
    onItemClick(key);
  }

  /* 5. 동적 컴포넌트------------------------------------------------------------------------------------------------------------------------------------------------*/
  /* 6. 화면 출력------------------------------------------------------------------------------------------------------------------------------------------------*/
  return (
    <ListGroup as="ul" className="d-flex flex-column" >
      {visibleItems.map(([key, { title, value, description, type, useBorder = 'true', useImage = 'true', color = 'lightgrey' }]) => (
        <ListGroup.Item as="li" key={key} className="d-flex justify-content-between align-items-center" onClick={() => handleListItemClick(key)}
          style={{ height: useBorder ? '75px' : '45px', cursor: 'pointer', borderRadius: '0px', border: `${useBorder ? 'undefined' : 'transparent'}` }}>
          <div className="ms-2 me-auto">
            <div className="fw-bold">{title}</div>
          </div>
          <span style={{ fontSize: '14px', fontWeight: 'bold', color: color, display: 'inline-block', width: '60%', textAlign: 'right', marginRight: '10px' }}>
            {value ? (type === 'password' ? '•'.repeat(value.length) : value) : description}
          </span>
          {useImage &&
            <img src="/resource/images/icons/ic-anchor-process.svg" alt="" />}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default LeftSidebar;