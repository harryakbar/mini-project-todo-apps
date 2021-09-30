import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoForm from "../TodoForm";

const mockOnSubmitForm = jest.fn();

describe("todo form test", () => {
    it("input should be rendered", () => {
        render(<TodoForm onSubmit={mockOnSubmitForm} />);
        const inputElement = screen.getByTestId("todo-input");
        expect(inputElement).toBeInTheDocument();
    });

    it("input value should be change", async () => {
        render(<TodoForm onSubmit={mockOnSubmitForm} />);
        const inputElement = screen.getByTestId("todo-input");

        fireEvent.change(inputElement, { target: { value: "Adding todo" } });
        expect(inputElement.value).toBe("Adding todo");
    });
});
