import React, { PureComponent } from "react";
import {
    LocationProps,
    LocationSection,
    ViewModeProps
} from "./LocationSection";
import { CSSProperties } from "./styles";

type Props = LocationProps & ViewModeProps;

interface State {}

export default class HomeScreen extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const { locationStats, detailViewMode } = this.props;

        return (
            <div>
                {locationStats && (
                    <LocationSection
                        locationStats={locationStats}
                        detailViewMode={detailViewMode}
                    />
                )}
            </div>
        );
    }
}

const styles: CSSProperties = {};
