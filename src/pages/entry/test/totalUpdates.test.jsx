import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

import React from "react";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();

  render(<Options optionType="scoops" />);

  //make sure total starts out at $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", {
    exact: false,
  });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  //Update vanilla scoops to 1, and check subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");
});

test("code Quiz: update toppings subtotal when toppings change", async () => {
  const user = userEvent.setup();

  render(<Options optionType={"toppings"} />);

  //make sure total starts out at $0.00
  const toppingsTotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsTotal).toHaveTextContent("0.00");

  //Update cherries
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.50");

  // add hot fudge
  const hotFudgeCheckbox = screen.getByRole("checkbox", {
    name: "Hot fudge",
  });
  await user.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("3.00");

  //tick one of the boxes off and assert on subtotal
  await user.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.50");
});

describe("Grand Total", () => {
  test("Grand total starts at $0.00", () => {
    const { unmount } = render(<OrderEntry />);
    const granTotal = screen.getByRole("heading", { name: /grand total: \$/i });
    expect(granTotal).toHaveTextContent("0.00");
    unmount();
  });

  test("grand total updates properly if scoop is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const granTotal = screen.getByRole("heading", { name: /grand total: \$/i });

    // add scoop
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(granTotal).toHaveTextContent("4.00");

    //add topping
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    expect(granTotal).toHaveTextContent("5.50");
  });

  test("grand total updates properly if topping is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const granTotal = screen.getByRole("heading", { name: /grand total: \$/i });

    //add topping
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    expect(granTotal).toHaveTextContent("1.50");

    //add scoop
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(granTotal).toHaveTextContent("5.50");
  });

  test("grand total updates properly if item is removed", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const granTotal = screen.getByRole("heading", { name: /grand total: \$/i });

    //add topping
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    // expect(granTotal).toHaveTextContent("1.50");

    //add scoop
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    // expect(granTotal).toHaveTextContent("5.50");

    //remove cherries
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    //check grand total
    expect(granTotal).toHaveTextContent("3.50");

    //remove cherries
    await user.click(cherriesCheckbox);
    expect(granTotal).toHaveTextContent("2.00");
  });
});
