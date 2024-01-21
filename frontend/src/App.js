import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { BizInfoProvider } from './common/BizInfoContext';
import Interceptor from './common/Interceptor';
import Login from './login/Login';
import SignUp from './member/SignUp';
import Main from './main/Main';
import BoxOrder from './order/BoxOrder';

function App() {

  return (
    <BizInfoProvider>
      <Router>
        <Interceptor />
        <Routes>
          <Route path="/dyscm/login" element={<Login />} />
          <Route path="/dyscm/member/signUp" element={<SignUp />} />
          <Route path="/dyscm/main" element={<Main />} />
          <Route path="/dyscm/order/boxOrder" element={<BoxOrder />} />
          <Route path="/" element={<Navigate replace to="/dyscm/login" />} />
        </Routes>
      </Router>
    </BizInfoProvider>
  );
}

export default App;