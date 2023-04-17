import { Table, Button, useToaster, Divider } from "rsuite";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import RenterContext from '../../context/renterContext';

export function Renters() {
    const [renters, setRenters] = useState([]);
    const { Column, HeaderCell, Cell } = Table;
    const { getRenters } = useContext(RenterContext);
    const navigate = useNavigate();

    useEffect(() => {
        refreshRenters();
    }, [])

    const refreshRenters = () => {
        setRenters(getRenters);
    }

    const viewRenter = (id) => {
        navigate(`/renters/view/${id}`);
    }

    const editRenter = (id) => {
        navigate(`/renters/edit/${id}`);
    }

    const renderRentalLink = (rowData) => {
        return (
            <div>
                {
                    (rowData.rentalId && rowData.rentalId != 0) ?
                    <Link to={`/rentals/view/${rowData.rentalId}`}>
                        Rental
                    </Link> :
                    "No rental"
                }
            </div>
        );
    };

    return (
        <div>
            <div>
                <h1>Renters List</h1>
            </div>
            <Divider />
            <Table data={renters} autoHeight>
                <Column flexGrow={1}>
                    <HeaderCell>Name</HeaderCell>
                    <Cell dataKey="firstName">
                        {(rowData) => rowData.firstName + " " + rowData.lastName}
                    </Cell>
                </Column>
                <Column flexGrow={1}>
                    <HeaderCell>Email</HeaderCell>
                    <Cell dataKey="email" />
                </Column>
                <Column flexGrow={1}>
                    <HeaderCell>Phone</HeaderCell>
                    <Cell dataKey="phone" />
                </Column>
                <Column flexGrow={1}>
                    <HeaderCell>Rental</HeaderCell>
                    <Table.Cell>{renderRentalLink}</Table.Cell>
                </Column>
                <Column flexGrow={1}>
                    <HeaderCell>Emergency Contact Name</HeaderCell>
                    <Cell dataKey="emergencyContactName" />
                </Column>
                <Column flexGrow={1}>
                    <HeaderCell>Emergency Contact Phone</HeaderCell>
                    <Cell dataKey="emergencyContactPhoneNumber" />
                </Column>
                <Column flexGrow={1}>
                    <HeaderCell>...</HeaderCell>
                    <Cell style={{ padding: "6px" }}>
                        {(rowData) => (
                            <div>
                                <Button onClick={() => viewRenter(rowData.id)}>
                                    View
                                </Button>
                                <Button onClick={() => editRenter(rowData.id)}>
                                    Edit
                                </Button>
                            </div>
                        )}
                    </Cell>
                </Column>
            </Table>
        </div>
    );
}