import Link from "next/link";
import Image from "next/image";
import banner from '../../public/images/pexels-lynda-sanchez-825238-1777813.jpg'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center mt-0.5 px-4">
      <section className="w-full px-2 md:px-12 my-6 md:[mb-12]">
        <div className="mx-auto bg-gray-300 dark:bg-gray-900 rounded-xl shadow-lg p-4 md:p-12 flex flex-col md:flex-row items-center gap-8 ">
          <div className="flex-1 w-full">
            <h1 className="text-3xl md:text-7xl md:my-8 font-extrabold text-indigo-700 mb-6 text-left">
              Welcome to Read
            </h1>

            <p className="text-base md:text-lg text-gray-700 dark:text-gray-400 mb-10 text-left">
              Discover insightful articles, trending topics, and expert opinions. Dive into a world of knowledge curated just for you.
            </p>
            <div className="md:hidden flex-1 flex justify-center w-full mt-8 md:mt-0 mb-4">
              <Image
                src={banner}
                alt="Knowledge Banner"
                className="w-full max-w-xs md:max-w-sm h-auto object-cover rounded-lg shadow-md"
                priority
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/articles"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition text-center"
              >
                Browse Articles
              </Link>
              <Link
                href="/about"
                className="bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold py-3 px-6 rounded-lg transition text-center"
              >
                About Us
              </Link>
              <Link
                href="/write"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition text-center"
              >
                Start Writing
              </Link>
            </div>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">#Technology</span>
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">#Health</span>
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">#Travel</span>
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">#Business</span>
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">#Lifestyle</span>
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              <span>🔥 Trending: </span>
              <Link href="/articles/ai-future" className="underline hover:text-indigo-700">The Future of AI</Link>
              <span> · </span>
              <Link href="/articles/healthy-habits" className="underline hover:text-indigo-700">Healthy Habits for 2024</Link>
              <span> · </span>
              <Link href="/articles/remote-work" className="underline hover:text-indigo-700">Remote Work Tips</Link>
            </div>
          </div>
          <div className="hidden flex-1 md:flex justify-center w-full mt-8 md:mt-0">
            <Image
              src={banner}
              alt="Knowledge Banner"
              className="w-full max-w-xs md:max-w-sm h-auto object-cover rounded-lg shadow-md"
              priority
            />
          </div>
        </div>
      </section>
      <section className="w-full max-w-4xl mt-12">
        <h2 className="text-2xl font-bold mb-6 text-indigo-700">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Example article cards */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2 text-indigo-600">How to Start a Blog in 2024</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">A step-by-step guide for beginners to launch their own blog and grow an audience.</p>
            <Link href="/articles/start-blog-2024" className="text-indigo-700 hover:underline text-sm font-medium">Read More &rarr;</Link>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2 text-indigo-600">Top 10 Productivity Tools for Writers</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">Boost your writing workflow with these essential tools for bloggers and authors.</p>
            <Link href="/articles/productivity-tools" className="text-indigo-700 hover:underline text-sm font-medium">Read More &rarr;</Link>
          </div>
        </div>
        <div className="mt-6 text-right">
          <Link href="/articles" className="text-indigo-700 hover:underline font-semibold">View All Articles &rarr;</Link>
        </div>
      </section>
    </main>
  );
}
