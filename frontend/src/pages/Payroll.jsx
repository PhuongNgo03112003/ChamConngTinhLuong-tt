import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Select,
  DatePicker,
  Typography,
  Tag,
  Space,
  Statistic,
  Tabs,
  Descriptions,
  Progress,
  Alert,
  message,
  Tooltip,
  Divider
} from 'antd';
import {
  DollarOutlined,
  CalculatorOutlined,
  FileTextOutlined,
  DownloadOutlined,
  PrinterOutlined,
  EyeOutlined,
  UserOutlined,
  CalendarOutlined,
  BankOutlined,
  PercentageOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { Column, Line, Pie } from '@ant-design/plots';
import moment from 'moment';
import './Payroll.css';

const { Option } = Select;
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const Payroll = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [calculateModalVisible, setCalculateModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState([
    moment().startOf('month'),
    moment().endOf('month')
  ]);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [form] = Form.useForm();

  // Mock payroll data
  const mockPayrollData = [
    {
      key: '1',
      employeeId: 'EMP001',
      employeeName: 'Nguyễn Văn An',
      department: 'IT',
      position: 'Senior Developer',
      period: '2024-01',
      baseSalary: 25000000,
      workingDays: 22,
      actualDays: 21,
      overtimeHours: 15,
      overtimeRate: 200,
      overtimePay: 3409091,
      allowances: 2000000,
      bonuses: 1000000,
      grossSalary: 31409091,
      socialInsurance: 2825818,
      healthInsurance: 628182,
      unemploymentInsurance: 314091,
      personalIncomeTax: 1956410,
      totalDeductions: 5724501,
      netSalary: 25684590,
      status: 'paid',
      paymentDate: '2024-01-31',
      paymentMethod: 'bank_transfer',
      bankAccount: '123456789',
      notes: ''
    },
    {
      key: '2',
      employeeId: 'EMP002',
      employeeName: 'Trần Thị Bình',
      department: 'Marketing',
      position: 'Marketing Manager',
      period: '2024-01',
      baseSalary: 22000000,
      workingDays: 22,
      actualDays: 22,
      overtimeHours: 8,
      overtimeRate: 200,
      overtimePay: 1818182,
      allowances: 1500000,
      bonuses: 2000000,
      grossSalary: 27318182,
      socialInsurance: 2458636,
      healthInsurance: 546364,
      unemploymentInsurance: 273182,
      personalIncomeTax: 1451450,
      totalDeductions: 4729632,
      netSalary: 22588550,
      status: 'calculated',
      paymentDate: null,
      paymentMethod: 'bank_transfer',
      bankAccount: '987654321',
      notes: ''
    },
    {
      key: '3',
      employeeId: 'EMP003',
      employeeName: 'Lê Văn Cường',
      department: 'Kế toán',
      position: 'Accountant',
      period: '2024-01',
      baseSalary: 18000000,
      workingDays: 22,
      actualDays: 20,
      overtimeHours: 5,
      overtimeRate: 200,
      overtimePay: 681818,
      allowances: 1000000,
      bonuses: 0,
      grossSalary: 18863636,
      socialInsurance: 1697727,
      healthInsurance: 377273,
      unemploymentInsurance: 188636,
      personalIncomeTax: 886364,
      totalDeductions: 3150000,
      netSalary: 15713636,
      status: 'pending',
      paymentDate: null,
      paymentMethod: 'bank_transfer',
      bankAccount: '456789123',
      notes: 'Nghỉ 2 ngày không lương'
    }
  ];

  const [payrollSummary, setPayrollSummary] = useState({
    totalEmployees: 127,
    totalGrossSalary: 3465000000,
    totalNetSalary: 2892000000,
    totalDeductions: 573000000,
    averageNetSalary: 22779527,
    totalOvertimePay: 245000000,
    totalAllowances: 189000000
  });

  const departments = [
    { value: 'all', label: 'Tất cả phòng ban' },
    { value: 'IT', label: 'Phòng IT' },
    { value: 'Marketing', label: 'Phòng Marketing' },
    { value: 'Kế toán', label: 'Phòng Kế toán' },
    { value: 'Nhân sự', label: 'Phòng Nhân sự' },
    { value: 'Kinh doanh', label: 'Phòng Kinh doanh' }
  ];

  useEffect(() => {
    fetchPayrollData();
  }, [selectedPeriod, selectedDepartment]);

  const fetchPayrollData = () => {
    setLoading(true);
    setTimeout(() => {
      setPayrollData(mockPayrollData);
      setLoading(false);
    }, 1000);
  };

  const getStatusTag = (status) => {
    const statusConfig = {
      pending: { color: 'orange', icon: <ClockCircleOutlined />, text: 'Chờ tính lương' },
      calculated: { color: 'blue', icon: <CalculatorOutlined />, text: 'Đã tính lương' },
      paid: { color: 'green', icon: <CheckCircleOutlined />, text: 'Đã thanh toán' },
      error: { color: 'red', icon: <ExclamationCircleOutlined />, text: 'Lỗi' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <Tag color={config.color} icon={config.icon}>
        {config.text}
      </Tag>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const columns = [
    {
      title: 'Nhân viên',
      dataIndex: 'employeeName',
      key: 'employeeName',
      width: 180,
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 600, fontSize: '13px' }}>{text}</div>
          <Text type="secondary" style={{ fontSize: '11px' }}>
            {record.employeeId} - {record.position}
          </Text>
        </div>
      ),
      sorter: (a, b) => a.employeeName.localeCompare(b.employeeName),
    },
    {
      title: 'Phòng ban',
      dataIndex: 'department',
      key: 'department',
      width: 100,
      filters: departments.slice(1).map(dept => ({ text: dept.label, value: dept.value })),
      onFilter: (value, record) => record.department === value,
    },
    {
      title: 'Kỳ lương',
      dataIndex: 'period',
      key: 'period',
      width: 100,
      render: (period) => moment(period).format('MM/YYYY'),
      sorter: (a, b) => moment(a.period).unix() - moment(b.period).unix(),
    },
    {
      title: 'Lương cơ bản',
      dataIndex: 'baseSalary',
      key: 'baseSalary',
      width: 130,
      render: (salary) => (
        <Text style={{ fontWeight: 600, color: '#1890ff' }}>
          {formatCurrency(salary)}
        </Text>
      ),
      sorter: (a, b) => a.baseSalary - b.baseSalary,
    },
    {
      title: 'Công/OT',
      key: 'workInfo',
      width: 100,
      render: (_, record) => (
        <div>
          <div style={{ fontSize: '12px' }}>
            <Text>{record.actualDays}/{record.workingDays} ngày</Text>
          </div>
          <div style={{ fontSize: '12px' }}>
            <Text type="secondary">{record.overtimeHours}h OT</Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Tổng thu nhập',
      dataIndex: 'grossSalary',
      key: 'grossSalary',
      width: 130,
      render: (salary) => (
        <Text style={{ fontWeight: 600, color: '#52c41a' }}>
          {formatCurrency(salary)}
        </Text>
      ),
      sorter: (a, b) => a.grossSalary - b.grossSalary,
    },
    {
      title: 'Khấu trừ',
      dataIndex: 'totalDeductions',
      key: 'totalDeductions',
      width: 120,
      render: (deductions) => (
        <Text style={{ fontWeight: 600, color: '#f5222d' }}>
          -{formatCurrency(deductions)}
        </Text>
      ),
      sorter: (a, b) => a.totalDeductions - b.totalDeductions,
    },
    {
      title: 'Lương thực lĩnh',
      dataIndex: 'netSalary',
      key: 'netSalary',
      width: 140,
      render: (salary) => (
        <Text style={{ fontWeight: 700, color: '#722ed1', fontSize: '14px' }}>
          {formatCurrency(salary)}
        </Text>
      ),
      sorter: (a, b) => a.netSalary - b.netSalary,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: (status) => getStatusTag(status),
      filters: [
        { text: 'Chờ tính lương', value: 'pending' },
        { text: 'Đã tính lương', value: 'calculated' },
        { text: 'Đã thanh toán', value: 'paid' },
        { text: 'Lỗi', value: 'error' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 100,
      render: (_, record) => (
        <Space>
          <Tooltip title="Xem chi tiết">
            <Button
              type="link"
              icon={<EyeOutlined />}
              size="small"
              onClick={() => handleViewDetail(record)}
            />
          </Tooltip>
          <Tooltip title="Tính lại lương">
            <Button
              type="link"
              icon={<CalculatorOutlined />}
              size="small"
              onClick={() => handleRecalculate(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Dữ liệu biểu đồ lương theo phòng ban
  const salaryByDepartmentData = [
    { department: 'IT', avgSalary: 24000000, count: 25 },
    { department: 'Marketing', avgSalary: 20000000, count: 15 },
    { department: 'Kế toán', avgSalary: 18000000, count: 12 },
    { department: 'Nhân sự', avgSalary: 19000000, count: 8 },
    { department: 'Kinh doanh', avgSalary: 22000000, count: 20 },
    { department: 'Sản xuất', avgSalary: 16000000, count: 30 }
  ];

  // Dữ liệu xu hướng chi phí lương
  const salaryTrendData = [
    { month: 'T7/2023', total: 2800000000 },
    { month: 'T8/2023', total: 2850000000 },
    { month: 'T9/2023', total: 2920000000 },
    { month: 'T10/2023', total: 2980000000 },
    { month: 'T11/2023', total: 3020000000 },
    { month: 'T12/2023', total: 3100000000 },
    { month: 'T1/2024', total: 3180000000 }
  ];

  // Cấu hình biểu đồ
  const salaryByDeptConfig = {
    data: salaryByDepartmentData,
    xField: 'department',
    yField: 'avgSalary',
    color: '#722ed1',
    columnWidthRatio: 0.6,
    meta: {
      avgSalary: { alias: 'Lương trung bình (VNĐ)' },
      department: { alias: 'Phòng ban' }
    },
    label: {
      position: 'top',
      formatter: (v) => `${(v.avgSalary / 1000000).toFixed(0)}M`
    }
  };

  const salaryTrendConfig = {
    data: salaryTrendData,
    xField: 'month',
    yField: 'total',
    color: '#1890ff',
    smooth: true,
    meta: {
      total: { alias: 'Tổng chi phí lương (VNĐ)' },
      month: { alias: 'Tháng' }
    },
    label: {
      formatter: (v) => `${(v.total / 1000000000).toFixed(1)}B`
    }
  };

  const handleCalculatePayroll = () => {
    setCalculateModalVisible(true);
  };

  const handleViewDetail = (record) => {
    setSelectedPayroll(record);
    setDetailModalVisible(true);
  };

  const handleRecalculate = (record) => {
    message.success(`Đang tính lại lương cho ${record.employeeName}...`);
    // Implement recalculation logic
  };

  const handleBulkCalculate = () => {
    form.validateFields().then(values => {
      message.success('Đang tính lương hàng loạt...');
      setCalculateModalVisible(false);
      form.resetFields();
    });
  };

  return (
    <div className="payroll-container">
      {/* Header */}
      <div className="payroll-header">
        <Title level={2}>
          <DollarOutlined /> Quản lý lương
        </Title>
        <Text type="secondary">
          Tính toán và quản lý bảng lương nhân viên
        </Text>
      </div>

      {/* Summary Statistics */}
      <Row gutter={[16, 16]} className="payroll-summary">
        <Col xs={12} sm={8} lg={4}>
          <Card className="summary-card total-employees">
            <Statistic
              title="Tổng NV"
              value={payrollSummary.totalEmployees}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card className="summary-card gross-salary">
            <Statistic
              title="Tổng thu nhập"
              value={payrollSummary.totalGrossSalary}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#52c41a' }}
              formatter={(value) => `${(value / 1000000000).toFixed(1)}B`}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card className="summary-card deductions">
            <Statistic
              title="Tổng khấu trừ"
              value={payrollSummary.totalDeductions}
              prefix={<PercentageOutlined />}
              valueStyle={{ color: '#f5222d' }}
              formatter={(value) => `${(value / 1000000).toFixed(0)}M`}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card className="summary-card net-salary">
            <Statistic
              title="Thực lĩnh"
              value={payrollSummary.totalNetSalary}
              prefix={<BankOutlined />}
              valueStyle={{ color: '#722ed1' }}
              formatter={(value) => `${(value / 1000000000).toFixed(1)}B`}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card className="summary-card avg-salary">
            <Statistic
              title="TB thực lĩnh"
              value={payrollSummary.averageNetSalary}
              valueStyle={{ color: '#faad14' }}
              formatter={(value) => `${(value / 1000000).toFixed(1)}M`}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card className="summary-card overtime">
            <Statistic
              title="Tiền OT"
              value={payrollSummary.totalOvertimePay}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#eb2f96' }}
              formatter={(value) => `${(value / 1000000).toFixed(0)}M`}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]} className="payroll-charts">
        <Col xs={24} lg={14}>
          <Card title="Lương trung bình theo phòng ban" className="chart-card">
            <Column {...salaryByDeptConfig} height={300} />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title="Xu hướng chi phí lương" className="chart-card">
            <Line {...salaryTrendConfig} height={300} />
          </Card>
        </Col>
      </Row>

      {/* Filters and Actions */}
      <Card className="filters-card">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={6}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text strong>Kỳ lương</Text>
              <RangePicker
                value={selectedPeriod}
                onChange={setSelectedPeriod}
                picker="month"
                format="MM/YYYY"
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
          <Col xs={24} sm={24} md={14}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text strong>Thao tác</Text>
              <Space wrap>
                <Button
                  type="primary"
                  icon={<CalculatorOutlined />}
                  onClick={handleCalculatePayroll}
                  size="large"
                >
                  Tính lương hàng loạt
                </Button>
                <Button
                  icon={<DownloadOutlined />}
                  size="large"
                >
                  Xuất bảng lương
                </Button>
                <Button
                  icon={<PrinterOutlined />}
                  size="large"
                >
                  In phiếu lương
                </Button>
                <Button
                  icon={<FileTextOutlined />}
                  size="large"
                >
                  Báo cáo thuế
                </Button>
              </Space>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Status Alert */}
      <Alert
        message="Trạng thái tính lương tháng hiện tại"
        description={
          <div>
            <Progress 
              percent={75} 
              status="active"
              format={(percent) => `${percent}% hoàn thành`}
            />
            <div style={{ marginTop: 8 }}>
              <Tag color="green">Đã tính: 95 NV</Tag>
              <Tag color="orange">Chờ tính: 25 NV</Tag>
              <Tag color="blue">Đã thanh toán: 70 NV</Tag>
            </div>
          </div>
        }
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />

      {/* Payroll Table */}
      <Card className="payroll-table-card">
        <Table
          columns={columns}
          dataSource={payrollData}
          loading={loading}
          scroll={{ x: 1600 }}
          pagination={{
            total: payrollData.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} của ${total} bản ghi`,
          }}
          summary={(pageData) => {
            let totalGross = 0;
            let totalNet = 0;
            let totalDeductions = 0;

            pageData.forEach(({ grossSalary, netSalary, totalDeductions: deductions }) => {
              totalGross += grossSalary;
              totalNet += netSalary;
              totalDeductions += deductions;
            });

            return (
              <Table.Summary>
                <Table.Summary.Row style={{ background: '#fafafa', fontWeight: 600 }}>
                  <Table.Summary.Cell index={0} colSpan={5}>
                    <Text strong>Tổng cộng ({pageData.length} nhân viên)</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={5}>
                    <Text strong style={{ color: '#52c41a' }}>
                      {formatCurrency(totalGross)}
                    </Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={6}>
                    <Text strong style={{ color: '#f5222d' }}>
                      -{formatCurrency(totalDeductions)}
                    </Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={7}>
                    <Text strong style={{ color: '#722ed1' }}>
                      {formatCurrency(totalNet)}
                    </Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={8} colSpan={2}></Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            );
          }}
        />
      </Card>

      {/* Calculate Payroll Modal */}
      <Modal
        title="Tính lương hàng loạt"
        open={calculateModalVisible}
        onOk={handleBulkCalculate}
        onCancel={() => {
          setCalculateModalVisible(false);
          form.resetFields();
        }}
        okText="Bắt đầu tính lương"
        cancelText="Hủy"
        width={600}
      >
        <Form form={form} layout="vertical">
          <Alert
            message="Lưu ý"
            description="Việc tính lương sẽ ghi đè lên dữ liệu lương đã tính trước đó (nếu có). Vui lòng kiểm tra kỹ trước khi thực hiện."
            type="warning"
            showIcon
            style={{ marginBottom: 16 }}
          />
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="period"
                label="Kỳ lương"
                rules={[{ required: true, message: 'Vui lòng chọn kỳ lương!' }]}
              >
                <DatePicker
                  picker="month"
                  format="MM/YYYY"
                  style={{ width: '100%' }}
                  placeholder="Chọn tháng/năm"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="department"
                label="Phòng ban"
                rules={[{ required: true, message: 'Vui lòng chọn phòng ban!' }]}
              >
                <Select placeholder="Chọn phòng ban">
                  {departments.map(dept => (
                    <Option key={dept.value} value={dept.value}>
                      {dept.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="overtimeRate"
                label="Hệ số OT (%)"
                rules={[{ required: true, message: 'Vui lòng nhập hệ số OT!' }]}
                initialValue={200}
              >
                <Select>
                  <Option value={150}>150%</Option>
                  <Option value={200}>200%</Option>
                  <Option value={250}>250%</Option>
                  <Option value={300}>300%</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="includeAllowances"
                label="Tính phụ cấp"
                initialValue={true}
              >
                <Select>
                  <Option value={true}>Có</Option>
                  <Option value={false}>Không</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* Payroll Detail Modal */}
      <Modal
        title="Chi tiết bảng lương"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            Đóng
          </Button>,
          <Button key="print" type="primary" icon={<PrinterOutlined />}>
            In phiếu lương
          </Button>
        ]}
        width={800}
      >
        {selectedPayroll && (
          <div className="payroll-detail">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card size="small" style={{ background: '#f0f2f5' }}>
                  <Row>
                    <Col span={8}>
                      <Text strong>Nhân viên:</Text><br />
                      <Text style={{ fontSize: '16px', fontWeight: 600 }}>
                        {selectedPayroll.employeeName}
                      </Text><br />
                      <Text type="secondary">{selectedPayroll.employeeId}</Text>
                    </Col>
                    <Col span={8}>
                      <Text strong>Phòng ban:</Text><br />
                      <Text>{selectedPayroll.department}</Text><br />
                      <Text type="secondary">{selectedPayroll.position}</Text>
                    </Col>
                    <Col span={8}>
                      <Text strong>Kỳ lương:</Text><br />
                      <Text>{moment(selectedPayroll.period).format('MM/YYYY')}</Text><br />
                      {getStatusTag(selectedPayroll.status)}
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>

            <Divider />

            <Tabs defaultActiveKey="1">
              <TabPane tab="Chi tiết tính lương" key="1">
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Card title="Thu nhập" size="small" className="income-card">
                      <Descriptions column={1} size="small">
                        <Descriptions.Item label="Lương cơ bản">
                          <Text strong>{formatCurrency(selectedPayroll.baseSalary)}</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Tiền OT">
                          <Text>{formatCurrency(selectedPayroll.overtimePay)}</Text>
                          <Text type="secondary"> ({selectedPayroll.overtimeHours}h × {selectedPayroll.overtimeRate}%)</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Phụ cấp">
                          <Text>{formatCurrency(selectedPayroll.allowances)}</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Thưởng">
                          <Text>{formatCurrency(selectedPayroll.bonuses)}</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Tổng thu nhập">
                          <Text strong style={{ color: '#52c41a', fontSize: '16px' }}>
                            {formatCurrency(selectedPayroll.grossSalary)}
                          </Text>
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>
                  </Col>
                  
                  <Col span={12}>
                    <Card title="Khấu trừ" size="small" className="deduction-card">
                      <Descriptions column={1} size="small">
                        <Descriptions.Item label="BHXH (9%)">
                          <Text>{formatCurrency(selectedPayroll.socialInsurance)}</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="BHYT (2%)">
                          <Text>{formatCurrency(selectedPayroll.healthInsurance)}</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="BHTN (1%)">
                          <Text>{formatCurrency(selectedPayroll.unemploymentInsurance)}</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Thuế TNCN">
                          <Text>{formatCurrency(selectedPayroll.personalIncomeTax)}</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Tổng khấu trừ">
                          <Text strong style={{ color: '#f5222d', fontSize: '16px' }}>
                            {formatCurrency(selectedPayroll.totalDeductions)}
                          </Text>
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>
                  </Col>
                </Row>

                <Row style={{ marginTop: 16 }}>
                  <Col span={24}>
                    <Card size="small" style={{ background: '#722ed1', color: 'white' }}>
                      <Row justify="space-between" align="middle">
                        <Col>
                          <Text style={{ color: 'white', fontSize: '18px' }}>
                            <strong>Lương thực lĩnh:</strong>
                          </Text>
                        </Col>
                        <Col>
                          <Text style={{ color: 'white', fontSize: '24px', fontWeight: 700 }}>
                            {formatCurrency(selectedPayroll.netSalary)}
                          </Text>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              </TabPane>

              <TabPane tab="Thông tin chấm công" key="2">
                <Descriptions column={2} bordered size="small">
                  <Descriptions.Item label="Số ngày làm việc chuẩn">
                    {selectedPayroll.workingDays} ngày
                  </Descriptions.Item>
                  <Descriptions.Item label="Số ngày thực tế">
                    {selectedPayroll.actualDays} ngày
                  </Descriptions.Item>
                  <Descriptions.Item label="Số giờ OT">
                    {selectedPayroll.overtimeHours} giờ
                  </Descriptions.Item>
                  <Descriptions.Item label="Hệ số OT">
                    {selectedPayroll.overtimeRate}%
                  </Descriptions.Item>
                  <Descriptions.Item label="Tỷ lệ công">
                    <Progress 
                      percent={Math.round((selectedPayroll.actualDays / selectedPayroll.workingDays) * 100)}
                      size="small"
                      status={selectedPayroll.actualDays < selectedPayroll.workingDays ? "exception" : "success"}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label="Ghi chú">
                    {selectedPayroll.notes || 'Không có'}
                  </Descriptions.Item>
                </Descriptions>
              </TabPane>

              <TabPane tab="Thông tin thanh toán" key="3">
                <Descriptions column={2} bordered size="small">
                  <Descriptions.Item label="Trạng thái">
                    {getStatusTag(selectedPayroll.status)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Phương thức">
                    {selectedPayroll.paymentMethod === 'bank_transfer' ? 'Chuyển khoản' : 'Tiền mặt'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ngày thanh toán">
                    {selectedPayroll.paymentDate ? 
                      moment(selectedPayroll.paymentDate).format('DD/MM/YYYY') : 
                      'Chưa thanh toán'
                    }
                  </Descriptions.Item>
                  <Descriptions.Item label="Số tài khoản">
                    {selectedPayroll.bankAccount}
                  </Descriptions.Item>
                </Descriptions>
              </TabPane>
            </Tabs>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Payroll;

