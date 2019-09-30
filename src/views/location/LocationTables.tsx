import MaterialTable from "material-table";
import React, { PureComponent } from "react";
import { convertDataForTable, TableRow } from "../../helpers/dataFilterUtils";
import { LocationProps } from "../LocationSection";

export class LocationTables extends PureComponent<LocationProps> {
    render() {
        const { locationStats } = this.props;
        const data: TableRow[] = convertDataForTable(locationStats);
        const columns = [
            { title: "Name", field: "name" },
            { title: "Count", field: "count" },
            { title: "Category", field: "category", defaultGroupOrder: 0 }
        ];
        return (
            <div>
                <MaterialTable
                    title="Page Path Locations"
                    columns={columns}
                    data={data as any}
                    options={{
                        grouping: true
                    }}
                />
            </div>
        );
    }
}
