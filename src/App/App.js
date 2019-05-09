import React, {Component} from 'react';
import './App.css';

import CityWeatherList from '../CityWeather/CityWeatherList'

class App extends Component {
    render() {
        const {state} = this.props;
        const {cities} = state;

        return (
            <div className="App">
                <CityWeatherList cities={cities}/>
            </div>
        );
    }
}

export default App;
