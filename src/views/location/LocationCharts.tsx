import React, { PureComponent } from "react";
import { LocationProps } from "../LocationSection";
import {
    VictoryChart,
    VictoryTheme,
    VictoryAxis,
    VictoryLabel,
    VictoryBar
} from "victory";
import { CSSProperties } from "../styles";

export class LocationCharts extends PureComponent<LocationProps> {
    render() {
        const { locationStats } = this.props;
        const data = {
            Families: [],
            ActiveAging: [],
            Preschool: [],
            Others: []
        };
        let familiesIndex = 1;
        let aaIndex = 1;
        let othersIndex = 1;
        Object.keys(locationStats).map(location => {
            const locationCount = locationStats[location];
            if (location.toLowerCase().includes("families")) {
                data.Families.push({
                    location,
                    count: locationCount,
                    index: familiesIndex
                });
                familiesIndex += 1;
            } else if (
                location.toLowerCase().includes("activeageing") ||
                location.toLowerCase().includes("activeaging")
            ) {
                data.ActiveAging.push({
                    location,
                    count: locationCount,
                    index: aaIndex
                });
            } else if (location.toLowerCase().includes("ecda")) {
                data.Preschool.push({
                    location,
                    count: locationCount,
                    index: data.Preschool.length + 1
                });
            } else {
                data.Others.push({
                    location,
                    count: locationCount,
                    index: othersIndex
                });
            }
        });

        return (
            <div style={chartStyles.mainContainer}>
                {Object.keys(data).map((section, index) => {
                    let locationNameTicks = [];
                    let locationCounts = [];
                    data[section].forEach(element => {
                        locationNameTicks.push(element.location);
                        locationCounts.push(element.count);
                    });
                    const numLocations = data[section].length;
                    const maxCount = Math.max(...locationCounts);
                    return (
                        <div key={index} style={chartStyles.gridContainer}>
                            <VictoryChart
                                theme={VictoryTheme.material}
                                padding={{
                                    top: 40,
                                    bottom: 80,
                                    left: 160,
                                    right: 40
                                }}
                                style={{
                                    parent: chartStyles.gridItem
                                }}
                                domainPadding={20}
                            >
                                <VictoryAxis
                                    tickValues={[
                                        ...Array(numLocations).keys()
                                    ].slice(1)}
                                    tickFormat={locationNameTicks}
                                    tickLabelComponent={
                                        <VictoryLabel style={{ fontSize: 8 }} />
                                    }
                                />
                                <VictoryAxis
                                    dependentAxis
                                    tickValues={[...Array(maxCount).keys()]}
                                    label={section}
                                    axisLabelComponent={
                                        <VictoryLabel dy={20} />
                                    }
                                    fixLabelOverlap
                                />
                                <VictoryBar
                                    horizontal
                                    data={data[section]}
                                    x="index"
                                    y="count"
                                    labels={locationCounts}
                                />
                            </VictoryChart>
                        </div>
                    );
                })}
            </div>
        );
    }
}

const chartStyles: CSSProperties = {
    mainContainer: {
        display: "grid",
        justifyContent: "center",
        gridTemplateColumns: "50% 50%",
        gridTemplateRows: "auto",
        margin: "auto",
        gridGap: "3%"
    },
    gridItem: {
        maxWidth: "100%",
        maxHeight: "100%"
    },
    gridContainer: {
        maxWidth: "100%",
        maxHeight: "100%"
    }
};
