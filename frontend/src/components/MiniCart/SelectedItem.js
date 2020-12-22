import { Row } from 'antd';
import React from 'react';
import styled from "styled-components";


const Item = styled.div`
  position: relative;
  cursor: pointer;
  margin: 0 1rem;
`;
const Img = styled.img`
  position: relative;
  cursor: pointer;
  width: 50px;
`;

function SelectedItem({ props, qty }) {
  const { main_image, name, price, id } = props;
  return (

    <div>
      <Row>
        <Item>
          <Img src={main_image} alt={name} />
        </Item>
        <Item >price :{price}</Item>
        <Item >Quantity :{qty}</Item>
      </Row>
    </div>

  );
}

export default SelectedItem;
