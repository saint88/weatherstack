import { When, Then } from "cypress-cucumber-preprocessor/steps";
import Weather from '../../api/weather'
import { CityType } from '../../fixtures/cities'

const weather = Weather()

When('Получаем текущий прогноз погоды в {string}', ((name: string) => {
    weather.getWeatherInCity(name);
}));

Then("Прогноз погоды в городе {string} получен", (name: string) => {
    cy.fixture('cities/cities').then((cities: {[key: string]: CityType}) => {
        weather.checkWeatherDataInCity(cities[name]);
    })
})
