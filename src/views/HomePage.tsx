import axios from "axios";
import React, { PureComponent } from "react";
import {
    DetailViewMode,
    LocationSection,
    LocationProps,
    ViewModeProps
} from "./LocationSection";
import { CSSProperties } from "./styles";
import { UserCountSection, UserProps } from "./UserCountSection";

type Props = UserProps & LocationProps & ViewModeProps;

interface State {}

export default class HomeScreen extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            DetailViewMode: DetailViewMode.TABLE_VIEW
        };
    }

    componentDidMount = () => {};

    refreshContent = () => {
        alert("Refreshing firebase content.");
    };

    changeViewStyle = (DetailViewMode: DetailViewMode) => {
        // not implemented yet
        console.log("Changing to new view style");
        axios.post("/", { DetailViewMode });
    };

    render() {
        const { userCount, locationStats, detailViewMode } = this.props;

        return (
            <div>
                {userCount && <UserCountSection userCount={userCount} />}
                {locationStats && (
                    <LocationSection
                        locationStats={locationStats}
                        detailViewMode={DetailViewMode.CHART_VIEW}
                    />
                )}
            </div>
        );
    }
}

const styles: CSSProperties = {};
