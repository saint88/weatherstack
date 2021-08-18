/// <reference types="cypress" />

import { IWeather } from "."
import { CityType } from "../fixtures/cities"

const Weather = (): IWeather => {
    return {
        getWeatherInCity: (city, token) => {
            token = !token && token != '' ? Cypress.env('API_KEY'): token
            
            cy.request({
                url: '/current',
                qs: {
                    access_key: token,
                    query: city
                }
            }).as('currentWeather')
        },
        getWeatherErrorFunction: () => {
            cy.request({
                url: '/test_page',
                qs: {
                    access_key: Cypress.env('API_KEY'),
                }
            }).as('currentWeather')
        },
        checkWeatherDataInCity: (expected_city) => {
            const keys = ['request', 'location', 'current']

            keys.forEach(($key: string) => {
                cy.get('@currentWeather').its('body').then($info => {
                    const infoGroup = $info[$key]
                    const expectedInfoGroup = expected_city[$key]
                    const ks = Object.keys(infoGroup)
                    ks.forEach($k => {

                        if(typeof infoGroup[$k] === 'object') {
                            new Array(...infoGroup[$k]).forEach((_, $index) => {
                                if(infoGroup[$k] !== expectedInfoGroup[$k][$index]) {
                                    cy.log(`Error in city ${expected_city && expected_city.location && expected_city.location.name} - actual: ${$key} -> ${$k}=${infoGroup[$k]}, expected: ${$key} -> ${$k}=${expectedInfoGroup[$k]}`)
                                }
                            })
                        } else {
                            if(infoGroup[$k] !== expectedInfoGroup[$k]) {
                                cy.log(`Error in city ${expected_city && expected_city.location && expected_city.location.name} - actual: ${$key} -> ${$k}=${infoGroup[$k]}, expected: ${$key} -> ${$k}=${expectedInfoGroup[$k]}`)
                            }
                        }
                    })
                })
            })
        },
        checkErrorInResponse: (error) => {
            cy.get(`@currentWeather`).its('body').then($body => {
                expect($body.success).to.be.eq(error.success)
                expect($body.error.code).to.be.eq(error.error.code)
                expect($body.error.info).to.be.eq(error.error.info)
                expect($body.error.type).to.be.eq(error.error.type)
            })
        }
    }
}

export default Weather