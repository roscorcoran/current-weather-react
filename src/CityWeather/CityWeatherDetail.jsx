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

    componentDidMount() {
        let {cityId, store} = this.props;
        store.dispatch({type: 'CITY_DETAIL', value: cityId});
    }

    render() {
        const {detail: {forecast, isLoading}, classes} = this.props;

        if (isLoading || !forecast) {
            return <CircularProgress className={classes.progress}/>;
        } else {
            const rows = forecast.list;

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