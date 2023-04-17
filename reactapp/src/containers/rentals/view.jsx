import { useParams, Link, useNavigate} from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Panel, Button, useToaster } from "rsuite";
import * as api from "../../api/api";
import { RentalNotification } from '../../components/index';
import RenterContext from '../../context/renterContext';
import * as moment from 'moment';

export function View() {
    const { id } = useParams();
    const toaster = useToaster();
    const navigate = useNavigate();
    const [rental, setRental] = useState({
        address: "",
        city: "",
        state: "",
        zipCode: "",
        bedrooms: "",
        bathrooms: "",
        monthlyRent: "",
        securityDeposit: "",
        petsAllowed: false,
        availableDate: "",
        renter: undefined
    });
    const { getRenterByKeyValuePair, deleteRenter } = useContext(RenterContext);
    
    useEffect(() => {
        let renter = getRenterByKeyValuePair("rentalId", id);
        api.getRentalById(id).then((data) => {
            setRental({
                address: data.address,
                city: data.city,
                state: data.state,
                zipCode: data.zipCode,
                bedrooms: data.bedrooms,
                bathrooms: data.bathrooms,
                monthlyRent: data.monthlyRent,
                securityDeposit: data.securityDeposit,
                petsAllowed: data.petsAllowed,
                availableDate: moment(data.availableDate, 'MM/DD/YYYY').format('MM/DD/YYYY'),
                renter: renter
            });
        });
    }, [id]);

    const deleteRental = (id) => {
        api.deleteRental(id).then(() => {
            openNotification("success", 3000, "Rental deleted successfully");
            deleteRenter(rental.renter ? rental.renter.id : 0);
            navigate("/");
        }).catch((err) => {
            openNotification("error", 3000, "Error deleting rental");
        });
    }

    const openNotification = (type, duration, message) => {
        toaster.push((<RentalNotification type={type} duration={duration} message={message} />), { placement: "topCenter" })
    }

    return (
        <div>
            <Panel header="View Rental">
                <div>
                    <div>
                        <strong>Address: </strong>
                        {rental.address}
                    </div>
                    <div>
                        <strong>City: </strong>
                        {rental.city}
                    </div>
                    <div>
                        <strong>State: </strong>
                        {rental.state}
                    </div>
                    <div>
                        <strong>Zip Code: </strong>
                        {rental.zipCode}
                    </div>
                    <div>
                        <strong>Bedrooms: </strong>
                        {rental.bedrooms}
                    </div>
                    <div>
                        <strong>Bathrooms: </strong>
                        {rental.bathrooms}
                    </div>
                    <div>
                        <strong>Monthly Rent: </strong>
                        {rental.monthlyRent}
                    </div>
                    <div>
                        <strong>Security Deposit: </strong>
                        {rental.securityDeposit}
                    </div>
                    <div>
                        <strong>Pets Allowed: </strong>
                        {rental.petsAllowed ? "Yes" : "No"}
                    </div>
                    <div>
                        <strong>Available Date: </strong>
                        {rental.availableDate}
                    </div>
                    <div>
                        <strong>Renter: </strong>
                        {
                            rental.renter ?
                                rental.renter.firstName + " " + rental.renter.lastName :
                                "No renter assigned. Add renter when editing rental."
                        }
                    </div>
                </div>
                <div style={{ marginTop: "1rem" }}>
                    <Button appearance="primary" onClick={() => { navigate(`/rentals/edit/${id}`) }}>
                        Edit
                    </Button>
                    <Button appearance="primary" onClick={() => { deleteRental(id) }}>
                        Delete
                    </Button>
                </div>
            </Panel>
        </div>
    );
}