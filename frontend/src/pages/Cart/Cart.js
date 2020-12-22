import { Button, Col, Row } from 'antd';
import React, { useContext, useEffect } from 'react';
import styled from "styled-components";
import CardCart from "../../components/CardCart/CardCart";
import Omise from '../../components/Omise/Omise';
import axios from '../../config/axios';
import { BookContext } from '../../Context/bookContext';
// import { OrderContext } from '../../Context/orderContext';




const InsideMainSection = styled.div`
  box-shadow: 1px 0 45px 0.41px #33302a;
  max-width: 70vw;
  background: #fff;
  box-shadow: 1px 4px 19px 3px rgba(51, 48, 42, 0.47);
  margin: 0 auto;
  border-radius: 1rem;
  height: 100%;
`;



export default function AllCart(props) {
  let totalPrice = 0;

  const { selectItem, retrieveAllItems } = useContext(BookContext);


  const putBorrow = async () => {
    await axios.post(`/borrow`);
    props.history.push(`/user/borrow`);

  };

  useEffect(() => {
    retrieveAllItems();


    console.log(totalPrice);
  }, []);

  console.log(selectItem);

  return (
    <InsideMainSection>
      <Row justify="center">
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
          Cart
        </h2>
      </Row>
      <br></br>
      <Row justify="center"><Col> <h2>My Item</h2></Col></Row>
      <br></br>
      <Row justify="center">
        {selectItem.length &&
          selectItem.map(item => {
            const { Book } = item;
            totalPrice += +item.qty * +item.Book.price;


            return <CardCart
              key={item.id}
              props={{ ...Book }}
              qty={item.qty} />;
          })}
      </Row>
      <hr></hr>
      <Row justify="end">
        <Col span={5}>
          Total : {+totalPrice}
        </Col>
      </Row>
      <br></br>

      <Row justify="end">
        <Col span={5}>
          <Omise totalPrice={totalPrice} onClick={() => putBorrow()} />
          {/* <button onClick={() => putBorrow()} >go to borrow</button> */}
        </Col>
      </Row>
      <br></br>
      <Row justify="center">
        <Col span={1}>
          <Button type="primary" onClick={() => props.history.push("/book")}>Back</Button>
        </Col>
      </Row>



    </InsideMainSection>
  );
}
