import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Row,
  Col,
  PageHeader,
  InputNumber,
} from "antd";
import { ShoppingCartOutlined, } from "@ant-design/icons";
import "../../App.less";



import { useParams } from "react-router-dom";
import axios from "../../config/axios";


function SingleBook(props) {
  const { id } = useParams();
  const [bookImg, setBookImg] = useState("");
  const [data, setData] = useState({});
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    axios.get(`/books/${id}`)
      .then((res) => {
        setData(res.data);
        setBookImg(res.data.main_image);
        console.log({ data });
      });

  };

  const putAddCart = async () => {
    axios.post(`/carts/${id}`, { qty });
    props.history.push("/cart");
  };

  const putBack = () => {
    props.history.push("/book");
  };


  function onChange(value) {
    console.log("changed", value);
    setQty(value);
  }

  const ButAddCard = styled.button`
  box-shadow: 1px 3px 16px 3px rgba(51, 48, 42, 0.2);
  border-radius: 1rem;
  background: #fff;
 `;





  const InsideMainSection = styled.div`
    max-width: 80vw;
    background: #fff;
    box-shadow: 1px 3px 16px 3px rgba(51, 48, 42, 0.2);
    margin: 1rem auto 0 auto;
    border-radius: 0.4rem;
    height: 100%;
    background-color:#d7e9d3;
  `;

  const routes = [
    {
      path: "/book",
      breadcrumbName: "Home",
    },

    {
      path: "/book/:id",
      breadcrumbName: (data.name),
    },
  ];


  function numberWithCommas(x = 0) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


  return (
    <InsideMainSection style={{ padding: "20px 20px 20px 20px" }}>
      <PageHeader
        style={{
          display: "inline-flex",
          fontStyle: "normal",
          fontWeight: "300",
          letterSpacing: "0.045em",
          color: "#1f9906 !important",
          margin: "0",
          marginBottom: "10px",
          padding: "0",
        }}
        breadcrumb={{ routes }}
      />
      <Row>
        <Col
          span={24}
          style={{
            margin: "0 auto",
            border: "1px solid #1f9906",
            boxSizing: "border-box",
            paddingTop: "2em",
            paddingBottom: "2em",
            backgroundColor: "#fff"

          }}
        >
          <Row justify="center">

            <Col span={9} style={{ backgroundColor: "#fff", }}>
              <div
                style={{
                  backgroundImage: "url(" + bookImg + ")",
                  width: "auto",
                  height: "34em",
                  margin: "0 auto",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",

                }}
              ></div>
            </Col>
            <Col span={2}></Col>
            <Col span={10} style={{ paddingRight: "2em" }}>
              <div
                style={{
                  marginTop: "2rem",
                  backgroundColor: "#fff",
                  borderRadius: "2rem",
                  width: "100%",
                  padding: "2em",
                  boxShadow: "1px 3px 16px 3px rgba(51, 48, 42, 0.3)"
                }}
              >
                <Row>


                  <Col span={24}>
                    <h1>
                      Book : {data.name}
                    </h1>
                  </Col>
                  <Col span={12}>
                    <h2>Author : {data.author}</h2>
                  </Col>
                </Row>

                <Row >
                  <Col span={12}>
                    <h2 >
                      Rent : {numberWithCommas(data.price)} THB
                    </h2>
                  </Col>

                </Row>
                <div
                  style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "#C0B7AD",
                    marginTop: "1em",
                  }}
                ></div>

                <Row style={{ marginTop: "1.4em" }}>
                  <Col
                    span={7}
                    style={{
                      textAlign: "end",
                      padding: "4px 20px 0 0",
                    }}
                  >
                    <h4 > Quantity :</h4>
                  </Col>
                  <Col span={6}>
                    <InputNumber
                      min={1}
                      max={data.countInStock}

                      defaultValue={1}
                      onChange={onChange}
                    />
                  </Col>
                  <Col
                    span={7}
                    style={{
                      textAlign: "start",
                      paddingTop: "4px",
                    }}
                  >
                    <h4

                      style={{
                        color: "#AAA393",
                        fontWeight: "300"
                        ,
                      }}
                    >
                      {data.countInStock}
                    </h4>
                  </Col>
                </Row>
                <Row style={{ marginTop: "1.6em" }}>
                  <Col span={12} align="center">
                    <ButAddCard
                      onClick={() => putAddCart()}>
                      <ShoppingCartOutlined />
                      <p>ADD TO CART</p>
                    </ButAddCard>


                  </Col>

                </Row>

              </div>
              <Row justify="end" style={{ marginTop: "2rem" }}>
                <Col align="center">
                  <ButAddCard style={{ height: "3rem" }}
                    onClick={putBack}>
                    BACK
                  </ButAddCard>
                </Col>
              </Row>
            </Col>

          </Row>

        </Col>
      </Row>



    </InsideMainSection >
  );
}

export default SingleBook;
