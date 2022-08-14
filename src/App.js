import TasksPage from './components/TasksPage';
import {connect} from 'react-redux';
import {createTask, editTask, fetchTasks} from'./actions';
import { useEffect } from 'react';
import FlashMessage from './components/FlashMessage';

function App(props) {

  function onCreateTask({title, description}) {
    props.dispatch(createTask({title, description}));
  }

  function onStatusChange(id, status) {
    props.dispatch(editTask(id, {status}));
  }

  useEffect(()=>{
    props.dispatch(fetchTasks());
  },[])

  return (
    <div className="container">
      {props.error && <FlashMessage message={props.error}/>}
      <div className="main-content">
        <TasksPage 
          tasks={props.tasks}
          onCreateTask={onCreateTask}
          onStatusChange={onStatusChange}  
          isLoading={props.isLoading}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const {tasks, isLoading, error} = state.tasks;
  return {tasks, isLoading, error};
}
export default connect(mapStateToProps)(App);
