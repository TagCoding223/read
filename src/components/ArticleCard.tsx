import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArticleCardProps } from "@/types/ArticleCardProps";

import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";


const glassStyle = {
    // background: "rgba(255, 255, 255, 0.15)",
    background: "hsl(222.2,84%,4.9%)]",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(8px)",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.18)",
};

const ArticleCard: React.FC<{ article: ArticleCardProps }> = async ({ article }) => {

    const {id, articleImage, title, description, author, readTime, publishedAt } = await article;
    return (
        <Card 
            style={{
                ...glassStyle,
                maxWidth: 400,
                margin: 8,
                padding: 4,
                gap: 6,
                minHeight: 420, // Ensures all cards have the same height
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
            className="dark:bg-[hsl(222.2,84%,4.9%)]"
        >
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: 200,
                    overflow: "hidden",
                    borderRadius: 16,
                }}
            >
                <Image
                    src={articleImage}
                    alt={title}
                    width={500}
                    height={500}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 16,
                    }}
                    unoptimized
                />
            </div>

            <CardHeader
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 8,
                    paddingBottom: 0,
                    paddingTop: 12,
                    paddingLeft: 12,
                    paddingRight: 12,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 8,
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", minWidth: 0 }}>
                        <Avatar>
                            <AvatarImage src={author.avatar} alt={author.name} />
                            <AvatarFallback>{author.name[0]}</AvatarFallback>
                        </Avatar>
                        <span
                            style={{
                                marginLeft: 8,
                                fontWeight: 500,
                                fontSize: 16,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: 120,
                            }}
                        >
                            {author.name}
                        </span>
                    </div>
                    <div
                        style={{
                            textAlign: "right",
                            fontSize: 12,
                            color: "#6b7280",
                            minWidth: 80,
                        }}
                    >
                        {readTime} • {new Date(publishedAt).toLocaleDateString()}
                    </div>
                </div>
            </CardHeader>
            <CardContent
                style={{
                    padding: 12,
                    paddingTop: 8,
                    width: "100%",
                    flex: "1 1 auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                }}
            >
                <CardTitle
                    style={{
                        fontWeight: 700,
                        fontSize: 20,
                        marginBottom: 4,
                        wordBreak: "break-word",
                        lineHeight: 1.5,
                        minHeight: 60, // Reserve space for 2 lines of title
                        maxHeight: 60,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    {title}
                </CardTitle>
                <CardDescription
                    style={{
                        marginBottom: 8,
                        fontSize: 15,
                        // color: "rgba()",
                        wordBreak: "break-word",
                        minHeight: 48, // Reserve space for 3 lines of description
                        maxHeight: 60,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    {description}
                </CardDescription>
            </CardContent>
            <CardFooter  className="pb-4">
                <Button asChild>
                    <Link href={`/articlepost/${id}`} className="dark:text-amber-50">Read</Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ArticleCard;