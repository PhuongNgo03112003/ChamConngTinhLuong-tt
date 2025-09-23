import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Table, 
  Tag, 
  Button, 
  DatePicker, 
  Select, 
  Space, 
  Modal, 
  Form, 
  Input, 
  TimePicker,
  Statistic,
  Avatar,
  Typography,
  Alert,
  message
} from 'antd';
import { 
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
  CalendarOutlined,
  DownloadOutlined,
  PrinterOutlined,
  PlusOutlined
} from '@ant-design/icons';
import moment from 'moment';
import './Attendance.css';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title, Text } = Typography;

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState([
    moment().startOf('month'),
    moment().endOf('month')
  ]);
  const [selectedEmployee, setSelectedEmployee] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [manualAttendanceModal, setManualAttendanceModal] = useState(false);
  const [form] = Form.useForm();

  // Dữ liệu mẫu
  const mockAttendanceData = [
    {
      key: '1',
      date: '2024-01-15',
      employeeId: 'EMP001',
      employeeName: 'Nguyễn Văn An',
      department: 'IT',
      avatar: null,
      checkIn: '08:15:23',
      checkOut: '17:45:12',
      totalHours: '9h 30m',
      overtimeHours: '1h 30m',
      status: 'present',
      device: 'Thiết bị vân tay #001',
      location: 'Tầng 2 - Phòng IT'
    },
    {
      key: '2',
      date: '2024-01-15',
      employeeId: 'EMP002',
      employeeName: 'Trần Thị Bình',
      department: 'Marketing',
      avatar: null,
      checkIn: '08:00:15',
      checkOut: '17:00:45',
      totalHours: '8h 59m',
      overtimeHours: '0h',
      status: 'present',
      device: 'Thiết bị vân tay #002',
      location: 'Tầng 3 - Phòng Marketing'
    },
    {
      key: '3',
      date: '2024-01-15',
      employeeId: 'EMP003',
      employeeName: 'Lê Văn Cường',
      department: 'Kế toán',
      avatar: null,
      checkIn: '08:30:20',
      checkOut: null,
      totalHours: '7h 30m',
      overtimeHours: '0h',
      status: 'working',
      device: 'Thiết bị vân tay #001',
      location: 'Tầng 1 - Phòng Kế toán'
    },
    {
      key: '4',
      date: '2024-01-15',
      employeeId: 'EMP004',
      employeeName: 'Phạm Thị Dung',
      department: 'Nhân sự',
      avatar: null,
      checkIn: null,
      checkOut: null,
      totalHours: '0h',
      overtimeHours: '0h',
      status: 'absent',
      device: null,
      location: null
    },
    {
      key: '5',
      date: '2024-01-15',
      employeeId: 'EMP005',
      employeeName: 'Võ Văn Em',
      department: 'IT',
      avatar: null,
      checkIn: '09:15:10',
      checkOut: '18:30:22',
      totalHours: '9h 15m',
      overtimeHours: '2h 15m',
      status: 'late',
      device: 'Thiết bị vân tay #003',
      location: 'Tầng 2 - Phòng IT'
    }
  ];

  const [summaryStats, setSummaryStats] = useState({
    totalPresent: 3,
    totalAbsent: 1,
    totalLate: 1,
    totalWorking: 1,
    averageHours: '8h 45m',
    totalOvertimeHours: '3h 45m'
  });

  const departments = [
    { value: 'all', label: 'Tất cả phòng ban' },
    { value: 'IT', label: 'Phòng IT' },
    { value: 'Marketing', label: 'Phòng Marketing' },
    { value: 'Kế toán', label: 'Phòng Kế toán' },
    { value: 'Nhân sự', label: 'Phòng Nhân sự' },
    { value: 'Kinh doanh', label: 'Phòng Kinh doanh' }
  ];

  const employees = [
    { value: 'all', label: 'Tất cả nhân viên' },
    { value: 'EMP001', label: 'Nguyễn Văn An' },
    { value: 'EMP002', label: 'Trần Thị Bình' },
    { value: 'EMP003', label: 'Lê Văn Cường' },
    { value: 'EMP004', label: 'Phạm Thị Dung' },
    { value: 'EMP005', label: 'Võ Văn Em' }
  ];

  useEffect(() => {
    fetchAttendanceData();
  }, [selectedDateRange, selectedEmployee, selectedDepartment]);

  const fetchAttendanceData = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setAttendanceData(mockAttendanceData);
      setLoading(false);
    }, 1000);
  };

  const getStatusTag = (status) => {
    const statusConfig = {
      present: { color: 'green', icon: <CheckCircleOutlined />, text: 'Có mặt' },
      absent: { color: 'red', icon: <CloseCircleOutlined />, text: 'Vắng mặt' },
      late: { color: 'orange', icon: <ExclamationCircleOutlined />, text: 'Đi muộn' },
      working: { color: 'blue', icon: <ClockCircleOutlined />, text: 'Đang làm việc' }
    };

    const config = statusConfig[status] || statusConfig.absent;
    return (
      <Tag color={config.color} icon={config.icon}>
        {config.text}
      </Tag>
    );
  };

  const columns = [
    {
      title: 'Nhân viên',
      dataIndex: 'employeeName',
      key: 'employeeName',
      width: 200,
      render: (text, record) => (
        <Space>
          <Avatar 
            size="small" 
            icon={<UserOutlined />}
            src={record.avatar}
          />
          <div>
            <div style={{ fontWeight: 600 }}>{text}</div>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {record.employeeId}
            </Text>
          </div>
        </Space>
      ),
      sorter: (a, b) => a.employeeName.localeCompare(b.employeeName),
    },
    {
      title: 'Phòng ban',
      dataIndex: 'department',
      key: 'department',
      width: 120,
      filters: departments.slice(1).map(dept => ({ text: dept.label, value: dept.value })),
      onFilter: (value, record) => record.department === value,
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      render: (date) => moment(date).format('DD/MM/YYYY'),
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
    },
    {
      title: 'Giờ vào',
      dataIndex: 'checkIn',
      key: 'checkIn',
      width: 100,
      render: (time) => time ? (
        <Text style={{ color: '#52c41a', fontWeight: 600 }}>{time}</Text>
      ) : (
        <Text type="secondary">--:--:--</Text>
      ),
    },
    {
      title: 'Giờ ra',
      dataIndex: 'checkOut',
      key: 'checkOut',
      width: 100,
      render: (time) => time ? (
        <Text style={{ color: '#f5222d', fontWeight: 600 }}>{time}</Text>
      ) : (
        <Text type="secondary">--:--:--</Text>
      ),
    },
    {
      title: 'Tổng giờ',
      dataIndex: 'totalHours',
      key: 'totalHours',
      width: 100,
      render: (hours) => (
        <Text style={{ fontWeight: 600 }}>{hours}</Text>
      ),
    },
    {
      title: 'Giờ OT',
      dataIndex: 'overtimeHours',
      key: 'overtimeHours',
      width: 80,
      render: (hours) => (
        <Text style={{ 
          color: hours !== '0h' ? '#faad14' : '#8c8c8c',
          fontWeight: hours !== '0h' ? 600 : 400
        }}>
          {hours}
        </Text>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => getStatusTag(status),
      filters: [
        { text: 'Có mặt', value: 'present' },
        { text: 'Vắng mặt', value: 'absent' },
        { text: 'Đi muộn', value: 'late' },
        { text: 'Đang làm việc', value: 'working' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Thiết bị',
      dataIndex: 'device',
      key: 'device',
      width: 150,
      render: (device) => device ? (
        <Text style={{ fontSize: '12px' }}>{device}</Text>
      ) : (
        <Text type="secondary">--</Text>
      ),
    }
  ];

  const handleManualAttendance = () => {
    form.validateFields().then(values => {
      message.success('Chấm công thủ công thành công!');
      setManualAttendanceModal(false);
      form.resetFields();
      fetchAttendanceData();
    });
  };

  const handleExportData = () => {
    message.success('Đang xuất dữ liệu...');
    // Implement export functionality
  };

  return (
    <div className="attendance-container">
      {/* Header */}
      <div className="attendance-header">
        <Title level={2}>
          <ClockCircleOutlined /> Quản lý chấm công
        </Title>
        <Text type="secondary">
          Theo dõi và quản lý chấm công nhân viên theo thời gian thực
        </Text>
      </div>

      {/* Summary Statistics */}
      <Row gutter={[16, 16]} className="attendance-summary">
        <Col xs={12} sm={8} lg={4}>
          <Card className="summary-card present">
            <Statistic
              title="Có mặt"
              value={summaryStats.totalPresent}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card className="summary-card absent">
            <Statistic
              title="Vắng mặt"
              value={summaryStats.totalAbsent}
              prefix={<CloseCircleOutlined />}
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card className="summary-card late">
            <Statistic
              title="Đi muộn"
              value={summaryStats.totalLate}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card className="summary-card working">
            <Statistic
              title="Đang làm việc"
              value={summaryStats.totalWorking}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card className="summary-card hours">
            <Statistic
              title="TB giờ làm"
              value={summaryStats.averageHours}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card className="summary-card overtime">
            <Statistic
              title="Tổng giờ OT"
              value={summaryStats.totalOvertimeHours}
              valueStyle={{ color: '#eb2f96' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters and Actions */}
      <Card className="filters-card">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={6}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text strong>Khoảng thời gian</Text>
              <RangePicker
                value={selectedDateRange}
                onChange={setSelectedDateRange}
                format="DD/MM/YYYY"
                style={{ width: '100%' }}
              />
            </Space>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text strong>Phòng ban</Text>
              <Select
                value={selectedDepartment}
                onChange={setSelectedDepartment}
                style={{ width: '100%' }}
              >
                {departments.map(dept => (
                  <Option key={dept.value} value={dept.value}>
                    {dept.label}
                  </Option>
                ))}
              </Select>
            </Space>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text strong>Nhân viên</Text>
              <Select
                value={selectedEmployee}
                onChange={setSelectedEmployee}
                style={{ width: '100%' }}
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {employees.map(emp => (
                  <Option key={emp.value} value={emp.value}>
                    {emp.label}
                  </Option>
                ))}
              </Select>
            </Space>
          </Col>
          <Col xs={24} sm={12} md={10}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text strong>Thao tác</Text>
              <Space wrap>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={() => setManualAttendanceModal(true)}
                >
                  Chấm công thủ công
                </Button>
                <Button 
                  icon={<DownloadOutlined />}
                  onClick={handleExportData}
                >
                  Xuất Excel
                </Button>
                <Button 
                  icon={<PrinterOutlined />}
                  onClick={() => window.print()}
                >
                  In báo cáo
                </Button>
              </Space>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Real-time Status Alert */}
      <Alert
        message="Trạng thái thiết bị chấm công"
        description={
          <Space>
            <Tag color="green">Thiết bị #001: Hoạt động</Tag>
            <Tag color="green">Thiết bị #002: Hoạt động</Tag>
            <Tag color="orange">Thiết bị #003: Cảnh báo</Tag>
          </Space>
        }
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />

      {/* Attendance Table */}
      <Card className="attendance-table-card">
        <Table
          columns={columns}
          dataSource={attendanceData}
          loading={loading}
          scroll={{ x: 1200 }}
          pagination={{
            total: attendanceData.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} của ${total} bản ghi`,
          }}
          rowClassName={(record) => {
            if (record.status === 'late') return 'row-late';
            if (record.status === 'absent') return 'row-absent';
            return '';
          }}
        />
      </Card>

      {/* Manual Attendance Modal */}
      <Modal
        title="Chấm công thủ công"
        open={manualAttendanceModal}
        onOk={handleManualAttendance}
        onCancel={() => {
          setManualAttendanceModal(false);
          form.resetFields();
        }}
        okText="Xác nhận"
        cancelText="Hủy"
        width={600}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="employee"
                label="Nhân viên"
                rules={[{ required: true, message: 'Vui lòng chọn nhân viên!' }]}
              >
                <Select placeholder="Chọn nhân viên" showSearch>
                  {employees.slice(1).map(emp => (
                    <Option key={emp.value} value={emp.value}>
                      {emp.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="date"
                label="Ngày"
                rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}
              >
                <DatePicker 
                  style={{ width: '100%' }}
                  format="DD/MM/YYYY"
                  placeholder="Chọn ngày"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="checkIn"
                label="Giờ vào"
                rules={[{ required: true, message: 'Vui lòng nhập giờ vào!' }]}
              >
                <TimePicker 
                  style={{ width: '100%' }}
                  format="HH:mm:ss"
                  placeholder="Chọn giờ vào"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="checkOut"
                label="Giờ ra"
              >
                <TimePicker 
                  style={{ width: '100%' }}
                  format="HH:mm:ss"
                  placeholder="Chọn giờ ra (tùy chọn)"
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="reason"
            label="Lý do chấm công thủ công"
            rules={[{ required: true, message: 'Vui lòng nhập lý do!' }]}
          >
            <Input.TextArea 
              rows={3}
              placeholder="Nhập lý do cần chấm công thủ công..."
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Attendance;

