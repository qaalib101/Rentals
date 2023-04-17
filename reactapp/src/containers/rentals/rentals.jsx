import { Table, Button, useToaster, Divider, Whisper, Popover } from "rsuite";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as api from "../../api/api";
import * as moment from 'moment';

export function Rentals() {
    const [rentals, setRentals] = useState([]);
    const { Column, HeaderCell, Cell } = Table;
    const navigate = useNavigate();

    useEffect(() => {
        refreshRentals();
    }, [])

    const refreshRentals = () => {
        api.getAllRentals().then((data) => {
            setRentals(data);
        }).catch((err) => {
            console.log(err);
        });
    }

    const viewRental = (id) => {
        navigate(`/rentals/view/${id}`);
    }

    const editRental = (id) => {
        navigate(`/rentals/edit/${id}`);
    }

    return (
        <div>
            <div>
                <h1>Rentals List</h1>
            </div>
            <Divider />
            <Table
                data={rentals}
                autoHeight
            >
                <Column flexGrow={1} >
                    <HeaderCell>Address</HeaderCell>
                    <Cell dataKey="address" />
                </Column>
                <Column flexGrow={1} >
                    <HeaderCell>City</HeaderCell>
                    <Cell dataKey="city" />
                </Column>
                <Column flexGrow={1} >
                    <HeaderCell>State</HeaderCell>
                    <Cell dataKey="state" />
                </Column>
                <Column flexGrow={1} >
                    <HeaderCell>Zip Code</HeaderCell>
                    <Cell dataKey="zipCode" />
                </Column>
                <Column flexGrow={1} >
                    <HeaderCell>Bed</HeaderCell>
                    <Cell dataKey="bedrooms" />
                </Column>
                <Column flexGrow={1} >
                    <HeaderCell>Bath</HeaderCell>
                    <Cell dataKey="bathrooms" />
                </Column>
                <Column flexGrow={1} >
                    <HeaderCell>Rent</HeaderCell>
                    <Cell dataKey="monthlyRent" />
                </Column>
                <Column flexGrow={1} >
                    <HeaderCell>Deposit</HeaderCell>
                    <Cell dataKey="securityDeposit" />
                </Column>
                <Column flexGrow={1} >
                    <HeaderCell>Pets Allowed</HeaderCell>
                    <Cell dataKey="petsAllowed">
                        {rowData => rowData.petsAllowed ? "Yes" : "No"}
                    </Cell>
                </Column>
                <Column flexGrow={1} >
                    <HeaderCell>Available Date</HeaderCell>
                    <Cell dataKey="availableDate">
                        {rowData => moment(rowData.availableDate).format('MM/DD/YYYY')}
                    </Cell>
                </Column>
                <Column flexGrow={1}>
                    <HeaderCell>...</HeaderCell>
                    <Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <div>
                                <Button onClick={() => { viewRental(rowData.id) }}>
                                    View
                                </Button>
                                <Button onClick={() => { editRental(rowData.id) }}>
                                    Edit
                                </Button>
                            </div>
                        )}
                    </Cell>
                </Column>
            </Table>
        </div>
    )

}