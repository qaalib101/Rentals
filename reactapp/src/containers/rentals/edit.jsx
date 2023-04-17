import React, { useState, useEffect, useRef, useContext } from 'react';
import { Form, Button, SelectPicker, Toggle, InputNumber, useToaster, Divider } from 'rsuite';
import { DatePicker } from 'rsuite';
import { useParams } from 'react-router-dom';
import { SchemaModel, StringType, NumberType, DateType } from "schema-typed";
import * as moment from 'moment';
import { RentalNotification } from '../../components/index';
import { states } from '../../utils/index';
import * as api from '../../api/api';
import RenterContext from '../../context/renterContext';

export function Edit() {
    const toaster = useToaster();
    const { id } = useParams();
    const [formValue, setFormValue] = useState({});
    const formRef = useRef(null);
    const { getRentersWithoutRental, updateRenter, getRenterByKeyValuePair } = useContext(RenterContext);
    const renters = getRentersWithoutRental().map((renter) => {
        return {
            label: `${renter.firstName} ${renter.lastName}`,
            value: renter.id,
        };
    })
    useEffect(() => {
        handleRefresh();
    }, []);


    const handleEdit = () => {
        if (!formRef.current.check()) {
            return;
        }
        api.updateRental({
            ...formValue,
            zipCode: Number(formValue.zipCode),
            bedrooms: Number(formValue.bedrooms),
            bathrooms: Number(formValue.bathrooms),
            monthlyRent: Number(formValue.monthlyRent),
            securityDeposit: Number(formValue.securityDeposit),
            availableDate: moment(formValue.availableDate).startOf('day').format('YYYY-MM-DDTHH:mm:ssZ'),
            renter: undefined
        }).then(() => {
            if (formValue.renter) {
                updateRenter({
                    ...getRenterByKeyValuePair(id, formValue.renter),
                    rentalId: id,
                });
            }
            openNotification("success", 4500, "Rental updated successfully");
            handleRefresh();
        }).catch((err) => {
            openNotification("error", 4500, "Error updating rental");
            handleRefresh();
        });
    };

    const handleRefresh = () => {
        let renter = getRenterByKeyValuePair("rentalId", id);
        api.getRentalById(id).then((data) => {
            setFormValue({
                ...data,
                availableDate: moment(data.availableDate).toDate(),
                renter: renter ? renter.id : 0
            });
        });
    }

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
        renter: NumberType()
    });

    const otherModel = SchemaModel({
        zipCode: NumberType().max(99999, 'Zip code too long'),
        bedrooms: NumberType().min(1, 'Bedrooms cannot be less than 1'),
        bathrooms: NumberType().min(1, 'Bathrooms cannot be less than 1'),
    });

    return (
        <div>
            <div><h1>Edit Rental</h1></div>
            <Divider />
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
                    <Form.ControlLabel>Renter</Form.ControlLabel>
                    <Form.Control name="renter" accepter={SelectPicker} data={renters} required />
                </Form.Group>
                <Form.Group>
                    <Button appearance="primary" onClick={handleEdit}>
                        Save
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
};
