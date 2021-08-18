export type CityType = {
    request: RequestType,
    location: LocationType,
    current: Current
}

type RequestType = {
    type: string,
    query: string,
    language: string,
    unit: string
}

type LocationType = {
    name: string,
    country: string,
    region: string,
    lat: string,
    lon: string,
    timezone_id: string
    localtime: string
    localtime_epoch: number,
    utc_offset: string
}

type Current = {
    observation_time: string,
    weather_code: number,
    weather_icons: string[],
    weather_descriptions: string[],
    wind_speed: number,
    wind_degree: number,
    wind_dir: string,
    pressure: number,
    precip: number,
    humidity: number,
    cloudcover: number,
    feelslike: number,
    uv_index: number,
    visibility: number,
    is_day: "no|yes"
}