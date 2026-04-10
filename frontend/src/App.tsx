import './App.css'
import {TaskPage} from "./todo/TaskPage.tsx";
import {TaskForm} from "./todo/TaskForm.tsx";

function App() {

    return (
        <>
            <section>
                <TaskPage/>
                <TaskForm/>
            </section>
        </>
    )
}

export default App
