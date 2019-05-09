import React, {Component} from 'react';
import './App.css';

import CityWeatherList from '../CityWeather/CityWeatherList'
import CityWeatherDetail from "../CityWeather/CityWeatherDetail";
import MenuBar from "../Nav/MenuBar";

import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

class App extends Component {

    state = {
        leftDrawerOpen: true,
    };

    toggleDrawer = (open) => () => {
        this.setState({
            leftDrawerOpen: open,
        });
    };

    render() {
        const {store, state} = this.props;
        const {cities, errorMessage} = state;

        return (
            <Grid container spacing={8}>

                <Drawer open={this.state.leftDrawerOpen}
                        onClose={this.toggleDrawer(false)}>
                    <div tabIndex={0}
                         role="button"
                         onClick={this.toggleDrawer(false)}
                         onKeyDown={this.toggleDrawer(false)}
                         className='MenuDrawer'>
                        <Typography variant="h6" color="inherit">
                            Cities
                        </Typography>
                        <Divider variant="middle"/>
                        <CityWeatherList cities={cities}
                                         selectCity={(cityName) => store.dispatch({type: 'CITY_DETAIL', value: cityName})}/>
                    </div>
                </Drawer>

                <Grid item xs={12}>
                    <MenuBar onMenuClick={this.toggleDrawer(true)}>
                    </MenuBar>
                </Grid>

                <Grid  item xs={12} className="App">
                    <CityWeatherDetail cityWeatherDetail={state.cityWeatherDetail}
                                       isLoading={state.isLoadingCityDetail}/>
                </Grid>

                <Grid item xs={12}>
                    <div className="ErrorMessage">{errorMessage}</div>
                </Grid>

            </Grid>
        );
    }
}

export default App;
