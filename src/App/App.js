import React, {Component} from 'react';
import './App.css';

import CityWeatherList from '../CityWeather/CityWeatherList'
import CityWeatherDetail from "../CityWeather/CityWeatherDetail";

class App extends Component {
    render() {
        const {store, state} = this.props;
        const {cities, errorMessage} = state;

        return (
            <div className="App">
                <CityWeatherList cities={cities}
                    selectCity={(cityName) => store.dispatch({type: 'CITY_DETAIL', value: cityName})}/>

                <CityWeatherDetail cityWeatherDetail={state.cityWeatherDetail}
                    isLoading={state.isLoadingCityDetail}
                />

                <div className="ErrorMessage">{errorMessage}</div>
            </div>
        );
    }
}

export default App;
