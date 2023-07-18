import React from "react";
import { Container } from "react-bootstrap";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and entry page need rprovider*/}
        <OrderEntry />
      </OrderDetailsProvider>
      {/* confirmation page does not need provider*/}
    </Container>
  );
}

export default App;
