import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios để gọi API

const HeaderAdmin = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Hiển thị modal xác nhận đăng xuất
  const handleClickDangXuat = () => {
    setShowModal(true);
  };

  // Xác nhận đăng xuất
  const handleXacNhanDangXuatTaiKhoan = async () => {
    try {
      // Lấy token từ localStorage
      const token = localStorage.getItem('adminToken');

      
     // Gửi yêu cầu đăng xuất đến API
    const response = await axios.post('http://127.0.0.1:8000/api/admin/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }); 
    
      console.log('API Response:', response.data); // Kiểm tra phản hồi từ API

      // Xóa token và trạng thái đăng nhập khỏi localStorage
      localStorage.removeItem('adminToken');
     

      // Đóng modal và chuyển hướng người dùng đến trang đăng nhập
      setShowModal(false);
      navigate('/admin/Login');
    } catch (error) {
      console.error('Đăng xuất thất bại:', error);
      // Xử lý khi lỗi xảy ra, ví dụ như thông báo cho người dùng
    }
  };

  // Đóng modal xác nhận đăng xuất
  const handleDongModla = () => {
    setShowModal(false);
  };

  return (
    <>
    {/* Topbar */}
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        {/* Sidebar Toggle (Topbar) */}
        <button
          id="sidebarToggleTop"
          className="btn btn-link rounded-circle mr-3 d-md-none"
          data-bs-toggle="collapse"
          data-bs-target="#sidebar"
          aria-controls="sidebar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa fa-bars"></i>
        </button>

       
        
        {/* Topbar Navbar */}
        <ul className="navbar-nav ml-auto">
          

          {/* Nav Item - User Information */}
          <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">Admin</span>
              <img className="img-profile rounded-circle" src={`${process.env.PUBLIC_URL}/lte/img/undraw_profile.svg`} alt="User Profile" />
            </a>
            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
              <Link className="dropdown-item" to="/admin/ProfileAdmin">
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i> Profile
              </Link>
     
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={handleClickDangXuat}>
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i> Logout
              </button>
            </div>
          </li>
        </ul>
      </nav>

      {/* Modal xác nhận đăng xuất */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="logoutModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="logoutModalLabel">Xác nhận đăng xuất</h5>
                <button type="button" className="btn-close" onClick={handleDongModla} aria-label="Close"></button>
              </div>
              <div className="modal-body">Bạn có chắc muốn đăng xuất khỏi giao diện admin chứ?</div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleDongModla}>Thoát</button>
                <button type="button" className="btn btn-danger" onClick={handleXacNhanDangXuatTaiKhoan}>Xác nhận</button>
              </div>
            </div>
          </div>
        </div>
      )}
     
    </>
  );
};

export default HeaderAdmin;
