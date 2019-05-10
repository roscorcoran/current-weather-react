import React, {Component} from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 200,
    },
});

class CityWeatherDetail extends Component {

    state = {
        cityWeatherDetail: null,
        isLoading: true
    };

    componentDidMount() {
        const {city} = this.props;
        const WEATHER_API_ENDPOINT = 'http://api.openweathermap.org/data/2.5/';
        const WEATHER_GENERIC_ERROR_MESSAGE = 'There was an error loading weather please check your internet connection and try again';
        const weatherUrl = `${WEATHER_API_ENDPOINT}forecast?q=${city}&APPID=bd8326266ffeb1b662cf75fadf5dee2a`;
        const state = this.state;

        fetch(weatherUrl)
            .then((res) => {
                if (res.status !== 200) {
                    throw new Error(WEATHER_GENERIC_ERROR_MESSAGE);
                } else {
                    res.json().then((res) => {
                        this.setState(() => {
                            return {...state, cityWeatherDetail: res, isLoading: false}
                        });
                    });
                }
            })
            .catch((error) => {
                throw new Error(WEATHER_GENERIC_ERROR_MESSAGE);
            });
    }

    render() {
        const {cityWeatherDetail, isLoading} = this.state;
        const {classes} = this.props;

        if (isLoading || !cityWeatherDetail) {
            return <CircularProgress className={classes.progress}/>;
        } else {
            const rows = cityWeatherDetail.list;

            return (
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date/Time</TableCell>
                                <TableCell align="right">Temp (°C)</TableCell>
                                <TableCell align="right">Pressure (hPa)</TableCell>
                                <TableCell align="right">Humidty (%)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.dt}>
                                    <TableCell component="th" scope="row">
                                        {row.dt_txt}
                                    </TableCell>
                                    <TableCell align="right">{tempKtoC(row.main.temp)}</TableCell>
                                    <TableCell align="right">{row.main.pressure}</TableCell>
                                    <TableCell align="right">{row.main.humidity}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            );
        }
    }
}

function tempKtoC(k) {
    return (k - 273.15).toFixed(0);
}

export default withStyles(styles)(CityWeatherDetail);