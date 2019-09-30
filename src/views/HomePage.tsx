import React, { PureComponent } from "react";
import {
    DetailViewMode,
    LocationProps,
    LocationSection
} from "./LocationSection";
import { ViewModeButtons } from "./ViewModeButtons";

type Props = LocationProps;

interface State {
    viewMode: DetailViewMode;
}

export default class HomeScreen extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { viewMode: DetailViewMode.CHART_VIEW };
    }

    changeViewStyle = (viewMode: DetailViewMode) => {
        this.setState({ viewMode });
    };

    render() {
        const { locationStats } = this.props;
        return (
            <div>
                <div
                    style={{
                        // borderRadius: 16,
                        // borderColor: "#303F9F",
                        // borderWidth: 3,
                        // borderStyle: "solid",
                        marginTop: 32
                    }}
                >
                    <div
                        style={{
                            placeContent: "center",
                            display: "flex",
                            marginTop: 6
                        }}
                    >
                        <ViewModeButtons
                            detailViewMode={this.state.viewMode}
                            onPress={this.changeViewStyle}
                        />
                    </div>
                    {locationStats && (
                        <LocationSection
                            locationStats={locationStats}
                            detailViewMode={this.state.viewMode}
                        />
                    )}
                </div>
            </div>
        );
    }
}
