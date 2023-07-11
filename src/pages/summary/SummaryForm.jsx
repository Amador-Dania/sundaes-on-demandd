import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function SummaryForm() {
  const [isChecked, setIsChecked] = useState(false);
  const isDisabled = isChecked ? false : true;

  const checkboxLabel = (
    <span>
      i agree to <span style={{ color: "blue" }}>Terms and conditions</span>
    </span>
  );

  return (
    <>
      <Form>
        <Form.Group controlId="terms-and-conditions">
          <Form.Check
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            label={checkboxLabel}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isDisabled}>
          confirm order
        </Button>
      </Form>
    </>
  );
}
