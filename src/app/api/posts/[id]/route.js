// src/app/api/posts/[id]/route.js
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = params;
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
    const response = await fetch(`${apiUrl}/posts/${id}`);

    const data = await response.json();

    return Response.json(data);
  } catch (error) {
    console.error('Failed to fetch posts:', error, apiUrl);
    return Response.json({ error: 'Failed to fetch posts', apiUrl, error }, { status: 500 });
  }
}
// DELETE /api/posts/:id
export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    // เรียกไปยัง NestJS backend
    const res = await fetch(`${process.env.NEST_API_URL}/posts/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        { error: errorText || 'Failed to delete post' },
        { status: res.status }
      );
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error in DELETE /api/posts/[id]:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}