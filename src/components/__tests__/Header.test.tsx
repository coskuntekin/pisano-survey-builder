import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../Header";

// Mock react-router-dom's NavLink to avoid routing issues in tests
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  NavLink: ({ children, to, className, end, ...props }: any) => (
    <a
      href={to}
      className={
        typeof className === "function"
          ? className({ isActive: false })
          : className
      }
      {...props}
    >
      {children}
    </a>
  ),
}));

const mockUser = { name: "John Doe" };
const mockLogout = jest.fn();

const renderHeader = (props = {}) => {
  const defaultProps = {
    user: mockUser,
    logout: mockLogout,
    isLoading: false,
    ...props,
  };

  return render(
    <BrowserRouter>
      <Header {...defaultProps} />
    </BrowserRouter>,
  );
};

describe("Header Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the header with logo and title", () => {
    renderHeader();

    expect(
      screen.getByRole("heading", { name: "Survey Builder" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("displays user name when user is provided", () => {
    renderHeader();

    expect(screen.getByText("Welcome, John Doe!")).toBeInTheDocument();
  });

  it("does not display welcome message when user is null", () => {
    renderHeader({ user: null });

    expect(screen.queryByText(/Welcome/)).not.toBeInTheDocument();
  });

  it("renders navigation links", () => {
    renderHeader();

    expect(screen.getByRole("link", { name: "Dashboard" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Survey Builder" }),
    ).toBeInTheDocument();
  });

  it("calls logout function when logout button is clicked", () => {
    renderHeader();

    const logoutButton = screen.getByRole("button", { name: "Logout" });
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it("disables logout button when loading", () => {
    renderHeader({ isLoading: true });

    const logoutButton = screen.getByRole("button", { name: "Logging out..." });
    expect(logoutButton).toBeDisabled();
  });

  it("shows loading text when isLoading is true", () => {
    renderHeader({ isLoading: true });

    expect(screen.getByText("Logging out...")).toBeInTheDocument();
    expect(screen.queryByText("Logout")).not.toBeInTheDocument();
  });

  it("has correct navigation link hrefs", () => {
    renderHeader();

    const dashboardLink = screen.getByRole("link", { name: "Dashboard" });
    const surveyBuilderLink = screen.getByRole("link", {
      name: "Survey Builder",
    });

    expect(dashboardLink).toHaveAttribute("href", "/app/dashboard");
    expect(surveyBuilderLink).toHaveAttribute(
      "href",
      "/app/survey-builder/step-1",
    );
  });

  it("applies correct CSS classes to navigation links", () => {
    renderHeader();

    const dashboardLink = screen.getByRole("link", { name: "Dashboard" });
    expect(dashboardLink).toHaveClass(
      "px-3",
      "py-2",
      "rounded",
      "transition-colors",
    );
  });

  it("renders Pisano logo SVG", () => {
    renderHeader();

    const logoSvg = screen.getByRole("banner").querySelector("svg");
    expect(logoSvg).toBeInTheDocument();
    expect(logoSvg).toHaveAttribute("width", "110");
    expect(logoSvg).toHaveAttribute("height", "32");
  });
});
