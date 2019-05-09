const initialState = {
    cities: ['Dublin', 'Madrid', 'Amsterdam'],
    cityWeatherDetail: null,
    isLoadingCityDetail: true,
    errorMessage: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CITY_DETAIL':
            return {
                ...state,
                isLoadingCityDetail: true,
            };
        case 'CITY_DETAIL_SUCCESS':
            return {
                ...state,
                cityWeatherDetail: action.payload,
                isLoadingCityDetail: false,
                errorMessage: '',
            };
        case 'CITY_DETAIL_ERROR':
            return {
                ...state,
                errorMessage: action.payload.message
            };
        default:
            return state;
    }
};

export default reducer;
