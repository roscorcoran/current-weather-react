import React, {Component} from 'react';
import './App.css';

import CityWeatherList from '../CityWeather/CityWeatherList'
import CityWeatherDetail from "../CityWeather/CityWeatherDetail";
import MenuBar from "../Nav/MenuBar";

import Grid from "@material-ui/core/Grid";

class App extends Component {

    render() {
        const {store, state} = this.props;
        const {cities, errorMessage} = state;

        return (
            <Grid container spacing={8}>

                <Grid item xs={12}>
                    <MenuBar onMenuClick={() => {}}>
                    </MenuBar>
                </Grid>

                <Grid item xs={12}>
                    <div className="ErrorMessage">{errorMessage}</div>
                </Grid>

                <Grid item xs={12}>
                    <CityWeatherList cities={cities}
                                     selectCity={(cityName) => store.dispatch({type: 'CITY_DETAIL', value: cityName})}/>
                </Grid>

            </Grid>
        );
    }
}

export default App;
