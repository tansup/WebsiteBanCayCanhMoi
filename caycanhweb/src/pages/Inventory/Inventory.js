import {
  Button,
  Form,
  Image,
  Modal,
  Rate,
  Space,
  Table,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { getInventory } from "../../API/api";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import InputComponent from "../../components/InputComponent/InputComponent";
import "./Inventory.css";
function Inventory(props) {
  const { selectionType = "checkbox" } = props;
  const [editingOrder, seteditingOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataSource, setdataSource] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stateProduct, setStateProduct] = useState({
    maSP: " ",
    tenSP: " ",
    kichThuoc: " ",
    moTa: " ",
    gia: " ",
    hinhAnh: " ",
    soluong: " ",
    xuatSu: " ",
    maLoai: " ",
  });
  const editOrder = (record) => {
    setIsEditing(true);
    seteditingOrder({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    seteditingOrder(null);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    console.log("finish", stateProduct);
  };
  const handleOnchange = (e) => {
    setStateProduct({ ...stateProduct, [e.target.name]: e.target.value });
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  useEffect(() => {
    setLoading(true);
    getInventory().then((res) => {
      setdataSource(res.plants);
    });
  }, []);
  const onDeleteOrder = (record) => {
    Modal.confirm({
      title: "Bạn có muốn xóa không?",
      onOk: () => {
        setdataSource((pre) => {
          return pre.filter((plants) => plants.title !== record.title);
        });
      },
    });
  };
  if (localStorage.getItem("token")) {
    return (
      <main className="adminmain-container">
        <div className="adminmain-title">
          <h3>PRODUCTS</h3>
        </div>
        <Space size={20} direction="vertical">
          <div style={{ marginTop: "5px" }} className="adminbody">
            <Button
              style={{
                height: "100px",
                width: "100px",
                borderRadius: "6px",
                borderStyle: "dashed",
              }}
              onClick={() => setIsModalOpen(true)}
            >
              <PlusOutlined style={{ fontSize: "60px" }} />
            </Button>
          </div>
          <div style={{ marginTop: "1px" }}></div>
          <Modal
            title="Tạo sản phẩm"
            open={isModalOpen}
            onCancel={handleCancel}
            okText=" "
            okType=" "
          >
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item label="MaSP" name="maSP">
                <InputComponent
                  value={stateProduct.maSP}
                  onChange={handleOnchange}
                  name="maSP"
                  className="input-masp"
                />
              </Form.Item>
              <Form.Item label="TenSP" name="tenSP">
                <InputComponent
                  value={stateProduct.tenSP}
                  onChange={handleOnchange}
                  name="tenSP"
                  className="input-tensp"
                />
              </Form.Item>
              <Form.Item label="KichThuoc" name="kichThuoc">
                <InputComponent
                  value={stateProduct.kichThuoc}
                  onChange={handleOnchange}
                  name="kichThuoc"
                  className="input-kichthuoc"
                />
              </Form.Item>
              <Form.Item label="MoTa" name="moTa">
                <InputComponent
                  value={stateProduct.moTa}
                  onChange={handleOnchange}
                  name="moTa"
                  className="input-mota"
                />
              </Form.Item>
              <Form.Item label="Gia" name="gia">
                <InputComponent
                  value={stateProduct.gia}
                  onChange={handleOnchange}
                  name="gia"
                  className="input-gia"
                />
              </Form.Item>
              <Form.Item label="Soluong" name="soluong">
                <InputComponent
                  value={stateProduct.soluong}
                  onChange={handleOnchange}
                  name="soluong"
                  className="input-soluong"
                />
              </Form.Item>
              <Form.Item label="XuatSu" name="xuatSu">
                <InputComponent
                  value={stateProduct.xuatSu}
                  onChange={handleOnchange}
                  name="xuatSu"
                  className="input-xuatsu"
                />
              </Form.Item>
              <Form.Item label="HinhAnh" name="hinhAnh">
                <InputComponent
                  value={stateProduct.hinhAnh}
                  onChange={handleOnchange}
                  name="hinhAnh"
                  className="input-hinhAnh"
                />
              </Form.Item>
              <Form.Item label="MaLoai" name="maLoai">
                <InputComponent
                  value={stateProduct.maLoai}
                  onChange={handleOnchange}
                  name="maLoai"
                  className="input-maloai"
                />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit" onClick={addProduct}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
          <Table
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            columns={[
              {
                title: "MaSP",
                dataIndex: "maSP",
              },
              {
                title: "TenSP",
                dataIndex: "tenSP",
              },
              {
                title: "KichThuoc",
                dataIndex: "kichThuoc",
              },
              {
                title: "MoTa",
                dataIndex: "moTa",
              },
              {
                title: "Gia",
                dataIndex: "gia",
                render: (value) => <span>{value}đ</span>,
              },
              {
                title: "SoLuong",
                dataIndex: "soLuong",
              },

              {
                title: "XuatSu",
                dataIndex: "xuatSu",
              },
              {
                title: "HinhAnh",
                dataIndex: "hinhAnh",
                render: (link) => {
                  return <Image width={100} src={link} />;
                },
              },
              {
                title: "Action",
                render: (record) => {
                  return (
                    <>
                      <EditOutlined />
                      <DeleteOutlined
                        onClick={() => {
                          onDeleteOrder(record);
                        }}
                        style={{ color: "red", marginLeft: 12 }}
                      />
                    </>
                  );
                },
              },
            ]}
            dataSource={dataSource}
            pagination={{
              pageSize: 4,
            }}
          ></Table>
        </Space>
      </main>
    );
  } else {
    window.location.href = "/admin";
  }
}

async function addProduct() {
  const maSP = document.querySelector(".input-masp");
  const tenSP = document.querySelector(".input-tensp");
  const kichThuoc = document.querySelector(".input-kichthuoc");
  const moTa = document.querySelector(".input-mota");
  const gia = document.querySelector(".input-gia");
  const hinhAnh = document.querySelector(".input-hinhanh");
  const soluong = document.querySelector(".input-soluong");
  const xuatSu = document.querySelector(".input-xuatsu");
  const maLoai = document.querySelector(".input-maloai");
  try {
    const response = await fetch(
      "http://localhost:5000/api/v1/plant/createProducts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          maSP: maSP.value,
          tenSP: tenSP.value,
          kichThuoc: kichThuoc.value,
          moTa: moTa.value,
          gia: gia.value,
          hinhAnh: hinhAnh.value,
          soluong: soluong.value,
          xuatSu: xuatSu.value,
          maLoai: maLoai.value,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const jsonData = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default Inventory;
