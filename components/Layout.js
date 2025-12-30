// import Head from 'next/head';
// import Link from 'next/link';

// export default function Layout({ children }) {
//   return (
//     <>
//       <Head>
//         <title>Pastebin-Lite</title>
//         <meta name="description" content="A simple Pastebin-like application" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <nav className="bg-white shadow-sm mb-8">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex justify-between items-center">
//             <Link href="/" className="text-xl font-bold text-blue-600">
//               Pastebin-Lite
//             </Link>
//             <div className="space-x-4">
//               <Link href="/" className="text-gray-600 hover:text-blue-600">
//                 Home
//               </Link>
//               <a 
//                 href="/api/healthz" 
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-gray-600 hover:text-blue-600"
//               >
//                 Health Check
//               </a>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-7xl mx-auto px-4 py-8">
//         {children}
//       </main>

//       <footer className="mt-16 border-t border-gray-200 py-8">
//         <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
//           <p>Pastebin-Lite • Built with Next.js • Persistence: Redis</p>
//         </div>
//       </footer>
//     </>
//   );
// }

import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Pastebin-Lite - Simple Text Sharing</title>
        <meta name="description" content="Create and share text snippets with optional expiration and view limits" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">Pastebin-Lite</span>
            </Link>

            <div className="flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Home
              </Link>
              <a 
                href="/api/healthz" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                API Status
              </a>
              <a 
                href="https://github.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="min-h-screen pb-20">
        {children}
      </main>

      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-xl font-bold">Pastebin-Lite</span>
              </div>
              <p className="text-gray-400">
                Simple and secure text sharing with automatic expiration.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white transition">Create Paste</Link></li>
                <li><a href="/api/healthz" className="text-gray-400 hover:text-white transition">API Health</a></li>
                <li><a href="/api/pastes" className="text-gray-400 hover:text-white transition">API Docs</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Technology</h3>
              <div className="flex flex-wrap gap-2">
                <span className="badge badge-info">Next.js</span>
                <span className="badge badge-info">Redis</span>
                <span className="badge badge-info">Tailwind CSS</span>
                <span className="badge badge-info">Vercel</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Pastebin-Lite. Built with Next.js • Persistence: Redis</p>
          </div>
        </div>
      </footer>
    </>
  );
}