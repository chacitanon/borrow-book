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
import { CgAdd } from "react-icons/cg";

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

function BookForPastner(props) {
  const [show, setShow] = useState(false);

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");



  const [isLoading, setIsLoading] = React.useState(false);
  const [Books, setBooks] = React.useState([]);




  const isEditing = (record) => record.key === editingKey;

  const onRedirect = (path) => {
    props.history.push(path);
    setShow(!show);
  };
  const onSearch = async (value) => {
    setIsLoading(true);
    const { data } = await axios.get(`/books/?_search=${value}`);
    const searchBook = data;
    setBooks(searchBook);
    setBooks(searchBook);
    setIsLoading(false);
  };

  const fetchAllBooks = async () => {
    const { data } = await axios.get("/books/");
    setBooks(data);
  };

  React.useEffect(() => {
    fetchAllBooks();
  }, []);



  const deleteBook = async (id) => {
    await axios.delete(`/books/${id}`);
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
      title: "price",
      dataIndex: "price",
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
      title: "statusBook",
      dataIndex: "statusBook",
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
              <button style={{ width: "4rem", }} onClick={() => onRedirect(`/admin/book/edit/${record.id}`)}>
                Edit
              </button>
            </Col>
            <Col>
              <button style={{ width: "4rem" }}

                onClick={() => deleteBook(record.id)}
              >
                Delete
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
        <CgAdd style={{ width: "2rem", height: "2rem" }} onClick={() => onRedirect("/admin/book/add")}></CgAdd>
      </Row>
      <Form form={form} component={false}>
        <Table
          style={{ margin: "3rem", border: "2px solid #ddd" }}
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
    </>
  );
}

export default BookForPastner;
