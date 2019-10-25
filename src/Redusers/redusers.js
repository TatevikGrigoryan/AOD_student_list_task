import * as types from '../Constants/actionTypes'

const date_action = (state = {}, action)=>{
    switch (action.type) {
        case types.ADD_STUDENT_DATE: {
            const newState = action.payload;
            return {
                ...state,
                newState,
            }
        }
        case types.DELETE_STUDENT_DATE: {
            const newState = action.payload;
            return {
                ...state,
                newState,
            }
        }
        case types.UPDATE_STUDENT_DATE: {
            const newState = action.payload;
            return {
                ...state,
                newState,
            }
        }
        default:
            return state;
    }
};
export {date_action}

const initialData = ()=>{
    if(JSON.parse(localStorage.getItem('data'))){
        return JSON.parse(localStorage.getItem('data'));
    }else {
        return {};
    }};


const students_date_get = (state = initialData(), action) => {
    if(action.type === types.GET_STUDENT_DATE){
        state = action.payload;
        return action.payload;
    }

    return state;
};
export {students_date_get}


