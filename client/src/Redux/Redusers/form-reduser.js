import {setEditDetailState} from "../../Utils/support";
import { SET_POLISH_MODEL_VALUE } from "../../Utils/variables-const";


const SET_STATE = 'SET_STATE';
const SET_FIELDS_ARR = 'SET_FIELDS_ARR';
const ADD_FIELD_TO_ARR = 'ADD_FIELD_TO_ARR';
const ADD_FIELD_TO_MAT = 'ADD_FIELD_TO_MAT';
const ADD_FIELD_TO_WORK = 'ADD_FIELD_TO_WORK'
const SET_EDIT_ELEMENT = 'SET_EDIT_ELEMENT';
const FIELDS_ARR_CLEAR = 'FIELDS_ARR_CLEAR';
const SET_EDIT_DETAIL = 'SET_EDIT_DETAIL';
const SET_EDIT_STONE = 'SET_EDIT_STONE'
const SET_EDIT_GDS = 'SET_EDIT_GDS'

let initialState = {
    form:{
        name:'FFF',
        editElement:{
            name:'sosaj',
            beton_ingredients:[]
        },
        editDetail:false,
        editDetail2:{
          name:'detail',
          additive_mat:[],
          operations_work:[]
        },
        editStone:false,
        editGds:false,
        fieldsArr:[],
        fieldsMat:[],
        fieldsWork:[]
    },
    supportFormState: {
        tempCost:0,
        polishForm: {
            w: null,
            h: null,
            l: null,
            modelValue: {
                one: false,
                two: false,
                three: false,
                four: false
            },
            modelVal: [
                {val:false,cost:0}
            ]
        }
    }
}


const FormReduser = (state=initialState,action)=>{
    switch (action.type){
        case SET_STATE:{
            return state;
        }
        case SET_EDIT_ELEMENT:{
            let newState = {...state};
            newState.form.editElement = {...action.data}
            newState.form.fieldsArr = [...action.data.beton_ingredients]
            return newState;
        }
        case SET_EDIT_DETAIL:{
            let newState = {...state}
            newState.form.editDetail = {...setEditDetailState({...action.data})}
            newState.form.fieldsArr = [...newState.form.editDetail.additive_mat]
            newState.form.fieldsWork = [...newState.form.editDetail.operations_work]
            return newState;
        }
        case SET_EDIT_STONE:{
            let newState = {...state}
            newState.form.editStone = {...action.data}
            newState.form.fieldsArr = [...action.data.slabs]
            newState.form.fieldsWork = [...action.data.blocks]
            return newState
        }
        case SET_EDIT_GDS:{
            let newState = {...state}
            newState.form.editGds = {...action.data}
            return newState;
        }
        case SET_FIELDS_ARR:{
            let newState = {...state};
            newState.form.fieldsArr = [...action.data];
            return newState;
        }
        case ADD_FIELD_TO_ARR:{
            let newState = {...state};
            newState.form.fieldsArr.push(action.data);
            return newState;
        }
        case ADD_FIELD_TO_MAT:{
            let newState = {...state};
            newState.form.fieldsMat.push(action.data);
            return newState;
        }
        case ADD_FIELD_TO_WORK:{
            let newState = {...state};
            newState.form.fieldsWork.push(action.data);
            return newState;
        }
        case FIELDS_ARR_CLEAR:{
            let newState = {...state};
            newState.form.editStone = false;
            newState.form.editGds = false;
            newState.form.fieldsArr = [];
            newState.form.editDetail = false;
            // newState.form.editDetail.operations_work = [];
            // newState.form.editDetail.additive_mat = [];
            newState.form.fieldsWork = [];
            newState.form.fieldsMat = [];
            //console.log('clear',newState.form.fieldsWork)
            return newState;
        }
        case SET_POLISH_MODEL_VALUE: {
            let newState = { ...state }
            const keys = Object.keys(newState.supportFormState.polishForm.modelValue)
            for (let key of keys) {
                if (action.data.type === key) {
                    newState.supportFormState.polishForm.modelValue[key] = action.data.value
                } else {
                    newState.supportFormState.polishForm.modelValue[key] = false
                }
            }
            
            return newState
        }
        default: return state
    }
}

export const setState = (data)=>({type:SET_STATE,data});
export const setFieldsArray = (data)=>({type:SET_FIELDS_ARR,data});
export const addFieldToArray = (data)=>({type:ADD_FIELD_TO_ARR,data});
export const addFieldToMat = (data)=>({type:ADD_FIELD_TO_MAT,data});
export const addFieldToWork = (data)=>({type:ADD_FIELD_TO_WORK,data});
export const setEditElement = (data)=>({type:SET_EDIT_ELEMENT,data});
export const setEditDetail = (data)=>({type:SET_EDIT_DETAIL,data})
export const fieldsArrClear = ()=>({type:FIELDS_ARR_CLEAR})
export const setEditStone = (data)=>({type:SET_EDIT_STONE,data})
export const setEditGds = (data) => ({ type: SET_EDIT_GDS, data })
export const setPolishModelValue = (data) => ({ type: SET_POLISH_MODEL_VALUE,data })

export default FormReduser;
