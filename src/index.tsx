import Button from "@material-ui/core/Button";
import Axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import HomeScreen from "./views/HomePage";
import { Typography } from "@material-ui/core";
import { firebaseService } from "../server/FirebaseClientUtils";
import { FirebaseEntry } from "../server/UserRecord";

interface Props {}

interface State {
    locationStats: any;
    userCount: any;
    showNoChangeText: boolean;
    showChangeText: boolean;
}

const timeout = 2000;

class App extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            locationStats: null,
            userCount: null,
            showNoChangeText: false,
            showChangeText: false
        };
    }
    componentDidMount = async () => {
        await this.refreshContent();
        this.checkForChanges();
    };

    setStateForDataChange = () => {
        this.setState({ showChangeText: true });
        setTimeout(() => this.setState({ showChangeText: false }), timeout);
    };

    setStateForDataUnchanged = () => {
        this.setState({ showNoChangeText: true });
        setTimeout(() => this.setState({ showChangeText: false }), timeout);
    };

    refreshContent = async () => {
        console.log("Refreshed!");
        const res = await Axios.get("http://localhost:3000/fb-auth");
        const { credential, databaseURL } = res.data;
        const ref = firebaseService.getRef(credential, databaseURL);
        const records = await firebaseService.getAllRecords(ref);
        const locationStats = await firebaseService.getActivePageLocationStats(
            records
        );
        const userCount = records.length;

        if (
            locationStats !== this.state.locationStats ||
            userCount !== this.state.userCount
        ) {
            this.setState({ locationStats, userCount, showChangeText: true });
            this.setStateForDataChange();
        } else {
            this.setStateForDataUnchanged();
        }
    };

    checkForChanges = () => {
        const ref = firebaseService.getRef();
        ref.on("value", async snapshot => {
            console.log("listener activating.");
            if (snapshot.val() != null) {
                const firebaseData = snapshot.val();
                console.log(firebaseData);
                const records = Object.keys(firebaseData).map(item => {
                    console.log(item);
                    return firebaseData[item] as FirebaseEntry;
                });
                const locationStats = await firebaseService.getActivePageLocationStats(
                    records
                );
                const userCount = records.length;
                if (
                    locationStats !== this.state.locationStats ||
                    userCount !== this.state.userCount
                ) {
                    console.log("setting state upon a new event");
                    this.setState({
                        locationStats,
                        userCount,
                        showChangeText: true
                    });
                    this.setStateForDataChange();
                } else {
                    this.setStateForDataUnchanged();
                }
            }
        });
    };

    render() {
        const {
            locationStats,
            userCount,
            showNoChangeText,
            showChangeText
        } = this.state;
        return (
            <div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        alignContent: "center",
                        justifyContent: "center",
                        textAlign: "center"
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        style={{ display: "inline", marginRight: 6 }}
                    >
                        Number of Users:
                    </Typography>
                    <Typography
                        variant="h3"
                        style={{ display: "inline", marginRight: 24 }}
                    >
                        {userCount}
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => this.refreshContent()}
                    >
                        Refresh
                    </Button>
                </div>
                {showNoChangeText && (
                    <Typography
                        variant="body1"
                        style={{ textAlign: "center", color: "#303F9F" }}
                    >
                        No New data has been retrieved.
                    </Typography>
                )}
                {showChangeText && (
                    <Typography
                        variant="body1"
                        style={{ textAlign: "center", color: "#303F9F" }}
                    >
                        New data has been retrieved.
                    </Typography>
                )}
                <HomeScreen locationStats={locationStats} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
