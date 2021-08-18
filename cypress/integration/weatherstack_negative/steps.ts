import { ErrorType } from './../../fixtures/errors/index.d';
import { When, Then } from "cypress-cucumber-preprocessor/steps";
import Weather from '../../api/weather'

const weather = Weather()

When('Получаем текущий прогноз погоды в {string} с токеном {string}', (name: string, token: string) => {
    weather.getWeatherInCity(name, token)
});

Then('Получаем код ошибки {string}', (code: string) => {
    cy.fixture('errors/errors').then((errors: {[k: string]: ErrorType}) => {
        const expectedError = errors[code]
        weather.checkErrorInResponse(expectedError)
    })
});

When('Получаем текущий прогноз погоды в городе', () => {
    weather.getWeatherInCity()
});

When('Отправляем запрос на несуществующую функцию', () => {
    weather.getWeatherErrorFunction()
});