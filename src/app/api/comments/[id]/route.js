// /src/app/api/posts/route.js
export async function GET(request, { params }) {
  const { id } = params;
  try {
    const apiUrl = process.env.NEST_API_URL;
    const response = await fetch(`${apiUrl}/posts/${id}/comments`);
    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    return Response.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}
export async function POST(request, { params }) {
  const { id } = params;
  try {
    const body = await request.json();
    const { user, text } = body;

    if (!user || !text) {
      return Response.json({ error: 'User and text are required' }, { status: 400 });
    }

    const apiRes = await fetch(
      `${process.env.NEST_API_URL}/posts/${id}/comments`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          created_by: user,
          text,
          post_id: Number(id),
        }),
      }
    );

    const data = await apiRes.json();
    return Response.json(data, { status: apiRes.status });
  } catch (err) {
    console.error('Error creating comment:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}