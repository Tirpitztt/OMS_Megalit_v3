import React from "react";
import CheckBox from "./Classes/checkBox";


export const WORKERS = 'рабочие'

export const GUARANTIES_OPTIONS = [
    {value:0,text:'нет'},
    {value:1,text:'1 год'},
    {value:3,text:'3 года'},
    {value:5,text:'5 лет'},
    {value:10,text:'10 лет'},
]
export const UTM_OPTIONS = [
    {value:0,text:'выбери пункт'},
    {value:1,text:'по рекомендации'},
    {value:2,text:'старый заказчик'},
    {value:3,text:'реклама интернет'},
    {value:4,text:'уличная реклама'},
    {value:5,text:'реклама в прессе'},
    {value:6,text:'реклама на авто'},
]

export const MONUMENT_NAMES = [
    {value:'none',text:'выбери название'},
    {value:'стела',text:'стела'},
    {value:'вставка',text:'вставка'},
    {value:'подставка',text:'подставка'},
    {value:'цветник',text:'цветник'},
    {value:'цоколь',text:'цоколь'},
    {value:'капля',text:'капля'},
    {value:'крест',text:'крест'},
    {value:'голгофа',text:'голгофа'},
    {value:'площадка',text:'площадка'},
    {value:'крыша',text:'крыша'},
    {value:'колонна',text:'колонна'},
    {value:'база',text:'база'},
    {value:'капитель',text:'капитель'},
    {value:'надгробка',text:'надгробка'},
    {value:'рамка',text:'рамка'},
    {value:'доп деталь',text:'доп деталь'},
]
export const FENCE_NAMES = [
    {value:'none',text:'выбери название'},
    {value:'перемычка',text:'перемычка'},
    {value:'столбик',text:'столбик'},
    {value:'ажур',text:'ажур'},
    {value:'дамаск',text:'дамаск'},
    {value:'кубик',text:'кубик'},
    {value:'доп деталь',text:'доп деталь'},
]

export const SHOP_NAMES = [
    {value:'none',text:'выбери название'},
    {value:'ваза',text:'ваза'},
    {value:'лампада',text:'лампада'},
    {value:'крестик',text:'крестик'},
    {value:'аксессуар',text:'аксессуар'},
    {value:'щебень',text:'щебень'},
    {value:'трава',text:'трава'},
    {value:'лавка',text:'лавка'},
    {value:'стол',text:'стол'},
    {value:'3D модель',text:'3D модель'},
    {value:'стакан',text:'стакан'},
    {value:'тарелка',text:'тарелка'},
    {value:'венок',text:'венок'},
]

export const DETAIL_NAMES = [
    {value:'none',text:'выбери категорию'},
    {value:'стела',text:'стела'},
    {value:'подставка',text:'подставка'},
    {value:'цветник',text:'цветник'},
    {value:'крест',text:'крест'},
    {value:'площадка',text:'площадка'},
    {value:'плитка',text:'плитка'},
    {value:'бордюр',text:'бордюр'},
    {value:'перемычка',text:'перемычка'},
    {value:'столбик',text:'столбик'},
    {value:'лавка',text:'лавка'},
    {value:'стол',text:'стол'},
    {value:'балка',text:'балка'},
    {value:'подиум',text:'подиум'},
    {value:'доп деталь',text:'доп деталь'},

]
export const DEPARTMENT_NAMES = [
    {value:'администрация',text:'администрация'},
    {value:'рабочие',text:'рабочие'},
]
export const WORKERS_NAMES = [
    {value:'разнорабочий',text:'разнорабочий'},
    {value:'заливщик',text:'заливщик'},
    {value:'установщик',text:'установщик'},
    {value:'установщик-водитель',text:'установщик-водитель'},
    {value:'шлифовщик',text:'шлифовщик'},
    {value:'резчик',text:'резчик'},
    {value:'художник',text:'художник'},
    {value:'продавец-консультант',text:'продавец-консультант'},
]
export const ADMIN_NAMES = [
    {value:'директор',text:'директор'},
    {value:'руководитель отдела',text:'руководитель отдела'},
    {value:'мастер',text:'мастер'},
    {value:'менеджер',text:'менеджер'},
]
export const ROLES_NAMES = [
    {value:'konung',text:'администратор'},
    {value:'yarl',text:'менеджер'},
    {value:'huskarl',text:'продавец-консультант'},
    {value:'karl',text:'сотрудник'},
]


