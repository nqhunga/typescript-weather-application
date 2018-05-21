import { ISuggest } from '../Types/Types';

export async function PlaceSuggest(cityName: string): Promise<Array<ISuggest>> {
  const response = await fetch(`/check/${cityName}`);
  const results = await response.json();
  return results as Array<ISuggest>;
}