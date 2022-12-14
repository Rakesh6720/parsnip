import * as api from '../api';

let _id = 1;
export function uniqueId() {
    return _id++;
}

function createTaskSucceeded(task) {
    return {
        type: 'CREATE_TASK_SUCCEEDED',
        payload: {
            task,
        },
    };
}

export function createTask({title, description, status='Unstarted'}) {
    return dispatch => {
        api.createTask({title, description, status})
            .then(resp => {
                dispatch(createTaskSucceeded(resp.data));
            });
    };
}

function fetchTasksStarted() {
    return {
        type: 'FETCH_TASKS_STARTED',        
    };
}

export function fetchTasksSucceeded(tasks) {
    return {
        type: 'FETCH_TASKS_SUCCEEDED',
        payload: {
            tasks
        }
    }
}

export function fetchTasks() {
    return dispatch => {
        dispatch(fetchTasksStarted());

        api.fetchTasks()
            .then(resp => {
                setTimeout(() => {
                    dispatch(fetchTasksSucceeded(resp.data));
                }, 2000)
                //throw new Error("Oh noes!  Unable to fetch tasks!")
            }).catch (err => {
                dispatch(fetchTasksFailed(err.message));
            })
    };
}

function fetchTasksFailed(error) {
    return {
        type:'FETCH_TASKS_FAILED',
        payload: {
            error,
        },
    };
}

function editTaskSucceeded(task) {
    return {
        type: 'EDIT_TASK_SUCCEEDED',
        payload: {
            task,
        }
    };
}

export async function editTask(id, params = {}) {
    return (dispatch, getState) => {
        const task = getTaskById(getState().tasks.tasks, id);
        const updatedTask = Object.assign({}, task, params);

        api.editTask(id, updatedTask).then(resp => {
            dispatch(editTaskSucceeded(resp.data));
        });
    };
}

function getTaskById(tasks, id) {
    return tasks.find(task => task.id === id);
}
