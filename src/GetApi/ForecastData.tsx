interface FetchDataValue {
  current: Object,
  forecast: {
    forecastday: Array<Object>
  },
  location: Object
}

function FormatData(data: any) {
  const forecast = data.forecast.forecastday;
  const current = data.current;
  const location = data.location;
  return {
    current,
    forecast,
    location
  }
}

export async function ForecastData(cityName: string): Promise<FetchDataValue> {
  const response = await fetch(`/forecast/${cityName}`);
  const results = await response.json();
  return FormatData(results);
}