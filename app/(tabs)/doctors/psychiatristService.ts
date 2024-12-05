export const fetchPsychiatrists = async (
    latitude: number,
    longitude: number,
    apiKey: string
  ): Promise<any[]> => {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=doctor&keyword=psychiatrist&key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.status !== 'OK') {
        console.error('Error fetching psychiatrists:', data.status);
        return [];
      }
      
      return data.results;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  };
  