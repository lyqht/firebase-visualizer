import React, { PureComponent } from "react";
import { LocationProps } from "../LocationSection";
import { CSSProperties } from "../styles";

export class LocationTables extends PureComponent<LocationProps> {
    render() {
        const { locationStats } = this.props;
        return (
            <table style={tableStyles.table}>
                <thead style={tableStyles.thead}>Location</thead>
                <tbody>
                    {Object.keys(locationStats).map((location, index) => {
                        return (
                            <tr key={index}>
                                <td style={tableStyles.tdLabel}>{location}</td>
                                <td style={tableStyles.tdValue}>
                                    {locationStats[location]}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
}

const tableStyles: CSSProperties = {
    thead: {
        fontSize: "32"
    },
    table: {
        backgroundColor: "#FFCA87",
        padding: "16",
        borderRadius: "8"
    },
    tdLabel: {
        fontWeight: "bold"
    },
    tdValue: {
        paddingLeft: "32"
    }
};
