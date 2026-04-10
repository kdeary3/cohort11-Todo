import {TaskForm} from "../TaskForm.tsx"
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as taskApi from "../TaskService.ts";
import {afterEach} from "vitest";


describe('Task Form Test', () => {

    const user = userEvent.setup();

    it('should display form heading and fields', () => {
        render(<TaskForm/>);
        screen.findByRole('form');

        expect(screen.getByRole('heading', {name: /task form/i}),).toBeInTheDocument();
        expect(screen.getByRole('textbox', {name: /title/i}),).toBeInTheDocument();
        expect(screen.getByRole('textbox', {name: /description/i}),).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /add task/i}),).toBeInTheDocument();

        screen.logTestingPlaygroundURL()

    });

    describe('Mock Task Form', () => {
        vi.mock('../TaskService.ts');

        const mockData = [
            {id: 1, title: 'First Task', description: 'get task component built.'},
            {id: 2, title: 'Second Task', description: 'use new task component.'},
        ];

        beforeEach(() => {
            vi.clearAllMocks();
        });

        afterEach(() => {
            vi.restoreAllMocks()
        })

        it('should be able to input into fields and submit', async () => {

            vi.mocked(taskApi.axiosGetAllTasks).mockResolvedValue(mockData);

            render(<TaskForm/>);

            const title = screen.getByRole('textbox', {name: /title/i});
            const description = screen.getByRole('textbox', {name: /description/i});
            const add_task = screen.getByRole('button', {name: /add task/i});

            await user.type(title, 'new title');
            expect(title).toHaveValue('new title');

            await user.type(description, 'new description');
            expect(description).toHaveValue('new description');

            await user.click(add_task);
            expect(add_task).toHaveBeenCalledOnce();

            screen.logTestingPlaygroundURL()

        });
    });

});

