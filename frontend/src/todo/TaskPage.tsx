import {TaskItem} from "./TaskItem.tsx";
import type {Task} from "./TaskType.ts";
import {useEffect, useState} from "react";
import {axiosGetAllTasks, getAllTasks} from "./TaskService.ts";

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
            <ul>
                {tasks.map(task => {
                        return <TaskItem
                            key={task.id}
                            initialTask={task}
                        />
                    }
                )}
            </ul>
        </>
    );
};

export default TaskPage;