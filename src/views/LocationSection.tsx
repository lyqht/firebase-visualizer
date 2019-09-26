import React, { PureComponent } from "react";
import { LocationCharts } from "./location/LocationCharts";
import { LocationTables } from "./location/LocationTables";

export interface LocationProps {
    locationStats: Object;
}

export interface ViewModeProps {
    detailViewMode: DetailViewMode;
}

type Props = LocationProps & ViewModeProps;

export enum DetailViewMode {
    TABLE_VIEW = "TABLE",
    CHART_VIEW = "CHART"
}

export class LocationSection extends PureComponent<Props> {
    constructor(props) {
        super(props);
    }

    render() {
        const { locationStats, detailViewMode } = this.props;
        return (
            <div>
                {detailViewMode === DetailViewMode.TABLE_VIEW && (
                    <LocationTables locationStats={locationStats} />
                )}
                {detailViewMode === DetailViewMode.CHART_VIEW && (
                    <LocationCharts locationStats={locationStats} />
                )}
            </div>
        );
    }
}
