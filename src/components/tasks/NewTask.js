import React, {Component} from 'react';
import {createTask, getMinTask} from '../../lib/tasksServices';
import {getMinProject} from '../../lib/projectsServices';
import config from '../../config';
import {
    NavLink
} from 'react-router-dom';

class NewTask extends Component {
    state = {
        project: {},
        parentTask: '',
        task: {
            title: '',
            description: '',
            project: ''
        },
        flag: null,
        message: '',
        errorMessage: ''
    };

    componentDidMount(){
        getMinProject(this.props.match.params.projectId).then(
            project => {
                var tempTask = this.state.task;
                tempTask.project = project._id;
                this.setState({project: project, task: tempTask});
            }
        );
        getMinTask(this.props.match.params.parentTaskId).then(
            pTask => {
                if(pTask){
                    var tempTask = this.state.task;
                    tempTask.parentTask = pTask._id;
                    this.setState({parentTask: pTask, task: tempTask});
                }
            }
        );
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        if (this.state.task) {
            createTask(this.state.task).then(response => {
                    if(response._id){
                        let formData = {
                            title: '',
                            description: ''
                        };
                        this.setState({message: response.message, errorMessage: '', flag: response.flag, task: formData});
                        window.location.href = config.frontendBaseUrl + '/projects/' + this.state.project._id;
                    }else {
                        this.setState({message: '', errorMessage: response.message, flag: response.flag});
                    }
                }
            )
        }
    };

    handleInputChange = (evt) => {
        let formData = this.state.task;
        formData[evt.target.name] = evt.target.value;
        this.setState({
            task: formData
        });
    };

    render() {
        return (
            <div className="NewProject">
                <h4><strong>Create a new task</strong></h4>
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group col-md-12 col-sm-12">
                                <h5 className="text-danger">{this.state.errorMessage}</h5>
                            </div>
                            <div className="form-group col-md-12 col-sm-12">
                                <label>Project: </label>
                                <NavLink to={"/projects/" + this.state.project._id }> { this.state.project.title}</NavLink>
                            </div>
                            {this.state.parentTask ? <div className="form-group col-md-12 col-sm-12">
                                <label>Parent Task: </label>
                                <NavLink to={"/tasks/" + this.state.parentTask._id }> { this.state.parentTask.title}</NavLink>
                            </div> : ''}

                            <div className="form-group col-md-12 col-sm-12">
                                <label>Task Title*</label>
                                <input name="title" type="text" onChange={this.handleInputChange}
                                       value={this.state.task.title}
                                       className="form-control input-sm" id="title"
                                       placeholder="Title" required/>
                            </div>
                            <div className="form-group col-md-12 col-sm-12">
                                <label>Task Description*</label>
                                <textarea name="description" onChange={this.handleInputChange}
                                          value={this.state.task.description}
                                          className="form-control input-sm" id="description"
                                          placeholder="Description" required></textarea>
                            </div>
                            <div className="col-md-12 col-sm-12">
                                <input type="submit" className="btn btn-primary pull-right" value="Submit"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewTask;