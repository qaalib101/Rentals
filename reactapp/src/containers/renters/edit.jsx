import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Schema, SelectPicker } from 'rsuite';
import RenterContext from '../../context/renterContext';
import * as api from '../../api/api';

const { StringType } = Schema.Types;

const model = Schema.Model({
    firstName: StringType().isRequired('This field is required.'),
    lastName: StringType().isRequired('This field is required.'),
    email: StringType().isEmail('Please enter a valid email address.').isRequired('This field is required.'),
    phone: StringType().isRequired('This field is required.'),
    emergencyContactName: StringType(),
    emergencyContactPhoneNumber: StringType()
});

export function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getRenters, updateRenter } = useContext(RenterContext);
    const formRef = useRef();
    const [rentals, setRentals] = useState([]);
    const [renter, setRenter] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        rentalId: 0,
        emergencyContactName: '',
        emergencyContactPhone: '',
    });

    useEffect(() => {
        const currentRenter = getRenters().find((renter) => renter.id == id);
        if (currentRenter) {
            api.getAllRentals().then((data) => {
                const formattedRentals = rentals.map(rental => {
                    return {
                        label: `${rental.address}`,
                        value: rental.id
                    }
                })
                setRentals(formattedRentals);
            })
            setRenter({
                firstName: currentRenter.firstName,
                lastName: currentRenter.lastName,
                email: currentRenter.email,
                phone: currentRenter.phone,
                rentalId: currentRenter.rentalId,
                emergencyContactName: currentRenter.emergencyContactName,
                emergencyContactPhoneNumber: currentRenter.emergencyContactPhoneNumber
            });
        }
    }, [id]);

    const handleSubmit = () => {
        updateRenter(renter);
        navigate(`/renters/view/${id}`);
    };

    const handleFormChange = (value) => {
        setRenter((prevRenter) => ({ ...prevRenter, ...value }));
    };

    return (
        <div>
            <h1>Edit Renter</h1>
            <Form onChange={handleFormChange} formValue={renter} model={model} ref={formRef}>
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
                    <Form.ControlLabel>Rental</Form.ControlLabel>
                    <Form.Control name="rentalId" as={SelectPicker} data={rentals} />
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>Emergency Contact Name</Form.ControlLabel>
                    <Form.Control name="emergencyContactName" required />
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>Emergency Contact Phone</Form.ControlLabel>
                    <Form.Control name="emergencyContactPhone" required />
                </Form.Group>
                <Form.Group>
                    <Button appearance="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
}