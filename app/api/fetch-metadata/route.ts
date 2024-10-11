import { NextApiRequest, NextApiResponse } from 'next';

export async function GET (req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    // Fetch metadata logic here
    const metadata = {
      title: 'Example Title',
      description: 'Example Description',
      image: 'https://example.com/image.jpg',
      siteName: 'Example Site',
      url: url,
    };

    res.status(200).json(metadata);
  } catch (error) {
    console.error('Error fetching metadata:', error);
    res.status(500).json({ error: 'Failed to fetch metadata' });
  }
}