import Grid from "@material-ui/core/Grid";
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
        console.log(locationStats);
        const data: CategoryData = convertDataForBarChart(locationStats);
        return (
            <Grid
                container
                justify="flex-start"
                alignItems="center"
                spacing={3}
                style={{ maxWidth: "100%", padding: 16 }}
            >
                {Object.keys(data).map((section: string, index: number) => {
                    console.log(section);
                    let locationNameTicks = [];
                    let locationCounts = [];
                    data[section].forEach(element => {
                        locationNameTicks.push(element.location);
                        locationCounts.push(element.count);
                    });
                    const numLocations = data[section].length;
                    const maxCount = Math.max(...locationCounts);
                    if (numLocations > 0 && numLocations < 8) {
                        return Chart(
                            Size.small,
                            data,
                            section,
                            numLocations,
                            locationNameTicks,
                            locationCounts,
                            maxCount
                        );
                    } else if (numLocations > 8) {
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
            </Grid>
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
    let numUsers = 0;
    locationCounts.forEach(count => {
        numUsers += Number(count);
    });
    let left = 0;
    let xs_size = null;
    let right = 0;
    if (size === Size.small) {
        left = 160;
        xs_size = "3";
    } else {
        left = 250;
        right = -120;
        xs_size = "4";
    }
    const tickValues = [...Array(numLocations).keys()].map(i => i + 1);
    return (
        <Grid item xs={xs_size as any}>
            <VictoryChart
                theme={VictoryTheme.material}
                padding={{
                    top: 40,
                    bottom: 50,
                    left,
                    right
                }}
                style={{ parent: { paddingLeft: 120 } }}
                domainPadding={20}
                containerComponent={
                    <VictoryContainer
                        responsive={false}
                        width={500}
                        height={350}
                    />
                }
            >
                <VictoryAxis
                    tickValues={tickValues}
                    tickFormat={locationNameTicks}
                    tickLabelComponent={
                        <VictoryLabel style={chartStyles.text} />
                    }
                />
                <VictoryAxis
                    dependentAxis
                    tickValues={[...Array(maxCount).keys()]}
                    label={`${section} (${numUsers})`}
                    tickLabelComponent={
                        <VictoryLabel style={{ display: "none" }} />
                    }
                    axisLabelComponent={
                        <VictoryLabel style={{ fontSize: 16 }} dy={20} />
                    }
                    fixLabelOverlap
                />
                <VictoryBar
                    horizontal
                    data={data[section]}
                    x="index"
                    y="count"
                    labels={locationCounts}
                    labelComponent={<VictoryLabel style={chartStyles.text} />}
                    barWidth={12}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 },
                        onEnter: { duration: 500, before: () => ({ y: 0 }) }
                    }}
                />
            </VictoryChart>
        </Grid>
    );
};

const chartStyles: CSSProperties = {
    gridContainer: {
        display: "flex",
        flexGrow: 1,
        flexWrap: "wrap",
        justifyContent: "flex-start",
        height: "800",
        margin: "12px"
    },
    text: {
        fontSize: "16",
        fontFamily: "Roboto"
    }
};
