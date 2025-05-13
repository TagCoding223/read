import React from 'react'

const ArticlePost = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
    const { slug } = await params
  return (
    <div>articlePost {slug}</div>
  )
}

export default ArticlePost