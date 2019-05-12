import React, {Component} from 'react';
import CityWeatherItem from './CityWeatherItem';
import Grid from "@material-ui/core/Grid";
import {map} from 'loadsh';

class CityWeatherList extends Component {
    render() {
        const {cities, store} = this.props;

        const listItems = map(cities, (city, cityId) =>
            <Grid item xs={12} md={6} lg={4} key={cityId}>
                <CityWeatherItem
                    store={store}
                    city={city}
                    key={cityId}/>
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