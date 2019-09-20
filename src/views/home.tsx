import React, { PureComponent } from "react";

type Props = UserProps & LocationProps;

interface State {}

export default class HomeScreen extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount = () => {};

    refreshContent = () => {
        alert("Refreshing firebase content.");
    };

    render() {
        const { userCount, locationStats } = this.props;
        return (
            <div>
                {userCount && <UserDetails userCount={userCount} />}
                {locationStats && (
                    <LocationDetails locationStats={locationStats} />
                )}
            </div>
        );
    }
}

interface LocationProps {
    locationStats: Object;
}

class LocationDetails extends PureComponent<LocationProps> {
    constructor(props) {
        super(props);
    }

    render() {
        const { locationStats } = this.props;
        console.log(locationStats);
        return (
            <div>
                <table>
                    <thead>Location</thead>
                    <tbody>
                        {Object.keys(locationStats).map((location, index) => {
                            console.log(location);
                            return (
                                <tr key={index}>
                                    <td>{location}</td>
                                    <td>{locationStats[location]}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

interface UserProps {
    userCount: number;
}

class UserDetails extends PureComponent<UserProps> {
    constructor(props) {
        super(props);
    }

    render() {
        const { userCount } = this.props;
        return <div>Number of Users: {userCount}</div>;
    }
}
