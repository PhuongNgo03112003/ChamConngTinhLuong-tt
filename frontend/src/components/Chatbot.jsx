import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  Input,
  Button,
  Space,
  Typography,
  Avatar,
  Badge,
  Tooltip,
  Spin,
  Tag,
  Modal,
  Select,
  Switch,
  Slider,
  List,
  Drawer
} from 'antd';
import {
  MessageOutlined,
  SendOutlined,
  CloseOutlined,
  SettingOutlined,
  RobotOutlined,
  UserOutlined,
  QuestionCircleOutlined,
  BulbOutlined,
  MinusOutlined,
  PlusOutlined,
  ClearOutlined,
  DownloadOutlined,
  SoundOutlined,
  MutedOutlined
} from '@ant-design/icons';
import moment from 'moment';
import './Chatbot.css';

const { Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const Chatbot = ({ visible, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [helpVisible, setHelpVisible] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Settings
  const [settings, setSettings] = useState({
    language: 'vi',
    theme: 'light',
    fontSize: 14,
    autoResponse: true,
    soundEnabled: true,
    suggestions: true
  });

  // Quick suggestions
  const quickSuggestions = [
    { text: 'Hôm nay tôi đã chấm công chưa?', category: 'attendance' },
    { text: 'Lương tháng này của tôi bao nhiêu?', category: 'payroll' },
    { text: 'Còn bao nhiêu ngày phép?', category: 'leave' },
    { text: 'Hướng dẫn sử dụng hệ thống', category: 'help' },
    { text: 'Thông tin liên hệ phòng Nhân sự', category: 'contact' },
    { text: 'Quy định công ty về giờ làm việc', category: 'policy' }
  ];

  // Help topics
  const helpTopics = [
    {
      title: 'Chấm công',
      questions: [
        'Làm thế nào để chấm công bằng vân tay?',
        'Tôi quên chấm công ra thì phải làm sao?',
        'Xem lịch sử chấm công ở đâu?'
      ]
    },
    {
      title: 'Lương và phúc lợi',
      questions: [
        'Khi nào được nhận lương?',
        'Cách tính lương overtime?',
        'Các khoản phụ cấp và thưởng'
      ]
    },
    {
      title: 'Nghỉ phép',
      questions: [
        'Cách gửi đơn xin nghỉ phép?',
        'Quy định về nghỉ phép năm?',
        'Nghỉ ốm có cần giấy tờ gì không?'
      ]
    }
  ];

  const initialMessage = {
    id: '1',
    type: 'bot',
    content: 'Xin chào! Tôi là AI Assistant của hệ thống quản lý nhân sự. Tôi có thể giúp bạn:\n\n🕐 Kiểm tra chấm công\n💰 Xem thông tin lương\n📅 Quản lý nghỉ phép\n❓ Trả lời các câu hỏi về quy định công ty\n\nHãy hỏi tôi bất cứ điều gì bạn muốn biết!',
    timestamp: moment().format('HH:mm'),
    suggestions: quickSuggestions.slice(0, 3)
  };

  useEffect(() => {
    if (visible && messages.length === 0) {
      setMessages([initialMessage]);
    }
  }, [visible]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: moment().format('HH:mm')
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate API call to chatbot
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      
      // Play sound if enabled
      if (settings.soundEnabled) {
        playNotificationSound();
      }
    }, 1500);
  };

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    let response = '';
    let suggestions = [];

    // Simple rule-based responses (in real app, this would be AI/ML)
    if (input.includes('chấm công') || input.includes('cham cong')) {
      if (input.includes('hôm nay') || input.includes('hom nay')) {
        response = '✅ Hôm nay bạn đã chấm công vào lúc 08:15:23. Bạn chưa chấm công ra.\n\n📊 Thống kê tháng này:\n• Số ngày đã làm: 18/22 ngày\n• Tổng giờ làm việc: 144 giờ\n• Giờ OT: 12 giờ';
        suggestions = [
          { text: 'Xem lịch sử chấm công chi tiết', category: 'attendance' },
          { text: 'Hướng dẫn chấm công thủ công', category: 'help' }
        ];
      } else {
        response = '🕐 Để chấm công bằng vân tay:\n\n1. Đặt ngón tay lên thiết bị\n2. Giữ ngón tay ổn định 2-3 giây\n3. Chờ đèn xanh báo thành công\n\n⚠️ Lưu ý: Nếu thiết bị không nhận diện, hãy làm sạch ngón tay và thử lại.';
        suggestions = [
          { text: 'Xem hướng dẫn chi tiết', category: 'help' },
          { text: 'Báo lỗi thiết bị chấm công', category: 'support' }
        ];
      }
    } else if (input.includes('lương') || input.includes('luong') || input.includes('salary')) {
      response = '💰 Thông tin lương tháng này:\n\n• Lương cơ bản: 25.000.000 VNĐ\n• Phụ cấp: 2.000.000 VNĐ\n• Tiền OT: 1.500.000 VNĐ\n• Thưởng: 1.000.000 VNĐ\n• Tổng thu nhập: 29.500.000 VNĐ\n• Khấu trừ BHXH/BHYT/Thuế: 4.500.000 VNĐ\n• Thực lĩnh: 25.000.000 VNĐ\n\n📅 Ngày trả lương: 30 hàng tháng';
      suggestions = [
        { text: 'Xem bảng lương chi tiết', category: 'payroll' },
        { text: 'Lịch sử lương các tháng trước', category: 'payroll' }
      ];
    } else if (input.includes('nghỉ phép') || input.includes('nghi phep') || input.includes('phép') || input.includes('phep')) {
      response = '📅 Thông tin nghỉ phép của bạn:\n\n• Phép năm còn lại: 18/20 ngày\n• Đã sử dụng: 2 ngày\n• Phép ốm đã dùng: 0/30 ngày\n• Đơn đang chờ duyệt: 0 đơn\n\n📝 Để gửi đơn nghỉ phép mới:\n1. Vào mục "Nghỉ phép"\n2. Chọn "Tạo đơn mới"\n3. Điền thông tin và gửi';
      suggestions = [
        { text: 'Tạo đơn nghỉ phép mới', category: 'leave' },
        { text: 'Xem lịch sử nghỉ phép', category: 'leave' }
      ];
    } else if (input.includes('hướng dẫn') || input.includes('huong dan') || input.includes('help')) {
      response = '📖 Tôi có thể hướng dẫn bạn về:\n\n🕐 Hệ thống chấm công\n💰 Tra cứu lương và phúc lợi\n📅 Quản lý nghỉ phép\n👥 Thông tin nhân sự\n📞 Liên hệ hỗ trợ\n\nHãy cho tôi biết bạn muốn tìm hiểu về vấn đề nào?';
      suggestions = helpTopics.map(topic => ({
        text: `Hướng dẫn về ${topic.title}`,
        category: 'help'
      }));
    } else if (input.includes('liên hệ') || input.includes('lien he') || input.includes('hỗ trợ') || input.includes('ho tro')) {
      response = '📞 Thông tin liên hệ hỗ trợ:\n\n👨‍💼 Phòng Nhân sự:\n• Email: hr@company.com\n• Điện thoại: (028) 1234 5678\n• Phòng: 101 - Tầng 1\n\n🔧 Hỗ trợ kỹ thuật:\n• Email: support@company.com\n• Hotline: 1900 1234\n• Giờ làm việc: 8:00 - 17:00 (T2-T6)';
      suggestions = [
        { text: 'Gửi email cho phòng Nhân sự', category: 'contact' },
        { text: 'Báo lỗi hệ thống', category: 'support' }
      ];
    } else {
      response = '🤔 Xin lỗi, tôi chưa hiểu rõ câu hỏi của bạn. Bạn có thể:\n\n• Hỏi về chấm công, lương, nghỉ phép\n• Yêu cầu hướng dẫn sử dụng hệ thống\n• Hỏi về quy định và chính sách công ty\n\nHoặc chọn một trong các gợi ý bên dưới:';
      suggestions = quickSuggestions.slice(0, 4);
    }

    return {
      id: Date.now().toString(),
      type: 'bot',
      content: response,
      timestamp: moment().format('HH:mm'),
      suggestions: suggestions
    };
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.text);
  };

  const handleClearChat = () => {
    Modal.confirm({
      title: 'Xóa cuộc trò chuyện',
      content: 'Bạn có chắc chắn muốn xóa toàn bộ cuộc trò chuyện?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: () => {
        setMessages([initialMessage]);
      }
    });
  };

  const handleExportChat = () => {
    const chatContent = messages.map(msg => 
      `[${msg.timestamp}] ${msg.type === 'user' ? 'Bạn' : 'AI'}: ${msg.content}`
    ).join('\n\n');
    
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat_${moment().format('YYYY-MM-DD_HH-mm')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const startVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'vi-VN';
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
      };
      recognition.start();
    } else {
      alert('Trình duyệt của bạn không hỗ trợ nhận diện giọng nói');
    }
  };

  const playNotificationSound = () => {
    // In real app, you would play an actual sound file
    console.log('Playing notification sound');
  };

  if (!visible) return null;

  return (
    <div className={`chatbot-container ${isMinimized ? 'minimized' : ''}`}>
      <Card className="chatbot-card">
        {/* Header */}
        <div className="chatbot-header">
          <Space>
            <Avatar 
              icon={<RobotOutlined />} 
              style={{ backgroundColor: '#1890ff' }}
            />
            <div className="chatbot-title">
              <Text strong style={{ color: 'white' }}>AI Assistant</Text>
              <br />
              <Badge 
                status="processing" 
                text={<Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px' }}>
                  Đang hoạt động
                </Text>} 
              />
            </div>
          </Space>
          
          <Space>
            <Tooltip title="Trợ giúp">
              <Button
                type="text"
                icon={<QuestionCircleOutlined />}
                onClick={() => setHelpVisible(true)}
                style={{ color: 'white' }}
              />
            </Tooltip>
            <Tooltip title="Cài đặt">
              <Button
                type="text"
                icon={<SettingOutlined />}
                onClick={() => setSettingsVisible(true)}
                style={{ color: 'white' }}
              />
            </Tooltip>
            <Tooltip title={isMinimized ? 'Mở rộng' : 'Thu nhỏ'}>
              <Button
                type="text"
                icon={isMinimized ? <PlusOutlined /> : <MinusOutlined />}
                onClick={() => setIsMinimized(!isMinimized)}
                style={{ color: 'white' }}
              />
            </Tooltip>
            <Tooltip title="Đóng">
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={onClose}
                style={{ color: 'white' }}
              />
            </Tooltip>
          </Space>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="chatbot-messages">
              {messages.map((message) => (
                <div key={message.id} className={`message ${message.type}`}>
                  <div className="message-content">
                    <div className="message-bubble">
                      <div className="message-text">
                        {message.content.split('\n').map((line, index) => (
                          <div key={index}>{line}</div>
                        ))}
                      </div>
                      <div className="message-time">{message.timestamp}</div>
                    </div>
                    {message.type === 'bot' && (
                      <Avatar 
                        size="small" 
                        icon={<RobotOutlined />}
                        style={{ backgroundColor: '#1890ff' }}
                      />
                    )}
                    {message.type === 'user' && (
                      <Avatar 
                        size="small" 
                        icon={<UserOutlined />}
                        style={{ backgroundColor: '#52c41a' }}
                      />
                    )}
                  </div>
                  
                  {message.suggestions && settings.suggestions && (
                    <div className="message-suggestions">
                      <Space wrap>
                        {message.suggestions.map((suggestion, index) => (
                          <Tag
                            key={index}
                            className="suggestion-tag"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            <BulbOutlined /> {suggestion.text}
                          </Tag>
                        ))}
                      </Space>
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="message bot">
                  <div className="message-content">
                    <div className="message-bubble typing">
                      <Spin size="small" />
                      <Text style={{ marginLeft: 8, color: '#8c8c8c' }}>
                        AI đang trả lời...
                      </Text>
                    </div>
                    <Avatar 
                      size="small" 
                      icon={<RobotOutlined />}
                      style={{ backgroundColor: '#1890ff' }}
                    />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="chatbot-input">
              <Space.Compact style={{ width: '100%' }}>
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Nhập câu hỏi của bạn..."
                  onPressEnter={handleSendMessage}
                  style={{ fontSize: settings.fontSize }}
                />
                {voiceEnabled && (
                  <Button
                    icon={isListening ? <SoundOutlined /> : <MutedOutlined />}
                    onClick={startVoiceRecognition}
                    loading={isListening}
                  />
                )}
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                />
              </Space.Compact>
              
              <div className="chatbot-actions">
                <Space>
                  <Button
                    size="small"
                    icon={<ClearOutlined />}
                    onClick={handleClearChat}
                  >
                    Xóa chat
                  </Button>
                  <Button
                    size="small"
                    icon={<DownloadOutlined />}
                    onClick={handleExportChat}
                  >
                    Xuất chat
                  </Button>
                </Space>
              </div>
            </div>
          </>
        )}
      </Card>

      {/* Settings Modal */}
      <Modal
        title="Cài đặt Chatbot"
        open={settingsVisible}
        onCancel={() => setSettingsVisible(false)}
        footer={null}
        width={400}
      >
        <div className="chatbot-settings">
          <div className="setting-item">
            <Text strong>Ngôn ngữ</Text>
            <Select
              value={settings.language}
              onChange={(value) => setSettings({...settings, language: value})}
              style={{ width: '100%', marginTop: 8 }}
            >
              <Option value="vi">Tiếng Việt</Option>
              <Option value="en">English</Option>
            </Select>
          </div>
          
          <div className="setting-item">
            <Text strong>Kích thước chữ</Text>
            <Slider
              min={12}
              max={18}
              value={settings.fontSize}
              onChange={(value) => setSettings({...settings, fontSize: value})}
              marks={{ 12: '12px', 14: '14px', 16: '16px', 18: '18px' }}
              style={{ marginTop: 16 }}
            />
          </div>
          
          <div className="setting-item">
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <Text strong>Âm thanh thông báo</Text>
              <Switch
                checked={settings.soundEnabled}
                onChange={(checked) => setSettings({...settings, soundEnabled: checked})}
              />
            </Space>
          </div>
          
          <div className="setting-item">
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <Text strong>Hiển thị gợi ý</Text>
              <Switch
                checked={settings.suggestions}
                onChange={(checked) => setSettings({...settings, suggestions: checked})}
              />
            </Space>
          </div>
          
          <div className="setting-item">
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <Text strong>Nhận diện giọng nói</Text>
              <Switch
                checked={voiceEnabled}
                onChange={setVoiceEnabled}
              />
            </Space>
          </div>
        </div>
      </Modal>

      {/* Help Drawer */}
      <Drawer
        title="Trợ giúp sử dụng Chatbot"
        placement="right"
        onClose={() => setHelpVisible(false)}
        open={helpVisible}
        width={400}
      >
        <div className="chatbot-help">
          <Text strong style={{ fontSize: '16px' }}>🤖 AI Assistant có thể giúp bạn:</Text>
          
          {helpTopics.map((topic, index) => (
            <div key={index} className="help-topic">
              <Text strong style={{ color: '#1890ff' }}>{topic.title}</Text>
              <List
                size="small"
                dataSource={topic.questions}
                renderItem={(question) => (
                  <List.Item
                    className="help-question"
                    onClick={() => {
                      setInputValue(question);
                      setHelpVisible(false);
                    }}
                  >
                    <Text>• {question}</Text>
                  </List.Item>
                )}
              />
            </div>
          ))}
          
          <div className="help-tips">
            <Text strong style={{ color: '#52c41a' }}>💡 Mẹo sử dụng:</Text>
            <ul>
              <li>Sử dụng các từ khóa như "chấm công", "lương", "nghỉ phép"</li>
              <li>Hỏi câu hỏi cụ thể để nhận được câu trả lời chính xác</li>
              <li>Sử dụng các gợi ý được hiển thị sau mỗi câu trả lời</li>
              <li>Bật tính năng nhận diện giọng nói để nói thay vì gõ</li>
            </ul>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Chatbot;




