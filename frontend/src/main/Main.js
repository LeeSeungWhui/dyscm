import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

import * as AppConfig from '../common/config';
import * as Basic from '../common/basic'
import * as Container from '../common/container'
import Header, { HeaderHeight } from '../common/Header';
import Footer, { FooterHeight } from '../common/Footer';

const Main = () => {
    /* 1. 변수 및 state 선언------------------------------------------------------------------------------------------------------------------------------------------------*/

    return (
        <div className="d-flex flex-column vh-100" style={{ backgroundColor: 'white' }} > {/* 전체 배경 */}
            <Header leftContent={{ image: "/resource/images/logo/header-logo.svg", imageStyle: 'left center/150px no-repeat', height: '60px', width: '150px' }}
                useRightContent={true} style={{ border: '1px solid lightgrey' }} /> {/* Top에 헤더 표출 */}
            <div style={{ height: '100px' }}></div>
            <Footer />
        </div>
    )
};


export default Main;