import React from 'react';
import ButtonForm from "../../UI/Buttons/button-form";
import FormInput from "../../UI/Inputs/form-input";
import c from './form.module.css';

const CustomerForm = () => {
    return (
        <form>
            <div className={c.form_box}>
                <label className={c.label_form}>фамилия</label>
                <FormInput />
            </div>
            <ButtonForm>создать заказчика</ButtonForm>
        </form>
    );
};

export default CustomerForm;