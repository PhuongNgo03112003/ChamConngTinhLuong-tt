import React from 'react';
import { Card, Row, Col, Statistic, Typography, Progress, Avatar, Space } from 'antd';
import { 
  UserOutlined, 
  ClockCircleOutlined, 
  DollarOutlined, 
  CalendarOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined 
} from '@ant-design/icons';

const { Title, Text } = Typography;

const MobileDashboard = ({ user }) => {
  const dashboardData = {
    totalEmployees: 127,
    presentToday: 115,
    absentToday: 12,
    totalSalaryThisMonth: 2450000000,
    pendingLeaveRequests: 5
  };

  return (
    <div className="mobile-dashboard">
      {/* User Info Card */}
      <Card className="user-info-card">
        <Space>
          <Avatar size={60} icon={<UserOutlined />} />
          <div>
            <Title level={4} style={{ margin: 0 }}>{user.name}</Title>
            <Text type="secondary">{user.position}</Text><br />
            <Text type="secondary">{user.department}</Text>
          </div>
        </Space>
      </Card>

      {/* Quick Stats */}
      <Row gutter={[12, 12]} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card className="stat-card">
            <Statistic
              title="Có mặt hôm nay"
              value={dashboardData.presentToday}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a', fontSize: '18px' }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card className="stat-card">
            <Statistic
              title="Vắng mặt"
              value={dashboardData.absentToday}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#f5222d', fontSize: '18px' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Today's Status */}
      <Card title="Trạng thái hôm nay" style={{ marginTop: 16 }}>
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <CheckCircleOutlined style={{ fontSize: '48px', color: '#52c41a', marginBottom: '16px' }} />
          <Title level={3} style={{ color: '#52c41a', margin: 0 }}>Đã chấm công</Title>
          <Text type="secondary">Vào: 08:15:23</Text><br />
          <Text type="secondary">Ra: Chưa chấm</Text>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card title="Thao tác nhanh" style={{ marginTop: 16 }}>
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <div className="quick-action">
              <ClockCircleOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
              <Text>Chấm công</Text>
            </div>
          </Col>
          <Col span={12}>
            <div className="quick-action">
              <CalendarOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
              <Text>Nghỉ phép</Text>
            </div>
          </Col>
          <Col span={12}>
            <div className="quick-action">
              <DollarOutlined style={{ fontSize: '24px', color: '#faad14' }} />
              <Text>Xem lương</Text>
            </div>
          </Col>
          <Col span={12}>
            <div className="quick-action">
              <UserOutlined style={{ fontSize: '24px', color: '#722ed1' }} />
              <Text>Hồ sơ</Text>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default MobileDashboard;