export const FORM_CONCREATE = 'FORM_CONCREATE'
export const FORM_VARIED = 'FORM_VARIED'
export const FORM_BASE = 'FORM_BASE'
export const FORM_POLISH = 'FORM_POLISH'
export const FORM_MONTAZ = 'FORM_MONTAZ'
export const FORM_CUT = 'FORM_CUT'

export const WORKSHOP_NAMES = [
    { value: FORM_CONCREATE, text: 'заливка' },
    { value: FORM_VARIED, text: 'разное' },
    { value: FORM_BASE, text: 'повременка' },
    { value: FORM_POLISH, text: 'шлифовка' },
    { value: FORM_MONTAZ, text: 'установки' },
    { value: FORM_CUT,text:'распил' }
]

export const SET_USERS_LIST = 'SET_USERS_LIST'
export const CLEAR_USER_STATE = 'CLEAR_USER_STATE'
export const SET_USER_EDIT = 'SET_USER_EDIT'
export const SET_USER_LOGIN = 'SET_USER_LOGIN'
export const SET_USER_LASTNAME = 'SET_USER_LASTNAME'
export const SET_USER_NAME = 'SET_USER_NAME'
export const SET_USER_FATHERNAME = 'SET_USER_FATHERNAME'
export const SET_USER_ROLE = 'SET_USER_ROLE'
export const SET_NEW_USER = 'SET_NEW_USER'
export const SET_USER_PASSWORD = 'SET_USER_PASSWORD'
export const SET_USER_AVATARS_LIST = 'SET_USER_AVATARS_LIST'
export const SET_USER_AVATAR = 'SET_USER_AVATAR'
export const SET_USER_ADRESS = 'SET_USER_ADRESS'
export const SET_USER_PHONE = 'SET_USER_PHONE'
export const SET_USER_WORKPHONE = 'SET_USER_WORKPHONE'
export const SET_USER_DATE_ACCEPT = 'SET_USER_DATE_ACCEPT'
export const SET_USER_DEPARTMENT = 'SET_USER_DEPARTMENT'
export const SET_USER_POSITION = 'SET_USER_POSITION'
export const SET_USER_MAIL = 'SET_USER_MAIL'


export const GET_SHIFTS_BY_MONTH = 'GET_SHIFTS_BY_MONTH'
export const SET_INDIVIDUAL_SALARY_STATE = 'SET_INDIVIDUAL_SALARY_STATE'
export const SET_SALARY_FORM_STATE = 'SET_SALARY_FORM_STATE'
export const FORM_OPTIONS_CHANGE = 'FORM_OPTIONS_CHANGE'


export const SET_WORKSHOP_VALUE = 'SET_WORKSHOP_VALUE'
export const GET_WORK_OPERATIONS_INIT = 'GET_WORK_OPERATIONS_INIT'
export const GET_WORK_OPERATIONS = 'GET_WORK_OPERATIONS'
export const SET_WORK_OPERATION_NAME = 'SET_WORK_OPERATION_NAME'
export const SELECT_WORK_OPERATION = 'SELECT_WORK_OPERATION'
export const DETAILS_LIST_SORT = 'DETAILS_LIST_SORT'
export const CLEAR_FORM_OPTIONS = 'CLEAR_FORM_OPTIONS'

export const GET_EMPLOYEES_LIST = 'GET_EMPLOYEES_LIST'
export const ADD_EMPLOYEE_TO_GROUP = 'ADD_EMPLOYEE_TO_GROUP'
export const DEL_EMPLOYEE_FROM_GROUP = 'DEL_EMPLOYEE_FROM_GROUP'
export const SET_SHIFT_DATE = 'SET_SHIFT_DATE'
export const CLEAR_ACCURE_STATE = 'CLEAR_ACCURE_STATE'
export const ADD_SALARY_ROW = 'ADD_SALARY_ROW'                 

export const FORM_SALARY_ROW_PUSH = 'FORM_SALARY_ROW_PUSH'
//export const SIGN_SALARY_OF_SHIFT = 'SIGN_SALARY_OF_SHIFT'

