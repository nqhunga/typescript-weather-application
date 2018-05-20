interface IProps {
  id: number
  name: string,
  lat: number,
  lon: number
}

export async function PlaceSuggest(cityName: string): Promise<Array<IProps>> {
  const response = await fetch(`/check/${cityName}`);
  const results = await response.json();
  return results as Array<IProps>;
}