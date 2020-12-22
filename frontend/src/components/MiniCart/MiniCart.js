import React, { useContext, useState, useEffect } from 'react';
import CtaButton from './CtaButton';
import SelectedItem from './SelectedItem';
import { BookContext } from '../../Context/bookContext';
import { RiShoppingCartLine } from 'react-icons/ri';
import styled from "styled-components";
import { Divider, Row } from "antd";


const Container = styled.div`
  position: relative;
  cursor: pointer;
  width: 10rem;
  height: 240px;
  bottom: -15.4rem;
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 0rem;
  overflow-y: scroll;
  color: #000;
  background-color: #b2e8a6;
  box-shadow: 1px 4px 19px 3px rgba(51, 48, 42, 0.47);
  border-radius: 1rem;

`;

function MiniCart(props) {
  const { selectItem } = useContext(BookContext);
  const [hide, toggleHide] = useState(true);

  let totalPrice = 0;

  return (
    <div>
      <RiShoppingCartLine onClick={() => toggleHide(!hide)} style={{ height: '2rem', width: "3.5rem" }} />
      {hide ? null : (
        <Container>
          {selectItem ? (
            selectItem.map(item => {
              const { Book } = item;
              totalPrice += +item.qty * +item.Book.price;
              return (

                <SelectedItem
                  key={item.id}
                  props={{ ...Book }}
                  qty={item.qty}


                />

              );
            })
          ) : (
              <Container>
                <h1 style={{ fontSize: '1.5rem', color: '#000' }}>Empty</h1>
              </Container>
            )}
          <Divider />
          <Row justify="center">Total Price {totalPrice}</Row>
          <CtaButton at={'/Cart'}>Checkout</CtaButton>
        </Container>
      )}
    </div>
  );
}

export default MiniCart;
