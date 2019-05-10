import React, {Component} from 'react';
import CityWeatherItem from './CityWeatherItem';
import Grid from "@material-ui/core/Grid";

class CityWeatherList extends Component {
    render() {
        const {cities, selectCity} = this.props;

        const listItems = cities.map((cityName) =>
            <Grid item xs={12} md={6} lg={4} key={cityName}>
                <CityWeatherItem
                    city={cityName}
                    key={cityName}
                    onClick={() => {/* return selectCity(cityName)*/}}/>
            </Grid>
        );

        return (
            <Grid container spacing={8}>
                {listItems}
            </Grid>
        );
    }
}

export default CityWeatherList;