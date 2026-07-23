import {getOpAdditName, getSizeSq, getTempCost, getTempCostOfAround, setEditDetailState} from "../../Utils/support";
import {
    ADD_DETAIL_TO_KIT,
    CLEAR_SUPPORT_FORM_STATE,
    DEL_DETAIL_FROM_KIT,
    HEIGHT,
    OPERATION_CHANGE,
    PROCESS_TYPE_DETAIL_AROUND,
    SET_POLISH_MODEL_VALUE, SET_PROCESSING_CHANGE, SET_TEMP_COST,
    SIZE_DETAIL_CHANGE, SIZE_TYPE_FACE, SIZE_TYPE_FACE_AROUND, SIZE_TYPE_FACET_AROUND, SIZE_TYPE_FACET_UP,
    SIZE_TYPE_SIDE_AROUND,
    SIZE_TYPE_TWO_FACES,
    WEIGHT,
    WIDTH
} from "../../Utils/variables-const";


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
        tempCost: 0,
        tempName: '',
        additName: '',
        polishForm: {
            w: '',
            h: '',
            l: '',
            sizes:{
                face:0,
                twoFaces:0,
                faceAround:0,
                facetUp:0,
                facetAround: 0,
                sideAround:0
            },
            processing:{
                face:false,
                twoFaces:false,
                faceAround:false,
                facetUp:false,
                facetAround: false,
                sideAround: false,
                detailAround:false
            },
            modelValue: {
                one: false,
                two: false,
                three: false,
                four: false
            },
            modelVal: [
                {val:false,cost:0}
            ]
        },
        concreateForm: {
            detailsShiftKit:[]
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
        case SIZE_DETAIL_CHANGE:{
            let newState = {...state}
            if(action.data.type === HEIGHT){
                newState.supportFormState.polishForm.h = action.data.val
            }else if(action.data.type === WIDTH){
                newState.supportFormState.polishForm.w = action.data.val
            }else if(action.data.type === WEIGHT){
                newState.supportFormState.polishForm.l = action.data.val
            }
            newState.supportFormState.polishForm.sizes.face = getSizeSq(SIZE_TYPE_FACE,newState.supportFormState.polishForm.w,newState.supportFormState.polishForm.h,newState.supportFormState.polishForm.l)
            newState.supportFormState.polishForm.sizes.twoFaces = newState.supportFormState.polishForm.sizes.face * 2
            newState.supportFormState.polishForm.sizes.faceAround = getSizeSq(SIZE_TYPE_FACE_AROUND,newState.supportFormState.polishForm.w,newState.supportFormState.polishForm.h,newState.supportFormState.polishForm.l)
            newState.supportFormState.polishForm.sizes.facetUp = getSizeSq(SIZE_TYPE_FACET_UP,newState.supportFormState.polishForm.w,newState.supportFormState.polishForm.h,newState.supportFormState.polishForm.l)
            newState.supportFormState.polishForm.sizes.facetAround = getSizeSq(SIZE_TYPE_FACET_AROUND, newState.supportFormState.polishForm.w, newState.supportFormState.polishForm.h, newState.supportFormState.polishForm.l)
            newState.supportFormState.polishForm.sizes.sideAround = getSizeSq(SIZE_TYPE_SIDE_AROUND, newState.supportFormState.polishForm.w, newState.supportFormState.polishForm.h, newState.supportFormState.polishForm.l)

            return newState
        }
        case SET_PROCESSING_CHANGE: {
            //console.log(action.data)
            
            let newState = { ...state }
            const sizeData = {
                faces: newState.supportFormState.polishForm.sizes.twoFaces,
                facet: newState.supportFormState.polishForm.sizes.facetAround,
                side: newState.supportFormState.polishForm.sizes.sideAround
            }
            const keys = Object.keys(newState.supportFormState.polishForm.processing)
            for(let key of keys){
                if(action.data.type === key){
                    newState.supportFormState.polishForm.processing[key] = action.data.val
                    newState.supportFormState.additName += getOpAdditName(action.data.type)
                    if (action.data.type === PROCESS_TYPE_DETAIL_AROUND) {
                        newState.supportFormState.tempCost =
                            getTempCostOfAround(action.data.val, newState.supportFormState.tempCost, action.data.operations, sizeData)
                    } else {
                        newState.supportFormState.tempCost =
                            getTempCost(action.data.val, newState.supportFormState.tempCost, action.data.operations, action.data.operationType, newState.supportFormState.polishForm.sizes[key])
                    }
                    
                }
            }

            return newState
        }
        case OPERATION_CHANGE: {
            let newState = { ...state }
            //console.log(action.data)
            if (action.data.operations.length) {
                for (let op of action.data.operations) {
                    if (op.id == action.data.id) {
                        newState.supportFormState.tempCost = op.BLR
                        newState.supportFormState.tempName = op.name
                    }
                }
            }
            return newState
        }
        case SET_TEMP_COST:{
            let newState = {...state}
            newState.supportFormState.tempCost = action.data
            return newState
        }
        case ADD_DETAIL_TO_KIT: {
            let newState = { ...state }
            let detail = {}
            console.log(action.data)
            if (newState.supportFormState.concreateForm.detailsShiftKit.length) {
                let flag = false
                for (let d of newState.supportFormState.concreateForm.detailsShiftKit) {
                    
                    if (d.id == action.data.id) {
                        d.amount += action.data.amount
                        flag = true
                    }
                }
                if (!flag) {
                    newState.supportFormState.concreateForm.detailsShiftKit.push({ ...action.data })
                }
            } else {
                newState.supportFormState.concreateForm.detailsShiftKit.push({ ...action.data })
            }
            return newState
        }
        case DEL_DETAIL_FROM_KIT: {
            let newState = { ...state }
            newState.supportFormState.concreateForm.detailsShiftKit =
                newState.supportFormState.concreateForm.detailsShiftKit.filter((item) => {
                    return item.id !== action.data.id
                })
            return newState
        }

        case CLEAR_SUPPORT_FORM_STATE:{
            let newState = {...state}
            newState.supportFormState.polishForm.h = ''
            newState.supportFormState.polishForm.w = ''
            newState.supportFormState.polishForm.l = ''
            newState.supportFormState.tempCost = 0
            newState.supportFormState.tempName = ''
            newState.supportFormState.additName = ''
            for (const key of Object.keys(newState.supportFormState.polishForm.processing)) {
                newState.supportFormState.polishForm.processing[key] = false
                newState.supportFormState.polishForm.sizes[key] = 0
            }
            return newState
        }
        default: return state
    }
}

