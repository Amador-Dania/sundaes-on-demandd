import React, { useState } from "react";
import { Container } from "react-bootstrap";

import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";

import { OrderDetailsProvider } from "./contexts/OrderDetails";

function App() {
  const [orderPhase, setOrderPhase] = useState("InProgress");

  let Component = OrderEntry;
  switch (orderPhase) {
    case "InProgress":
      Component = OrderEntry;
      break;
    case "Review":
      Component = OrderSummary;
      break;
    case "Completed":
      Component = OrderConfirmation;
      break;
    default:
  }

  return (
    <OrderDetailsProvider>
      <Container>{<Component setOrderPhase={setOrderPhase} />}</Container>
    </OrderDetailsProvider>
  );
}

export default App;
