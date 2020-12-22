import { Col, Input, Row, Form, Button, notification } from 'antd';
import { withRouter } from "react-router-dom";
import React from 'react';
import { InsideMainSection } from '../../components/Layout/Layout';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from '../../config/axios';
import LocalStorageService from '../../services/LocalStorageService';

function AdminLogin(props) {
  const onFinish = async (values) => {
    try {
      const res = await axios.post('/auth/admin/login', {
        ...values
      });
      if (res)
        notification.success({
          description: "login success"
        });
      props.history.push('/admin/book');
      LocalStorageService.setToken(res.data.token);
    } catch (error) {
      notification.error({
        description: "error login"
      });
    }
  };
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
        Admin login
        </h2>

      <Row justify="center">
        <Col span={8}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>


            <Form.Item>
              <Row justify="center">
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
        </Button>
              </Row>
              <Row justify="center">
                Or   </Row>
              <Row justify="center"><a href="/admin/register">register admin now!</a></Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </InsideMainSection>
  );
}
export default withRouter(AdminLogin);