export const setState = (data)=>({type:SET_STATE,data});
export const setFieldsArray = (data)=>({type:SET_FIELDS_ARR,data});
export const setTempCost = (data) => ({ type: SET_TEMP_COST, data })
export const operationChange = (data) => ({ type: OPERATION_CHANGE,data })
export const addFieldToArray = (data)=>({type:ADD_FIELD_TO_ARR,data});
export const addFieldToMat = (data)=>({type:ADD_FIELD_TO_MAT,data});
export const addFieldToWork = (data)=>({type:ADD_FIELD_TO_WORK,data});
export const setEditElement = (data)=>({type:SET_EDIT_ELEMENT,data});
export const setEditDetail = (data)=>({type:SET_EDIT_DETAIL,data})
export const fieldsArrClear = ()=>({type:FIELDS_ARR_CLEAR})
export const setEditStone = (data)=>({type:SET_EDIT_STONE,data})
export const setEditGds = (data) => ({ type: SET_EDIT_GDS, data })
export const setPolishModelValue = (data) => ({ type: SET_POLISH_MODEL_VALUE,data })
export const setProcessingChange = (data)=>({type:SET_PROCESSING_CHANGE,data})
export const sizeDetailChange = (data) => ({ type: SIZE_DETAIL_CHANGE, data })
export const addDetailToKit = (data) => ({ type: ADD_DETAIL_TO_KIT, data })
export const delDetailFromKit = (data) => ({ type: DEL_DETAIL_FROM_KIT,data })
export const clearSupportFormState = () => ({type:CLEAR_SUPPORT_FORM_STATE})


export default FormReduser;
