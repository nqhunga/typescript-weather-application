import { IWeather } from '../Types/Types';

export async function CurrentPosition(lat: string, lng: string): Promise<IWeather> {
  const response = await fetch(`/current/${lat}/${lng}`);
  const results = await response.json();
  return results as IWeather;
}