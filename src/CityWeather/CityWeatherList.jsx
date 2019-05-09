import React, {Component} from 'react';
import CityWeatherItem from './CityWeatherItem';
import List from "@material-ui/core/List";

class CityWeatherList extends Component {
    render() {
        const {cities, selectCity} = this.props;

        const listItems = cities.map((cityName) =>
            <CityWeatherItem
                city={cityName}
                key={cityName}
                onClick={() => selectCity(cityName)}/>
        );

        return (
            <List>
                {listItems}
            </List>
        );
    }
}

export default CityWeatherList;