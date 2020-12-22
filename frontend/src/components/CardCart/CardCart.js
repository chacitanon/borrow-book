import React, { useContext } from 'react';
import { Row, Col, Button, Divider } from 'antd';
import { BookContext } from '../../Context/bookContext';


export default function Cart({ props, qty }) {
  const { selectItem, updateQty, deleteBook, sendUpdatedData } = useContext(
    BookContext
  );
  const { main_image, name, price, id } = props;

  return (
    <Row justify="center">


      <Row>
        <Col >
          <img src={main_image} alt={name} style={{ width: "10rem", height: "10rem" }} />
        </Col>
        <Col style={{ marginLeft: "2rem", marginRight: "2rem" }}>
          <div>
            Book : {name}
          </div>
          <div>
            Price: {price}
          </div>

        </Col>
        <Col style={{ marginLeft: "2rem", marginRight: "0.5rem" }}>
          <Button type="primary" onClick={() =>
            updateQty(id, -1)
          } >-</Button>
        </Col>
        <div>
          Quantity: {qty}

        </div>


        <Col style={{ marginRight: "2rem", marginLeft: "0.5rem" }}>
          <Button type="primary" onClick={() => {
            updateQty(id, 1);
          }}>+</Button>
        </Col>

        <Col>
          <Button type="primary" onClick={() => {
            deleteBook(id);
          }}>Delete</Button>
        </Col>
        <Divider></Divider>
      </Row>



    </Row >
  );
}

