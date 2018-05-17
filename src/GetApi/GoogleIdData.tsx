export async function GoogleId(lat: string, lng: string): Promise<Object> {
  const response = await fetch(`/googleid/${lat}/${lng}`);
  const results = await response.json();
  return results as Object;
}