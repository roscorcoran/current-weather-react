import React, {Component} from 'react';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import classNames from 'classnames';
import CircularProgress from "@material-ui/core/CircularProgress";
import CityWeatherDetail from "./CityWeatherDetail";


const styles = theme => ({
    card: {
        // maxWidth: 400,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: 'lightgrey',
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

class CityWeatherItem extends Component {

    state = {
        isLoading: true,
        cityWeatherSummary: null,
        expanded: false,
    };

    handleExpandClick = () => {
        this.setState(state => ({expanded: !state.expanded}));
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
        const {classes, city, onClick} = this.props;
        const {cityWeatherSummary, isLoading} = this.state;

        if (isLoading) {
            return <CircularProgress className={classes.progress}/>;
        } else {
            const weathers = cityWeatherSummary.weather;
            const weatherDescriptionListItems = weathers.map((weather) => {
                const weatherDescription = `${weather.main} (${weather.description})`;
                return <Typography component="p" key={weather.main}>{weatherDescription}</Typography>;
            });
            const weatherIconLink = `http://openweathermap.org/img/w/${weathers[0].icon}.png`;

            return (


                <Card onClick={onClick} className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Weather..." src={weatherIconLink} className={classes.avatar}>
                                {city[0]}
                            </Avatar>
                        }
                        action={
                            <IconButton>
                                <MoreVertIcon/>
                            </IconButton>
                        }
                        title={city}
                        subheader="September 14, 2016"
                    />
                    <CardContent>
                        {weatherDescriptionListItems}
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton aria-label="Add to favorites">
                            <FavoriteIcon/>
                        </IconButton>
                        <IconButton aria-label="Share">
                            <ShareIcon/>
                        </IconButton>
                        <IconButton
                            className={classNames(classes.expand, {
                                [classes.expandOpen]: this.state.expanded,
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="Show more"
                        >
                            <ExpandMoreIcon/>
                        </IconButton>
                    </CardActions>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <CardContent>


                            <CityWeatherDetail city={city}/>


                            {/*<Typography paragraph>Method:</Typography>*/}
                            {/*<Typography>*/}
                            {/*    Set aside off of the heat to let rest for 10 minutes, and then serve.*/}
                            {/*</Typography>*/}
                        </CardContent>
                    </Collapse>
                </Card>
            );
        }
    }
}

export default withStyles(styles)(CityWeatherItem);
