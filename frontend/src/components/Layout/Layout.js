
import React, { Fragment } from 'react';
import styled from "styled-components";
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

const Background = styled.div`
  width: 100vw;
  position: relative;
  height:55rem;
`;

const MainSection = styled.div`
  margin-top:5rem;
  width: 95vw;
  position: absolute;
  top: 5%;
  background: transparent;
  z-index: 2;
  
`;

export const InsideMainSection = styled.div`
  box-shadow: 1px 0 45px 0.41px #33302a;
  max-width: 60vw;
  background: #fff;
  box-shadow: 1px 4px 19px 3px rgba(51, 48, 42, 0.47);
  margin: 0 auto;
  border-radius: 1rem;
  height: 100%;
`;

export default function Layout(props) {
  return (
    <Fragment>
      <Background>

        <Navbar />
        <MainSection>
          {props.children}
        </MainSection>

      </Background>
      {/* <Footer /> */}
    </Fragment>
  );
}
