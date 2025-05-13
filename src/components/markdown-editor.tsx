'use client'
import MDEditor from '@uiw/react-md-editor'
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import React, { useState } from 'react'

const MarkdownEditor = () => {
    const [content,setContent] = useState('')
  return (
    <div className="w-5/6 mx-auto">
        <MDEditor value={content} onChange={(newContent)=>{setContent(newContent || '')}} />
        {/* <MDEditor.Markdown source={content} style={{ whiteSpace: 'pre-wrap' }} /> */}
    </div>

  )
}

export default MarkdownEditor