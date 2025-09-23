import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Row,
  Col,
  Typography,
  Tag,
  Space,
  Statistic,
  Steps,
  Timeline,
  Avatar,
  Tooltip,
  Progress,
  Alert,
  message,
  Tabs,
  Badge,
  Calendar,
  Descriptions
} from 'antd';
import {
  CalendarOutlined,
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
  UserOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
  HistoryOutlined,
  TeamOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import moment from 'moment';
import './LeaveRequest.css';

const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Step } = Steps;

const LeaveRequest = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [activeTab, setActiveTab] = useState('my-requests');
  const [form] = Form.useForm();

  // Mock data for leave requests
  const mockLeaveRequests = [
    {
      key: '1',
      id: 'LR001',
      employeeId: 'EMP001',
      employeeName: 'Nguyễn Văn An',
      department: 'IT',
      position: 'Senior Developer',
      avatar: null,
      leaveType: 'annual',
      startDate: '2024-01-25',
      endDate: '2024-01-26',
      days: 2,
      reason: 'Nghỉ phép thường niên, về quê ăn Tết',
      status: 'approved',
      submittedDate: '2024-01-15',
      approvedBy: 'Trần Văn Quản Lý',
      approvedDate: '2024-01-16',
      comments: 'Đã phê duyệt, chúc nhân viên năm mới vui vẻ',
      remainingDays: 18,
      usedDays: 2
    },
    {
      key: '2',
      id: 'LR002',
      employeeId: 'EMP002',
      employeeName: 'Trần Thị Bình',
      department: 'Marketing',
      position: 'Marketing Manager',
      avatar: null,
      leaveType: 'sick',
      startDate: '2024-01-20',
      endDate: '2024-01-20',
      days: 1,
      reason: 'Bị cảm sốt, cần nghỉ ngơi điều trị',
      status: 'pending',
      submittedDate: '2024-01-19',
      approvedBy: null,
      approvedDate: null,
      comments: null,
      remainingDays: 20,
      usedDays: 0
    },
    {
      key: '3',
      id: 'LR003',
      employeeId: 'EMP003',
      employeeName: 'Lê Văn Cường',
      department: 'Kế toán',
      position: 'Accountant',
      avatar: null,
      leaveType: 'personal',
      startDate: '2024-01-22',
      endDate: '2024-01-24',
      days: 3,
      reason: 'Có việc gia đình cần giải quyết gấp',
      status: 'rejected',
      submittedDate: '2024-01-18',
      approvedBy: 'Trần Văn Quản Lý',
      approvedDate: '2024-01-19',
      comments: 'Thời gian này công ty bận, vui lòng chọn thời gian khác',
      remainingDays: 20,
      usedDays: 0
    },
    {
      key: '4',
      id: 'LR004',
      employeeId: 'EMP004',
      employeeName: 'Phạm Thị Dung',
      department: 'Nhân sự',
      position: 'HR Specialist',
      avatar: null,
      leaveType: 'maternity',
      startDate: '2024-02-01',
      endDate: '2024-05-31',
      days: 120,
      reason: 'Nghỉ thai sản theo quy định pháp luật',
      status: 'approved',
      submittedDate: '2024-01-10',
      approvedBy: 'Trần Văn Quản Lý',
      approvedDate: '2024-01-11',
      comments: 'Chúc mừng nhân viên, công ty sẽ hỗ trợ tối đa',
      remainingDays: 20,
      usedDays: 0
    }
  ];

  const [leaveStats, setLeaveStats] = useState({
    totalRequests: 24,
    pendingRequests: 6,
    approvedRequests: 15,
    rejectedRequests: 3,
    avgProcessingTime: 1.5,
    totalLeaveDays: 156
  });

  const leaveTypes = [
    { value: 'annual', label: 'Phép thường niên', color: 'blue', quota: 20 },
    { value: 'sick', label: 'Nghỉ ốm', color: 'orange', quota: 30 },
    { value: 'personal', label: 'Phép cá nhân', color: 'purple', quota: 10 },
    { value: 'maternity', label: 'Nghỉ thai sản', color: 'pink', quota: 180 },
    { value: 'paternity', label: 'Nghỉ chăm con', color: 'cyan', quota: 5 },
    { value: 'emergency', label: 'Nghỉ khẩn cấp', color: 'red', quota: 5 }
  ];

  const userRole = 'manager'; // current user role: 'employee' or 'manager'

  useEffect(() => {
    fetchLeaveRequests();
  }, [activeTab]);

  const fetchLeaveRequests = () => {
    setLoading(true);
    setTimeout(() => {
      setLeaveRequests(mockLeaveRequests);
      setLoading(false);
    }, 1000);
  };

  const getStatusTag = (status) => {
    const statusConfig = {
      pending: { color: 'orange', icon: <ClockCircleOutlined />, text: 'Chờ duyệt' },
      approved: { color: 'green', icon: <CheckOutlined />, text: 'Đã duyệt' },
      rejected: { color: 'red', icon: <CloseOutlined />, text: 'Từ chối' },
      cancelled: { color: 'default', icon: <ExclamationCircleOutlined />, text: 'Đã hủy' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <Tag color={config.color} icon={config.icon}>
        {config.text}
      </Tag>
    );
  };

  const getLeaveTypeTag = (type) => {
    const leaveType = leaveTypes.find(t => t.value === type);
    return leaveType ? (
      <Tag color={leaveType.color}>{leaveType.label}</Tag>
    ) : null;
  };

  const columns = [
    {
      title: 'Nhân viên',
      dataIndex: 'employeeName',
      key: 'employeeName',
      width: 180,
      render: (text, record) => (
        <Space>
          <Avatar
            size={32}
            src={record.avatar}
            icon={<UserOutlined />}
            style={{ backgroundColor: '#1890ff' }}
          />
          <div>
            <div style={{ fontWeight: 600, fontSize: '13px' }}>{text}</div>
            <Text type="secondary" style={{ fontSize: '11px' }}>
              {record.employeeId} - {record.department}
            </Text>
          </div>
        </Space>
      ),
      sorter: (a, b) => a.employeeName.localeCompare(b.employeeName),
    },
    {
      title: 'Mã đơn',
      dataIndex: 'id',
      key: 'id',
      width: 90,
      render: (id) => (
        <Text code style={{ fontSize: '12px' }}>{id}</Text>
      ),
    },
    {
      title: 'Loại phép',
      dataIndex: 'leaveType',
      key: 'leaveType',
      width: 120,
      render: (type) => getLeaveTypeTag(type),
      filters: leaveTypes.map(type => ({ text: type.label, value: type.value })),
      onFilter: (value, record) => record.leaveType === value,
    },
    {
      title: 'Thời gian nghỉ',
      key: 'duration',
      width: 160,
      render: (_, record) => (
        <div>
          <div style={{ fontSize: '12px' }}>
            {moment(record.startDate).format('DD/MM/YYYY')}
            {record.startDate !== record.endDate && 
              ` - ${moment(record.endDate).format('DD/MM/YYYY')}`
            }
          </div>
          <Text type="secondary" style={{ fontSize: '11px' }}>
            {record.days} ngày
          </Text>
        </div>
      ),
      sorter: (a, b) => moment(a.startDate).unix() - moment(b.startDate).unix(),
    },
    {
      title: 'Lý do',
      dataIndex: 'reason',
      key: 'reason',
      width: 200,
      render: (reason) => (
        <Tooltip title={reason}>
          <Text ellipsis style={{ maxWidth: '180px', display: 'block' }}>
            {reason}
          </Text>
        </Tooltip>
      ),
    },
    {
      title: 'Ngày gửi',
      dataIndex: 'submittedDate',
      key: 'submittedDate',
      width: 100,
      render: (date) => moment(date).format('DD/MM/YYYY'),
      sorter: (a, b) => moment(a.submittedDate).unix() - moment(b.submittedDate).unix(),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => getStatusTag(status),
      filters: [
        { text: 'Chờ duyệt', value: 'pending' },
        { text: 'Đã duyệt', value: 'approved' },
        { text: 'Từ chối', value: 'rejected' },
        { text: 'Đã hủy', value: 'cancelled' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 120,
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
          {userRole === 'manager' && record.status === 'pending' && (
            <>
              <Tooltip title="Phê duyệt">
                <Button
                  type="link"
                  icon={<CheckOutlined />}
                  size="small"
                  style={{ color: '#52c41a' }}
                  onClick={() => handleApprove(record)}
                />
              </Tooltip>
              <Tooltip title="Từ chối">
                <Button
                  type="link"
                  icon={<CloseOutlined />}
                  size="small"
                  style={{ color: '#f5222d' }}
                  onClick={() => handleReject(record)}
                />
              </Tooltip>
            </>
          )}
          {record.status === 'pending' && (
            <Tooltip title="Chỉnh sửa">
              <Button
                type="link"
                icon={<EditOutlined />}
                size="small"
                onClick={() => handleEdit(record)}
              />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  const handleCreateRequest = () => {
    setCreateModalVisible(true);
    form.resetFields();
  };

  const handleSubmitRequest = () => {
    form.validateFields().then(values => {
      const newRequest = {
        ...values,
        key: Date.now().toString(),
        id: `LR${String(leaveRequests.length + 1).padStart(3, '0')}`,
        employeeId: 'EMP001', // current user
        employeeName: 'Nguyễn Văn An',
        department: 'IT',
        position: 'Senior Developer',
        startDate: values.dateRange[0].format('YYYY-MM-DD'),
        endDate: values.dateRange[1].format('YYYY-MM-DD'),
        days: values.dateRange[1].diff(values.dateRange[0], 'days') + 1,
        status: 'pending',
        submittedDate: moment().format('YYYY-MM-DD'),
        approvedBy: null,
        approvedDate: null,
        comments: null
      };

      setLeaveRequests([newRequest, ...leaveRequests]);
      message.success('Gửi yêu cầu nghỉ phép thành công!');
      setCreateModalVisible(false);
      form.resetFields();
    });
  };

  const handleViewDetail = (record) => {
    setSelectedRequest(record);
    setDetailModalVisible(true);
  };

  const handleApprove = (record) => {
    Modal.confirm({
      title: 'Phê duyệt yêu cầu nghỉ phép',
      content: `Bạn có chắc chắn muốn phê duyệt yêu cầu nghỉ phép của ${record.employeeName}?`,
      okText: 'Phê duyệt',
      cancelText: 'Hủy',
      onOk: () => {
        setLeaveRequests(leaveRequests.map(req => 
          req.key === record.key 
            ? { ...req, status: 'approved', approvedBy: 'Trần Văn Quản Lý', approvedDate: moment().format('YYYY-MM-DD') }
            : req
        ));
        message.success('Đã phê duyệt yêu cầu nghỉ phép!');
      }
    });
  };

  const handleReject = (record) => {
    Modal.confirm({
      title: 'Từ chối yêu cầu nghỉ phép',
      content: (
        <div>
          <p>Bạn có chắc chắn muốn từ chối yêu cầu nghỉ phép của {record.employeeName}?</p>
          <Input.TextArea 
            placeholder="Nhập lý do từ chối..."
            rows={3}
            id="rejection-reason"
          />
        </div>
      ),
      okText: 'Từ chối',
      cancelText: 'Hủy',
      okType: 'danger',
      onOk: () => {
        const reason = document.getElementById('rejection-reason').value;
        setLeaveRequests(leaveRequests.map(req => 
          req.key === record.key 
            ? { 
                ...req, 
                status: 'rejected', 
                approvedBy: 'Trần Văn Quản Lý', 
                approvedDate: moment().format('YYYY-MM-DD'),
                comments: reason || 'Không đáp ứng yêu cầu'
              }
            : req
        ));
        message.success('Đã từ chối yêu cầu nghỉ phép!');
      }
    });
  };

  const handleEdit = (record) => {
    form.setFieldsValue({
      leaveType: record.leaveType,
      dateRange: [moment(record.startDate), moment(record.endDate)],
      reason: record.reason
    });
    setCreateModalVisible(true);
  };

  // Calendar data for leave visualization
  const getCalendarData = (value) => {
    const dateStr = value.format('YYYY-MM-DD');
    const leaves = leaveRequests.filter(req => 
      moment(dateStr).isBetween(req.startDate, req.endDate, 'day', '[]') &&
      req.status === 'approved'
    );
    
    if (leaves.length > 0) {
      return {
        type: 'success',
        content: `${leaves.length} người nghỉ`
      };
    }
    return null;
  };

  const dateCellRender = (value) => {
    const data = getCalendarData(value);
    if (data) {
      return (
        <div className="calendar-leave-indicator">
          <Badge status={data.type} text={data.content} />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="leave-request-container">
      {/* Header */}
      <div className="leave-header">
        <Title level={2}>
          <CalendarOutlined /> Quản lý nghỉ phép
        </Title>
        <Text type="secondary">
          Quản lý yêu cầu nghỉ phép và theo dõi tình hình nghỉ phép của nhân viên
        </Text>
      </div>

      {/* Statistics */}
      <Row gutter={[16, 16]} className="leave-stats">
        <Col xs={12} sm={8} lg={4}>
          <Card className="stat-card total">
            <Statistic
              title="Tổng yêu cầu"
              value={leaveStats.totalRequests}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card className="stat-card pending">
            <Statistic
              title="Chờ duyệt"
              value={leaveStats.pendingRequests}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card className="stat-card approved">
            <Statistic
              title="Đã duyệt"
              value={leaveStats.approvedRequests}
              prefix={<CheckOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card className="stat-card rejected">
            <Statistic
              title="Từ chối"
              value={leaveStats.rejectedRequests}
              prefix={<CloseOutlined />}
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card className="stat-card processing-time">
            <Statistic
              title="TB xử lý"
              value={leaveStats.avgProcessingTime}
              suffix="ngày"
              prefix={<HistoryOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card className="stat-card total-days">
            <Statistic
              title="Tổng ngày nghỉ"
              value={leaveStats.totalLeaveDays}
              suffix="ngày"
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#eb2f96' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Card className="leave-content-card">
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          tabBarExtraContent={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleCreateRequest}
            >
              Tạo yêu cầu nghỉ phép
            </Button>
          }
        >
          <TabPane tab="Yêu cầu của tôi" key="my-requests">
            <Table
              columns={columns}
              dataSource={leaveRequests.filter(req => req.employeeId === 'EMP001')}
              loading={loading}
              scroll={{ x: 1200 }}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => 
                  `${range[0]}-${range[1]} của ${total} yêu cầu`,
              }}
            />
          </TabPane>

          {userRole === 'manager' && (
            <TabPane tab={
              <Badge count={leaveStats.pendingRequests} size="small">
                Tất cả yêu cầu
              </Badge>
            } key="all-requests">
              <Table
                columns={columns}
                dataSource={leaveRequests}
                loading={loading}
                scroll={{ x: 1200 }}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => 
                    `${range[0]}-${range[1]} của ${total} yêu cầu`,
                }}
              />
            </TabPane>
          )}

          <TabPane tab="Lịch nghỉ phép" key="calendar">
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={16}>
                <Calendar 
                  dateCellRender={dateCellRender}
                  className="leave-calendar"
                />
              </Col>
              <Col xs={24} lg={8}>
                <Card title="Chú thích" size="small">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div>
                      <Badge status="success" /> Có người nghỉ phép
                    </div>
                    <div>
                      <Badge status="default" /> Ngày bình thường
                    </div>
                  </Space>
                </Card>
                
                <Card title="Hạn mức nghỉ phép" size="small" style={{ marginTop: 16 }}>
                  {leaveTypes.map(type => (
                    <div key={type.value} style={{ marginBottom: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <Tag color={type.color} style={{ margin: 0 }}>{type.label}</Tag>
                        <Text style={{ fontSize: '12px' }}>0/{type.quota} ngày</Text>
                      </div>
                      <Progress 
                        percent={0} 
                        size="small" 
                        strokeColor={type.color}
                        showInfo={false}
                      />
                    </div>
                  ))}
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Card>

      {/* Create Request Modal */}
      <Modal
        title="Tạo yêu cầu nghỉ phép"
        open={createModalVisible}
        onOk={handleSubmitRequest}
        onCancel={() => {
          setCreateModalVisible(false);
          form.resetFields();
        }}
        okText="Gửi yêu cầu"
        cancelText="Hủy"
        width={600}
      >
        <Form form={form} layout="vertical">
          <Alert
            message="Lưu ý"
            description="Vui lòng gửi yêu cầu nghỉ phép trước ít nhất 2 ngày làm việc. Yêu cầu khẩn cấp cần liên hệ trực tiếp với quản lý."
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="leaveType"
                label="Loại phép"
                rules={[{ required: true, message: 'Vui lòng chọn loại phép!' }]}
              >
                <Select placeholder="Chọn loại phép">
                  {leaveTypes.map(type => (
                    <Option key={type.value} value={type.value}>
                      <Tag color={type.color}>{type.label}</Tag>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateRange"
                label="Thời gian nghỉ"
                rules={[{ required: true, message: 'Vui lòng chọn thời gian nghỉ!' }]}
              >
                <RangePicker 
                  style={{ width: '100%' }}
                  format="DD/MM/YYYY"
                  disabledDate={(current) => current && current < moment().startOf('day')}
                />
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item
            name="reason"
            label="Lý do nghỉ phép"
            rules={[{ required: true, message: 'Vui lòng nhập lý do nghỉ phép!' }]}
          >
            <TextArea 
              rows={4}
              placeholder="Nhập lý do chi tiết cho yêu cầu nghỉ phép..."
              maxLength={500}
              showCount
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Detail Modal */}
      <Modal
        title="Chi tiết yêu cầu nghỉ phép"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            Đóng
          </Button>
        ]}
        width={700}
      >
        {selectedRequest && (
          <div className="leave-detail">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card size="small" style={{ background: '#f0f2f5' }}>
                  <Row>
                    <Col span={8}>
                      <Space>
                        <Avatar 
                          size={40} 
                          src={selectedRequest.avatar} 
                          icon={<UserOutlined />}
                          style={{ backgroundColor: '#1890ff' }}
                        />
                        <div>
                          <Text strong>{selectedRequest.employeeName}</Text><br />
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            {selectedRequest.employeeId} - {selectedRequest.department}
                          </Text>
                        </div>
                      </Space>
                    </Col>
                    <Col span={8}>
                      <Text strong>Mã yêu cầu:</Text><br />
                      <Text code>{selectedRequest.id}</Text><br />
                      <Text strong>Loại phép:</Text><br />
                      {getLeaveTypeTag(selectedRequest.leaveType)}
                    </Col>
                    <Col span={8}>
                      <Text strong>Trạng thái:</Text><br />
                      {getStatusTag(selectedRequest.status)}<br />
                      <Text strong>Ngày gửi:</Text><br />
                      <Text>{moment(selectedRequest.submittedDate).format('DD/MM/YYYY')}</Text>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
              <Col span={12}>
                <Descriptions title="Thông tin nghỉ phép" column={1} bordered size="small">
                  <Descriptions.Item label="Ngày bắt đầu">
                    {moment(selectedRequest.startDate).format('DD/MM/YYYY')}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ngày kết thúc">
                    {moment(selectedRequest.endDate).format('DD/MM/YYYY')}
                  </Descriptions.Item>
                  <Descriptions.Item label="Số ngày nghỉ">
                    {selectedRequest.days} ngày
                  </Descriptions.Item>
                  <Descriptions.Item label="Lý do">
                    {selectedRequest.reason}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
              
              <Col span={12}>
                <Card title="Quy trình phê duyệt" size="small">
                  <Timeline>
                    <Timeline.Item 
                      color="blue" 
                      dot={<FileTextOutlined />}
                    >
                      <div>
                        <Text strong>Gửi yêu cầu</Text><br />
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          {moment(selectedRequest.submittedDate).format('DD/MM/YYYY HH:mm')}
                        </Text>
                      </div>
                    </Timeline.Item>
                    
                    {selectedRequest.status !== 'pending' && (
                      <Timeline.Item 
                        color={selectedRequest.status === 'approved' ? 'green' : 'red'}
                        dot={selectedRequest.status === 'approved' ? <CheckOutlined /> : <CloseOutlined />}
                      >
                        <div>
                          <Text strong>
                            {selectedRequest.status === 'approved' ? 'Đã phê duyệt' : 'Đã từ chối'}
                          </Text><br />
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            {selectedRequest.approvedBy} - {moment(selectedRequest.approvedDate).format('DD/MM/YYYY HH:mm')}
                          </Text>
                        </div>
                      </Timeline.Item>
                    )}
                    
                    {selectedRequest.status === 'pending' && (
                      <Timeline.Item 
                        color="orange"
                        dot={<ClockCircleOutlined />}
                      >
                        <Text>Đang chờ phê duyệt...</Text>
                      </Timeline.Item>
                    )}
                  </Timeline>
                </Card>
              </Col>
            </Row>

            {selectedRequest.comments && (
              <Row style={{ marginTop: 16 }}>
                <Col span={24}>
                  <Alert
                    message="Nhận xét từ quản lý"
                    description={selectedRequest.comments}
                    type={selectedRequest.status === 'approved' ? 'success' : 'error'}
                    showIcon
                  />
                </Col>
              </Row>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default LeaveRequest;

