import { Link } from "react-router-dom";
import { FlexboxGrid, Panel, Button } from "rsuite";

export function Home() {
    return (
        <FlexboxGrid justify="center" align="middle" style={{ height: "100%" }}>
            <FlexboxGrid.Item colspan={12}>
                <Panel header={<h1>Rentals Management System</h1>} bordered>
                    <FlexboxGrid justify="center">
                        <FlexboxGrid.Item colspan={6} style={{ textAlign: "center" }}>
                            <Link to="/rentals">
                                <Button appearance="primary" size="lg">
                                    Manage Rentals
                                </Button>
                            </Link>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={6} style={{ textAlign: "center" }}>
                            <Link to="/renters">
                                <Button appearance="primary" size="lg">
                                    Manage Renters
                                </Button>
                            </Link>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Panel>
            </FlexboxGrid.Item>
        </FlexboxGrid>
    );
}