# 🏢 HRM System - Hệ thống Quản lý Nhân sự

Hệ thống Quản lý Nhân sự tích hợp chấm công vân tay và Chatbot AI, được thiết kế với giao diện hiện đại tương tự iBOM.

## ✨ Tính năng chính

### 📊 Dashboard Tổng quan
- Thống kê nhân sự real-time
- Biểu đồ tăng trưởng nhân sự
- Phân bố nhân viên theo phòng ban
- Cảnh báo hợp đồng sắp hết hạn
- Thao tác nhanh

### 🕐 Quản lý Chấm công
- Chấm công bằng vân tay
- Lịch sử chấm công chi tiết
- Thống kê chấm công theo giờ
- Chấm công thủ công
- Trạng thái thiết bị real-time

### 👥 Quản lý Nhân sự
- Danh sách nhân viên đầy đủ
- Thêm/sửa/xóa thông tin nhân viên
- Upload ảnh đại diện
- Thông tin chi tiết nhân viên
- Thống kê hiệu suất

### 💰 Quản lý Lương
- Tính lương tự động
- Bảng lương chi tiết
- Biểu đồ lương theo phòng ban
- Xu hướng chi phí lương
- Tính lương hàng loạt

### 📅 Nghỉ phép
- Gửi yêu cầu nghỉ phép
- Duyệt đơn nghỉ phép
- Lịch nghỉ phép
- Hạn mức nghỉ phép
- Workflow phê duyệt

### 🤖 Chatbot AI
- Trả lời câu hỏi về HR
- Hướng dẫn sử dụng hệ thống
- Nhận diện giọng nói
- Gợi ý thông minh
- Export cuộc trò chuyện

### 📱 Mobile App
- Giao diện mobile tối ưu
- Bottom tabs navigation
- PWA support
- Touch-friendly design
- Responsive layout

## 🚀 Cài đặt và Chạy

### Yêu cầu hệ thống
- Node.js >= 16.0.0
- npm >= 8.0.0

### Cài đặt dependencies
```bash
cd frontend
npm install
```

### Chạy ứng dụng
```bash
npm start
```

Ứng dụng sẽ chạy tại: `http://localhost:3000`

### Build cho production
```bash
npm run build
```

## 🎨 Thiết kế UI

### Màu sắc chủ đạo
- **Primary**: #1890ff (Xanh dương)
- **Success**: #52c41a (Xanh lá)
- **Warning**: #faad14 (Vàng)
- **Error**: #f5222d (Đỏ)
- **Info**: #722ed1 (Tím)

### Typography
- **Font**: Inter, -apple-system, BlinkMacSystemFont
- **Sizes**: 12px, 14px, 16px, 18px, 20px, 24px
- **Weights**: 300, 400, 500, 600, 700

### Layout
- **Grid System**: 24 columns
- **Breakpoints**: xs(576px), sm(768px), md(992px), lg(1200px), xl(1600px)
- **Spacing**: 4px, 8px, 12px, 16px, 20px, 24px, 32px

## 📁 Cấu trúc thư mục

```
frontend/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Chatbot.jsx
│   │   ├── Chatbot.css
│   │   ├── Layout.jsx
│   │   └── Layout.css
│   ├── mobile/
│   │   ├── MobileApp.jsx
│   │   ├── MobileApp.css
│   │   └── components/
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Dashboard.css
│   │   ├── Attendance.jsx
│   │   ├── Attendance.css
│   │   ├── EmployeeManagement.jsx
│   │   ├── EmployeeManagement.css
│   │   ├── Payroll.jsx
│   │   ├── Payroll.css
│   │   ├── LeaveRequest.jsx
│   │   └── LeaveRequest.css
│   ├── App.jsx
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🛠️ Công nghệ sử dụng

### Frontend
- **React 18**: UI Framework
- **Ant Design 5**: Component Library
- **Ant Design Icons**: Icon set
- **Ant Design Plots**: Charts & Graphs
- **Moment.js**: Date manipulation
- **CSS3**: Styling với Flexbox/Grid

### Features
- **Responsive Design**: Mobile-first approach
- **PWA Support**: Progressive Web App
- **Dark Mode**: Theme switching
- **Accessibility**: WCAG compliant
- **Performance**: Optimized rendering

## 📱 Responsive Design

### Desktop (>= 1200px)
- Full sidebar navigation
- Multi-column layout
- Hover effects
- Keyboard navigation

### Tablet (768px - 1199px)
- Collapsible sidebar
- Responsive grid
- Touch-friendly buttons
- Optimized spacing

### Mobile (< 768px)
- Drawer navigation
- Single column layout
- Bottom tabs
- Touch gestures

## 🎯 Use Cases được hỗ trợ

1. **UC01**: Đăng nhập/Đăng ký
2. **UC02**: Chấm công bằng vân tay
3. **UC03**: Gửi yêu cầu nghỉ phép
4. **UC04**: Xem lịch sử chấm công
5. **UC05**: Tương tác với chatbot
6. **UC06**: Xem bảng lương
7. **UC07**: Thống kê lương nhân viên
8. **UC08**: Xem báo cáo chấm công
9. **UC09**: Duyệt yêu cầu nghỉ phép
10. **UC10**: Quản lý nhân sự
11. **UC11**: Quản lý ca làm
12. **UC12**: Tùy chỉnh chatbot
13. **UC13**: Tính lương

## 🔧 Tùy chỉnh

### Thay đổi màu sắc
Chỉnh sửa file `src/index.css`:
```css
:root {
  --primary-color: #1890ff;
  --success-color: #52c41a;
  --warning-color: #faad14;
  --error-color: #f5222d;
}
```

### Thêm component mới
1. Tạo file component trong `src/components/`
2. Import và sử dụng trong `App.jsx`
3. Thêm vào menu navigation

### Tùy chỉnh theme
Sử dụng ConfigProvider trong `App.jsx`:
```jsx
<ConfigProvider
  theme={{
    token: {
      colorPrimary: '#1890ff',
      borderRadius: 8,
    },
  }}
>
```

## 📊 Performance

### Tối ưu hóa
- Lazy loading components
- Code splitting
- Image optimization
- CSS minification
- Bundle optimization

### Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔒 Bảo mật

### Best Practices
- Input validation
- XSS protection
- CSRF protection
- Secure headers
- Content Security Policy

## 🌐 Browser Support

- **Chrome**: >= 88
- **Firefox**: >= 85
- **Safari**: >= 14
- **Edge**: >= 88
- **Mobile Safari**: >= 14
- **Chrome Mobile**: >= 88

## 📝 License

MIT License - Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 👥 Contributing

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📞 Support

- **Email**: support@hrmsystem.com
- **Documentation**: [docs.hrmsystem.com](https://docs.hrmsystem.com)
- **Issues**: [GitHub Issues](https://github.com/hrmsystem/issues)

---

**HRM System** - Hệ thống Quản lý Nhân sự hiện đại với AI Assistant 🚀




