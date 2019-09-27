import Button from "@material-ui/core/Button";
import Axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import HomeScreen from "./views/HomePage";
import { DetailViewMode } from "./views/LocationSection";

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

    changeViewStyle = (DetailViewMode: DetailViewMode) => {};

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
                    <p style={{ display: "inline", marginRight: 6 }}>
                        {" "}
                        Number of Users:
                    </p>
                    <h1 style={{ display: "inline", marginRight: 36 }}>
                        {userCount}
                    </h1>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => this.refreshContent()}
                    >
                        Refresh
                    </Button>
                </div>
                {showNoChangeText && (
                    <p style={{ textAlign: "center" }}>
                        Note: No New data has been retrieved.
                    </p>
                )}
                <HomeScreen
                    locationStats={locationStats}
                    detailViewMode={DetailViewMode.CHART_VIEW}
                />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
