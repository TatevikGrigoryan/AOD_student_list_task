import React from 'react';
import '../Styles/StudentListStyle.css';
import {connect} from 'react-redux';

const performance =["unsuccessful",'enough','good','successful'];

class StudentList extends React.Component {
    constructor(props){
        super(props);
        this.state={
            editableStudentId:[],
            editedData:{}
        }
    }


    editButtonClick =(e) =>{
        const {editableStudentId}= this.state;
        const {data}= this.props;
        let arr;
        if( editableStudentId.length!== 0 && editableStudentId.indexOf(e.target.value)!== -1){
            editableStudentId.splice(editableStudentId.indexOf(e.target.value),1);
            arr = editableStudentId;
            localStorage.setItem('data',JSON.stringify(data));
            //console.log(editableStudentId,'id');
        }else{
           editableStudentId.push(e.target.value);
           arr = editableStudentId;
           //console.log(editableStudentId,'id');
        }
        this.setState({editableStudentId:arr});
    };
    handle_edit_data=(e)=>{
        const {editableStudentId}= this.state;
        const {data}= this.props;
        const value = e.target.value;
        const name = e.target.name;
        data[editableStudentId][name] = value;
       // console.log(data,'dataaaaaaaaa')
    };

    deleteButtonClick =(e) =>{
        const {data,dispatch}= this.props;
        dispatch({
            type: 'DELETE_STUDENT_DATE',
            payload: data[e.target.value]
        });
        delete data[e.target.value];
        localStorage.setItem('data',JSON.stringify(data));
    };
    render() {
        const {editableStudentId}=this.state;
        const {data}=this.props;
       // console.log(editableStudentId,data);

        return (
            <div>
                <h4>Student's List</h4>
                {data ? <table style={{border: '1px solid black', width: '90vw', margin: "auto"}}>
                    <thead>
                    <tr style={{borderBottom: "1px solid black", textAlign: 'left'}}>
                        <th style={{borderBottom: "1px solid black"}}>Full Name</th>
                        <th style={{borderBottom: "1px solid black"}}>Birthday</th>
                        <th style={{borderBottom: "1px solid black"}}>Performance</th>
                        <th style={{width: 'fit-content', borderBottom: "1px solid black"}}>Editable</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        Object.keys(data).map(item => {
                         if (editableStudentId.length === 0 || editableStudentId.indexOf(item) === -1) {
                                return (
                                    <tr key={item} style={{textAlign: 'left', padding: '10px'}}>
                                        <td>{data[item].full_name}</td>
                                        <td>{data[item].birthday}</td>
                                        <td>{data[item].performance}</td>
                                        <td>
                                            <button type='button' className='edit' value={item} onClick={this.editButtonClick}>Edit</button>
                                            <button type='button' value={item} onClick={this.deleteButtonClick}>X</button>
                                        </td>
                                    </tr>
                                )
                            } else {
                                return (
                                    <tr key={item} style={{textAlign: 'left', padding: '10px'}}>
                                        <td><input name='full_name' defaultValue={data[item].full_name} onChange={this.handle_edit_data}/></td>
                                        <td><input name='birthday' type='date' defaultValue={data[item].birthday} min="1990-01-01" max="2010-12-12" onChange={this.handle_edit_data}/></td>
                                        <td>
                                            <select  name='performance' onChange={this.handle_edit_data} defaultValue={data[item].performance}>
                                                {performance.map((per,index) =>  <option key={index}>{per}</option>) }
                                            </select>
                                        </td>
                                        <td>
                                            <button type='button' className='save' value={item} onClick={this.editButtonClick}>Save </button>
                                        </td>
                                    </tr>
                                )}
                        })}
                    </tbody>
                </table> : null}
            </div>
        )}
}

const store = store => {
     return ({
        date_actions:store.date_action,
        data:store.students_date_get

    });};

export default connect(
    store,
)(StudentList)
