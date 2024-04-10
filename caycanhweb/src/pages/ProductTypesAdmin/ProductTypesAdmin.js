import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button, Form, Modal } from "antd";

function ProductTypesAdmin() {
  const [producttypes, setProductTypes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalOpen1(false);
  };
  const [updatedOrder, setUpdatedOrder] = useState({
    quantity: 0,
    totalCost: 0,
    status: false,
  });
  const [newproducttype, setNewProductTypes] = useState({
    maLoai: "",
    tenLoai: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProductTypes((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setUpdatedOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleAddProducttype = () => {
    axios
      .post(
        "http://localhost:5000/api/v1/order/createProductType",
        newproducttype
      )
      .then(() => {
        // Thành công! Có thể thực hiện các hành động cần thiết, ví dụ: làm mới danh sách đơn hàng
        console.log("Đã thêm đơn hàng thành công!");
      })
      .catch((error) => {
        console.error("Lỗi khi thêm đơn hàng: ", error);
      });
  };
  const onFinish = (values) => {
    console.log("finish");
  };
  const fetchProductTypes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/producttype");
      const jsonData = await response.json();
      setProductTypes(jsonData["producttypes"]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchProductTypes();
  }, []);

  const handleDeleteOrder = (_id) => {
    axios
      .delete(`http://localhost:5000/api/v1/order/deleteProductType/${_id}`)
      .then(() => {
        // Xóa đơn hàng thành công, cập nhật danh sách đơn hàng
        fetchProductTypes();
      })
      .catch((error) => {
        console.error("Error deleting order: ", error);
      });
  };
  const handleUpdateOrder = (orderId, order) => {
    axios
      .put(
        `http://localhost:5000/api/v1/order/updateOrder/${orderId}`,
        updatedOrder
      )
      .then(() => {
        // Cập nhật thành công, làm mới danh sách đơn hàng để hiển thị thông tin mới
        fetchProductTypes();
        // Đặt lại các giá trị trong form để chuẩn bị cho cập nhật tiếp theo
        setUpdatedOrder({
          quantity: order.quantity,
          totalCost: order.totalCost,
          status: order.status,
        });
      })
      .catch((error) => {
        console.error("Error updating order: ", error);
      });
  };

  return (
    <main className="adminmain-container">
      <div className="adminmain-title">
        <h3>PRODUCTTYPES</h3>
      </div>
      <button
        className="btn btn-success btn-sm"
        onClick={() => setIsModalOpen(true)}
      >
        Add +
      </button>
      <Modal
        title="Tạo danh mục"
        open={isModalOpen}
        onCancel={handleCancel}
        okText=" "
        okType=" "
      >
        <div>
          {/* Form để nhập thông tin cho đơn hàng mới */}
          <label>
            Ma Loai:
            <input
              type="text"
              name="maLoai"
              value={newproducttype.maLoai}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Ten Loai:
            <input
              type="text"
              name="tenLoai"
              value={newproducttype.tenLoai}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button onClick={handleAddProducttype}>Add Order</button>
        </div>
      </Modal>
      <Modal
        title="Cập nhật danh mục"
        open={isModalOpen1}
        onCancel={handleCancel}
        okText=" "
        okType=" "
      >
        <div>
          {/* Form để nhập thông tin cập nhật cho đơn hàng */}
          <label>
            Ma Loai:
            <input
              type="text"
              name="maLoai"
              value={updatedOrder.quantity}
              onChange={handleInputChange1}
            />
          </label>
          <br />
          <label>
            Ten Loai:
            <input
              type="text"
              name="tenLoai"
              value={updatedOrder.totalCost}
              onChange={handleInputChange1}
            />
          </label>
          <br />
          <button
            onClick={() => handleUpdateOrder(producttypes._id, producttypes)}
          >
            Update Order
          </button>
        </div>
      </Modal>
      <table className="table">
        <thead>
          <tr>
            <th>Ma Loai</th>
            <th>Ten Loai</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {producttypes.map((producttypes, index) => {
            return (
              <tr key={index}>
                <td>{producttypes.maLoai}</td>
                <td>{producttypes.tenLoai}</td>

                <td>
                  <button
                    className="btn-primary"
                    onClick={() => {
                      handleUpdateOrder(producttypes.orderId, producttypes);
                      setIsModalOpen1(true);
                    }}
                  >
                    Update
                  </button>

                  <button
                    className="btn-danger"
                    onClick={() => handleDeleteOrder(producttypes._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}

export default ProductTypesAdmin;
