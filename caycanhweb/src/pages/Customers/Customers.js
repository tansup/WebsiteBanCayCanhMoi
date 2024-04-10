import { Avatar, Modal, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers } from "../../API/api";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
function Customers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setdataSource] = useState([]);
  useEffect(() => {
    setLoading(true);
    getCustomers().then((res) => {
      setdataSource(res.users);
    });
  }, []);
  const onDeleteOrder = (record) => {
    Modal.confirm({
      title: "Bạn có muốn xóa không?",
      onOk: () => {
        setdataSource((pre) => {
          return pre.filter((users) => users.title !== record.title);
        });
      },
    });
  };
  if(localStorage.getItem("token"))
  {
    return (
      <>
        <Typography.Title level={4}>Accounts</Typography.Title>
        <Table
          columns={[
            {
              title: "Photo",
              dataIndex: "image",
              render: (link) => {
                return <Avatar src={link} />;
              },
            },
            {
              title: "First Name",
              dataIndex: "firstName",
            },
            {
              title: "Last Name",
              dataIndex: "lastName",
            },
            {
              title: "Email",
              dataIndex: "email",
            },
            {
              title: "Phone",
              dataIndex: "phone",
            },
  
            {
              title: "UserName",
              dataIndex: "username",
            },
            {
              title: "Password",
              dataIndex: "password",
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
            pageSize: 5,
          }}
        ></Table>
      </>
    );
  }
  else {
    window.location.href = "/admin"
  }
}
export default Customers;
