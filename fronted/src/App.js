import React, {
  Component
} from 'react'
import './App.css'
import Modal from './components/Modal'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      viewCompleted: false,
      activeItem: {
        title: '',
        description: '',
        completed: false,
      },
      todoList: [],
      showProductivity: false,
    }
    this.toggleProductivity = this.toggleProductivity.bind(this)
  }

  componentDidMount() {
    this.refreshList()
  }

  refreshList = () => {
    axios
      .get('http://localhost:8000/profiles/tasks/')
      .then((res) => {
        console.log('Tasks fetched:', res.data)
        const updatedTasks = res.data.map((task) => {
          const isOverdue = new Date(task.due_date) < new Date()
          return {
            ...task,
            isOverdue,
          }
        })
        this.setState({
          todoList: updatedTasks,
        })
      })
      .catch((err) => console.log(err))
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    })
  }

  handleSubmit = (item) => {
    this.toggle()
    if (item.id) {
      axios
        // .put(`http://localhost:8000/api/task/${item.id}/`, item)
        .put(`http://localhost:8000/profiles/task/${item.id}/`, item)
        .then((res) => this.refreshList())
        .catch((err) => console.error('Update Error:', err))
    } else {
      axios
        // .post('http://localhost:8000/api/task/', item)
        .post('http://localhost:8000/profiles/task/', item)
        .then((res) => this.refreshList())
        .catch((err) => console.error('Create Error:', err))
    }
  }

  handleDelete = (item) => {
    axios
      // .delete(`http://localhost:8000/api/task/${item.id}/`)
      .delete(`http://localhost:8000/profiles/task/${item.id}/`)
      .then((res) => this.refreshList())
      .catch((err) => console.error('Delete Error:', err))
  }

  createItem = () => {
    const item = {
      title: '',
      description: '',
      completed: false,
    }
    this.setState({
      activeItem: item,
      modal: !this.state.modal,
    })
  }

  editItem = (item) => {
    this.setState({
      activeItem: item,
      modal: !this.state.modal,
    })
  }

  displayCompleted = (status) => {
    if (status) {
      return this.setState({
        viewCompleted: true,
      })
    } else {
      return this.setState({
        viewCompleted: false,
      })
    }
  }

  handleComplete = (item) => {
    // Toggle completion status
    const updatedItem = {
      ...item,
      completed: !item.completed,
    }

    axios
      .put(`http://localhost:8000/api/task/${item.id}/`, updatedItem)
      .then((res) => this.refreshList())
      .catch((err) => console.error('Completion Error:', err))
  }

  calculateProductivity = () => {
    const completedTasks = this.state.todoList.filter(
      (task) => task.completed
    ).length
    const totalTasks = this.state.todoList.length
    return totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
  }

  toggleProductivity = () => {
    this.setState((prevState) => ({
      showProductivity: !prevState.showProductivity,
    }))
  }

  renderTabList = () => {
    return ( <
      div className = "my-5 tab-list" >
      <
      span onClick = {
        () => this.displayCompleted(true)
      }
      className = {
        this.state.viewCompleted ? 'active' : ''
      } >
      Completed {
        ' '
      } <
      /span> <
      span onClick = {
        () => this.displayCompleted(false)
      }
      className = {
        !this.state.viewCompleted ? 'active' : ''
      } >
      Incomplete {
        ' '
      } <
      /span>{' '} <
      /div>
    )
  }

  renderItems = () => {
    const {
      viewCompleted
    } = this.state
    const newItems = this.state.todoList.filter(
      (item) => item.completed === viewCompleted
    )

    console.log('Filtered items:', newItems)

    return newItems.map((item) => ( <
      li className = "list-group-item d-flex justify-content-between align-items-center"
      key = {
        item.id
      } >
      <
      span className = {
        `mytask-title mr-2 ${
            // this.state.viewCompleted ? 'completed-task' : ''
            item.completed ? 'completed-task' : ''
          }`
      }
      title = {
        item.title
      } >
      {
        ' '
      } {
        item.title
      } {
        ' '
      } <
      /span>{' '} <
      span className = "due-date mr-2" > Due: {
        item.due_date
      } < /span>{' '} <
      button className = "btn btn-info mr-2"
      onClick = {
        () => this.editItem(item)
      } >
      Edit {
        ' '
      } <
      /button>{' '} <
      button className = "btn btn-danger"
      onClick = {
        () => this.handleDelete(item)
      } >
      Delete {
        ' '
      } <
      /button>{' '} <
      /li>
    ))
  }

  render() {
    return ( <
      main className = "content p-3 mb-2 bg-info" >
      <
      h1 className = "text-black text-uppercase text-center my-4" >
      Task Manager <
      /h1> <
      div className = "row" >
      <
      div className = "col-md-6 col-sma-10 mx-auto p-0" >
      <
      div className = "card p-3" >
      <
      div >
      <
      button className = "btn btn-primary mb-4"
      onClick = {
        this.createItem
      } >
      Add Task <
      /button> <
      /div>

      {
        /* Button to toggle productivity display */ } <
      div >
      <
      button className = "btn btn-secondary"
      onClick = {
        this.toggleProductivity
      } >
      {
        this.state.showProductivity ?
        'Hide Productivity' :
          'Show Productivity'
      } <
      /button> <
      /div>

      {
        /* Conditional rendering of productivity display */ } {
        this.state.showProductivity && ( <
          div className = "productivity-display" >
          <
          h2 >
          Productivity: {
            this.calculateProductivity().toFixed(2)
          } %
          <
          /h2> <
          /div>
        )
      }

      {
        this.renderTabList()
      } <
      ul className = "list-group list-group-flush border-top-0" > {
        this.renderItems()
      } <
      /ul> <
      /div> <
      /div> <
      /div> <
      footer className = "my-5 mb-2 bg-info text-center" >
      Copyright 2023© All rights Reserved <
      /footer> {
        this.state.modal ? ( <
          Modal activeItem = {
            this.state.activeItem
          }
          toggle = {
            this.toggle
          }
          onSave = {
            this.handleSubmit
          }
          />
        ) : null
      } <
      /main>
    )
  }
}

export default App