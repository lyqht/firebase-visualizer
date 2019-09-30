import React, { PureComponent } from "react";
import { CSSProperties } from "./styles";
import { DetailViewMode } from "./LocationSection";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

export interface ViewModeProps {
    detailViewMode: DetailViewMode;
}

interface Props extends ViewModeProps {
    onPress: (viewMode: DetailViewMode) => void;
}

export class ViewModeButtons extends PureComponent<Props> {
    render() {
        const viewModes: DetailViewMode[] = Object.values(DetailViewMode);
        const { detailViewMode, onPress } = this.props;
        return (
            <div style={styles.buttonGroupContainer}>
                {viewModes.map((mode, index) => {
                    return (
                        <Button
                            key={index}
                            variant={
                                detailViewMode === mode
                                    ? "contained"
                                    : "outlined"
                            }
                            color="primary"
                            size="small"
                            onClick={() => onPress(mode as DetailViewMode)}
                        >
                            <p>{mode}</p>
                        </Button>
                    );
                })}
            </div>
        );
    }
}

const styles: CSSProperties = {
    buttonGroupContainer: {
        flexDirection: "row",
        marginBottom: "16px"
    }
};
