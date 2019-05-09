import React, {Component} from 'react';

class CityWeatherList extends Component {
    render() {
        const {cities} = this.props;

        const listItems = cities.map((d) =>
            <li key={d}
                 className='CityListItem'>
                {d}
            </li>
        );

        return (
            <ul>
                {listItems}
            </ul>
        );
    }
}

export default CityWeatherList;
