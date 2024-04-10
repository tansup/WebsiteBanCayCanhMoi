import axios from "axios";
import React, { useEffect, useState } from "react";

import { Button, Form, Modal } from "antd";

function OrderPageAdmin() {
  const [orders, setOrders] = useState([]);
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
  const [newOrder, setNewOrder] = useState({
    quantity: 0,
    orderId: "",
    totalCost: 0,
    status: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prevState) => ({
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
  const handleAddOrder = () => {
    axios
      .post("http://localhost:5000/api/v1/order/createOrder", newOrder)
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
  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/order");
      const jsonData = await response.json();
      setOrders(jsonData["orders"]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDeleteOrder = (orderId) => {
    axios
      .delete(`http://localhost:5000/api/v1/order/deleteOrder/${orderId}`)
      .then(() => {
        // Xóa đơn hàng thành công, cập nhật danh sách đơn hàng
        fetchOrders();
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
        fetchOrders();
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
        <h3>ORDERS</h3>
      </div>
      <button
        className="btn btn-success btn-sm"
        onClick={() => setIsModalOpen(true)}
      >
        Add +
      </button>
      <Modal
        title="Tạo hóa đơn"
        open={isModalOpen}
        onCancel={handleCancel}
        okText=" "
        okType=" "
      >
        <div>
          {/* Form để nhập thông tin cho đơn hàng mới */}
          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              value={newOrder.quantity}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Order ID:
            <input
              type="text"
              name="orderId"
              value={newOrder.orderId}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Total Cost:
            <input
              type="number"
              name="totalCost"
              value={newOrder.totalCost}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Status:
            <select
              name="status"
              value={newOrder.status}
              onChange={handleInputChange}
            >
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
          </label>
          <br />
          <button onClick={handleAddOrder}>Add Order</button>
        </div>
      </Modal>
      <Modal
        title="Cập nhật hóa đơn"
        open={isModalOpen1}
        onCancel={handleCancel}
        okText=" "
        okType=" "
      >
        <div>
          {/* Form để nhập thông tin cập nhật cho đơn hàng */}
          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              value={updatedOrder.quantity}
              onChange={handleInputChange1}
            />
          </label>
          <br />
          <label>
            Total Cost:
            <input
              type="number"
              name="totalCost"
              value={updatedOrder.totalCost}
              onChange={handleInputChange1}
            />
          </label>
          <br />
          <label>
            Status:
            <select
              name="status"
              value={updatedOrder.status}
              onChange={handleInputChange1}
            >
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
          </label>
          <br />
          <button onClick={() => handleUpdateOrder(orders.orderId, orders)}>
            Update Order
          </button>
        </div>
      </Modal>
      <table className="table">
        <thead>
          <tr>
            <th>OrderId</th>
            <th>Quantity</th>
            <th>totalCost</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((orders, index) => {
            return (
              <tr key={index}>
                <td>{orders.orderId}</td>
                <td>{orders.quantity}</td>
                <td>{orders.totalCost}</td>
                <td>{orders.status ? "true" : "false"}</td>
                <td>
                  <button
                    className="btn-primary"
                    onClick={() => {
                      handleUpdateOrder(orders.orderId, orders);
                      setIsModalOpen1(true);
                    }}
                  >
                    Update
                  </button>

                  <button
                    className="btn-danger"
                    onClick={() => handleDeleteOrder(orders.orderId)}
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

export default OrderPageAdmin;
