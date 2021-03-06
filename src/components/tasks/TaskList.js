import React, {Component} from 'react';
import Timestamp from 'react-timestamp';
import {
    NavLink
} from 'react-router-dom';
import TaskRow from './TaskRow';

class TaskList extends Component {
    render() {
        return (
            <div>
                <h4>{this.props.title} <span className="badge badge-success">{this.props.tasks.length}</span></h4>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Task ID</th>
                      <th scope="col">Title</th>
                      <th scope="col">Assignee</th>
                      <th scope="col">Updated</th>
                      <th scope="col">Creator</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.props.tasks.map(task => <TaskRow key={task._id} task={task}/>
                    )}
                  </tbody>
                </table>
            </div>
        );
    }
}

export default TaskList;
