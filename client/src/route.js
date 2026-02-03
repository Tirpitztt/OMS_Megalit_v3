import React from "react";
import {Routes,Route} from "react-router-dom";
import {LoginPage} from "./Components/Login/login";
import DBContainer from "./Components/DBComponent/db_container";
import MainContainer from "./Components/Main/mainContainer";

import CreateOrderContainer from "./Components/CreateOrderComponent/createOrderContainer";
import PrintOrder from "./Components/PrintOrder/printOrder";
import AdminContainer from "./Components/Admin/adminContainer";
import BetonContainer from "./Components/Admin/Pages/Beton/betonContainer";
import EditableContainer from "./Components/DBComponent/OrderDetails/editable-container";
import AdditionalAgreePage from "./Components/PrintOrder/AdditionalAgreement/additionalAgreePage";
import WorkPagesContainer from "./Components/PrintOrder/WorkPages/workPagesContainer";
import AdminPayContainer from "./Components/Main/Displays/AdminPayInfo/adminPayContainer";
import EmployeesContainer from "./Components/Admin/Pages/Employees/employeesContainer";
import TokarContainer from "./Components/Admin/Pages/Tokar/tokarContainer";



export const useRouts = (isAuth,userRole,props) =>{

    if(isAuth){
        if(userRole==='konung'){
            return(
                <Routes>
                    <Route path="/" element={<MainContainer />} />
                    <Route path="/home" element={<MainContainer />} />
                    <Route path="/ordernew/:orderID" element={<CreateOrderContainer />} />
                    <Route path="/db" element={<DBContainer />} />
                    <Route path="/admin/employees" element={<EmployeesContainer />} />
                    <Route path="/admin/tokar" element={<TokarContainer />} />
                    <Route path="/print/:orderId" element={<PrintOrder />} />
                    <Route path="/admin" element={<AdminContainer />} />
                    <Route path="/admin/beton" element={<BetonContainer />} />
                    <Route path="/editable/:orderId" element={<EditableContainer />} />
                    <Route path="/print-add/:orderId" element={<AdditionalAgreePage />} />
                    <Route path="/print-work-pages/:orderId" element={<WorkPagesContainer />} />
                    <Route path="/home/statistics" element={<AdminPayContainer />} />
                </Routes>
            )
        }
        return(
            <Routes>
                <Route path="/" element={<MainContainer />} />
                <Route path="/home" element={<MainContainer />} />
                <Route path="/ordernew/:orderID" element={<CreateOrderContainer />} />
                <Route path="/db" element={<DBContainer />} />
                <Route path="/editable/:orderId" element={<EditableContainer />} />
                <Route path="/print/:orderId" element={<PrintOrder />} />
                <Route path="/print-add/:orderId" element={<AdditionalAgreePage />} />
                <Route path="/print-work-pages/:orderId" element={<WorkPagesContainer />} />
            </Routes>
        )
    }
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="*" element={<LoginPage />} />
        </Routes>
    )
}
