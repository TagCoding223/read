import ArticleCard from '@/components/ArticleCard'
import { ArticleCardProps } from '@/types/ArticleCardProps';
import React from 'react'

const Articles = () => {
    const articles: ArticleCardProps[] = [
        {
            id: "1",
            articleImage: "https://github.com/shadcn.png",
            title: "Understanding TypeScript Generics",
            description: "A deep dive into generics in TypeScript and how to use them effectively.",
            author: {
                name: "Alice Johnson",
                avatar: "https://github.com/shadcn.png"
            },
            readTime: "5 min read",
            publishedAt: "2024-05-01"
        },
        {
            id: "2",
            articleImage: "https://github.com/shadcn.png",
            title: "Next.js Routing Explained",
            description: "Learn about file-based routing in Next.js and best practices.",
            author: {
                name: "Bob Smith",
                avatar: "https://github.com/shadcn.png"
            },
            readTime: "7 min read",
            publishedAt: "2024-04-28"
        },
        {
            id: "3",
            articleImage: "https://github.com/shadcn.png",
            title: "Styling in React: CSS-in-JS vs. CSS Modules",
            description: "Comparing popular styling approaches in React applications. Discover the pros and cons of CSS-in-JS libraries and CSS Modules, and learn how to choose the right solution for your project’s needs.",
            author: {
                name: "Carol Lee",
                avatar: "https://github.com/shadcn.png"
            },
            readTime: "6 min read",
            publishedAt: "2024-04-20"
        },
        {
            id: "4",
            articleImage: "https://github.com/shadcn.png",
            title: "Deploying Next.js Apps to Vercel",
            description: "A step-by-step guide to deploying your Next.js site.",
            author: {
                name: "David Kim",
                avatar: "https://github.com/shadcn.png"
            },
            readTime: "4 min read",
            publishedAt: "2024-04-15"
        },
        {
            id: "5",
            articleImage: "https://github.com/shadcn.png",
            title: "React Hooks: useEffect in Depth",
            description: "Mastering the useEffect hook for side effects in React.",
            author: {
                name: "Eva Green",
                avatar: "https://github.com/shadcn.png"
            },
            readTime: "8 min read",
            publishedAt: "2024-04-10"
        },
        {
            id: "6",
            articleImage: "https://github.com/shadcn.png",
            title: "TypeScript vs. JavaScript: Key Differences",
            description: "An overview of the main differences between TypeScript and JavaScript.",
            author: {
                name: "Frank Miller",
                avatar: "https://github.com/shadcn.png"
            },
            readTime: "5 min read",
            publishedAt: "2024-04-05"
        },
        {
            id: "7",
            articleImage: "https://github.com/shadcn.png",
            title: "Optimizing Images in Next.js",
            description: "How to use the Next.js Image component for better performance. Learn about automatic image optimization, responsive images, and best practices for delivering fast-loading, high-quality visuals.",
            author: {
                name: "Grace Chen",
                avatar: "https://github.com/shadcn.png"
            },
            readTime: "3 min read",
            publishedAt: "2024-03-30"
        },
        {
            id: "8",
            articleImage: "https://github.com/shadcn.png",
            title: "Building Accessible Web Apps",
            description: "Tips and tools for improving accessibility in your web projects.",
            author: {
                name: "Henry Adams",
                avatar: "https://github.com/shadcn.png"
            },
            readTime: "9 min read",
            publishedAt: "2024-03-25"
        },
        {
            id: "9",
            articleImage: "https://github.com/shadcn.png",
            title: "Server-side Rendering with Next.js",
            description: "Understanding SSR and how to implement it in Next.js.",
            author: {
                name: "Ivy Brown",
                avatar: "https://github.com/shadcn.png"
            },
            readTime: "6 min read",
            publishedAt: "2024-03-20"
        }
    ];
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {articles.map((article, index) => (
                
                <ArticleCard key={index} article={article} />
            ))}
            {/* <ArticleCard key={1} article={articles[1]} /> */}
        </div>
    )
}

export default Articles