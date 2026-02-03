import {applyMiddleware,combineReducers, createStore} from "redux";
import MainReduser from "./Redusers/main-reduser";
import DBReduser from "./Redusers/db_reduser";
import ModalReduser from "./Redusers/modal-reduser";
import OrderReduser from "./Redusers/order-reduser";
import CreateOrder from "./Redusers/neworder-reduser";
import AdminReduser from "./Redusers/admin-reduser";
import BetonReduser from "./Redusers/admin-beton-reduser";
import FormReduser from "./Redusers/form-reduser";
import EditableReduser from "./Redusers/editable-reduser";
import thunkMiddleware from 'redux-thunk';
import AdminStatisticsReduser from "./Redusers/admin-statistics-reduser";
import UserReduser from "./Redusers/user-reduser"




let redusers = combineReducers({
    mainPage:MainReduser,
    dbPage:DBReduser,
    modal:ModalReduser,
    orderPage:OrderReduser,
    newOrderPage:CreateOrder,
    adminPage:AdminReduser,
    betonPage:BetonReduser,
    formState:FormReduser,
    editablePage:EditableReduser,
    statisticsPage:AdminStatisticsReduser,
    employeesPage:UserReduser
})

let store = createStore(redusers,applyMiddleware(thunkMiddleware));

export default store;
