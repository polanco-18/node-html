import React, { Component } from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
            nombre: '',
            celular: '',
            email: '',
            tipo: '',
            _id: '',
            tasks: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    addTask(e) {
        e.preventDefault();
        if (this.state._id) {
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    nombre: this.state.nombre,
                    email: this.state.email,
                    celular: this.state.celular,
                    tipo: this.state.tipo
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    window.M.toast({ html: 'Actualizado' });
                    this.setState({ _id: '', nombre: '', tipo: '', email: '', celular: '' });
                    this.fetchTasks();
                });
        } else {
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    window.M.toast({ html: 'Guardado' });
                    this.setState({ nombre: '', tipo: '', email: '', celular: '' });
                    this.fetchTasks();
                })
                .catch(err => console.error(err));
        }

    }

    deleteTask(id) {
        if (confirm('Desea borrar persona?')) {
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({ html: 'Borrado' });
                    this.fetchTasks();
                });
        }
    }

    editTask(id) {
        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    nombre: data.nombre,
                    celular: data.celular,
                    email: data.email,
                    tipo: data.tipo,
                    _id: data._id
                });
            });
    }

    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks() {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                this.setState({ tasks: data });
                console.log(this.state.tasks);
            });
    }

    render() {
        return (
            <div>
                {/* NAVIGATION */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <div className="nav-wrapper">
                            <a href="#" className="brand-logo">Contactos</a>
                        </div>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="nombre" required="required" onChange={this.handleChange} value={this.state.nombre} type="text" placeholder="nombre" autoFocus />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="tipo" required="required" onChange={this.handleChange} value={this.state.tipo} cols="30" rows="10" placeholder="tipo" className="materialize-textarea"></textarea>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="celular" required="required" onChange={this.handleChange} value={this.state.celular} cols="30" rows="10" placeholder="celular" className="materialize-textarea"></textarea>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="email" required="required" onChange={this.handleChange} value={this.state.email} cols="30" rows="10" placeholder="email" className="materialize-textarea"></textarea>
                                            </div>
                                        </div>

                                        <button type="submit" className="btn light-blue darken-4">
                                            Guardar
                    </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            {
                                this.state.tasks.map(task => {
                                    return (

                                        <div className="card">
                                            <div className="card-content">
                                                <h3 className="blue-text">{task.nombre}</h3>
                                                <p><i className="material-icons">phone</i> {task.celular}</p>
                                                <p><i className="material-icons">email</i> {task.email}</p>
                                                <td>{task.tipo}</td>
                                                <button onClick={() => this.deleteTask(task._id)} className="btn light-red accent-4">
                                                    <i className="material-icons">delete</i>
                                                </button>
                                                <button onClick={() => this.editTask(task._id)} className="btn light-green accent-4" style={{ margin: '4px' }}>
                                                    <i className="material-icons">edit</i>
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default App;