import React from 'react';
import { Card, Button, Typography, Space, Tag, List, Avatar, Badge, Row, Col } from 'antd';
import { 
  CalendarOutlined, 
  PlusOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const MobileLeave = ({ user }) => {
  const leaveRequests = [
    { 
      id: 'LR001', 
      type: 'annual', 
      startDate: '2024-01-25', 
      endDate: '2024-01-26', 
      days: 2, 
      reason: 'Nghỉ phép thường niên',
      status: 'approved' 
    },
    { 
      id: 'LR002', 
      type: 'sick', 
      startDate: '2024-01-20', 
      endDate: '2024-01-20', 
      days: 1, 
      reason: 'Bị cảm sốt',
      status: 'pending' 
    }
  ];

  const getStatusTag = (status) => {
    const statusConfig = {
      pending: { color: 'orange', icon: <ClockCircleOutlined />, text: 'Chờ duyệt' },
      approved: { color: 'green', icon: <CheckCircleOutlined />, text: 'Đã duyệt' },
      rejected: { color: 'red', icon: <CloseOutlined />, text: 'Từ chối' }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return <Tag color={config.color} icon={config.icon}>{config.text}</Tag>;
  };

  const getLeaveTypeTag = (type) => {
    const typeConfig = {
      annual: { color: 'blue', text: 'Phép năm' },
      sick: { color: 'orange', text: 'Nghỉ ốm' },
      personal: { color: 'purple', text: 'Phép cá nhân' }
    };
    const config = typeConfig[type] || typeConfig.personal;
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  return (
    <div className="mobile-leave">
      {/* Leave Balance */}
      <Card className="leave-balance-card">
        <Title level={4}>Hạn mức nghỉ phép</Title>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <div style={{ textAlign: 'center' }}>
              <Title level={2} style={{ color: '#1890ff', margin: 0 }}>18</Title>
              <Text type="secondary">Phép năm còn lại</Text>
            </div>
          </Col>
          <Col span={12}>
            <div style={{ textAlign: 'center' }}>
              <Title level={2} style={{ color: '#52c41a', margin: 0 }}>30</Title>
              <Text type="secondary">Phép ốm còn lại</Text>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Quick Action */}
      <Card style={{ marginTop: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} block size="large">
          Tạo đơn nghỉ phép mới
        </Button>
      </Card>

      {/* Leave Requests */}
      <Card title="Đơn nghỉ phép của tôi" style={{ marginTop: 16 }}>
        <List
          dataSource={leaveRequests}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon={<CalendarOutlined />} />}
                title={
                  <Space>
                    <Text code>{item.id}</Text>
                    {getLeaveTypeTag(item.type)}
                    {getStatusTag(item.status)}
                  </Space>
                }
                description={
                  <Space direction="vertical" size="small">
                    <div>
                      <Text strong>Thời gian: </Text>
                      <Text>
                        {new Date(item.startDate).toLocaleDateString('vi-VN')} - 
                        {new Date(item.endDate).toLocaleDateString('vi-VN')}
                      </Text>
                    </div>
                    <div>
                      <Text strong>Số ngày: </Text>
                      <Text>{item.days} ngày</Text>
                    </div>
                    <div>
                      <Text strong>Lý do: </Text>
                      <Text>{item.reason}</Text>
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

export default MobileLeave;
