import React, { PureComponent } from "react";
import {
    VictoryAxis,
    VictoryBar,
    VictoryChart,
    VictoryLabel,
    VictoryTheme
} from "victory";
import {
    convertDataForBarChart,
    CategoryData
} from "../../helpers/dataFilterUtils";
import { LocationProps } from "../LocationSection";
import { CSSProperties } from "../styles";

export class LocationCharts extends PureComponent<LocationProps> {
    render() {
        const { locationStats } = this.props;
        const data: CategoryData = convertDataForBarChart(locationStats);
        return (
            <div style={chartStyles.gridContainer}>
                {Object.keys(data).map((section: string, index: number) => {
                    let locationNameTicks = [];
                    let locationCounts = [];
                    data[section].forEach(element => {
                        locationNameTicks.push(element.location);
                        locationCounts.push(element.count);
                    });
                    const numLocations = data[section].length;
                    const maxCount = Math.max(...locationCounts);
                    if (numLocations < 8) {
                        return Chart(
                            Size.small,
                            data,
                            section,
                            numLocations,
                            locationNameTicks,
                            locationCounts,
                            maxCount
                        );
                    } else {
                        return Chart(
                            Size.big,
                            data,
                            section,
                            numLocations,
                            locationNameTicks,
                            locationCounts,
                            maxCount
                        );
                    }
                })}
            </div>
        );
    }
}

enum Size {
    small = "small",
    big = "big"
}

const Chart = (
    size: Size,
    data: CategoryData,
    section: string,
    numLocations: number,
    locationNameTicks: string[],
    locationCounts: string[],
    maxCount: number
) => {
    let gridItemContainerStyle = {};
    let tickStyle = {};
    let paddingStyle = {};
    if (size === Size.small) {
        gridItemContainerStyle = chartStyles.gridSmallItem;
        tickStyle = chartStyles.bigText;
        paddingStyle = {
            top: 40,
            bottom: 50,
            left: 120,
            right: 40
        };
    } else {
        gridItemContainerStyle = chartStyles.gridBigItem;
        tickStyle = chartStyles.smallText;
        paddingStyle = {
            top: 40,
            bottom: 50,
            left: 120,
            right: 40
        };
    }
    return (
        <div style={gridItemContainerStyle}>
            <VictoryChart
                theme={VictoryTheme.material}
                padding={paddingStyle}
                style={{
                    parent: gridItemContainerStyle
                }}
                domainPadding={20}
            >
                <VictoryAxis
                    tickValues={[...Array(numLocations).keys()].slice(1)}
                    tickFormat={locationNameTicks}
                    tickLabelComponent={<VictoryLabel style={tickStyle} />}
                />
                <VictoryAxis
                    dependentAxis
                    tickValues={[...Array(maxCount).keys()]}
                    label={section}
                    tickLabelComponent={
                        <VictoryLabel style={{ display: "none" }} />
                    }
                    axisLabelComponent={<VictoryLabel dy={20} />}
                    fixLabelOverlap
                />
                <VictoryBar
                    horizontal
                    data={data[section]}
                    x="index"
                    y="count"
                    labels={locationCounts}
                    labelComponent={<VictoryLabel style={tickStyle} />}
                />
            </VictoryChart>
        </div>
    );
};

const chartStyles: CSSProperties = {
    gridContainer: {
        display: "grid",
        justifyContent: "center",
        gridTemplateColumns: "1fr 1fr 1fr",
        gridTemplateRows: "300px 300px",
        margin: "auto",
        height: "calc(100vh - 10px)"
    },
    gridSmallItem: {
        maxWidth: "100%",
        maxHeight: "100%"
    },
    smallText: {
        fontSize: "8"
    },
    bigText: {
        fontSize: "12"
    },
    bigPadding: {},
    gridBigItem: {
        gridColumn: "span 3",
        maxWidth: "100%"
    },
    gridItemContainer: {
        maxWidth: "100%",
        maxHeight: "100%"
    }
};
