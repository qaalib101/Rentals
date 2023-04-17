import React, { useState, useContext, useRef } from 'react';
import { Form, Button, Schema, useToaster, Divider } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import RenterContext from '../../context/renterContext';
import { RentalNotification } from '../../components/index';

const { StringType } = Schema.Types;

const model = Schema.Model({
    firstName: StringType().isRequired('This field is required.'),
    lastName: StringType().isRequired('This field is required.'),
    email: StringType().isEmail('Please enter a valid email address.').isRequired('This field is required.'),
    phone: StringType().isRequired('This field is required.'),
    emergencyContactName: StringType(),
    emergencyContactPhoneNumber: StringType()
});

export function Add() {
    const toaster = useToaster();
    const [formValue, setFormValue] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { addRenter } = useContext(RenterContext);
    const formRef = useRef();

    const handleSubmit = async () => {
        if (!formRef.current.check()) {
            return;
        }
        setLoading(true);
        addRenter({
            ...formValue,
            rentalId: 0,
            emergencyContactName: formValue.emergencyContactName ? formValue.emergencyContactName : "",
            emergencyContactPhoneNumber: formValue.emergencyContactPhoneNumber ? formValue.emergencyContactPhoneNumber : "",
        })
        openNotification("success", 4500, "Renter added successfully");
        navigate('/renters');
        setLoading(false);
    };

    const handleFormChange = (formValue) => {
        setFormValue(formValue);
    };

    const openNotification = (type, duration, message) => {
        toaster.push((<RentalNotification type={type} duration={duration} message={message} />), { placement: 'topCenter' });
    };

    return (
        <div>
            <div><h1>Create New Renter</h1></div>
            <Divider />
            <Form onChange={handleFormChange} formValue={formValue} model={model} ref={formRef}>
                <Form.Group>
                    <Form.ControlLabel>First Name</Form.ControlLabel>
                    <Form.Control name="firstName" required />
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>Last Name</Form.ControlLabel>
                    <Form.Control name="lastName" required />
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>Email</Form.ControlLabel>
                    <Form.Control name="email" type="email" required />
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>Phone</Form.ControlLabel>
                    <Form.Control name="phone" required />
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>Emergency Contact Name</Form.ControlLabel>
                    <Form.Control name="emergencyContactName" required />
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>Emergency Contact Phone Number</Form.ControlLabel>
                    <Form.Control name="emergencyContactPhoneNumber" required />
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