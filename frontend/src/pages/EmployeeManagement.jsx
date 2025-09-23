import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  Row,
  Col,
  Avatar,
  Tag,
  Space,
  Typography,
  Tabs,
  Descriptions,
  Popconfirm,
  message,
  Divider,
  Progress,
  Statistic
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  IdcardOutlined,
  BankOutlined,
  UploadOutlined,
  EyeOutlined,
  DownloadOutlined,
  PrinterOutlined,
  TeamOutlined,
  TrophyOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import moment from 'moment';
import './EmployeeManagement.css';

const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [form] = Form.useForm();

  // Mock data
  const mockEmployees = [
    {
      key: '1',
      id: 'EMP001',
      avatar: null,
      fullName: 'Nguyễn Văn An',
      email: 'an.nguyen@company.com',
      phone: '0901234567',
      position: 'Senior Developer',
      department: 'IT',
      dateOfBirth: '1990-05-15',
      startDate: '2020-01-15',
      salary: 25000000,
      status: 'active',
      contractType: 'Chính thức',
      address: '123 Nguyễn Trãi, Q.1, TP.HCM',
      emergencyContact: '0987654321',
      education: 'Đại học Bách Khoa',
      skills: ['React', 'Node.js', 'MongoDB'],
      bankAccount: '123456789',
      bankName: 'Vietcombank',
      identityCard: '025123456789',
      taxCode: 'TAX001234',
      performance: 85
    },
    {
      key: '2',
      id: 'EMP002',
      avatar: null,
      fullName: 'Trần Thị Bình',
      email: 'binh.tran@company.com',
      phone: '0902345678',
      position: 'Marketing Manager',
      department: 'Marketing',
      dateOfBirth: '1988-03-20',
      startDate: '2019-06-01',
      salary: 22000000,
      status: 'active',
      contractType: 'Chính thức',
      address: '456 Lê Lợi, Q.3, TP.HCM',
      emergencyContact: '0987654322',
      education: 'Đại học Kinh tế',
      skills: ['Digital Marketing', 'SEO', 'Content Strategy'],
      bankAccount: '987654321',
      bankName: 'Techcombank',
      identityCard: '025987654321',
      taxCode: 'TAX002345',
      performance: 92
    },
    {
      key: '3',
      id: 'EMP003',
      avatar: null,
      fullName: 'Lê Văn Cường',
      email: 'cuong.le@company.com',
      phone: '0903456789',
      position: 'Accountant',
      department: 'Kế toán',
      dateOfBirth: '1992-08-10',
      startDate: '2021-03-01',
      salary: 18000000,
      status: 'active',
      contractType: 'Chính thức',
      address: '789 Hai Bà Trưng, Q.1, TP.HCM',
      emergencyContact: '0987654323',
      education: 'Đại học Tài chính - Kế toán',
      skills: ['Excel', 'SAP', 'Financial Analysis'],
      bankAccount: '456789123',
      bankName: 'BIDV',
      identityCard: '025456789123',
      taxCode: 'TAX003456',
      performance: 78
    },
    {
      key: '4',
      id: 'EMP004',
      avatar: null,
      fullName: 'Phạm Thị Dung',
      email: 'dung.pham@company.com',
      phone: '0904567890',
      position: 'HR Specialist',
      department: 'Nhân sự',
      dateOfBirth: '1991-12-05',
      startDate: '2020-08-15',
      salary: 20000000,
      status: 'on_leave',
      contractType: 'Chính thức',
      address: '321 Nguyễn Huệ, Q.1, TP.HCM',
      emergencyContact: '0987654324',
      education: 'Đại học Khoa học Xã hội và Nhân văn',
      skills: ['Recruitment', 'Training', 'Labor Law'],
      bankAccount: '789123456',
      bankName: 'VPBank',
      identityCard: '025789123456',
      taxCode: 'TAX004567',
      performance: 88
    }
  ];

  const [departmentStats, setDepartmentStats] = useState({
    IT: { count: 25, avgSalary: 24000000 },
    Marketing: { count: 15, avgSalary: 20000000 },
    'Kế toán': { count: 12, avgSalary: 18000000 },
    'Nhân sự': { count: 8, avgSalary: 19000000 }
  });

  const departments = [
    'IT', 'Marketing', 'Kế toán', 'Nhân sự', 'Kinh doanh', 'Sản xuất'
  ];

  const positions = [
    'Intern', 'Junior', 'Senior', 'Lead', 'Manager', 'Director'
  ];

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    setLoading(true);
    setTimeout(() => {
      setEmployees(mockEmployees);
      setLoading(false);
    }, 1000);
  };

  const getStatusTag = (status) => {
    const statusConfig = {
      active: { color: 'green', text: 'Đang làm việc' },
      on_leave: { color: 'orange', text: 'Đang nghỉ phép' },
      terminated: { color: 'red', text: 'Đã nghỉ việc' },
      probation: { color: 'blue', text: 'Thử việc' }
    };
    const config = statusConfig[status] || statusConfig.active;
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getPerformanceColor = (score) => {
    if (score >= 90) return '#52c41a';
    if (score >= 80) return '#1890ff';
    if (score >= 70) return '#faad14';
    return '#f5222d';
  };

  const columns = [
    {
      title: 'Nhân viên',
      dataIndex: 'fullName',
      key: 'fullName',
      width: 200,
      render: (text, record) => (
        <Space>
          <Avatar
            size={40}
            src={record.avatar}
            icon={<UserOutlined />}
            style={{ backgroundColor: '#1890ff' }}
          />
          <div>
            <div style={{ fontWeight: 600, fontSize: '14px' }}>{text}</div>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {record.id}
            </Text>
          </div>
        </Space>
      ),
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: 'Liên hệ',
      key: 'contact',
      width: 180,
      render: (_, record) => (
        <div>
          <div style={{ fontSize: '12px', marginBottom: '4px' }}>
            <MailOutlined style={{ color: '#1890ff', marginRight: '4px' }} />
            {record.email}
          </div>
          <div style={{ fontSize: '12px' }}>
            <PhoneOutlined style={{ color: '#52c41a', marginRight: '4px' }} />
            {record.phone}
          </div>
        </div>
      ),
    },
    {
      title: 'Vị trí',
      dataIndex: 'position',
      key: 'position',
      width: 150,
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 600, fontSize: '13px' }}>{text}</div>
          <Text type="secondary" style={{ fontSize: '11px' }}>
            {record.department}
          </Text>
        </div>
      ),
      filters: departments.map(dept => ({ text: dept, value: dept })),
      onFilter: (value, record) => record.department === value,
    },
    {
      title: 'Ngày vào làm',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 120,
      render: (date) => (
        <div>
          <div style={{ fontSize: '12px' }}>
            {moment(date).format('DD/MM/YYYY')}
          </div>
          <Text type="secondary" style={{ fontSize: '11px' }}>
            {moment().diff(moment(date), 'months')} tháng
          </Text>
        </div>
      ),
      sorter: (a, b) => moment(a.startDate).unix() - moment(b.startDate).unix(),
    },
    {
      title: 'Lương cơ bản',
      dataIndex: 'salary',
      key: 'salary',
      width: 120,
      render: (salary) => (
        <Text style={{ fontWeight: 600, color: '#52c41a' }}>
          {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
          }).format(salary)}
        </Text>
      ),
      sorter: (a, b) => a.salary - b.salary,
    },
    {
      title: 'Hiệu suất',
      dataIndex: 'performance',
      key: 'performance',
      width: 100,
      render: (score) => (
        <div style={{ textAlign: 'center' }}>
          <Progress
            type="circle"
            size={40}
            percent={score}
            strokeColor={getPerformanceColor(score)}
            format={() => score}
          />
        </div>
      ),
      sorter: (a, b) => a.performance - b.performance,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => getStatusTag(status),
      filters: [
        { text: 'Đang làm việc', value: 'active' },
        { text: 'Đang nghỉ phép', value: 'on_leave' },
        { text: 'Đã nghỉ việc', value: 'terminated' },
        { text: 'Thử việc', value: 'probation' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => handleViewEmployee(record)}
          />
          <Button
            type="link"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEditEmployee(record)}
          />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa nhân viên này?"
            onConfirm={() => handleDeleteEmployee(record.key)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button
              type="link"
              icon={<DeleteOutlined />}
              size="small"
              danger
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setModalVisible(true);
    form.resetFields();
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setModalVisible(true);
    form.setFieldsValue({
      ...employee,
      dateOfBirth: moment(employee.dateOfBirth),
      startDate: moment(employee.startDate),
    });
  };

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setDetailModalVisible(true);
  };

  const handleDeleteEmployee = (key) => {
    setEmployees(employees.filter(emp => emp.key !== key));
    message.success('Xóa nhân viên thành công!');
  };

  const handleSaveEmployee = () => {
    form.validateFields().then(values => {
      const newEmployee = {
        ...values,
        key: editingEmployee ? editingEmployee.key : Date.now().toString(),
        id: editingEmployee ? editingEmployee.id : `EMP${String(employees.length + 1).padStart(3, '0')}`,
        dateOfBirth: values.dateOfBirth.format('YYYY-MM-DD'),
        startDate: values.startDate.format('YYYY-MM-DD'),
        performance: editingEmployee ? editingEmployee.performance : 75,
      };

      if (editingEmployee) {
        setEmployees(employees.map(emp => 
          emp.key === editingEmployee.key ? newEmployee : emp
        ));
        message.success('Cập nhật nhân viên thành công!');
      } else {
        setEmployees([...employees, newEmployee]);
        message.success('Thêm nhân viên thành công!');
      }

      setModalVisible(false);
      form.resetFields();
    });
  };

  const uploadProps = {
    name: 'avatar',
    listType: 'picture-card',
    className: 'avatar-uploader',
    showUploadList: false,
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('Chỉ có thể tải lên file JPG/PNG!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Ảnh phải nhỏ hơn 2MB!');
      }
      return isJpgOrPng && isLt2M;
    },
  };

  return (
    <div className="employee-management-container">
      {/* Header */}
      <div className="employee-header">
        <Title level={2}>
          <TeamOutlined /> Quản lý nhân sự
        </Title>
        <Text type="secondary">
          Quản lý thông tin nhân viên, hồ sơ và hiệu suất làm việc
        </Text>
      </div>

      {/* Statistics */}
      <Row gutter={[16, 16]} className="employee-stats">
        <Col xs={12} sm={6}>
          <Card className="stat-card">
            <Statistic
              title="Tổng nhân viên"
              value={employees.length}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="stat-card">
            <Statistic
              title="Đang làm việc"
              value={employees.filter(emp => emp.status === 'active').length}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="stat-card">
            <Statistic
              title="Hiệu suất TB"
              value={Math.round(employees.reduce((acc, emp) => acc + emp.performance, 0) / employees.length || 0)}
              suffix="%"
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="stat-card">
            <Statistic
              title="Tuyển mới T.này"
              value={employees.filter(emp => 
                moment(emp.startDate).month() === moment().month()
              ).length}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Actions */}
      <Card className="actions-card">
        <Row justify="space-between" align="middle">
          <Col>
            <Space>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddEmployee}
                size="large"
              >
                Thêm nhân viên
              </Button>
              <Button
                icon={<DownloadOutlined />}
                size="large"
              >
                Xuất Excel
              </Button>
              <Button
                icon={<PrinterOutlined />}
                size="large"
              >
                In danh sách
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Employee Table */}
      <Card className="employee-table-card">
        <Table
          columns={columns}
          dataSource={employees}
          loading={loading}
          scroll={{ x: 1400 }}
          pagination={{
            total: employees.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} của ${total} nhân viên`,
          }}
          rowClassName={() => 'employee-row'}
        />
      </Card>

      {/* Add/Edit Employee Modal */}
      <Modal
        title={editingEmployee ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên mới'}
        open={modalVisible}
        onOk={handleSaveEmployee}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        okText="Lưu"
        cancelText="Hủy"
        width={800}
        className="employee-modal"
      >
        <Form form={form} layout="vertical">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Thông tin cơ bản" key="1">
              <Row gutter={16}>
                <Col span={24} style={{ textAlign: 'center', marginBottom: 16 }}>
                  <Upload {...uploadProps}>
                    <div className="upload-avatar">
                      <Avatar size={80} icon={<UserOutlined />} />
                      <div style={{ marginTop: 8 }}>
                        <UploadOutlined /> Tải ảnh đại diện
                      </div>
                    </div>
                  </Upload>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="fullName"
                    label="Họ và tên"
                    rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="Nhập họ và tên" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: 'Vui lòng nhập email!' },
                      { type: 'email', message: 'Email không hợp lệ!' }
                    ]}
                  >
                    <Input prefix={<MailOutlined />} placeholder="Nhập email" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                  >
                    <Input prefix={<PhoneOutlined />} placeholder="Nhập số điện thoại" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="dateOfBirth"
                    label="Ngày sinh"
                    rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
                  >
                    <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name="department"
                    label="Phòng ban"
                    rules={[{ required: true, message: 'Vui lòng chọn phòng ban!' }]}
                  >
                    <Select placeholder="Chọn phòng ban">
                      {departments.map(dept => (
                        <Option key={dept} value={dept}>{dept}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="position"
                    label="Vị trí"
                    rules={[{ required: true, message: 'Vui lòng nhập vị trí!' }]}
                  >
                    <Input placeholder="Nhập vị trí" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="startDate"
                    label="Ngày vào làm"
                    rules={[{ required: true, message: 'Vui lòng chọn ngày vào làm!' }]}
                  >
                    <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>
            
            <TabPane tab="Thông tin lương & hợp đồng" key="2">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="salary"
                    label="Lương cơ bản"
                    rules={[{ required: true, message: 'Vui lòng nhập lương!' }]}
                  >
                    <Input
                      prefix="₫"
                      placeholder="Nhập lương cơ bản"
                      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="contractType"
                    label="Loại hợp đồng"
                    rules={[{ required: true, message: 'Vui lòng chọn loại hợp đồng!' }]}
                  >
                    <Select placeholder="Chọn loại hợp đồng">
                      <Option value="Thử việc">Thử việc</Option>
                      <Option value="Có thời hạn">Có thời hạn</Option>
                      <Option value="Chính thức">Chính thức</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="bankAccount"
                    label="Số tài khoản"
                  >
                    <Input prefix={<BankOutlined />} placeholder="Nhập số tài khoản" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="bankName"
                    label="Ngân hàng"
                  >
                    <Select placeholder="Chọn ngân hàng">
                      <Option value="Vietcombank">Vietcombank</Option>
                      <Option value="Techcombank">Techcombank</Option>
                      <Option value="BIDV">BIDV</Option>
                      <Option value="VPBank">VPBank</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="identityCard"
                    label="CMND/CCCD"
                    rules={[{ required: true, message: 'Vui lòng nhập CMND/CCCD!' }]}
                  >
                    <Input prefix={<IdcardOutlined />} placeholder="Nhập số CMND/CCCD" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="taxCode"
                    label="Mã số thuế"
                  >
                    <Input placeholder="Nhập mã số thuế" />
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>
            
            <TabPane tab="Thông tin bổ sung" key="3">
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="address"
                    label="Địa chỉ"
                  >
                    <TextArea 
                      rows={3} 
                      placeholder="Nhập địa chỉ thường trú"
                      prefix={<HomeOutlined />}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="emergencyContact"
                    label="Liên hệ khẩn cấp"
                  >
                    <Input prefix={<PhoneOutlined />} placeholder="Nhập SĐT khẩn cấp" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="education"
                    label="Trình độ học vấn"
                  >
                    <Input placeholder="Nhập trình độ học vấn" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="skills"
                    label="Kỹ năng"
                  >
                    <Select
                      mode="tags"
                      placeholder="Nhập các kỹ năng"
                      style={{ width: '100%' }}
                    >
                      <Option value="React">React</Option>
                      <Option value="Node.js">Node.js</Option>
                      <Option value="Python">Python</Option>
                      <Option value="Java">Java</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="status"
                    label="Trạng thái"
                    rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
                  >
                    <Select placeholder="Chọn trạng thái">
                      <Option value="active">Đang làm việc</Option>
                      <Option value="probation">Thử việc</Option>
                      <Option value="on_leave">Đang nghỉ phép</Option>
                      <Option value="terminated">Đã nghỉ việc</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Form>
      </Modal>

      {/* Employee Detail Modal */}
      <Modal
        title="Thông tin chi tiết nhân viên"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            Đóng
          </Button>,
          <Button key="edit" type="primary" onClick={() => {
            setDetailModalVisible(false);
            handleEditEmployee(selectedEmployee);
          }}>
            Chỉnh sửa
          </Button>
        ]}
        width={800}
      >
        {selectedEmployee && (
          <div className="employee-detail">
            <Row gutter={[16, 16]}>
              <Col span={24} style={{ textAlign: 'center', marginBottom: 16 }}>
                <Avatar size={80} src={selectedEmployee.avatar} icon={<UserOutlined />} />
                <Title level={4} style={{ margin: '8px 0 4px' }}>
                  {selectedEmployee.fullName}
                </Title>
                <Text type="secondary">{selectedEmployee.id}</Text>
                <div style={{ marginTop: 8 }}>
                  {getStatusTag(selectedEmployee.status)}
                </div>
              </Col>
            </Row>
            
            <Tabs defaultActiveKey="1">
              <TabPane tab="Thông tin cá nhân" key="1">
                <Descriptions column={2} bordered size="small">
                  <Descriptions.Item label="Email">{selectedEmployee.email}</Descriptions.Item>
                  <Descriptions.Item label="Điện thoại">{selectedEmployee.phone}</Descriptions.Item>
                  <Descriptions.Item label="Ngày sinh">
                    {moment(selectedEmployee.dateOfBirth).format('DD/MM/YYYY')}
                  </Descriptions.Item>
                  <Descriptions.Item label="CMND/CCCD">{selectedEmployee.identityCard}</Descriptions.Item>
                  <Descriptions.Item label="Địa chỉ" span={2}>{selectedEmployee.address}</Descriptions.Item>
                  <Descriptions.Item label="Liên hệ khẩn cấp">{selectedEmployee.emergencyContact}</Descriptions.Item>
                  <Descriptions.Item label="Trình độ học vấn">{selectedEmployee.education}</Descriptions.Item>
                </Descriptions>
              </TabPane>
              
              <TabPane tab="Thông tin công việc" key="2">
                <Descriptions column={2} bordered size="small">
                  <Descriptions.Item label="Vị trí">{selectedEmployee.position}</Descriptions.Item>
                  <Descriptions.Item label="Phòng ban">{selectedEmployee.department}</Descriptions.Item>
                  <Descriptions.Item label="Ngày vào làm">
                    {moment(selectedEmployee.startDate).format('DD/MM/YYYY')}
                  </Descriptions.Item>
                  <Descriptions.Item label="Thời gian làm việc">
                    {moment().diff(moment(selectedEmployee.startDate), 'months')} tháng
                  </Descriptions.Item>
                  <Descriptions.Item label="Lương cơ bản">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    }).format(selectedEmployee.salary)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Loại hợp đồng">{selectedEmployee.contractType}</Descriptions.Item>
                  <Descriptions.Item label="Kỹ năng" span={2}>
                    {selectedEmployee.skills?.map(skill => (
                      <Tag key={skill} color="blue">{skill}</Tag>
                    ))}
                  </Descriptions.Item>
                </Descriptions>
              </TabPane>
              
              <TabPane tab="Thông tin tài chính" key="3">
                <Descriptions column={2} bordered size="small">
                  <Descriptions.Item label="Số tài khoản">{selectedEmployee.bankAccount}</Descriptions.Item>
                  <Descriptions.Item label="Ngân hàng">{selectedEmployee.bankName}</Descriptions.Item>
                  <Descriptions.Item label="Mã số thuế">{selectedEmployee.taxCode}</Descriptions.Item>
                  <Descriptions.Item label="Hiệu suất làm việc">
                    <Progress 
                      percent={selectedEmployee.performance} 
                      size="small"
                      strokeColor={getPerformanceColor(selectedEmployee.performance)}
                    />
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

export default EmployeeManagement;

