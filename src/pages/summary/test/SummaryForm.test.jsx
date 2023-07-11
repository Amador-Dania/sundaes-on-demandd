import { render, fireEvent, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import React from "react";

test("Quiz: Checkbox enable button", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  //Checkbox is unchecked by default
  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", { name: /confirm order/i });

  expect(confirmButton).toBeDisabled();
});

test("Quiz: checking checkbox enable button", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });

  fireEvent.click(checkbox);
  expect(confirmButton).toBeEnabled();

  fireEvent.click(checkbox);
  expect(confirmButton).toBeDisabled();
});
