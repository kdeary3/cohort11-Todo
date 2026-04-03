import TaskPage from "../TaskPage.tsx";
import {render, screen, within} from "@testing-library/react";
import {expect} from "vitest";
import type {Task} from "../TaskType.ts";

describe('Task Page', () => {
    it('should display title', () => {
        render(<TaskPage/>)

        expect(screen.getByRole('heading', {name: /Task List/i})).toBeInTheDocument()
    });

    it('should show multiple tasks', () => {
        const task1: Task = {
            "id": 1,
            "title": "First Task",
            "description": "Get task component built."
        }
        const task2: Task = {
            "id": 2,
            "title": "Second Task",
            "description": "Another desc."
        }

        render(<TaskPage/>)
        screen.logTestingPlaygroundURL()
        expect(screen.getByRole('list')).toBeInTheDocument()
        const list = screen.getByRole('list')
        const allListItems = screen.getAllByRole('listitem')
        expect(within(list).queryAllByLabelText(/task/i)[0]).toBeInTheDocument()
        expect(allListItems).toHaveLength(2)

    });
});