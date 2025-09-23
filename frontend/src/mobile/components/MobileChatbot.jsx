import React, { useState, useEffect, useRef } from 'react';
import { Modal, Input, Button, Space, Typography, Avatar, Spin } from 'antd';
import {
  RobotOutlined,
  UserOutlined,
  SendOutlined,
  CloseOutlined
} from '@ant-design/icons';
import moment from 'moment';
import './MobileChatbot.css';

const { Text } = Typography;

const MobileChatbot = ({ visible, onClose, user }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const initialMessage = {
    id: '1',
    type: 'bot',
    content: 'Xin chào! Tôi là AI Assistant. Tôi có thể giúp bạn về chấm công, lương, nghỉ phép. Hãy hỏi tôi bất cứ điều gì!',
    timestamp: moment().format('HH:mm')
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

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    let response = '';

    if (input.includes('chấm công') || input.includes('cham cong')) {
      response = '✅ Hôm nay bạn đã chấm công vào lúc 08:15:23. Bạn chưa chấm công ra.\n\n📊 Thống kê tháng này:\n• Số ngày đã làm: 18/22 ngày\n• Tổng giờ làm việc: 144 giờ';
    } else if (input.includes('lương') || input.includes('luong')) {
      response = '💰 Lương tháng này của bạn:\n\n• Lương cơ bản: 25.000.000 VNĐ\n• Phụ cấp: 2.000.000 VNĐ\n• Tiền OT: 1.500.000 VNĐ\n• Thực lĩnh: 25.000.000 VNĐ\n\n📅 Ngày trả lương: 30 hàng tháng';
    } else if (input.includes('nghỉ phép') || input.includes('nghi phep')) {
      response = '📅 Thông tin nghỉ phép:\n\n• Phép năm còn lại: 18/20 ngày\n• Đã sử dụng: 2 ngày\n• Phép ốm đã dùng: 0/30 ngày\n\n📝 Để gửi đơn nghỉ phép mới, vào mục "Nghỉ phép" và chọn "Tạo đơn mới"';
    } else {
      response = '🤔 Xin lỗi, tôi chưa hiểu rõ câu hỏi của bạn. Bạn có thể hỏi về:\n\n• Chấm công\n• Lương\n• Nghỉ phép\n• Hướng dẫn sử dụng';
    }

    return {
      id: Date.now().toString(),
      type: 'bot',
      content: response,
      timestamp: moment().format('HH:mm')
    };
  };

  return (
    <Modal
      title={
        <Space>
          <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#1890ff' }} />
          <Text strong>AI Assistant</Text>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width="100%"
      style={{ top: 0, margin: 0, maxWidth: '100vw' }}
      className="mobile-chatbot-modal"
      bodyStyle={{ height: 'calc(100vh - 110px)', padding: 0 }}
    >
      <div className="mobile-chatbot">
        {/* Messages */}
        <div className="mobile-chatbot-messages">
          {messages.map((message) => (
            <div key={message.id} className={`mobile-message ${message.type}`}>
              <div className="mobile-message-content">
                {message.type === 'bot' && (
                  <Avatar 
                    size="small" 
                    icon={<RobotOutlined />}
                    style={{ backgroundColor: '#1890ff' }}
                  />
                )}
                <div className="mobile-message-bubble">
                  <div className="mobile-message-text">
                    {message.content.split('\n').map((line, index) => (
                      <div key={index}>{line}</div>
                    ))}
                  </div>
                  <div className="mobile-message-time">{message.timestamp}</div>
                </div>
                {message.type === 'user' && (
                  <Avatar 
                    size="small" 
                    icon={<UserOutlined />}
                    style={{ backgroundColor: '#52c41a' }}
                  />
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="mobile-message bot">
              <div className="mobile-message-content">
                <Avatar 
                  size="small" 
                  icon={<RobotOutlined />}
                  style={{ backgroundColor: '#1890ff' }}
                />
                <div className="mobile-message-bubble typing">
                  <Spin size="small" />
                  <Text style={{ marginLeft: 8, color: '#8c8c8c' }}>
                    AI đang trả lời...
                  </Text>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="mobile-chatbot-input">
          <Space.Compact style={{ width: '100%' }}>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Nhập câu hỏi..."
              onPressEnter={handleSendMessage}
              style={{ borderRadius: '20px 0 0 20px' }}
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              style={{ borderRadius: '0 20px 20px 0' }}
            />
          </Space.Compact>
        </div>
      </div>
    </Modal>
  );
};

export default MobileChatbot;




