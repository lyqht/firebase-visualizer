import React, { PureComponent } from "react";
import {
    VictoryAxis,
    VictoryBar,
    VictoryChart,
    VictoryContainer,
    VictoryLabel,
    VictoryTheme
} from "victory";
import {
    CategoryData,
    convertDataForBarChart
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
    let victoryContainerWidth = 400;
    let victoryContainerHeight = 350;
    if (size === Size.small) {
        gridItemContainerStyle = smallChartStyles.gridItem;
        tickStyle = smallChartStyles.text;
    } else {
        gridItemContainerStyle = bigChartStyles.gridItem;
        tickStyle = bigChartStyles.text;
        victoryContainerWidth = 600;
    }
    let numUsers = 0;
    locationCounts.forEach(count => {
        numUsers += Number(count);
    });
    const tickValues = [...Array(numLocations).keys()].map(i => i + 1);
    return (
        <div style={gridItemContainerStyle}>
            <VictoryChart
                theme={VictoryTheme.material}
                padding={{
                    top: 40,
                    bottom: 50,
                    left: 180,
                    right: 0
                }}
                style={{
                    parent: gridItemContainerStyle
                }}
                domainPadding={20}
                containerComponent={
                    <VictoryContainer
                        responsive={false}
                        width={victoryContainerWidth}
                        height={victoryContainerHeight}
                    />
                }
            >
                <VictoryAxis
                    tickValues={tickValues}
                    tickFormat={locationNameTicks}
                    tickLabelComponent={<VictoryLabel style={tickStyle} />}
                />
                <VictoryAxis
                    dependentAxis
                    tickValues={[...Array(maxCount).keys()]}
                    label={`${section} (${numUsers})`}
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
        display: "flex",
        flex: "1",
        flexFlow: "row wrap",
        justifyContent: "flex-start",
        height: "800",
        margin: "12px"
        // display: "grid",
        // justifyContent: "center",
        // gridTemplateColumns: "1fr 1fr 1fr",
        // gridTemplateRows: "300px 300px",
        // margin: "12px",
        // height: "calc(100vh - 10px)"
    }
};

const bigChartStyles: CSSProperties = {
    gridItem: {},
    text: {
        fontSize: "12"
    }
};

const smallChartStyles: CSSProperties = {
    gridItem: {},
    text: {
        fontSize: "12"
    }
};
