import { render, screen } from "@testing-library/react";
import TaskItem from "../TaskItem.tsx"
import { expect } from "vitest";

describe('Task Item', () => {
    it('should display task item', () => {
        // Arrange
        render(<TaskItem />)

        expect(screen.getByText(/Task 1/i)).toBeInTheDocument()
        screen.logTestingPlaygroundURL()
        expect(screen.getByRole('listitem', {name: /Task 1/i})).toBeInTheDocument()

    });
});