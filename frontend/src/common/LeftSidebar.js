import React from 'react';
import * as Basic from './basic'
import { ListGroup } from 'react-bootstrap';

const LeftSidebar = ({ listItems, onItemClick, start = 0, end = 0 }) => {
  const itemsArray = Array.from(listItems);

  // 범위 계산
  // start와 end 둘 다 0이면 모든 아이템을 순회
  // start만 지정된 경우(end가 0인 경우), start부터 모든 아이템을 순회
  // start와 end 둘 다 지정된 경우, 해당 범위 내의 아이템만을 순회
  const startIndex = Math.max(start, 0);
  const endIndex = end > 0 ? Math.min(end, itemsArray.length) : itemsArray.length;

  // 필터링된 메뉴 아이템
  const filteredItems = itemsArray.slice(startIndex, endIndex);

  function handleListItemClick(key) {
    onItemClick(key);
  }

  return (
    <ListGroup as="ul" className="d-flex flex-column" >
      {filteredItems.map(([key, { title, value, listVisible, description, type, color = 'lightgrey' }]) => (
        listVisible && (
          <ListGroup.Item style={{ height: '75px', cursor: 'pointer', borderRadius: '0px' }} as="li" key={key} className="d-flex justify-content-between align-items-center" onClick={() => handleListItemClick(key)}>
            <div className="ms-2 me-auto">
              <div className="fw-bold">{title}</div>
            </div>
            <span style={{ fontSize: '14px', fontWeight: 'bold', color: color, display: 'inline-block', width: '60%', textAlign: 'right', marginRight: '10px' }}>
              {value ? (type === 'password' ? '•'.repeat(value.length) : value) : description}
            </span>
            <img src="/resource/images/icons/ic-anchor-process.svg" alt="" />
          </ListGroup.Item>
        )
      ))}
    </ListGroup>
  );
};

export default LeftSidebar;