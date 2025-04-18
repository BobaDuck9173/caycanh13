import React from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

const GioHang = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useCart();

  const tinhTong = () => {
    return cartItems.reduce((sum, item) => sum + item.gia_san_pham * item.quantity, 0);
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">🛒 Giỏ Hàng</h3>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng trống.</p>
      ) : (
        <>
          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>STT</th>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={item.ma_san_pham}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={`https://bobaduck.rf.gd/images/${item.hinh_san_pham}.jpg`}
                      alt={item.ten_san_pham}
                      width="80"
                    />
                  </td>
                  <td>{item.ten_san_pham}</td>
                  <td>{Number(item.gia_san_pham).toLocaleString("vi-VN")} đ</td>
                  <td>{item.quantity}</td>
                  <td>
                    {(item.gia_san_pham * item.quantity).toLocaleString("vi-VN")} đ
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item.ma_san_pham)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-end fw-bold text-danger">
            Tổng cộng: {tinhTong().toLocaleString("vi-VN")} đ
          </div>
          <div className="d-flex justify-content-between mt-4">
            <a href="/" className="btn btn-outline-secondary">
              ← Tiếp tục mua sắm
            </a>
            <button className="btn btn-success" onClick={() => navigate("/thanh-toan")}>
              Đặt hàng
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default GioHang;
