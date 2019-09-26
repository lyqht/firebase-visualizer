import React, { PureComponent } from "react";
import { CSSProperties } from "./styles";

export interface UserProps {
    userCount: number;
}

export class UserCountSection extends PureComponent<UserProps> {
    constructor(props) {
        super(props);
    }

    render() {
        const { userCount } = this.props;
        return (
            <div style={styles.container}>
                <span>Number of Users:</span>
                <span style={styles.value}>{userCount}</span>
            </div>
        );
    }
}

const styles: CSSProperties = {
    container: {
        marginBottom: "32",
        textAlign: "center",
        flexDirection: "row"
    },
    label: {
        fontSize: "24",
        padding: "8"
    },
    value: {
        fontSize: "32",
        padding: "8"
    }
};
