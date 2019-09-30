import React, { PureComponent } from "react";
import { LocationProps } from "../LocationSection";
import { CSSProperties } from "../styles";
import MaterialTable, { Query, Column } from "material-table";
import { convertDataForTable } from "../../helpers/dataFilterUtils";

export class LocationTables extends PureComponent<LocationProps> {
    render() {
        const { locationStats } = this.props;
        const data = convertDataForTable(locationStats);
        const columns = [
            { title: "Name", field: "name" },
            { title: "Count", field: "count" },
            { title: "Category", field: "category" }
        ];
        return (
            <div>
                <MaterialTable
                    title="Page Path Locations"
                    columns={columns}
                    data={data as any}
                />
            </div>
        );
    }
}
