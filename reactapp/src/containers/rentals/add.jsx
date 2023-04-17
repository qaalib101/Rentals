import React, { useState, useRef } from 'react';
import { Form, Divider, Button, Schema, SelectPicker, DatePicker, Toggle, InputNumber, useToaster } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import { SchemaModel, StringType, NumberType, DateType } from "schema-typed";
import * as moment from 'moment';
import * as api from '../../api/api';
import { states } from '../../utils/index';
import { RentalNotification } from '../../components/index';

export function Add() {
    const toaster = useToaster();
    const [formValue, setFormValue] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const formRef = useRef();

    const handleSubmit = async () => {
        if (!formRef.current.check()) {
            return;
        }
        setLoading(true);
        api.createRental({
            ...formValue,
            zipCode: Number(formValue.zipCode),
            bedrooms: Number(formValue.bedrooms),
            bathrooms: Number(formValue.bathrooms),
            monthlyRent: Number(formValue.monthlyRent),
            securityDeposit: Number(formValue.securityDeposit),
            availableDate: moment(formValue.availableDate, 'YYYY-MM-DDTHH:mm:ssZ').startOf('day').format('YYYY-MM-DDTHH:mm:ssZ'),
        }).then(() => {
            openNotification("success", 4500, "Rental created successfully");
            setLoading(false);
            navigate('/rentals');
        }).catch(() => {
            openNotification("error", 4500, "Error creating rental");
            setLoading(false);
        });
    };

    const handleFormChange = (formValue) => {
        setFormValue(formValue);
    };

    const openNotification = (type, duration, message) => {
        toaster.push((<RentalNotification type={type} duration={duration} message={message} />), { placement: "topCenter" })
    }

    const requiredModel = SchemaModel({
        address: StringType().isRequired('This field is required.'),
        city: StringType().isRequired('This field is required.'),
        state: StringType().isRequired('This field is required.'),
        zipCode: StringType().isRequired('This field is required.'),
        bedrooms: NumberType().isRequired('This field is required.'),
        bathrooms: NumberType().isRequired('This field is required.'),
        monthlyRent: NumberType().isRequired('This field is required.'),
        securityDeposit: NumberType().isRequired('This field is required.'),
        availableDate: DateType().isRequired('This field is required.'),
    });

    const otherModel = SchemaModel({
        zipCode: NumberType().max(99999, 'Zip code too long'),
        bedrooms: NumberType().min(1, 'Bedrooms cannot be less than 1'),
        bathrooms: NumberType().min(1, 'Bathrooms cannot be less than 1'),
        availableDate: DateType().min(new Date(), 'Minimum date today')
    });

    return (
        <div>
            <div><h1>Create New Rental</h1></div>
            <Divider/>
            <Form onChange={handleFormChange} formValue={formValue} model={SchemaModel.combine(requiredModel, otherModel)} ref={formRef}>
                <Form.Group>
                    <Form.ControlLabel>Address</Form.ControlLabel>
                    <Form.Control name="address" required />
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>City</Form.ControlLabel>
                    <Form.Control name="city" required />
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>State</Form.ControlLabel>
                    <Form.Control name="state" accepter={SelectPicker} data={states} required />
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>Zip Code</Form.ControlLabel>
                    <Form.Control name="zipCode" accepter={InputNumber} required />
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>Bedrooms</Form.ControlLabel>
                    <Form.Control name="bedrooms" accepter={InputNumber} required />
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>Bathrooms</Form.ControlLabel>
                    <Form.Control name="bathrooms" accepter={InputNumber} required />
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>Monthly Rent</Form.ControlLabel>
                    <Form.Control name="monthlyRent" accepter={InputNumber} required />
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>Security Deposit</Form.ControlLabel>
                    <Form.Control name="securityDeposit" accepter={InputNumber} required />
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>Pets Allowed</Form.ControlLabel>
                    <Toggle
                        name="petsAllowed"
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                        checked={formValue.petsAllowed}
                        onChange={(value) => setFormValue(prevRental => ({ ...prevRental, petsAllowed: value }))}
                        required 
                    />
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>Available Date</Form.ControlLabel>
                    <Form.Control name="availableDate" accepter={DatePicker} format={"MM/dd/yyyy"} required />
                </Form.Group>
                <Form.Group>
                    <Button appearance="primary" onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}