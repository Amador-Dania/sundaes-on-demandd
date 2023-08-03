import { render, screen } from "../../../test-utils/testing-library-utils";

import userEvent from "@testing-library/user-event";
import React from "react";
import ScoopOption from "../ScoopOption";

test("Validate scoop count value", async () => {
  const user = userEvent.setup();
  render(<ScoopOption name={jest.fn()} imagePath={jest.fn()} />);

  //check negative numbers
  const scoopsInput = screen.getByRole("spinbutton");
  await user.clear(scoopsInput);
  await user.type(scoopsInput, "-1");
  expect(scoopsInput).toHaveClass("is-invalid");
  //check decimal numbers
  await user.clear(scoopsInput);
  await user.type(scoopsInput, "2.5");
  expect(scoopsInput).toHaveClass("is-invalid");
  //check more than 10 scoops
  await user.clear(scoopsInput);
  await user.type(scoopsInput, "11");
  expect(scoopsInput).toHaveClass("is-invalid");

  //replace with valid input
  //note: here we`re testing our validation rules (namely that input can display)
  //and not react-bootstrap's response
  await user.clear(scoopsInput);
  await user.type(scoopsInput, "3");
  expect(scoopsInput).not.toHaveClass("is-invalid");
});
