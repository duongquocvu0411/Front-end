import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Khởi tạo giỏ hàng từ localStorage, nếu không có thì sử dụng mảng rỗng
  // const [giohang, setGiohang] = useState(() => {
  //   //Đoạn mã dưới đây giúp khởi tạo giá trị cho giohang từ localStorage. 
  //   //Nếu trong localStorage có lưu giỏ hàng (savedCart), nó sẽ được chuyển đổi từ chuỗi JSON 
  //   //thành mảng và sử dụng làm giá trị ban đầu cho giohang. Nếu không có, mảng rỗng sẽ được sử dụng.
  //   const savedCart = localStorage.getItem('giohang');
  //   return savedCart ? JSON.parse(savedCart) : [];
  // });

  const [giohang, setGiohang] = useState(() => {
    try {
      const savedCart = localStorage.getItem('giohang');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Lỗi phân tích cú pháp JSON từ localStorage:', error);
      return [];
    }
  });    

  // Lưu giỏ hàng vào localStorage mỗi khi giỏ hàng thay đổi
  useEffect(() => {
    //Sử dụng useEffect để theo dõi sự thay đổi của giohang. Mỗi khi giohang thay đổi,
    // dữ liệu sẽ được lưu lại vào localStorage dưới dạng chuỗi JSON.
    // localStorage.setItem('giohang', JSON.stringify());

    localStorage.setItem('giohang', JSON.stringify(giohang));
  }, [giohang]);



  const addToCart = (sanPham) => {
    setGiohang((giohanghientai) => {
      const sanPhamTonTai = giohanghientai.find((item) => item.id === sanPham.id);
      let newCart;
  
      if (sanPhamTonTai) {
        // Cập nhật số lượng nếu sản phẩm đã tồn tại
        newCart = giohanghientai.map((item) =>
          item.id === sanPham.id ? { ...item, soLuong: item.soLuong + 1 } : item
        );
      } else {
        // Thêm sản phẩm mới nếu chưa có trong giỏ hàng
        newCart = [...giohanghientai, { ...sanPham, soLuong: 1 }];
      }
  
      return newCart;
    });
  
    // Thông báo sau khi giỏ hàng đã được cập nhật
    toast.success(`${sanPham.tieude} đã được thêm vào giỏ hàng!`, {
      position: "top-right",
      autoClose: 3000,
    });
  };
  
  const XoaGioHang = (sanPhamId) => {
    // Tìm sản phẩm muốn xóa
    const sanPhamXoa = giohang.find((item) => item.id === sanPhamId);

    // Cập nhật giỏ hàng trước
    setGiohang((giohanghientai) => giohanghientai.filter((item) => item.id !== sanPhamId));
    
    // Hiển thị thông báo sau khi cập nhật giỏ hàng
    if (sanPhamXoa) {
      toast.success(`Xóa sản phẩm ${sanPhamXoa.title} khỏi giỏ hàng thành công`,{
        position: "top-right",
        autoClose: 3000,
      })
       
    }
};



  const TangSoLuong = (sanPhamId) => {
    setGiohang((giohanghientai) =>
      giohanghientai.map((item) =>
        item.id === sanPhamId ? { ...item, soLuong: item.soLuong + 1 } : item
      )
    );
  };

  const GiamSoLuong = (sanPhamId) => {
    setGiohang((giohanghientai) =>
      giohanghientai.map((item) =>
        item.id === sanPhamId && item.soLuong > 1
          ? { ...item, soLuong: item.soLuong - 1 }
          : item
      )
    );
  };

  // Hàm cập nhật số lượng trực tiếp từ ô nhập
  const CapnhatSoLuong = (sanPhamId, soLuongMoi) => {
    setGiohang((giohanghientai) =>
      giohanghientai.map((item) =>
        item.id === sanPhamId ? { ...item, soLuong: parseInt(soLuongMoi) } : item
      )
    );
  };

   // Hàm clearCart để xóa sạch giỏ hàng
   const clearCart = () => {
    setGiohang([]); // Đặt giỏ hàng về mảng rỗng
    localStorage.removeItem('giohang'); // Xóa giỏ hàng khỏi localStorage
  };
  
  return (
    <CartContext.Provider value={{ giohang, addToCart, XoaGioHang, TangSoLuong, GiamSoLuong, CapnhatSoLuong,clearCart  }}>
      {children}
    </CartContext.Provider>
  );
};
