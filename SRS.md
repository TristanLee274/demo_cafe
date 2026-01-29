# Software Requirements Specification (SRS)
## User Management & Authentication Module
**Ngày tạo:** 2026-01-29
**Trạng thái:** Draft

---

### 1. Giới thiệu
Tài liệu này mô tả chi tiết yêu cầu kỹ thuật cho module Quản lý người dùng và Xác thực (Authentication) của hệ thống Coffee Shop. Mục tiêu là cung cấp một hệ thống bảo mật tiêu chuẩn, hỗ trợ phân quyền người dùng.

### 2. Phạm vi (Scope)
*   **Backend:** API Authentication (Login, Register, Refresh Token), Middleware phân quyền.
*   **Frontend:** Giao diện Đăng nhập, Đăng ký, Trang cá nhân, Logic bảo vệ Router.
*   **Database:** Thiết kế bảng Users.

### 3. Yêu cầu chức năng (Functional Requirements)

#### 3.1 Xác thực (Authentication)
*   **REQ-AUTH-01 (Đăng ký):** Người dùng có thể tạo tài khoản mới bằng Email và Mật khẩu.
    *   Validation: Email hợp lệ, Mật khẩu mạnh (ít nhất 8 ký tự, bao gồm chữ và số).
    *   Mặc định vai trò là `Customer`.
*   **REQ-AUTH-02 (Đăng nhập):** Người dùng đăng nhập bằng Email/Password để nhận Access Token.
*   **REQ-AUTH-03 (Đăng xuất):** Hủy hiệu lực phiên làm việc hiện tại (Client xóa token).
*   **REQ-AUTH-04 (Phiên đăng nhập):** Hệ thống sử dụng JWT. Access Token hết hạn sau 24h (hoặc cấu hình phù hợp).

#### 3.2 Phân quyền (Authorization)
*   **REQ-RBAC-01:** Hệ thống hỗ trợ 3 vai trò (Roles):
    *   `customer`: Mua hàng, xem đơn hàng cá nhân.
    *   `staff`: Xem và cập nhật trạng thái đơn hàng của tất cả khách.
    *   `admin`: Toàn quyền hệ thống (CRUD Menu, Users).
*   **REQ-RBAC-02:** Bảo vệ các API nhạy cảm. Ví dụ: Chỉ `admin` mới được thêm món mới.

#### 3.3 Quản lý cá nhân
*   **REQ-USER-01:** Người dùng xem được thông tin hồ sơ của mình.
*   **REQ-USER-02:** Người dùng xem được lịch sử đơn hàng của mình.

### 4. Thiết kế kỹ thuật (Technical Design)

#### 4.1 Database Schema (SQLite)
Bảng **users**:
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| id | Integer | PK, Auto Inc | ID người dùng |
| email | String | Unique, Not Null | Email đăng nhập |
| password_hash | String | Not Null | Mật khẩu đã mã hóa |
| full_name | String | Nullable | Tên hiển thị |
| phone | String | Nullable | Số điện thoại |
| role | String | Default 'customer' | Enum: 'customer', 'staff', 'admin' |
| created_at | DateTime | Default Now | Ngày tạo |
| is_active | Boolean | Default True | Trạng thái kích hoạt |

#### 4.2 API Endpoints (Flask)
*   `POST /api/auth/register`: Đăng ký tài khoản mới.
*   `POST /api/auth/login`: Đăng nhập, trả về Token.
*   `GET /api/auth/me`: Lấy thông tin người dùng hiện tại (kèm Token).
*   `GET /api/users/orders`: Lấy lịch sử mua hàng của user hiện tại.

#### 4.3 Technology Stack Updates
*   **Backend:**
    *   Thêm `flask-jwt-extended` cho JWT.
    *   Thêm `werkzeug.security` cho hashing password.
    *   Refactor `main.py` -> sử dụng Blueprints (`backend/routers/auth.py`, `backend/routers/user.py`).
*   **Frontend:**
    *   Context API (hoặc Redux) để quản lý Auth State (`user`, `token`, `isAuthenticated`).
    *   Axios Interceptors để tự động đính kèm Token vào Header.

### 5. Kế hoạch thực hiện (Implementation Plan)
Vui lòng tham khảo file `TASKS.md` để theo dõi tiến độ chi tiết.
