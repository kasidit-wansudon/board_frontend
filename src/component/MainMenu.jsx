import Link from "next/link";

export default function MainMenu() {
  return (
    <div className="flex flex-col space-y-4">
      <Link href="/Homepage" className="font-medium hover:underline">
        🏠 Home
      </Link>
      <Link href="/OurBlog" className="hover:underline">
        📰 Our Blog
      </Link>
    </div>
  );
}
