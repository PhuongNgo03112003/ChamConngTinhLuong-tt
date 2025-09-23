import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';

import MainLayout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import EmployeeManagement from './pages/EmployeeManagement';
import Payroll from './pages/Payroll';
import LeaveRequest from './pages/LeaveRequest';

import './App.css';

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 8,
          fontSize: 14
        },
        algorithm: theme.defaultAlgorithm
      }}
    >
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/employees" element={<EmployeeManagement />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/leave-requests" element={<LeaveRequest />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;

