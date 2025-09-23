import React, { useState, useEffect } from 'react';
import { 
  ConfigProvider, 
  Layout, 
  Tabs, 
  Button, 
  Avatar, 
  Badge, 
  FloatButton,
  theme
} from 'antd';
import {
  HomeOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  DollarOutlined,
  UserOutlined,
  MessageOutlined
} from '@ant-design/icons';

// Mobile components
import MobileDashboard from './components/MobileDashboard';
import MobileAttendance from './components/MobileAttendance';
import MobileLeave from './components/MobileLeave';
import MobilePayroll from './components/MobilePayroll';
import MobileProfile from './components/MobileProfile';
import MobileChatbot from './components/MobileChatbot';

import './MobileApp.css';

const { Content } = Layout;
const { TabPane } = Tabs;

const MobileApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [chatbotVisible, setChatbotVisible] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Mock user data
  const currentUser = {
    name: 'Nguyễn Văn An',
    employeeId: 'EMP001',
    department: 'IT',
    position: 'Senior Developer',
    avatar: null
  };

  // Check for system dark mode preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const tabItems = [
    {
      key: 'dashboard',
      label: (
        <div className="tab-item">
          <HomeOutlined />
          <span>Trang chủ</span>
        </div>
      ),
      children: <MobileDashboard user={currentUser} />
    },
    {
      key: 'attendance',
      label: (
        <div className="tab-item">
          <ClockCircleOutlined />
          <span>Chấm công</span>
        </div>
      ),
      children: <MobileAttendance user={currentUser} />
    },
    {
      key: 'leave',
      label: (
        <div className="tab-item">
          <CalendarOutlined />
          <span>Nghỉ phép</span>
        </div>
      ),
      children: <MobileLeave user={currentUser} />
    },
    {
      key: 'payroll',
      label: (
        <div className="tab-item">
          <DollarOutlined />
          <span>Lương</span>
        </div>
      ),
      children: <MobilePayroll user={currentUser} />
    },
    {
      key: 'profile',
      label: (
        <div className="tab-item">
          <Badge count={notificationCount} size="small">
            <UserOutlined />
          </Badge>
          <span>Cá nhân</span>
        </div>
      ),
      children: <MobileProfile user={currentUser} />
    }
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 8,
        },
      }}
    >
      <Layout className={`mobile-app ${isDarkMode ? 'dark-mode' : ''}`}>
        <Content className="mobile-content">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            centered
            size="small"
            className="mobile-tabs"
            tabPosition="bottom"
            items={tabItems}
          />
        </Content>

        {/* Floating Chatbot Button */}
        <FloatButton
          icon={<MessageOutlined />}
          type="primary"
          style={{
            right: 16,
            bottom: 80,
          }}
          onClick={() => setChatbotVisible(true)}
          tooltip="AI Trợ lý"
        />

        {/* Mobile Chatbot */}
        <MobileChatbot
          visible={chatbotVisible}
          onClose={() => setChatbotVisible(false)}
          user={currentUser}
        />
      </Layout>
    </ConfigProvider>
  );
};

export default MobileApp;




