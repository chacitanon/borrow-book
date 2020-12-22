import React from 'react';
import { Col, Row, Tabs } from 'antd';
import Login from '../Login/Login';
import AdminLogin from '../Login/AdminLogin';
const { TabPane } = Tabs;

export default function HomePage() {
  return (
    <Row justify="center">
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab={
          <span
            style={{
              background: "linear-gradient(to right, #002416, #89e380)",
              padding: "5rem",
            }}
          >
            User
            </span>
        } key="1" style={{ width: "75rem", height: "50rem" }}>
          <Row>
            <Col span={24}>
              <Login />
            </Col>
          </Row>
        </TabPane>
        <TabPane tab={
          <span
            style={{
              background: "linear-gradient(to right, #002416, #89e380)",
              padding: "5rem",
            }}
          >
            Admin
            </span>
        } key="2" style={{ width: "75rem", height: "50rem" }}>
          <Row>
            <Col span={24}>
              <AdminLogin />
            </Col>
          </Row>
        </TabPane>

      </Tabs>
    </Row>
  );
}
