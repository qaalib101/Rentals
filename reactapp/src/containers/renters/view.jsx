import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Panel, Button, useToaster } from "rsuite";
import { RentalNotification } from '../../components/index';
import RenterContext from '../../context/renterContext';

export function View() {
    const { id } = useParams();
    const toaster = useToaster();
    const navigate = useNavigate();
    const { getRenterByKeyValuePair, deleteRenter } = useContext(RenterContext);
    const [renter, setRenter] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        rentalId: "",
        emergencyContactName: "",
        emergencyContactPhone: ""
    });

    useEffect(() => {
        let renter = getRenterByKeyValuePair("id", id)
        setRenter(renter);
    }, [id]);

    const submitDeleteRenter = (id) => {
        deleteRenter(id);
        openNotification("success", 3000, "Renter deleted successfully");
    }

    const openNotification = (type, duration, message) => {
        toaster.push((<RentalNotification type={type} duration={duration} message={message} />), { placement: "topCenter" })
    }

    return (
        <div>
            <Panel header="View Renter">
                <div>
                    <div>
                        <strong>First Name: </strong>
                        {renter.firstName}
                    </div>
                    <div>
                        <strong>Last Name: </strong>
                        {renter.lastName}
                    </div>
                    <div>
                        <strong>Email: </strong>
                        {renter.email}
                    </div>
                    <div>
                        <strong>Phone: </strong>
                        {renter.phone}
                    </div>
                    <div>
                        <strong>Rental: </strong>
                        {
                            renter.rentalId ?
                            <Button onClick={() => navigate(`/rentals/view/${renter.rentalId}`)}>View</Button> :
                            "None"
                        }
                    </div>
                    <div>
                        <strong>Emergency Contact Name: </strong>
                        {renter.emergencyContactName}
                    </div>
                    <div>
                        <strong>Emergency Contact Phone: </strong>
                        {renter.emergencyContactPhone}
                    </div>
                </div>
                <div style={{ marginTop: "1rem" }}>
                    <Button appearance="primary" onClick={() => { navigate(`/renters/edit/${id}`) }}>
                        Edit
                    </Button>
                    <Button appearance="primary" onClick={() => { submitDeleteRenter(id) }}>
                        Delete
                    </Button>
                </div>
            </Panel>
        </div>
    );
}