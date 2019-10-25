import React from 'react';
import './App.css';
import StudentList from "./Components/StudentList";
import AddStudent from "./Components/AddStudent";

function App ()  {
  return (
    <div className="App">
      <AddStudent/>
      <StudentList/>

    </div>
  );
}

export default App;
