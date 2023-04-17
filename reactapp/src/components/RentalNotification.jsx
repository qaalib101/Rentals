import {
    Notification,
} from 'rsuite';

export function RentalNotification(props) {
    const { type = "success", duration = 4500, message = ""} = props;

    return (
        <Notification type={type} header={type} duration={duration} closable>
            <p>{ message }</p>
        </Notification>
    );
}