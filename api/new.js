export default async function handler(req, res) {
  const { query = 'india', page = 1 } = req.query;

  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  const endpoint = `https://newsapi.org/v2/everything?q=${query}&pageSize=5&page=${page}&apiKey=${apiKey}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}
