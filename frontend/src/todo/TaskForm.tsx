import type {Task} from "./TaskType.ts";
import {useForm} from "react-hook-form"
// @ts-ignore
import {yupResolver} from "@hookform/resolvers/yup/src";
import {number, object, string} from "yup";
import {axiosSaveTask} from "./TaskService.ts";

const validationSchema = object({
    title: string(),
    description: string()
        .required("Field is required."),
})

export const TaskForm = () => {
    const {
        register, handleSubmit, formState: {errors},
    } = useForm<Task>({
        resolver: yupResolver(validationSchema),
    })

    const onSubmit = (data: Task) => {
        axiosSaveTask(data)
    }

    return (
        <>
            <h1>Task Form</h1>
            <form onSubmit={
                handleSubmit(data => onSubmit(data))
            } method={'POST'}>
                <label htmlFor="title">Title</label>
                {errors.title && <span>{errors.title.message}</span>}
                <input
                    id="title"
                    type="text"
                    {...register("title")}
                />

                <label htmlFor="description">Description</label>
                {errors.description && <span>{errors.description.message}</span>}
                <input
                    id="description"
                    type="text"
                    {...register("description")}
                />

                <input type="hidden"
                       id="category.label"
                       value={'active'}
                       {...register("category.label")}/>

                <input type="hidden"
                       id="category.id"
                       value={1}
                       {...register("category.id")}/>

                <input type="submit" value="Add Task"></input>
            </form>
        </>
    );
};