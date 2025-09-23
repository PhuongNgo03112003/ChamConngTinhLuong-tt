import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Typography, Progress, Table, Space, Avatar } from 'antd';
import { 
  UserOutlined, 
  ClockCircleOutlined, 
  DollarOutlined, 
  CalendarOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined 
} from '@ant-design/icons';
import { Line, Column, Pie } from '@ant-design/plots';
import './Dashboard.css';

const { Title, Text } = Typography;

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalEmployees: 127,
    presentToday: 115,
    absentToday: 12,
    onLeave: 8,
    pendingLeaveRequests: 5,
    totalSalaryThisMonth: 2450000000,
    attendanceRate: 90.5
  });

  // Dữ liệu biểu đồ chấm công theo giờ
  const attendanceByHourData = [
    { hour: '07:00', count: 15 },
    { hour: '07:30', count: 45 },
    { hour: '08:00', count: 85 },
    { hour: '08:30', count: 25 },
    { hour: '09:00', count: 12 },
    { hour: '17:00', count: 20 },
    { hour: '17:30', count: 65 },
    { hour: '18:00', count: 95 },
    { hour: '18:30', count: 35 }
  ];

  // Dữ liệu biểu đồ tăng trưởng nhân sự
  const employeeGrowthData = [
    { month: 'T1', count: 110 },
    { month: 'T2', count: 112 },
    { month: 'T3', count: 115 },
    { month: 'T4', count: 118 },
    { month: 'T5', count: 121 },
    { month: 'T6', count: 124 },
    { month: 'T7', count: 127 }
  ];

  // Dữ liệu phân bố phòng ban
  const departmentData = [
    { department: 'Phòng IT', count: 25, percentage: 19.7 },
    { department: 'Phòng Kế toán', count: 15, percentage: 11.8 },
    { department: 'Phòng Nhân sự', count: 12, percentage: 9.4 },
    { department: 'Phòng Marketing', count: 20, percentage: 15.7 },
    { department: 'Phòng Kinh doanh', count: 35, percentage: 27.6 },
    { department: 'Phòng Sản xuất', count: 20, percentage: 15.7 }
  ];

  // Dữ liệu nhân viên có hợp đồng sắp hết hạn
  const expiringContracts = [
    { key: '1', name: 'Nguyễn Văn A', department: 'IT', expiryDate: '15/01/2024', status: 'Sắp hết hạn' },
    { key: '2', name: 'Trần Thị B', department: 'Marketing', expiryDate: '22/01/2024', status: 'Sắp hết hạn' },
    { key: '3', name: 'Lê Văn C', department: 'Kế toán', expiryDate: '28/01/2024', status: 'Sắp hết hạn' }
  ];

  const contractColumns = [
    {
      title: 'Nhân viên',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} />
          {text}
        </Space>
      )
    },
    {
      title: 'Phòng ban',
      dataIndex: 'department',
      key: 'department'
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'expiryDate',
      key: 'expiryDate'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Text type="warning">
          <ExclamationCircleOutlined /> {status}
        </Text>
      )
    }
  ];

  const attendanceConfig = {
    data: attendanceByHourData,
    xField: 'hour',
    yField: 'count',
    color: '#1890ff',
    smooth: true,
    meta: {
      count: { alias: 'Số lượng chấm công' },
      hour: { alias: 'Giờ' }
    }
  };

  const growthConfig = {
    data: employeeGrowthData,
    xField: 'month',
    yField: 'count',
    color: '#52c41a',
    columnWidthRatio: 0.6,
    meta: {
      count: { alias: 'Số lượng nhân viên' },
      month: { alias: 'Tháng' }
    }
  };

  const departmentConfig = {
    data: departmentData,
    angleField: 'count',
    colorField: 'department',
    radius: 0.8,
    label: false,
  };

  return (
    <div className="dashboard-container">
      {/* Header Statistics */}
      <Row gutter={[16, 16]} className="dashboard-stats">
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card total-employees">
            <Statistic
              title="Tổng số nhân viên"
              value={dashboardData.totalEmployees}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card present-today">
            <Statistic
              title="Có mặt hôm nay"
              value={dashboardData.presentToday}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
            <Progress 
              percent={(dashboardData.presentToday / dashboardData.totalEmployees * 100).toFixed(1)} 
              size="small" 
              showInfo={false}
              strokeColor="#52c41a"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card salary-month">
            <Statistic
              title="Tổng lương tháng này"
              value={dashboardData.totalSalaryThisMonth}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#faad14' }}
              formatter={(value) => `${(value / 1000000).toFixed(0)}M VNĐ`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card leave-requests">
            <Statistic
              title="Đơn nghỉ phép chờ duyệt"
              value={dashboardData.pendingLeaveRequests}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row gutter={[16, 16]} className="dashboard-charts">
        <Col xs={24} lg={16}>
          <Card title="Thống kê chấm công theo giờ" className="chart-card">
            <Line {...attendanceConfig} height={300} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Tăng trưởng nhân sự" className="chart-card">
            <Column {...growthConfig} height={300} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="dashboard-details">
        <Col xs={24} lg={12}>
          <Card title="Phân bố nhân viên theo phòng ban" className="chart-card">
            <Pie {...departmentConfig} height={300} />
            <div className="department-stats">
              {departmentData.map((dept, index) => (
                <div key={index} className="dept-stat-item">
                  <span className="dept-name">{dept.department}</span>
                  <span className="dept-count">{dept.count} người</span>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Hợp đồng sắp hết hạn" className="table-card">
            <Table 
              columns={contractColumns}
              dataSource={expiringContracts}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row gutter={[16, 16]} className="quick-actions">
        <Col span={24}>
          <Card title="Thao tác nhanh" className="actions-card">
            <Row gutter={[16, 16]}>
              <Col xs={12} sm={6}>
                <div className="action-item">
                  <ClockCircleOutlined className="action-icon" />
                  <Text>Chấm công thủ công</Text>
                </div>
              </Col>
              <Col xs={12} sm={6}>
                <div className="action-item">
                  <UserOutlined className="action-icon" />
                  <Text>Thêm nhân viên</Text>
                </div>
              </Col>
              <Col xs={12} sm={6}>
                <div className="action-item">
                  <DollarOutlined className="action-icon" />
                  <Text>Tính lương</Text>
                </div>
              </Col>
              <Col xs={12} sm={6}>
                <div className="action-item">
                  <CalendarOutlined className="action-icon" />
                  <Text>Tạo báo cáo</Text>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

