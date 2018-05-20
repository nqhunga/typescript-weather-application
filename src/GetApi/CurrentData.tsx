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
    forecastday: Array<{
      day: {
        maxtemp_c: string,
        mintemp_c: string,
        avgtemp_c: string,
        avghumidity: string,
        maxwind_kph: string
      }
    }>
  }
}

export async function CurrentPosition(lat: string, lng: string): Promise<IProps> {
  const response = await fetch(`/current/${lat}/${lng}`);
  const results = await response.json();
  return results as IProps;
}