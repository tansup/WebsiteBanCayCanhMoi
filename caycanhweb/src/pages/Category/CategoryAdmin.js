import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Modal } from "antd";
const CategoryAdmin = () => {
  const [categories, setCategories] = useState([]);
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
  const [newCategories, setNewCategories] = useState({
    maDanhMuc: "",
    tenDanhMuc: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategories((prevState) => ({
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
      .post("http://localhost:5000/api/v1/order/addCategory", newCategories)
      .then(() => {
        // Thành công! Có thể thực hiện các hành động cần thiết, ví dụ: làm mới danh sách đơn hàng
        console.log("Đã thêm danh mục thành công!");
      })
      .catch((error) => {
        console.error("Lỗi khi thêm danh mục: ", error);
      });
  };
  const onFinish = (values) => {
    console.log("finish");
  };
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/category");
      const jsonData = await response.json();
      setCategories(jsonData["categories"]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDeleteOrder = (_id) => {
    axios
      .delete(`http://localhost:5000/api/v1/order/deleteProductType/${_id}`)
      .then(() => {
        // Xóa đơn hàng thành công, cập nhật danh sách đơn hàng
        fetchCategories();
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
        fetchCategories();
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
    <main className="main-container">
      <div className="main-title">
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
            Ma Danh Muc:
            <input
              type="text"
              name="maLoai"
              value={newCategories.maDanhMuc}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Ten Danh Muc:
            <input
              type="text"
              name="tenLoai"
              value={newCategories.tenDanhMuc}
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
            Ma Danh Muc:
            <input
              type="text"
              name="maLoai"
              value={updatedOrder.maDanhMuc}
              onChange={handleInputChange1}
            />
          </label>
          <br />
          <label>
            Ten Danh Muc:
            <input
              type="text"
              name="tenLoai"
              value={updatedOrder.tenDanhMuc}
              onChange={handleInputChange1}
            />
          </label>
          <br />
          <button onClick={() => handleUpdateOrder(categories._id, categories)}>
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
          {categories.map((categories, index) => {
            return (
              <tr key={index}>
                <td>{categories.maDanhMuc}</td>
                <td>{categories.tenDanhMuc}</td>

                <td>
                  <button
                    className="btn-primary"
                    onClick={() => {
                      handleUpdateOrder(categories._id, categories);
                      setIsModalOpen1(true);
                    }}
                  >
                    Update
                  </button>

                  <button
                    className="btn-danger"
                    onClick={() => handleDeleteOrder(categories._id)}
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
};

export default CategoryAdmin;
