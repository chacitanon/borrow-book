import { Col, Row, Form, Input, Button, Upload, Select, notification } from 'antd';
import React from 'react';
import { InsideMainSection } from '../../components/Layout/Layout';
import { UploadOutlined } from "@ant-design/icons";
import axios from '../../config/axios';
const { Option } = Select;

function AddBook(props) {
  const [books, setBooks] = React.useState({});


  const mainList = [
    // {
    //   uid: "-1",
    //   name: "main_image",
    //   status: "done",
    //   url:
    //     setBooks.main_image,

    // },

  ];

  const onFinish = async (values) => {
    console.log(values);
    const formData = new FormData();
    console.log(values.main_image.file.originFileObj);
    formData.append('main_image', values.main_image.file.originFileObj);
    formData.append('name', values.name);
    formData.append('author', values.author);
    formData.append('price', values.price);
    formData.append('description', values.description);
    formData.append('nameType', values.nameType);
    formData.append('codeType', values.codeType);
    formData.append('countInStock', values.countInStock);

    try {
      const res = await axios.post('/books', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

      if (res)
        notification.success({
          description: "successfully",
        });
      props.history.push('/admin/book');

    } catch (error) {
      notification.error({
        description: "wrong.",
      });
    }
  };


  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }
  function onSearch(val) {
    console.log("search:", val);
  }




  return (
    <InsideMainSection>
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
          marginBottom: "2rem"
        }}
      >
        Add Book
        </h2>
      <Row justify="center">
        <Col span={21}>
          <Form
            layout="horizontal"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 18 }}
            onFinish={onFinish}

          >
            <Row justify="center">
              <Col span={20}>
                <Form.Item
                  name="name"
                  label="Book Name"
                  rules={[
                    {
                      required: false,
                      message: "Please input your Book Name!",
                    },
                  ]} >

                  <Input
                    placeholder="input Book Name"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row justify="center">
              <Col span={20}>
                <Form.Item
                  name="author"
                  label="Author"
                  rules={[
                    {
                      required: false,
                      message: "Please input your Author!",
                    },
                  ]} >

                  <Input
                    placeholder="input Author"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row justify="center">
              <Col span={20}>
                <Form.Item
                  name="nameType"
                  label="Category_Name"

                  rules={[
                    {
                      required: false,
                      message: "Please input your category",
                    },
                  ]}
                >
                  <Select
                    name="nameType"
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a note"
                    optionFilterProp="children"
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
                    }
                  >
                    <Option value="anthology">Floral</Option>
                    <Option value="children's">Citrus</Option>
                    <Option value="crime">Powdery</Option>
                    <Option value="drama">Fruity</Option>
                    <Option value="fairytale">Aromatic</Option>
                    <Option value="horror">Spicy</Option>
                    <Option value="romance">Woody</Option>

                  </Select></Form.Item>
              </Col>
            </Row>

            <Row justify="center">
              <Col span={20}>
                <Form.Item
                  name="codeType"
                  label="Category_Code"

                  rules={[
                    {
                      required: false,
                      message: "Please input your category",
                    },
                  ]}
                >
                  <Select
                    name="codeType"
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a note"
                    optionFilterProp="children"
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
                    }
                  >
                    <Option value="A01">Floral</Option>
                    <Option value="Ch01's">Citrus</Option>
                    <Option value="Cr01">Powdery</Option>
                    <Option value="D01">Fruity</Option>
                    <Option value="Fa01">Aromatic</Option>
                    <Option value="H01">Spicy</Option>
                    <Option value="Ro01">Woody</Option>
                  </Select></Form.Item>
              </Col>
            </Row>

            <Row justify="center">
              <Col span={20}>
                <Form.Item
                  name="price"
                  label="Price"
                  rules={[
                    {
                      required: false,
                      message: "Please input your  Price!",
                    },
                  ]} >

                  <Input
                    placeholder="input Price"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row justify="center">
              <Col span={20}>
                <Form.Item
                  name="countInStock"
                  label="Stock"
                  rules={[
                    {
                      required: false,
                      message: "Please input your  Stock!",
                    },
                  ]} >

                  <Input
                    placeholder="input Stock"
                  />
                </Form.Item>
              </Col>
            </Row>


            <Row justify="center">
              <Col span={20}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: false,
                      message: "Please input your  Description!",
                    },
                  ]} >

                  <Input
                    placeholder="input Description"
                    style={{ height: "10rem" }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row justify="center">
              <Col span={12} style={{ marginLeft: "8rem" }}>
                <Form.Item
                  name="main_image"

                  rules={[
                    {
                      required: false,
                      message: "Please input your image",
                    },
                  ]}
                >
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture"
                    defaultFileList={[...mainList]}
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>



            <Row justify='center'>
              <Button type="primary" htmlType="submit" style={{ marginBottom: "2rem" }}>
                Add
              </Button>
            </Row>

          </Form>
        </Col>
      </Row>
    </InsideMainSection>
  );
}

export default AddBook;
