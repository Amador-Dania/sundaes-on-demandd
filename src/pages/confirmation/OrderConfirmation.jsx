import axios from "axios";
import React, { useState, useEffect } from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";
import AlertBanner from "../common/AlertBanner";

export default function OrderConfirmation({ setOrderPhase }) {
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .post(`http://localhost:3030/order`)
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => setError(true));
  }, []);

  function handleClick() {
    // clear the order details
    resetOrder();

    // send back to order page
    setOrderPhase("InProgress");
  }

  const newOrderButton = (
    <button onClick={handleClick}>Create new order</button>
  );

  if (error) {
    return (
      <>
        <AlertBanner message={null} variant={null} />
        {newOrderButton}
      </>
    );
  }

  if (orderNumber) {
    return (
      <>
        <div style={{ textAlign: "center" }}>
          <h1>Thank you!</h1>
          <p>Your order number is {orderNumber}</p>
          <p style={{ fontSize: "25%" }}>
            as per our terms and conditions, nothing will happen now
          </p>
          {newOrderButton}
        </div>
      </>
    );
  } else {
    return <div>Loading</div>;
  }
}
