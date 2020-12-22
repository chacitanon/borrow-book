import { Col, Input, Row, Form, Button, notification } from 'antd';
import axios from '../../config/axios';
import React from 'react';
import { InsideMainSection } from '../../components/Layout/Layout';

export default function Register(props) {
  const onFinish = async (values) => {
    try {
      console.log(values);
      const res = await axios.post('/auth/register', {
        ...values
      });
      if (res)
        notification.success({
          description: "register success"
        });
      props.history.push('/login');
    } catch (error) {
      notification.error({
        description: "wrong"
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
        Register
        </h2>

      <Row justify="center">
        <Col span={16}>
          <Form
            layout="horizontal"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 18 }}
            onFinish={onFinish}

          >
            <Row justify="center">
              <Col span={20}>
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[
                    {
                      required: false,
                      message: "Please input your Username!",
                    },
                  ]} >

                  <Input
                    placeholder="input Username"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row justify="center">
              <Col span={20}>
                <Form.Item
                  name="firstName"
                  label="First name"
                  rules={[
                    {
                      required: false,
                      message: "Please input your First name!",
                    },
                  ]} >

                  <Input
                    placeholder="input First name"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row justify="center">
              <Col span={20}>
                <Form.Item
                  name="lastName"
                  label="Last name"
                  rules={[
                    {
                      required: false,
                      message: "Please input your Last name!",
                    },
                  ]} >

                  <Input
                    placeholder="input Last name"
                  />
                </Form.Item>
              </Col>
            </Row>



            <Row justify="center">
              <Col span={20}>
                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      required: false,
                      message: "Please input your E-mail!!",
                    },
                  ]}
                >
                  <Input placeholder="input E-mail!" />
                </Form.Item>
              </Col>
            </Row>

            <Row justify="center">
              <Col span={20}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: false,
                      message: "Please input your Password",
                    },
                  ]}
                >
                  <Input.Password placeholder="input Password" />
                </Form.Item>
              </Col>
            </Row>

            <Row justify="center">
              <Col span={20}>
                <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: false,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          "The two passwords that you entered do not match!"
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="input Password" />
                </Form.Item>
              </Col>
            </Row>

            <Row justify='center'>
              <Button type="primary" htmlType="submit" style={{ marginBottom: "2rem" }}>
                Register
              </Button>
            </Row>

          </Form>
        </Col>
      </Row>
    </InsideMainSection>
  );
}
