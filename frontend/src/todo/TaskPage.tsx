import {TaskItem} from "./TaskItem.tsx";
import type {Task} from "./TaskType.ts";
import {useEffect, useState} from "react";
import {axiosGetAllTasks} from "./TaskService.ts";

const TaskPage = () => {
    const [tasks, setTasks] = useState<Task[]>([])

    const refreshData = () => {
        axiosGetAllTasks().then(setTasks)
    }

    useEffect(() => {
        refreshData();
    }, [])

    return (
        <>
            <h1>Task List</h1>
            <ul> {Array.isArray(tasks) ? (
                tasks.map(task => {
                        return <TaskItem
                            key={task.id}
                            initialTask={task}
                        />
                    }
                )) : <div>No tasks found.</div> }
            </ul>
        </>
    );
};

export default TaskPage;