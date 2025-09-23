import React from 'react';
import { Card, Button, Typography, Space, Tag, List, Avatar } from 'antd';
import { 
  ClockCircleOutlined, 
  CheckCircleOutlined,
  UserOutlined,
  CalendarOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const MobileAttendance = ({ user }) => {
  const attendanceData = [
    { date: '2024-01-15', checkIn: '08:15:23', checkOut: '17:45:12', status: 'completed' },
    { date: '2024-01-14', checkIn: '08:20:15', checkOut: '17:30:45', status: 'completed' },
    { date: '2024-01-13', checkIn: '08:10:30', checkOut: null, status: 'working' },
    { date: '2024-01-12', checkIn: null, checkOut: null, status: 'absent' }
  ];

  const getStatusTag = (status) => {
    const statusConfig = {
      completed: { color: 'green', text: 'Hoàn thành' },
      working: { color: 'blue', text: 'Đang làm việc' },
      absent: { color: 'red', text: 'Vắng mặt' }
    };
    const config = statusConfig[status] || statusConfig.absent;
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  return (
    <div className="mobile-attendance">
      {/* Today's Status */}
      <Card className="today-status-card">
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <ClockCircleOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
          <Title level={3} style={{ margin: 0 }}>Chấm công hôm nay</Title>
          <Space direction="vertical" size="small" style={{ marginTop: '16px' }}>
            <div>
              <Text strong>Vào: </Text>
              <Text style={{ color: '#52c41a' }}>08:15:23</Text>
            </div>
            <div>
              <Text strong>Ra: </Text>
              <Text type="secondary">Chưa chấm</Text>
            </div>
            <div>
              <Text strong>Trạng thái: </Text>
              {getStatusTag('working')}
            </div>
          </Space>
          <Button type="primary" size="large" style={{ marginTop: '20px' }}>
            Chấm công ra
          </Button>
        </div>
      </Card>

      {/* Attendance History */}
      <Card title="Lịch sử chấm công" style={{ marginTop: 16 }}>
        <List
          dataSource={attendanceData}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon={<CalendarOutlined />} />}
                title={
                  <Space>
                    <Text>{new Date(item.date).toLocaleDateString('vi-VN')}</Text>
                    {getStatusTag(item.status)}
                  </Space>
                }
                description={
                  <Space direction="vertical" size="small">
                    <div>
                      <Text strong>Vào: </Text>
                      <Text style={{ color: item.checkIn ? '#52c41a' : '#f5222d' }}>
                        {item.checkIn || 'Chưa chấm'}
                      </Text>
                    </div>
                    <div>
                      <Text strong>Ra: </Text>
                      <Text style={{ color: item.checkOut ? '#52c41a' : '#f5222d' }}>
                        {item.checkOut || 'Chưa chấm'}
                      </Text>
                    </div>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default MobileAttendance;




