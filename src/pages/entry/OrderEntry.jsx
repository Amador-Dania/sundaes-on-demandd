import React from "react";
import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";

export default function OrderEntry({ setOrderPhase }) {
  const { totals } = useOrderDetails();

  const orderDisabled = totals.scoops === 0;

  return (
    <div>
      <h1>Desing Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand Total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
      <button onClick={() => setOrderPhase("Review")} disabled={orderDisabled}>
        Order Sundae!
      </button>
    </div>
  );
}
