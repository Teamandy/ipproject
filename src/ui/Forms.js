import React from 'react';

const Forms = ({ forms, deleteForm }) => {
  const list = forms.map(form => (
    <li className="col s6" key={form._id}>
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">{form.title}</span>
          <p>{form.description}</p>
        </div>
        <div className="card-action">
          <button className="btn blue" onClick={() => deleteForm(form._id)}>
            Delete
          </button>
        </div>
      </div>
    </li>
  ));
  const formsList = forms.length ? (
    list
  ) : (
    <li>
      <p className="center">You don't have any forms so far!</p>
    </li>
  );
  return <ul className="row">{formsList}</ul>;
};

export default Forms;
