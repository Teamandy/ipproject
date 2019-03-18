import React, { Component } from 'react';
import axios from 'axios';
import Forms from '../ui/Forms';
import AddForm from './AddForm';
import Pagination from '../ui/Pagination';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forms: [],
      curPage: 0,
      perPage: 5,
      curForms: []
    };
    this.addForm = this.addForm.bind(this);
    this.deleteForm = this.deleteForm.bind(this);
    this.paginate = this.paginate.bind(this);
  }
  componentDidMount() {
    async function fetchForms() {
      try {
        const req = await axios.get('/forms');
        const forms = req.data;
        this.setState({ forms }, () => this.paginate(0));
      } catch (err) {
        console.log(`error fetching forms: `, err);
        this.setState({ forms: [] });
      }
    }
    fetchForms.call(this);
  }
  addForm(form) {
    async function add() {
      try {
        const req = await axios.post('/forms', form);
        const newForm = req.data;
        const forms = [...this.state.forms, newForm];
        this.setState({ forms }, () => this.paginate(this.state.curPage));
      } catch (err) {
        console.log(`error adding form: `, err);
      }
    }
    add.call(this);
  }
  deleteForm(id) {
    async function del() {
      try {
        await axios.delete(`/forms/${id}`);
        const forms = this.state.forms.filter(form => form._id !== id);
        this.setState({ forms }, () => this.paginate(this.state.curPage));
      } catch (err) {
        console.log(`error deleting form: `, err);
      }
    }
    del.call(this);
  }
  paginate(curPage) {
    const { forms, perPage } = this.state;
    let curForms = forms.slice(curPage * perPage, (curPage + 1) * perPage);
    if (!curForms.length) {
      curForms = forms;
      curPage = 0;
    }
    this.setState({ curForms, curPage });
  }
  render() {
    return (
      <div className="App container">
        <h1 className="center blue-text">Forms creation tool</h1>
        <div className="row">
          <div className="col s4">
            <AddForm addForm={this.addForm} />
          </div>
        </div>
        <div className="row">
          <Pagination
            total={this.state.forms.length}
            perPage={this.state.perPage}
            curPage={this.state.curPage}
            paginate={this.paginate}
          />
        </div>
        <div className="row">
          <div>
            <Forms forms={this.state.curForms} deleteForm={this.deleteForm} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
