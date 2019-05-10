import React, {Component} from 'react';
import ListItem from "@material-ui/core/ListItem";
import ImageIcon from '@material-ui/icons/Image';
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";

class CityWeatherItem extends Component {

    state = {
        isLoading: true,
        cityWeatherSummary: null
    };

    componentDidMount() {
        const WEATHER_GENERIC_ERROR_MESSAGE = 'There was an error loading weather please check your internet connection and try again';
        const WEATHER_API_ENDPOINT = 'http://api.openweathermap.org/data/2.5/';
        const {city} = this.props;
        const weatherUrl = `${WEATHER_API_ENDPOINT}weather?q=${city}&APPID=bd8326266ffeb1b662cf75fadf5dee2a`;
        const state = this.state;

        fetch(weatherUrl)
            .then((res) => {
                if (res.status !== 200) {
                    throw new Error(WEATHER_GENERIC_ERROR_MESSAGE);
                } else {
                    res.json().then((res) => {
                        this.setState(() => {
                            return {...state, cityWeatherSummary: res, isLoading: false}
                        });
                    });
                }
            })
            .catch((error) => {
                throw new Error(WEATHER_GENERIC_ERROR_MESSAGE);
            });

    }

    render() {
        const {city, onClick} = this.props;
        const {cityWeatherSummary, isLoading} = this.state;

        if (isLoading) {
            return (
                <li>Loading...</li>
            );
        } else {
            const weatherDescription = `${cityWeatherSummary.weather[0].main} (${cityWeatherSummary.weather[0].description})`;

            return (
                <ListItem onClick={onClick}>
                    <Avatar>
                        <ImageIcon/>
                    </Avatar>
                    <ListItemText primary={city} secondary={weatherDescription}/>
                </ListItem>
            );
        }
    }
}

export default CityWeatherItem;
