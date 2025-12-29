async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json(); // Parses the body as JSON
    console.log(data);
  } catch (error) {
    console.error('Fetch error:', error.message);
  }
}

// Example GET request
fetchData('h');
