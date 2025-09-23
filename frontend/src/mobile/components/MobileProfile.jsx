import React from 'react';
import { Card, Typography, Space, Avatar, List, Button, Tag, Divider, Row, Col } from 'antd';
import { 
  UserOutlined, 
  MailOutlined,
  PhoneOutlined,
  BankOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const MobileProfile = ({ user }) => {
  const profileItems = [
    {
      icon: <UserOutlined />,
      title: 'Thông tin cá nhân',
      description: 'Xem và chỉnh sửa thông tin cá nhân'
    },
    {
      icon: <BellOutlined />,
      title: 'Thông báo',
      description: 'Quản lý thông báo và cài đặt',
      badge: 3
    },
    {
      icon: <SettingOutlined />,
      title: 'Cài đặt',
      description: 'Cài đặt tài khoản và bảo mật'
    },
    {
      icon: <QuestionCircleOutlined />,
      title: 'Trợ giúp',
      description: 'Hướng dẫn sử dụng và hỗ trợ'
    }
  ];

  return (
    <div className="mobile-profile">
      {/* User Info */}
      <Card className="user-profile-card">
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <Avatar size={80} icon={<UserOutlined />} style={{ marginBottom: '16px' }} />
          <Title level={3} style={{ margin: 0 }}>{user.name}</Title>
          <Text type="secondary">{user.position}</Text><br />
          <Text type="secondary">{user.department}</Text><br />
          <Tag color="blue" style={{ marginTop: '8px' }}>{user.employeeId}</Tag>
        </div>
      </Card>

      {/* Contact Info */}
      <Card title="Thông tin liên hệ" style={{ marginTop: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <MailOutlined style={{ color: '#1890ff' }} />
            <div>
              <Text strong>Email</Text><br />
              <Text type="secondary">an.nguyen@company.com</Text>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <PhoneOutlined style={{ color: '#52c41a' }} />
            <div>
              <Text strong>Điện thoại</Text><br />
              <Text type="secondary">0901234567</Text>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <BankOutlined style={{ color: '#faad14' }} />
            <div>
              <Text strong>Tài khoản ngân hàng</Text><br />
              <Text type="secondary">123456789 - Vietcombank</Text>
            </div>
          </div>
        </Space>
      </Card>

      {/* Menu Items */}
      <Card style={{ marginTop: 16 }}>
        <List
          dataSource={profileItems}
          renderItem={(item) => (
            <List.Item
              actions={item.badge ? [<Tag color="red">{item.badge}</Tag>] : []}
            >
              <List.Item.Meta
                avatar={<Avatar icon={item.icon} style={{ backgroundColor: '#f0f0f0' }} />}
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Card>

      {/* Quick Stats */}
      <Card title="Thống kê" style={{ marginTop: 16 }}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <div style={{ textAlign: 'center' }}>
              <Title level={3} style={{ color: '#1890ff', margin: 0 }}>22</Title>
              <Text type="secondary">Ngày làm việc</Text>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ textAlign: 'center' }}>
              <Title level={3} style={{ color: '#52c41a', margin: 0 }}>18</Title>
              <Text type="secondary">Ngày phép còn lại</Text>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ textAlign: 'center' }}>
              <Title level={3} style={{ color: '#faad14', margin: 0 }}>85%</Title>
              <Text type="secondary">Hiệu suất</Text>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Logout Button */}
      <Card style={{ marginTop: 16 }}>
        <Button 
          type="primary" 
          danger 
          icon={<LogoutOutlined />} 
          block 
          size="large"
        >
          Đăng xuất
        </Button>
      </Card>
    </div>
  );
};

export default MobileProfile;
