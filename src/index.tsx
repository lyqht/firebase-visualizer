import Button from "@material-ui/core/Button";
import Axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import HomeScreen from "./views/HomePage";
import { Typography } from "@material-ui/core";

interface Props {}

interface State {
    locationStats: any;
    userCount: any;
    showNoChangeText: boolean;
}

class App extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            locationStats: null,
            userCount: null,
            showNoChangeText: false
        };
    }
    componentDidMount = () => {
        this.refreshContent();
    };

    refreshContent = () => {
        console.log("Refreshed!");
        Axios.get("http://localhost:3000/data")
            .then(res => {
                const { locationStats, userCount } = res.data;

                if (
                    JSON.stringify(this.state.locationStats) !==
                    JSON.stringify(locationStats)
                ) {
                    this.setState({
                        locationStats,
                        userCount
                    });
                } else {
                    console.log("data has not changed.");
                    this.setState({
                        showNoChangeText: true
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        const { locationStats, userCount, showNoChangeText } = this.state;
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
                <HomeScreen locationStats={locationStats} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
