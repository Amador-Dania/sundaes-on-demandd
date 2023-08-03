import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import React from "react";
import userEvent from "@testing-library/user-event";

test("handles error for scoop and topping routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );
  rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
    res(ctx.status(500))
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

test("Quiz: Disable order button if there are no Scoops ordered", async () => {
  const user = userEvent.setup();
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  //check button disable by default
  const OrderSundaeButton = screen.getByRole("button", {
    name: /order sundae/i,
  });
  expect(OrderSundaeButton).toBeDisabled();

  //select a topping enable button
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(OrderSundaeButton).toBeEnabled();

  //reset topping to 0 and check for order button disabled
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "0");
  expect(OrderSundaeButton).toBeDisabled();
});
