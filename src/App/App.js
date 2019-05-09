import React, {Component} from 'react';
import './App.css';

import CityWeatherList from '../CityWeather/CityWeatherList'

class App extends Component {
    render() {
        const {store, state} = this.props;
        const {cities} = state;

        return (
            <div className="App">
                <CityWeatherList
                    cities={cities}
                    selectCity={(cityName) => store.dispatch({type: 'CITY_DETAIL', value: cityName})}/>
            </div>
        );
    }
}

export default App;
