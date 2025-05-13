// /src/app/api/posts/route.js
export async function GET(request) {
  const apiUrl = process.env.NEST_API_URL;
  try {

    // Fetch posts from the backend API
    const { searchParams } = new URL(request.url);
    let username = searchParams.get('username');
    let getAll = searchParams.get('getAll');
    username = encodeURIComponent(username);
    if (getAll) {
      username = 0;
    }
    console.log('API URL:', apiUrl);
    const response = await fetch(`${apiUrl}/posts?username=${username}`);

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
    // get from storage
    const { user, category, title, content } = body;

    // Validate (optional)
    if (!category || !title || !content) {
      return Response.json({ error: 'All fields are required' }, { status: 400 });
    }
    // 🔁 Call your backend (NestJS) API
    const apiResponse = await fetch(`${process.env.NEST_API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, category, title, content }),
    });

    const result = await apiResponse.json();

    return Response.json(result);
  } catch (error) {
    console.error('Error creating post:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const url = new URL(req.url);
    const body = await req.json();
    const { id, category, title, content, user } = body;

    if (!category || !title || !content) {
      return Response.json({ error: "All fields are required" }, { status: 400 });
    }

    const apiResponse = await fetch(`${process.env.NEST_API_URL}/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category, title, content, user }),
    });

    const result = await apiResponse.json();
    return Response.json(result);
  } catch (error) {
    console.error("Error updating post:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}