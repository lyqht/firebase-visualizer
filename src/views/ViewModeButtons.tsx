import React, { PureComponent } from "react";
import { CSSProperties } from "./styles";
import { DetailViewMode } from "./LocationSection";

export class DisplayModeButtons extends PureComponent {
    render() {
        const viewModes: DetailViewMode[] = Object.values(DetailViewMode);
        return (
            <div style={styles.buttonGroupContainer}>
                <h5>View</h5>
                {viewModes.map((mode, index) => {
                    return (
                        <button
                            key={index}
                            style={styles.button}
                            onKeyPress={() =>
                                console.log("Changing to new view style")
                            }
                        >
                            <p>{mode}</p>
                        </button>
                    );
                })}
            </div>
        );
    }
}

const styles: CSSProperties = {
    button: {
        textAlign: "center",
        fontSize: "14",
        backgroundColor: "#A4FF96",
        padding: "16px",
        borderRadius: "6px"
    },
    buttonGroupContainer: {
        margin: "16px",
        padding: "8px",
        flexDirection: "row"
    }
};
