import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";
import React from "react";
import userEvent from "@testing-library/user-event";

test("displays image for each scoop option from the server", async () => {
  render(<Options optionType={"scoops"} />);

  //find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  //confirm alt text of images
  // @ts-ignore
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("Code Quiz: Topping Images", async () => {
  render(<Options optionType={"toppings"} />);

  //find images
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  // @ts-ignore
  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});

test("No scoops subtotal update on invalid input spec", async () => {
  const user = userEvent.setup();
  render(<Options optionType={"scoops"} />);

  //add invalid number to the scoops input
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  //find scoops subtotal wich starts out at 0
  const scoopsSubtotal = screen.getByText("Scoops total: $", {
    exact: false,
  });

  //clear the input
  await user.clear(vanillaInput);

  //.type() will type one character at a time
  await user.type(vanillaInput, "-1");

  //make sure scoops subtotal hasn't updated
  expect(scoopsSubtotal).toHaveTextContent("0.00");
});
