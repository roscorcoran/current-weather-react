import React, {Component} from 'react';
import CityWeatherItem from './CityWeatherItem';

class CityWeatherList extends Component {
    render() {
        const {cities, selectCity} = this.props;

        const listItems = cities.map((cityName) =>
            <CityWeatherItem
                city={cityName}
                key={cityName}
                onClick={() => selectCity('Dublin')}/>
        );

        return (
            <ul>
                {listItems}
            </ul>
        );
    }
}

export default CityWeatherList;