const initialState = {
    cities: ['Dublin', 'Madrid', 'Amsterdam'],
    cityWeatherDetail: null,
    isLoadingCityDetail: true
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
            };
        default:
            return state;
    }
};

export default reducer;