//export const STELA_CHECK_ON = { value: 'стела', checked: false, checkOn: () => true, checkOff: () => false }
//export const TUMBA_CHECK_ON = { value: 'подставка', checked: false, checkOn: () => true, checkOff: () => false }
//export const OTHER_CHECK_ON = { value: 'другое', checked: false, checkOn: () => true, checkOff: () => false }
//export const ALL_CHECK_ON = { value: 'all', checked: false, checkOn: () => true, checkOff: () => false }
//export const BLACK_CHECK_ON = { value: 'ч', checked: false, checkOn: () => true, checkOFF: () => false }
//export const RED_CHECK_ON = { value: 'к', checked: false, checkOn: () => true, checkOFF: () => false }
//export const WHITE_CHECK_ON = { value: 'б', checked: false, checkOn: () => true, checkOFF: () => false }
//export const GRAY_CHECK_ON = { value: 'с', checked: false, checkOn: () => true, checkOFF: () => false }
//export const ALL_COLORS_CHECK_ON = { value: 'allColors', checked: false, checkOn: () => true, checkOFF: () => false }

export const STELA = 'стела'
export const TUMBA = 'подставка'
export const ALL = 'all'
export const OTHER = 'другое'



export const STELA_SORT_CHECK = new CheckBox(STELA)
export const TUMB_SORT_CHECK = new CheckBox(TUMBA)
export const OTHER_SORT_CHECK = new CheckBox(OTHER)
export const ALL_SORT_CHECK = new CheckBox(ALL)
export const BLACK_SORT_CHECK = new CheckBox('ч')
export const WHITE_SORT_CHECK = new CheckBox('б')
export const GRAY_SORT_CHECK = new CheckBox('с')
export const RED_SORT_CHECK = new CheckBox('к')




export const SIZE_TYPE_FACE = 'SIZE_TYPE_FACE'
export const SIZE_TYPE_TWO_FACES = 'SIZE_TYPE_TWO_FACES'
export const SIZE_TYPE_FACE_AROUND = 'SIZE_TYPE_FACE_AROUND'
export const SIZE_TYPE_FACET_AROUND = 'SIZE_TYPE_FACET_AROUND'
export const SIZE_TYPE_FACET_UP = 'SIZE_TYPE_FACET_UP'
export const SIZE_TYPE_SIDE_AROUND = 'SIZE_TYPE_SIDE_AROUND'
export const PROCESS_TYPE_FACE = 'face'
export const PROCESS_TYPE_TWO_FACES = 'twoFaces'
export const PROCESS_TYPE_FACE_AROUND = 'faceAround'
export const PROCESS_TYPE_FACET_UP = 'facetUp'
export const PROCESS_TYPE_FACET_AROUND = 'facetAround'
export const PROCESS_TYPE_SIDE_AROUND = 'sideAround'
export const PROCESS_TYPE_DETAIL_AROUND = 'detailAround'
export const OPERATION_POLISH_FACE = 'полировка лица'
export const OPERATION_POLISH_FACET = 'полировка фаски 0-10'
export const OPERATION_POLISH_SIDE = 'полировка торца'
export const OPERATION_POLISH_AROUND = 'OPERATION_POLISH_AROUND'


//--------------------FORM-REDUSER-----------------------------------------

export const SET_POLISH_MODEL_VALUE = 'SET_POLISH_MODEL_VALUE'
export const SET_PROCESSING_CHANGE = 'SET_PROCESSING_CHANGE'
export const SET_TEMP_COST = 'SET_TEMP_COST'
export const SIZE_DETAIL_CHANGE = 'SIZE_DETAIL_CHANGE'
export const WIDTH = 'WIDTH'
export const HEIGHT = 'HEIGHT'
export const WEIGHT = 'WEIGHT'
export const OPERATION_CHANGE = 'OPERATION_CHANGE'
export const ADD_DETAIL_TO_KIT = 'ADD_DETAIL_TO_KIT'
export const DEL_DETAIL_FROM_KIT = 'DEL_DETAIL_FROM_KIT'

export const CLEAR_SUPPORT_FORM_STATE = 'CLEAR_SUPPORT_FORM_STATE'



