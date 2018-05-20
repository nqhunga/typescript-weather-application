interface IProps {
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
    forecast: Array<{
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

export async function ForecastData(cityName: string): Promise<IProps> {
 try {
  const response = await fetch(`/forecast/${cityName}`);
  const results = await response.json();
  return results as IProps;
 } catch(err) {
   console.log(err);
 }
}