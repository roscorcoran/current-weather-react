import {all, call, put, takeEvery} from 'redux-saga/effects';


//http://api.openweathermap.org/data/2.5/weather?q=Dublin&APPID=bd8326266ffeb1b662cf75fadf5dee2a
//http://api.openweathermap.org/data/2.5/forecast?q=Dublin&APPID=bd8326266ffeb1b662cf75fadf5dee2a
const WEATHER_API_ENDPOINT = 'http://api.openweathermap.org/data/2.5/';

const WEATHER_GENERIC_ERROR_MESSAGE = 'There was an error loading weather please check your internet connection and try again';

function fetchDetailedWeatherForCity(city = '') {
    const weatherUrl = `${WEATHER_API_ENDPOINT}forecast?q=${city}&APPID=bd8326266ffeb1b662cf75fadf5dee2a`;

    return fetch(weatherUrl)
        .then((res) => {
            if (res.status !== 200) {
                throw new Error(WEATHER_GENERIC_ERROR_MESSAGE);
            } else {
                return res.json();
            }
        })
        .catch((error) => {
            throw new Error(WEATHER_GENERIC_ERROR_MESSAGE);
        });
}

export function* fetchDetailedWeatherWorker(action) {
    try {
        let city = action.value.name;
        let weather = yield call(fetchDetailedWeatherForCity, city);

        yield put({type: 'CITY_DETAIL_SUCCESS', payload: weather});
    } catch (error) {
        yield put({type: 'CITY_DETAIL_ERROR', payload: error});
    }
}

export function* watchDetailedWeatherAsync() {
    yield takeEvery('CITY_DETAIL', fetchDetailedWeatherWorker);
}

export default function* rootSaga() {
    yield all([
        watchDetailedWeatherAsync()
    ])
};