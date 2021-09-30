import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "..";

const addTodo = (todos) => {
    const inputElement = screen.getByTestId("todo-input");
    const submitButtonElement = screen.getByText(/Submit/i);

    todos.forEach((todo) => {
        fireEvent.change(inputElement, { target: { value: todo } });
        fireEvent.click(submitButtonElement);
    });
};

describe("add todo integration", () => {
    it("adding todo item into todo list", async () => {
        render(<Dashboard />);
        addTodo(["add todo item"]);

        const divList = screen.getByText(/add todo item/i);
        expect(divList).toBeInTheDocument();
    });

    it("adding multiple todo item into todo list", async () => {
        render(<Dashboard />);
        addTodo(["add todo item", "add todo item 2", "add todo item 3"]);

        const divList = screen.getAllByTestId("todo-list-container");
        expect(divList.length).toBe(3);
    });
});
