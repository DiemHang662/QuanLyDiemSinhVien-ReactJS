# QuanLyDiemSinhVien-ReactJS
- Đăng nhập với vai trò (giáo vụ, giảng viên, sinh viên).

- Tài khoản giảng viên sẽ được giáo vụ cấp (superuser), sinh viên sẽ đăng ký tài khoản thông qua hệ thống dựa trên địa chỉ email trường cấp (phải kiểm tra sử dụng đúng địa chỉ email trường lúc đăng ký) 

- Giảng viên có thể xem danh sách sinh viên lớp mình phụ trách, được nhập điểm sinh viên theo danh sách từng lớp học và cho phép đọc thông tin từ tập tin CSV. 

- Chú ý điểm của sinh viên bao gồm tối thiểu điểm giữa kỳ và điểm cuối kỳ, giảng viên có thể thêm các cột điểm khác (nhưng tối đa không quá 5 cột). Khi nhập điểm giảng viên có thể lưu nháp (chưa chính thức) hoặc khoá điểm, khi giảng viên khoá điểm sinh viên sẽ nhận thông báo qua email về việc có điểm của môn học để vào xem.

- Giảng viên cũng có thể xuất bảng điểm ra tập tin PDF hoặc CSV.

- Giảng viên có thể xem điểm chi tiết một sinh viên dựa trên mã số sinh viên hoặc tìm kiếm sinh viên theo họ tên.

- Sinh viên được phép xem danh sách các môn học đã học và điểm chi tiết của từng môn.

- Hệ thống cũng yêu cầu xây dựng diễn đàn để giảng viên và sinh viên có thể trao đổi thông tin về thắc mắc điểm hoặc sinh viên cần tư vấn đề vấn đề học tập.

- *Nghiên cứu thêm dùng firebase tích hợp chat thời gian thực giữa giảng viên và sinh viên.
