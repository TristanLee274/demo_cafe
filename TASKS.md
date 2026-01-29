# Task Tracking - User Management Module

## Phase 1: Backend Foundation (Flask)
- [x] **Task 1.1:** Cài đặt thư viện dependencies (`flask-jwt-extended`, `passlib` hoặc `werkzeug`).
- [x] **Task 1.2:** Cập nhật Database Models (`models.py`) - Thêm class `User`.
- [x] **Task 1.3:** Setup cấu trúc Blueprints - Tách `main.py` thành các modules nhỏ.
- [x] **Task 1.4:** Implement Auth Routes (`routers/auth.py`): Register, Login logic.
- [x] **Task 1.5:** Implement JWT Security & Middleware (Bảo vệ Routes).

## Phase 2: Frontend Implementation (React)
- [x] **Task 2.1:** Setup Auth Context/Global State để lưu User info.
- [x] **Task 2.2:** Cấu hình Axios Instance (Interceptors) để gửi Token (Dùng custom fetch wrapper).
- [x] **Task 2.3:** Tạo trang Login UI (`/login`).
- [x] **Task 2.4:** Tạo trang Register UI (`/register`).
- [x] **Task 2.5:** Tạo trang Profile User UI (Xem thông tin & Lịch sử đơn).

## Phase 3: Integration & Testing
- [x] **Task 3.1:** Tích hợp Flow: Đăng ký -> Đăng nhập -> Lưu token -> Mua hàng.
- [x] **Task 3.2:** Verify phân quyền (Admin vào được trang Admin, User thường bị chặn).
- [x] **Task 3.3:** Test luồng Order cho User đã login (Lưu User ID vào đơn hàng).

## Phase 4: Polish
- [x] **Task 4.1:** Cải thiện UI báo lỗi (sai pass, email trùng).
- [x] **Task 4.2:** Cleanup code và cập nhật tài liệu hướng dẫn.
