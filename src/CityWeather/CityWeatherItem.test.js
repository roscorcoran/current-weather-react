import React from 'react';
import ReactDOM from 'react-dom';
import CityWeatherItem from "./CityWeatherItem";

it('renders the CityWeatherItem component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CityWeatherItem city='Dublin'/>, div);
    ReactDOM.unmountComponentAtNode(div);
});