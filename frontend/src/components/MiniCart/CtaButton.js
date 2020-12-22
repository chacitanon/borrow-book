import React from 'react';
import { Button } from 'antd';

const CtaButton = props => {
  const { at } = props;
  return (
    <Button type="primary"
      style={{ margin: '0 0.25rem' }}
      onClick={props.addToCart}
      href={at || null}
    >
      {props.children}
    </Button>
  );
};

export default CtaButton;
