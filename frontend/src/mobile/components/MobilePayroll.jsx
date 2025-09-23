import React from 'react';
import { Card, Typography, Space, List, Avatar, Tag, Divider, Row, Col } from 'antd';
import { 
  DollarOutlined, 
  BankOutlined,
  FileTextOutlined,
  DownloadOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const MobilePayroll = ({ user }) => {
  const payrollData = [
    {
      period: '2024-01',
      grossSalary: 25000000,
      deductions: 4500000,
      netSalary: 20500000,
      status: 'paid'
    },
    {
      period: '2023-12',
      grossSalary: 25000000,
      deductions: 4500000,
      netSalary: 20500000,
      status: 'paid'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="mobile-payroll">
      {/* Current Month Salary */}
      <Card className="current-salary-card">
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <DollarOutlined style={{ fontSize: '48px', color: '#52c41a', marginBottom: '16px' }} />
          <Title level={3} style={{ color: '#52c41a', margin: 0 }}>
            {formatCurrency(20500000)}
          </Title>
          <Text type="secondary">Lương tháng 1/2024</Text>
          <Tag color="green" style={{ marginTop: '8px' }}>Đã thanh toán</Tag>
        </div>
      </Card>

      {/* Salary Breakdown */}
      <Card title="Chi tiết lương tháng 1/2024" style={{ marginTop: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text>Lương cơ bản:</Text>
            <Text strong>{formatCurrency(20000000)}</Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text>Phụ cấp:</Text>
            <Text strong>{formatCurrency(2000000)}</Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text>Tiền OT:</Text>
            <Text strong>{formatCurrency(1500000)}</Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text>Thưởng:</Text>
            <Text strong>{formatCurrency(1000000)}</Text>
          </div>
          <Divider style={{ margin: '8px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text strong>Tổng thu nhập:</Text>
            <Text strong style={{ color: '#52c41a' }}>{formatCurrency(24500000)}</Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text>BHXH/BHYT/Thuế:</Text>
            <Text style={{ color: '#f5222d' }}>-{formatCurrency(4000000)}</Text>
          </div>
          <Divider style={{ margin: '8px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text strong>Thực lĩnh:</Text>
            <Text strong style={{ color: '#1890ff', fontSize: '16px' }}>
              {formatCurrency(20500000)}
            </Text>
          </div>
        </Space>
      </Card>

      {/* Payroll History */}
      <Card title="Lịch sử lương" style={{ marginTop: 16 }}>
        <List
          dataSource={payrollData}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon={<FileTextOutlined />} />}
                title={
                  <Space>
                    <Text strong>Lương {item.period}</Text>
                    <Tag color={item.status === 'paid' ? 'green' : 'orange'}>
                      {item.status === 'paid' ? 'Đã thanh toán' : 'Chờ thanh toán'}
                    </Tag>
                  </Space>
                }
                description={
                  <Space direction="vertical" size="small">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text>Tổng thu nhập:</Text>
                      <Text>{formatCurrency(item.grossSalary)}</Text>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text>Khấu trừ:</Text>
                      <Text style={{ color: '#f5222d' }}>-{formatCurrency(item.deductions)}</Text>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text strong>Thực lĩnh:</Text>
                      <Text strong style={{ color: '#1890ff' }}>
                        {formatCurrency(item.netSalary)}
                      </Text>
                    </div>
                  </Space>
                }
                actions={[
                  <DownloadOutlined key="download" style={{ color: '#1890ff' }} />
                ]}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default MobilePayroll;
