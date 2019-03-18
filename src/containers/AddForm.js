import React, { Component } from 'react';

class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const name = e.target.id;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addForm(this.state);
    this.setState({ title: '', description: '' });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title">Add a title</label>
        <input
          type="text"
          id="title"
          onChange={this.handleChange}
          value={this.state.title}
        />
        <label htmlFor="desc">Add a description</label>
        <input
          type="text"
          id="description"
          onChange={this.handleChange}
          value={this.state.description}
        />
        <button className="btn waves-effect blue">Add</button>
      </form>
    );
  }
}

export default AddForm;
