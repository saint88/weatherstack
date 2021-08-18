import { CityType } from './../fixtures/cities';

interface IWeather {
    getWeatherInCity: (city?: string, token?: string) => void
    checkWeatherDataInCity: (expected_city: {[key: string]: any}) => void
    checkErrorInResponse: (expected_error: {[key: string]: any}, alias?: string) => void
    getWeatherErrorFunction: () => void
}