import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from '../../config/axios';
import { useHistory } from 'react-router-dom';


function Omise({ totalPrice }) {
  const history = useHistory();

  const publishableKey =
    'pk_test_51HzhkaJNql2l8EUPaoEaVOlf33U5dL8FTmPA8cbpEoQRTZKivFT5BF3ltdhQfAykTSEb2gu7sbacz28KjUtLt4Wz00TYOp9yTh';
  const onToken = async token => {
    console.log(token);
    alert('Payment Successfull');
    await axios.post(`/borrow`);
    history.push(`/user/borrow`);
  };

  return (
    <div>
      <StripeCheckout
        label='Pay Now'
        name='Borrow Ltd.'
        billingAddress
        shippingAddress
        description={`Your total is $${totalPrice}`}
        amount={totalPrice}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
      />
    </div>
  );
}

export default Omise;
