export async function CurrentPosition(lat: string, lng: string): Promise<Object> {
  const response = await fetch(`/current/${lat}/${lng}`);
    const results = await response.json();
    return results as Object;
}