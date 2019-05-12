import {all, call, put, takeEvery} from 'redux-saga/effects';

//http://api.openweathermap.org/data/2.5/weather?q=Dublin&APPID=bd8326266ffeb1b662cf75fadf5dee2a
//http://api.openweathermap.org/data/2.5/forecast?q=Dublin&APPID=bd8326266ffeb1b662cf75fadf5dee2a
const WEATHER_API_ENDPOINT = 'http://api.openweathermap.org/data/2.5/';

const WEATHER_GENERIC_ERROR_MESSAGE = 'There was an error loading weather please check your internet connection and try again';

function fetchDetailedWeatherForCity(cityId = '') {
    const weatherUrl = `${WEATHER_API_ENDPOINT}forecast?q=${cityId}&APPID=bd8326266ffeb1b662cf75fadf5dee2a`;

    return fetch(weatherUrl)
        .then((res) => {
            if (res.status !== 200) {
                throw new Error(WEATHER_GENERIC_ERROR_MESSAGE);
            } else {
                return res.json();
            }
        })
        .catch(() => {
            throw new Error(WEATHER_GENERIC_ERROR_MESSAGE);
        });
}

export function* fetchDetailedWeatherWorker(action) {
    try {
        let cityId = action.value;
        let forecast = yield call(fetchDetailedWeatherForCity, cityId);

        yield put({type: 'CITY_DETAIL_SUCCESS', value: cityId, payload: forecast});
    } catch (error) {
        yield put({type: 'CITY_DETAIL_ERROR', payload: error});
    }
}

export function* watchDetailedWeatherAsync() {
    yield takeEvery('CITY_DETAIL', fetchDetailedWeatherWorker);
}

//Summary

function fetchSummaryWeatherForCity(cityId = '') {
    const weatherUrl = `${WEATHER_API_ENDPOINT}weather?q=${cityId}&APPID=bd8326266ffeb1b662cf75fadf5dee2a`;

    return fetch(weatherUrl)
        .then((res) => {
            if (res.status !== 200) {
                throw new Error(WEATHER_GENERIC_ERROR_MESSAGE);
            } else {
                return res.json();
            }
        })
        .catch(() => {
            throw new Error(WEATHER_GENERIC_ERROR_MESSAGE);
        });
}

export function* fetchSummaryWeatherWorker(action) {
    try {
        let cityId = action.value;
        let weather = yield call(fetchSummaryWeatherForCity, cityId);

        yield put({type: 'CITY_SUMMARY_SUCCESS', value: cityId, payload: weather});
    } catch (error) {
        yield put({type: 'CITY_SUMMARY_ERROR', payload: error});
    }
}

export function* watchSummaryWeatherAsync() {
    yield takeEvery('CITY_SUMMARY', fetchSummaryWeatherWorker);
}

export default function* rootSaga() {
    yield all([
        watchDetailedWeatherAsync(),
        watchSummaryWeatherAsync()
    ])
};