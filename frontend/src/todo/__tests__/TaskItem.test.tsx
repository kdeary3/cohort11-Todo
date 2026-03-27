import { render, screen } from "@testing-library/react";
import { TaskItem } from "../TaskItem.tsx"
import { expect } from "vitest";
import type {Task} from "../TaskType.ts";

describe('Task Item', () => {
    it('should display task item', () => {
        const task1: Task = {
            "id" : 1,
            "title" : "First Task",
            "description" : "Get task component built."
        }

        // Arrange
        render(<TaskItem initialTask={task1} />)

        expect(screen.getByRole('listitem', {name: /Task 1/i})).toBeInTheDocument()
        expect(screen.getByText('First Task: Get task component built.')).toBeInTheDocument()
        screen.logTestingPlaygroundURL()

    });
});