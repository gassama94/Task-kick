import React, {
  Component
} from 'react'
import './App.css';
import Modal from './components/Modal';
import axios from 'axios';




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      todoList: []

    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("http://localhost:8000/api/tasks/")
      .then(res => {
        const updatedTasks = res.data.map(task => {
          const isOverdue = new Date(task.due_date) < new Date();
          return {
            ...task,
            isOverdue
          };
        });
        this.setState({
          todoList: updatedTasks
        });
      })
      //this.state({ todoList: res.data}))
      .catch(err => console.log(err))
  }

  //create toggle property
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleSubmit = item => {
    this.toggle();

    if (item.id) {
      // Update existing item
      axios
        .put(`http://localhost:8000/api/task/${item.id}/`, item)
        .then(res => this.refreshList())
        .catch(err => console.error("Update Error:", err));
    } else {
      // Create new item
      axios
        .post("http://localhost:8000/api/task/", item)
        .then(res => this.refreshList())
        .catch(err => console.error("Create Error:", err));
    }
  }

  handleDelete = item => {
    axios
      .delete(`http://localhost:8000/api/task/${item.id}/`)
      .then(res => this.refreshList())
      .catch(err => console.error("Delete Error:", err));
  }


  createItem = () => {
    const item = {
      title: "",
      modal: !this.state.modal
    };
    this.setState({
      activeItem: item,
      modal: !this.state.modal
    });
  }

  editItem = item => {
    this.setState({
      activeItem: item,
      modal: !this.state.modal
    });
  }




  displayCompleted = status => {
    if (status) {
      return this.setState({
        viewCompleted: true
      });
    } else {
      return this.setState({
        viewCompleted: false
      });
    }
  }

  renderTabList = () => {
    return ( <
      div className = 'my-5 tab-list' >
      <
      span onClick = {
        () => this.displayCompleted(true)
      }
      className = {
        this.state.viewCompleted ? "active" : ""
      } >
      Completed <
      /span>  

      <
      span onClick = {
        () => this.displayCompleted(false)
      }
      className = {
        this.state.viewCompleted ? "active" : ""
      } >
      Incompleted <
      /span>   < /
      div >
    );
  }

  //Rendering items 
  renderItems = () => {
    const {
      viewCompleted
    } = this.state;
    const newItems = this.state.todoList.filter(
      item => item.completed === viewCompleted
    );


    return newItems.map(item => ( <
      li className = 'list-group-item d-flex justify-content-between align-items-center'
      key = {
        item.id
      } >

      <
      span className = {
        'mytask-title mr ${this.state.viewCompleted ? " completed-mytask : ""}'
      }
      title = {
        item.title
      } > {
        item.title
      } <
      /span> <
      span className = 'due-date mr-2' >
      Due: {
        item.due_date
      } <
      /span> <
      button className = 'btn btn-info mr-2'
      onClick = {
        () => this.editItem(item)
      } > Edit < /button> <
      button className = 'btn btn-danger mr-2'
      onClick = {
        () => this.handleDelete(item)
      } > Delete < /button> < /
      li >
    ));
  }
  render() {
    return ( < main className = 'content p-3 mb-2 bg-info' >
      <
      h1 className = 'text-black text-uppercase text-center my-4' > Task Manager < /h1> <
      div className = 'row' >
      <
      div className = 'col-md-6 col-sma-10 mx-auto p-0' >
      <
      div className = 'card p-3' >
      <
      div >
      <
      button className = 'btn btn-primary'
      onClick = {
        this.createItem
      } >
      Add Task <
      /button> < /
      div > {
        this.renderTabList()
      } <
      ul className = 'list-group list-group-flush' > {
        this.renderItems()
      } <
      /ul> < /
      div > <
      /div> < /
      div > <
      footer className = 'my-5 mb-2 bg-info text-center' >
      Copyright 2023 & copy; All rights Reserved <
      /footer>

      {
        this.state.modal ? ( <
          Modal activeItem = {
            this.state.activeItem
          }
          toggle = {
            this.toggle
          }
          onSave = {
            this.handleSubmit
          } > < /Modal>
        ) : null
      }



      <
      /main>
    );
  }

}
export default App;