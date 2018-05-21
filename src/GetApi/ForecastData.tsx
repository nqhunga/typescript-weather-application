import { IWeather } from '../Types/Types';

export async function ForecastData(cityName: string): Promise<IWeather> {
 try {
  const response = await fetch(`/forecast/${cityName}`);
  const results = await response.json();
  return results as IWeather;
 } catch(err) {
   console.log(err);
 }
}