import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import EmployeeList from './Employee.tsx';


class App extends Component {
  render() {
    return (
      <div className="App">
      <EmployeeList/>
      </div>
    );
  }
}

export default App;
