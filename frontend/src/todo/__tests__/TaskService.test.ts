import type {Task} from "../TaskType.ts";
import {http, HttpResponse} from "msw"
import {setupServer} from "msw/node";
import {afterAll, expect} from "vitest";
import {axiosGetAllTasks, axiosSaveTask, getAllTasks} from "../TaskService.ts";

describe('Task Service', () => {

    // axios.defaults.baseURL = "http://localhost:8080"
    const server = setupServer()
    beforeAll(() => server.listen())
    afterAll(() => server.close())
    afterEach(() => server.resetHandlers())

    it('should get all tasks', async () => {
        const expected: Task[] = [
            {"id": 1, "title": "First Task", "description": "Get task component built."},
            {"id": 2, "title": "Second Task", "description": "Another desc."}
        ]

        server.use(http.get('/api/v1/task', () =>
            HttpResponse.json(expected, {status: 200}))
        )

        expect(await axiosGetAllTasks()).toStrictEqual(expected) // axios
        expect(await getAllTasks()).toStrictEqual(expected) // fetch

    });

    it('should save a new task', async () => {
        const newTask: Task = {
            title: "meal prep",
            description: "chimkin"
        }

        server.use(
            http.post('/api/v1/task', () =>
            HttpResponse.json(newTask, {status:201})),
        )

        expect(await axiosSaveTask()).toStrictEqual(newTask) // axios

    });


});