import React from "react";
import styled from "styled-components";
import { Row, Col } from "antd";
import { Typography } from "antd";
const { Link } = Typography;

const SetFooter = styled.div`
  z-index: 2;
  background: linear-gradient(to right, #002416, #89e380);
  height: 10vh;
  width: 100%;
  bottom: 0;
  padding: 0.3rem;
  position: relative;
  position: fixed;
`;
function Footer() {
  return (
    <SetFooter>
      <Row justify="space-around">
        <Col>
          <h4>Contact Us</h4>
          <div>9999 fdfdfs gsdgdsg</div>
          <div>sfsfs 41000 Thailand</div>
        </Col>
        <Col>
          <br></br>
          <div>99999@gmail.com</div>
          <div>+88 956421486</div>
        </Col>
        <Col>
          <h4>Useful Links</h4>
          <div>
            <Link href="https://ant.design" style={{ color: "black" }}>
              site map
            </Link>
          </div>

          <div>
            <Link href="https://ant.design" style={{ color: "black" }}>
              My Account
            </Link>
          </div>
        </Col>
        <Col>
          <h4>Services</h4>
          <div>
            <Link href="https://ant.design" style={{ color: "black" }}>
              International Shipping
            </Link>
          </div>

          <div>
            <Link href="https://ant.design" style={{ color: "black" }}>
              FAQs
            </Link>
          </div>
        </Col>
        <Col>
          <h4>LOGO</h4>
          <Link
            href="https://www.facebook.com/"
            style={{ color: "black", margin: "1rem" }}
          >
            FB
          </Link>
          <Link
            href="https://www.instagram.com"
            style={{ color: "black", margin: "1rem" }}
          >
            IG
          </Link>
          <Link
            href="https://twitter.com/"
            style={{ color: "black", margin: "1rem" }}
          >
            TW
          </Link>
          <Link
            href="https://www.google.co.th"
            style={{ color: "black", margin: "1rem" }}
          >
            G+
          </Link>
        </Col>
      </Row>
    </SetFooter>
  );
}

export default Footer;
