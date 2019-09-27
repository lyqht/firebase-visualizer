import React, { Component } from "react";
import ReactDOM from "react-dom";
import HomeScreen from "./views/HomePage";
import Axios from "axios";
import { DetailViewMode } from "./views/LocationSection";

interface Props {}

interface State {
    locationStats: any;
    userCount: any;
}

class App extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            locationStats: null,
            userCount: null
        };
    }
    componentDidMount = () => {
        Axios.get("http://localhost:3000/data")
            .then(res => {
                console.log(res.data);
                const { locationStats, userCount } = res.data;
                console.log(locationStats, userCount);
                this.setState({
                    locationStats,
                    userCount
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
    render() {
        const { locationStats, userCount } = this.state;
        return (
            <div>
                <h1>hello</h1>
                <HomeScreen
                    locationStats={locationStats}
                    userCount={userCount}
                    detailViewMode={DetailViewMode.CHART_VIEW}
                />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
