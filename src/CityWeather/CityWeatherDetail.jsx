import React, {Component} from 'react';

class CityWeatherDetail extends Component {

    render() {
        const {cityWeatherDetail, isLoading} = this.props;
        if (!cityWeatherDetail) {
            return (
                <div>Please select a City</div>
            );
        } else if (isLoading) {
            return (
                <div>Loading...</div>
            );
        } else {
            return (
                <div>
                    {cityWeatherDetail.city.country}
                    {cityWeatherDetail.city.population}
                </div>
            );
        }
    }
}

export default CityWeatherDetail;
