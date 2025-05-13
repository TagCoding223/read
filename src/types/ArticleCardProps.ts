type ArticleCardProps = {
    id: string;
    articleImage: string;
    title: string;
    description: string;
    author: {
        name: string;
        avatar: string;
    };
    readTime: string;
    publishedAt: string;
};

export type { ArticleCardProps };