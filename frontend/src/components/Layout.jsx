import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Dropdown, Badge, Button, Typography, Space, Drawer } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  CalendarOutlined,
  TeamOutlined,
  MessageOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SunOutlined,
  MoonOutlined
} from '@ant-design/icons';
import { useLocation, Link } from 'react-router-dom';
import Chatbot from './Chatbot';
import './Layout.css';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [chatbotVisible, setChatbotVisible] = useState(false);
  const [notificationCount, setNotificationCount] = useState(5);
  const [darkTheme, setDarkTheme] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Mock user data
  const currentUser = {
    name: 'Nguyễn Văn An',
    role: 'Senior Developer',
    department: 'IT',
    avatar: null,
    email: 'an.nguyen@company.com'
  };

  // Menu items
  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: '/attendance',
      icon: <ClockCircleOutlined />,
      label: <Link to="/attendance">Chấm công</Link>,
    },
    {
      key: '/employees',
      icon: <TeamOutlined />,
      label: <Link to="/employees">Quản lý nhân sự</Link>,
    },
    {
      key: '/payroll',
      icon: <DollarOutlined />,
      label: <Link to="/payroll">Quản lý lương</Link>,
    },
    {
      key: '/leave-requests',
      icon: <CalendarOutlined />,
      label: <Link to="/leave-requests">Nghỉ phép</Link>,
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: <Link to="/settings">Cài đặt</Link>,
    },
  ];

  // User menu
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Thông tin cá nhân',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt tài khoản',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      danger: true,
    },
  ];

  // Notification items
  const notificationItems = [
    {
      key: '1',
      title: 'Yêu cầu nghỉ phép mới',
      description: 'Trần Thị Bình đã gửi yêu cầu nghỉ phép',
      time: '5 phút trước',
      type: 'leave'
    },
    {
      key: '2',
      title: 'Lương tháng 1 đã được tính',
      description: 'Bảng lương tháng 1/2024 đã sẵn sàng',
      time: '1 giờ trước',
      type: 'payroll'
    },
    {
      key: '3',
      title: 'Thiết bị chấm công #3 lỗi',
      description: 'Cần kiểm tra và bảo trì thiết bị',
      time: '2 giờ trước',
      type: 'system'
    },
    {
      key: '4',
      title: 'Nhân viên mới được thêm',
      description: 'Lê Văn Dũng đã được thêm vào hệ thống',
      time: '1 ngày trước',
      type: 'employee'
    },
    {
      key: '5',
      title: 'Báo cáo tuần đã sẵn sàng',
      description: 'Báo cáo chấm công tuần 3 tháng 1',
      time: '2 ngày trước',
      type: 'report'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Persist sider collapsed state
  useEffect(() => {
    const saved = localStorage.getItem('layout-collapsed');
    if (saved !== null) {
      setCollapsed(saved === 'true');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('layout-collapsed', String(collapsed));
  }, [collapsed]);

  const handleUserMenuClick = ({ key }) => {
    switch (key) {
      case 'profile':
        // Navigate to profile
        break;
      case 'settings':
        // Navigate to settings
        break;
      case 'logout':
        // Handle logout
        console.log('Logout');
        break;
      default:
        break;
    }
  };

  const handleNotificationClick = ({ key }) => {
    setNotificationCount(prev => Math.max(0, prev - 1));
    // Handle notification click
    console.log('Notification clicked:', key);
  };

  const notificationMenu = (
    <div className="notification-dropdown">
      <div className="notification-header">
        <Text strong>Thông báo</Text>
        <Badge count={notificationCount} />
      </div>
      <div className="notification-list">
        {notificationItems.map(item => (
          <div
            key={item.key}
            className="notification-item"
            onClick={() => handleNotificationClick({ key: item.key })}
          >
            <div className="notification-content">
              <Text strong style={{ fontSize: '13px' }}>{item.title}</Text>
              <Text type="secondary" style={{ fontSize: '12px', display: 'block' }}>
                {item.description}
              </Text>
              <Text type="secondary" style={{ fontSize: '11px' }}>
                {item.time}
              </Text>
            </div>
          </div>
        ))}
      </div>
      <div className="notification-footer">
        <Button type="link" size="small">Xem tất cả</Button>
      </div>
    </div>
  );

  const userMenu = (
    <div className="user-dropdown">
      <div className="user-info">
        <Avatar size={40} icon={<UserOutlined />} />
        <div className="user-details">
          <Text strong>{currentUser.name}</Text>
          <Text type="secondary" style={{ fontSize: '12px', display: 'block' }}>
            {currentUser.role}
          </Text>
          <Text type="secondary" style={{ fontSize: '11px' }}>
            {currentUser.department}
          </Text>
        </div>
      </div>
      <Menu
        items={userMenuItems}
        onClick={handleUserMenuClick}
        style={{ border: 'none' }}
      />
    </div>
  );

  return (
    <Layout className={`main-layout ${darkTheme ? 'dark-theme' : ''}`}>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="layout-sider"
          width={240}
          collapsedWidth={60}
        >
          <div className="layout-logo">
            {!collapsed ? (
              <Space>
                <div className="logo-icon">HR</div>
                <Text strong style={{ color: 'white', fontSize: '16px' }}>
                  HRM System
                </Text>
              </Space>
            ) : (
              <div className="logo-icon">HR</div>
            )}
          </div>
          
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            className="layout-menu"
          />
        </Sider>
      )}

      {/* Mobile Drawer */}
      <Drawer
        title={
          <Space>
            <div className="logo-icon">HR</div>
            <Text strong>HRM System</Text>
          </Space>
        }
        placement="left"
        onClose={() => setMobileMenuVisible(false)}
        open={mobileMenuVisible}
        width={240}
        className="mobile-drawer"
      >
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={() => setMobileMenuVisible(false)}
        />
      </Drawer>

      <Layout className="layout-content">
        {/* Header */}
        <Header className="layout-header">
          <div className="header-left">
            <Button
              type="text"
              icon={isMobile ? <MenuUnfoldOutlined /> : (collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />)}
              onClick={() => {
                if (isMobile) {
                  setMobileMenuVisible(!mobileMenuVisible);
                } else {
                  setCollapsed(!collapsed);
                }
              }}
              className="trigger"
            />
            
            <div className="breadcrumb">
              <Text strong style={{ fontSize: '16px', color: 'white' }}>
                {menuItems.find(item => item.key === location.pathname)?.label?.props?.children || 'Dashboard'}
              </Text>
            </div>
          </div>

          <div className="header-right">
            <Space size="middle">
              {/* Theme Toggle */}
              <Button
                type="text"
                icon={darkTheme ? <SunOutlined /> : <MoonOutlined />}
                onClick={() => setDarkTheme(!darkTheme)}
                className="header-action"
              />

              {/* Chatbot Toggle */}
              <Button
                type="text"
                icon={<MessageOutlined />}
                onClick={() => setChatbotVisible(!chatbotVisible)}
                className="header-action"
              />

              {/* Notifications */}
              <Dropdown 
                dropdownRender={() => notificationMenu}
                trigger={['click']}
                placement="bottomRight"
              >
                <Button type="text" className="header-action">
                  <Badge count={notificationCount} size="small">
                    <BellOutlined />
                  </Badge>
                </Button>
              </Dropdown>

              {/* User Menu */}
              <Dropdown 
                dropdownRender={() => userMenu}
                trigger={['click']}
                placement="bottomRight"
              >
                <Button type="text" className="header-action user-action">
                  <Space>
                    <Avatar size="small" icon={<UserOutlined />} />
                    {!isMobile && (
                      <Text style={{ color: 'white' }}>{currentUser.name}</Text>
                    )}
                  </Space>
                </Button>
              </Dropdown>
            </Space>
          </div>
        </Header>

        {/* Content */}
        <Content className="layout-main-content">
          {children}
        </Content>
      </Layout>

      {/* Chatbot */}
      <Chatbot 
        visible={chatbotVisible}
        onClose={() => setChatbotVisible(false)}
      />
    </Layout>
  );
};

export default MainLayout;

