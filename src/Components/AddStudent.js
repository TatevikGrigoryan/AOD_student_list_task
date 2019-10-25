import React, { useState} from 'react';
import '../Styles/AddStudentStyle.css';
import {connect} from "react-redux";

function AddStudent(props) {
    const [er_Full_Name,showFull_Name_Err]= useState(false);
    const [studentData,setStudentData]= useState({});
    const [errMessageName, setNameErrorMessage] = useState('');
    const [errMessageRequired, setRequiredErrorMessage] = useState(false);
    const uuidv1 = require('uuid/v1');

    const set_Full_Name =(e)=>{
        let regName = /^([\w]{3,})+\s+([\w\s]{3,})+\s+([\w\s]{3,})+$/i ;
       // console.log(e.target.value, 'Full Name');
        if(!e.target.value){
            setNameErrorMessage('*Please input  student\'s Full Name');
            showFull_Name_Err(true);
        }
        else if( e.target.value && !regName.test(e.target.value)){
            setNameErrorMessage('*Invalid Full Name');
            showFull_Name_Err(true);
        } else {
            showFull_Name_Err(false);
            setStudentData({...studentData,full_name:e.target.value });
        }
    };

    const addButtonClick =() => {
        let dataLS = props.data;
        if(studentData.full_name === undefined || studentData.birthday === undefined || studentData.performance === undefined || er_Full_Name === true ){
            setRequiredErrorMessage(true);
            return null
        }else {
            if(!dataLS){
                dataLS ={};
            }
           let id = uuidv1();
           dataLS[id]= studentData;
          setRequiredErrorMessage(false);
           props.dispatch({
               type: 'ADD_STUDENT_DATE',
               payload: studentData
           });
            localStorage.setItem('data',JSON.stringify(dataLS));
            //console.log(dataLS);
        }
    };

    const performance_Change =(e)=>{
        //console.log(e.target.value,'perform')
        setStudentData({...studentData, performance:e.target.value})
    };
    const birthday_Onchange = (e) => {
        if(e.target.value){
            setStudentData({...studentData, birthday : e.target.value});
        }
    };
    return(
        <div>
            <h4>Add new student</h4>
            <div>
             <label>Full Name:
                <input type='txt' placeholder="student name" onChange={set_Full_Name}/>
                 {er_Full_Name ? <span style={{color:'red',fontSize:'10px'}}> {errMessageName}</span>: null }
             </label>
             <label>Birth Date:
                 <input type='date'  min="1990-01-01"  max="2010-12-12" onChange={birthday_Onchange}/>
             </label>
             <label> Performance:
                <select onChange={performance_Change} defaultValue= 'unsuccessful'>
                    <option>unsuccessful</option>
                    <option>enough</option>
                    <option>good</option>
                    <option>successful</option>
                </select>
             </label>
                { errMessageRequired ? <span style={{color:'red',fontSize:'10px'}}>'*Please fill all fields </span>: null }
                <input type = 'button' className='add' value='Add' onClick={addButtonClick}/>
            </div>
        </div>
    )
}
const store = store => {
    return ({
        date_actions: store.date_action,
        data:store.students_date_get
    });
};

export default connect (
    store,
)(AddStudent)


