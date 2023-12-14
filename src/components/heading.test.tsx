import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Heading } from "./heading";

describe("<Heading/>", () => {
  it("should render heding component", () => {
    render(<Heading />);

    expect(screen.getByRole("heading", { name: "ok" }));
  });
});
