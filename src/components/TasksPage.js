import { useState } from "react";
import TaskList from "./TaskList";

const TASK_STATUSES = ['Unstarted', 'In Progress', 'Completed'];

export default function TasksPage(props) {
    const [showNewCardForm, setShowNewCardForm] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    function onTitleChange(e) {
        setTitle(e.target.value);
    }

    function onDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function resetForm() {
        setShowNewCardForm(false);
        setTitle('');
        setDescription('');
    }

    function onCreateTask(e) {
        console.log('on create task');
        e.preventDefault();
        props.onCreateTask({
            title: title,
            description: description
        });
        resetForm();
    }

    function toggleForm() {
        setShowNewCardForm(!showNewCardForm);
    }

    function renderTasksLists() {
        const {tasks} = props;
        return TASK_STATUSES.map(status => {
            const statusTasks = tasks.filter(task => task.status === status);
            return (
                <TaskList 
                    key={status} 
                    status={status} 
                    tasks={statusTasks}
                    onStatusChange={props.onStatusChange}
                />
            )
        })
    }

    if (props.isLoading) {
        return (
            <div className="tasks-loading">
                Loading...
            </div>
        )
    }
    
    return (
        <div className="task-list">
            <div className="task-list-header">
                <button className="button button-default" onClick={toggleForm}>+ New Task</button>
            </div>
            {showNewCardForm && (
                <form className="task-list-form" onSubmit={onCreateTask}>
                    <input 
                        className="full-width-input" 
                        onChange={onTitleChange} 
                        value={title} 
                        type="text" 
                        placeholder="title"
                    />
                    <input 
                        className="full-width-input"
                        onChange={onDescriptionChange}
                        value={description}
                        type="text"
                        placeholder="description"
                    />
                    <button className="button" type="submit">
                        Save
                    </button>
                </form>
            )}

            <div className="task-lists">
                {renderTasksLists()}
            </div>
        </div>
    )
}
