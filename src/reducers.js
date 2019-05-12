import {merge} from 'lodash';

const cities = merge(
    cityConstruct('dublin'),
    cityConstruct('madrid'),
    cityConstruct('amsterdam')
);

const initialState = {
    cities,
    errorMessage: '',
};

const reducer = (state = initialState, action) => {

    let cityId = action.value || '';

    switch (action.type) {
        case 'CITY_SUMMARY':
            return merge(state, {
                cities: {
                    [cityId]: {
                        isLoading: true
                    }
                }
            });
        case 'CITY_SUMMARY_SUCCESS':
            return merge(state, {
                cities: {
                    [cityId]: {
                        isLoading: false,
                        cityWeatherSummary: action.payload
                    }
                },
                errorMessage: '',
            });
        case 'CITY_SUMMARY_ERROR':
            return {
                ...state,
                errorMessage: action.payload.message
            };
        case 'CITY_DETAIL':
            return merge(state, {
                cities: {
                    [cityId]: {
                        detail: {
                            isLoading: true
                        }
                    }
                }
            });
        case 'CITY_DETAIL_SUCCESS':
            return merge(state, {
                cities: {
                    [cityId]: {
                        detail: {
                            isLoading: false,
                            forecast: action.payload,
                        }
                    }
                },

            });
        case 'CITY_DETAIL_ERROR':
            return {
                ...state,
                errorMessage: action.payload.message
            };
        default:
            return state;
    }
};

function cityConstruct(name) {
    return {
        [name]: {
            id: name,
            isLoading: true,
            cityWeatherSummary: null,
            detail: {
                isLoading: true,
                forecast: null,
            }
        }
    }
}

export default reducer;
