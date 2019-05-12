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
        expanded: false,
    };

    handleExpandClick = () => {
        this.setState(state => ({expanded: !state.expanded}));
    };

    componentDidMount() {
        const {city, store} = this.props;
        store.dispatch({type: 'CITY_SUMMARY', value: city.id});
    }

    render() {
        const {store, classes, city} = this.props;
        const {detail, cityWeatherSummary, isLoading} = city;
        const {expanded} = this.state;


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
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Weather..." src={weatherIconLink} className={classes.avatar}>A</Avatar>
                        }
                        action={
                            <IconButton>
                                <MoreVertIcon/>
                            </IconButton>
                        }
                        title={capitalise(city.id)}
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
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="Show more"
                        >
                            <ExpandMoreIcon/>
                        </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <CityWeatherDetail detail={detail} cityId={city.id} store={store}/>
                        </CardContent>
                    </Collapse>
                </Card>
            );
        }
    }
}

function capitalise(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export default withStyles(styles)(CityWeatherItem);
