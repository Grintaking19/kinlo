import { it, expect, describe, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Button from "./Button.jsx";
import { RouterLink } from "../../lib/RouterLink.jsx";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

let errorSpy;

beforeEach(() => {
  errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  errorSpy.mockRestore();
});

describe("Button", () => {
  it("renders as native button by default", () => {
    render(<Button>Save</Button>);

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
  });

  it("falls back to default variant and size when invalid values are provided", () => {
    render(<Button variant="invalid-variant">Save</Button>);

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      "bg-gradient-to-r from-gradient-cta-start to-gradient-cta-end",
    );
    // Check for
    expect(errorSpy).toHaveBeenCalledOnce();
    expect(errorSpy.mock.calls[0][0]).toContain("Invalid variant");
  });

  it("falls back to default size when invalid values are provided", () => {
    render(<Button size="invalid-size">Save</Button>);

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toBeInTheDocument();
    expect(errorSpy).toHaveBeenCalledOnce();
    expect(errorSpy.mock.calls[0][0]).toContain("Invalid size");
    expect(errorSpy.mock.calls[0][0]).toContain('Defaulting to "md"');
  });

  it("renders as RouterLink when 'as' prop is set to RouterLink and href is provided", () => {
    render(
      <MemoryRouter>
        <Button as={RouterLink} to="/feed">
          Go to feed
        </Button>
      </MemoryRouter>,
    );

    const link = screen.getByRole("link", { name: "Go to feed" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/feed");
  });

  it("logs an error when 'as' prop is set to RouterLink but href is not provided", () => {
    render(
      <MemoryRouter>
        <Button as={RouterLink}>Go to feed</Button>
      </MemoryRouter>,
    );

    expect(errorSpy).toHaveBeenCalledOnce();
    expect(errorSpy.mock.calls[0][0]).toContain(
      "`href` is required when the `as` prop is set to a link component",
    );
  });

  it("disables the native button when disabled prop is true and blocks clicks", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Button disabled onClick={handleClick}>
        Save
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("cursor-not-allowed");

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("uses aria-disabled attribute for RouterLink when disabled prop is true and blocks clicks", async () => {
    render(
      <MemoryRouter>
        <Button as={RouterLink} to="/feed" disabled>
          Go to feed
        </Button>
      </MemoryRouter>,
    );

    const link = screen.getByRole("link", { name: "Go to feed" });
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).not.toHaveAttribute("disabled");
    expect(link).not.toHaveAttribute("type");
  });
});
