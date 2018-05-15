export async function CurrentPosition(lat: string, lng: string): Promise<any> {
  const response = await fetch(`/current/${lat}/${lng}`);
    const results = await response.json();
    return results;
}