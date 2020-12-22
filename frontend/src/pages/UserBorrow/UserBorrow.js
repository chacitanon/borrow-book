import React, { useState } from "react";
import {
  Table,
  Input,
  InputNumber,
  Form,
  Row,
  Col,
} from "antd";
import axios from "../../config/axios";

const { Search } = Input;


const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
          children
        )}
    </td>
  );
};

function UserBorrow(props) {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [Books, setBooks] = React.useState([]);

  const isEditing = (record) => record.key === editingKey;

  const onSearch = async (value) => {
    setIsLoading(true);
    const { data } = await axios.get(`/books/?_search=${value}`);
    const searchBook = data;
    setBooks(searchBook);
    setBooks(searchBook);
    setIsLoading(false);
  };

  const fetchAllBooks = async () => {
    const { data } = await axios.get("/borrow");
    setBooks(data);
    console.log(data);
  };

  React.useEffect(() => {
    fetchAllBooks();

  }, []);


  const deleteBook = async (id) => {
    await axios.delete(`/borrow/${id}`);
    setBooks(Books.filter((book) => book.id !== id));
    ///@@@@@@
    // fetchAllBooks();
    setEditingKey("");
  };

  const columns = [
    {
      title: "Book",
      dataIndex: "name",
      width: "15%",
      align: "center",


    },
    {
      title: "Img",
      dataIndex: "main_image",
      render: (text, record) => <img src={record.main_image} style={{ width: "3rem", height: "3rem", }} />,
      width: "10%",
      align: "center",

    },


    {
      title: "author",
      dataIndex: "author",
      width: "10%",

      align: "center",
    },


    {
      title: "operation",
      dataIndex: "operation",
      align: "center",
      width: "15%",
      render: (_, record) => {

        return (
          <Row justify="space-around">
            <Col>
              <button style={{ width: "4rem" }}

                onClick={() => deleteBook(record.id)}
              >
                Return
          </button>
            </Col>

          </Row >

        );

      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "price" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <Row style={{ marginLeft: "5rem" }}>
        <Col>
          <Search
            placeholder="input search text"
            allowClear
            onSearch={onSearch}
            loading={isLoading}
            style={{ width: "25rem", margin: "0 10px" }}
          />
        </Col>
      </Row>
      <br></br>
      <Row justify="center">
        <Col span={21}>
          <h2
            style={{
              background: "linear-gradient(to right, #002416, #89e380)",
              width: "100%",
              height: "3.5rem",
              margin: "0 auto",
              textAlign: "center",
              paddingTop: "0.5rem",
              paddingLeft: "0rem",
              paddingRight: "0rem",
              borderTopLeftRadius: "1rem",
              borderTopRightRadius: "1rem",
              color: "white",
              fontFamily: "Playfair",

            }}
          >
            Borrow
        </h2></Col>
      </Row>
      <Row justify="center">
        <Col span={21}>
          <Form form={form} component={false}>
            <Table
              style={{ border: "2px solid #ddd" }}
              components={{
                body: {
                  cell: EditableCell,

                },
              }}

              bordered
              dataSource={Books}
              columns={mergedColumns}
              rowClassName="editable-row"
              rowKey={record => record.id}

            />
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default UserBorrow;
