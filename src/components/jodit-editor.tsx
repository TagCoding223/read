'use client'
import React, { useRef, useState } from 'react'
import JoditEditor from 'jodit-react'
const Editor = () => {
  const editor = useRef(null)
  const [content,setContent] = useState('')
  // const config = {
  //   readonly: false,
  //   placeholder: "Write Complete Blog Content here....",
  // }
  return (
    <div className="w-5/6 mx-auto">
      <JoditEditor onBlur={newContent => setContent(newContent)} ref={editor} value={content} onChange={newContent=>setContent(newContent)}/>
    </div>
  )
}

export default Editor

// ReferenceError: self is not defined
    // at [project]/node_modules/jodit-react/build/jodit-react.js [app-ssr] (ecmascript) (file:///D:/blog-site-nextjs/read/.next/server/chunks/ssr/node_modules_jodit-react_build_jodit-react_2bccd7a9.js:9:3)
    // at instantiateModule (D:\blog-site-nextjs\read\.next\server\chunks\ssr\[turbopack]_runtime.js:594:23)
    // at getOrInstantiateModuleFromParent (D:\blog-site-nextjs\read\.next\server\chunks\ssr\[turbopack]_runtime.js:653:12)
    // at esmImport (D:\blog-site-nextjs\read\.next\server\chunks\ssr\[turbopack]_runtime.js:132:20)
    // at [project]/src/app/(app)/jodit-editor/page.tsx [app-ssr] (ecmascript) (file:///D:/blog-site-nextjs/read/.next/server/chunks/ssr/%5Broot-of-the-server%5D__a16da7e5._.js:21:183)
    // at instantiateModule (D:\blog-site-nextjs\read\.next\server\chunks\ssr\[turbopack]_runtime.js:594:23)
    // at getOrInstantiateModuleFromParent (D:\blog-site-nextjs\read\.next\server\chunks\ssr\[turbopack]_runtime.js:653:12)
    // at commonJsRequire (D:\blog-site-nextjs\read\.next\server\chunks\ssr\[turbopack]_runtime.js:147:20)
    // at require (D:\blog-site-nextjs\read\node_modules\next\dist\compiled\next-server\app-page-turbo.runtime.dev.js:422:16153)
    // at requireModule (D:\blog-site-nextjs\read\node_modules\next\dist\compiled\next-server\app-page-turbo.runtime.dev.js:186:1036)
    // at initializeModuleChunk (D:\blog-site-nextjs\read\node_modules\next\dist\compiled\next-server\app-page-turbo.runtime.dev.js:186:26224)
    // at resolveModuleChunk (D:\blog-site-nextjs\read\node_modules\next\dist\compiled\next-server\app-page-turbo.runtime.dev.js:186:25359)
    // at D:\blog-site-nextjs\read\node_modules\next\dist\compiled\next-server\app-page-turbo.runtime.dev.js:186:54976
    // at AppDevOverlay (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_8f19e6fb._.js:14476:55)
    // at HotReload (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_8f19e6fb._.js:15536:46)
    // at Router (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_8f19e6fb._.js:15981:53)
    // at AppRouter (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_8f19e6fb._.js:16024:53)
    // at ServerRoot (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_8f19e6fb._.js:19036:54)