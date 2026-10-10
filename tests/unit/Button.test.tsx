import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders with the minimum accessible target and visible label", () => {
    render(<Button>Start for free</Button>);

    const button = screen.getByRole("button", { name: "Start for free" });
    expect(button).toHaveClass("min-h-11");
    expect(button).toHaveClass("focus-visible:ring-2");
  });

  it("responds to keyboard activation", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Activate</Button>);

    const button = screen.getByRole("button", { name: "Activate" });
    button.focus();
    await user.keyboard("{Enter}");

    expect(onClick).toHaveBeenCalledOnce();
  });
});
