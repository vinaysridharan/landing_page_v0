import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  if (!url || typeof url !== 'string') {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
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

    return NextResponse.json(metadata, { status: 200 });
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return NextResponse.json({ error: 'Failed to fetch metadata' }, { status: 500 });
  }
}