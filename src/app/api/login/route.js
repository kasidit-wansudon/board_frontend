// /src/app/api/posts/route.js
export async function GET(request) {
  const apiUrl = process.env.NEST_API_URL;
  try {

    // Fetch posts from the backend API
    console.log('API URL:', apiUrl);
    const response = await fetch(apiUrl + '/posts');
    const data = await response.json();

    return Response.json(data);
  } catch (error) {
    console.error('Failed to fetch posts:', error, apiUrl);
    return Response.json({ error: 'Failed to fetch posts', apiUrl, error }, { status: 500 });
  }
}
export async function POST(req) {
  try {
    const body = await req.json();
    const { username } = body;

    if (!username) {
      return Response.json({ error: 'All fields are required' }, { status: 400 });
    }

    const apiResponse = await fetch(`${process.env.NEST_API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    const result = await apiResponse.json();
    return Response.json(result);
  } catch (error) {
    console.error('Error creating post:', error);
    return Response.json({ error: 'Internal server error '+error }, { status: 500 });
  }
}