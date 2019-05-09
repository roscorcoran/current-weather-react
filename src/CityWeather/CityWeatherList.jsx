import React, {Component} from 'react';
import CityWeatherItem from './CityWeatherItem';

class CityWeatherList extends Component {
    render() {
        const {cities} = this.props;

        const listItems = cities.map((d) =>
            <CityWeatherItem city={d} key={d}/>
        );

        return (
            <ul>
                {listItems}
            </ul>
        );
    }
}

export default CityWeatherList;
