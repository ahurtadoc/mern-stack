import React, {Component} from 'react';
import axios from 'axios'
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

class CreateNote extends Component {

    state={
        users: [],
        userSelected:'',
        title: '',
        content:'',
        date: new Date(),
        editing: false,
        _id: ''
    }

    async componentDidMount() {
        const res = await axios.get('http://localhost:4000/api/users')
        this.setState({users:res.data.map(user => user.username)})
        this.setState({userSelected: this.state.users[0]})

        const {id} = this.props.match.params
        if (id){
            const res  = await axios.get('http://localhost:4000/api/notes/' + id)
            const {author,title,content,date} = res.data
            this.setState({
                editing:true,
                _id:id,
                title,
                content,
                date:new Date(date),
                userSelected:author
            })
            console.log(this.state)
        }
    }


    onSubmit = async e =>{
        e.preventDefault();
        const {userSelected,title,content,date,_id} = this.state
        const newNote = {
            title,
            content,
            date,
            author:userSelected
        }
        if(this.state.editing){
            await axios.put('http://localhost:4000/api/notes/'+ _id,newNote)
        }else{
            await axios.post('http://localhost:4000/api/notes',newNote)
        }

        this.props.history.push('/')
    }

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeDate = date =>{
        this.setState({date})
    }

    render() {
        return (
            <div className="col-md-6 offset-3">
                <div className="card card-body">
                    <h4>Create a note</h4>

                    {/*Select user*/}
                    <div className="form-group">
                        <select
                            className="form-control"
                            name={'userSelected'}
                            value={this.state.userSelected}
                            onChange={this.onInputChange}>
                            {
                                this.state.users.map(user =>
                                    <option key={user} value={user}>
                                        {user}
                                    </option>)
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Title"
                            name="title"
                            value={this.state.title}
                            onChange={this.onInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="content"
                            className="form-control"
                            placeholder="Content"
                            value={this.state.content}
                            onChange={this.onInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <Datepicker
                            className="form-control"
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                        />
                    </div>

                    <form onSubmit={this.onSubmit}>
                        <button type="onSubmit" className="btn btn-primary">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateNote;