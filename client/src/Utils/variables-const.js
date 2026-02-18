import React from "react";

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
export const SET_MONTH_TITLE_DAYS = 'SET_MONTH_TITLE_DAYS'