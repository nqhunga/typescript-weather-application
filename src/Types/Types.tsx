export interface IWeather {
  location: {
    name: string,
    region: string,
    country: string,
    localtime: string,
  },
  current: {
    condition: {
      icon: string,
      text: string,
    }
  },
  forecast: {
    forecastday: Array<{
      day: {
        maxtemp_c: string,
        mintemp_c: string,
        avgtemp_c: string,
        avghumidity: string,
        maxwind_kph: string,
        hour: Array<{
          time: string,
          condition: {
            icon: string,
            text: string
          },
          temp_c: string
        }>
      }
    }>
  }
}

export interface IHour {
  time: string,
  condition: {
    icon: string,
    text: string
  },
  temp_c: string
}

export interface ISuggest {
  id: number
  name: string,
  lat: number,
  lon: number
}

export interface ICoordinate {
  lat: string,
  lng: string,
}

