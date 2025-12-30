// // import { useState, useEffect } from 'react';
// // import { useRouter } from 'next/router';
// // import Layout from '../../components/Layout';
// // import ViewPaste from '../../components/ViewPaste';
// // import ErrorMessage from '../../components/ErrorMessage';

// // export default function PastePage() {
// //   const router = useRouter();
// //   const { id } = router.query;
// //   const [paste, setPaste] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     if (!id) return;

// //     async function fetchPaste() {
// //       try {
// //         setLoading(true);
// //         const response = await fetch(`/api/pastes/${id}`);
        
// //         if (response.ok) {
// //           const data = await response.json();
// //           setPaste(data);
// //           setError(null);
// //         } else {
// //           setError('Paste not found or unavailable');
// //           setPaste(null);
// //         }
// //       } catch (error) {
// //         console.error('Error fetching paste:', error);
// //         setError('Failed to load paste');
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     fetchPaste();
// //   }, [id]);

// //   if (loading) {
// //     return (
// //       <Layout>
// //         <div className="flex justify-center items-center h-64">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
// //         </div>
// //       </Layout>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <Layout>
// //         <ErrorMessage message={error} />
// //       </Layout>
// //     );
// //   }

// //   return (
// //     <Layout>
// //       <ViewPaste paste={paste} id={id} />
// //     </Layout>
// //   );
// // }
// import { useState } from 'react';
// import Layout from '../components/Layout';
// import CreatePaste from '../components/CreatePaste';

// export default function Home() {
//   const [createdPaste, setCreatedPaste] = useState(null);

//   const handlePasteCreated = (data) => {
//     setCreatedPaste(data);
//   };

//   const handleCreateNew = () => {
//     setCreatedPaste(null);
//   };

//   return (
//     <Layout>
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
//           Pastebin-Lite
//         </h1>
        
//         <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
//           <CreatePaste onPasteCreated={handlePasteCreated} />
//         </div>

//         {createdPaste && (
//           <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
//             <h2 className="text-xl font-semibold text-green-800 mb-4">
//               ✓ Paste Created Successfully!
//             </h2>
//             <div className="space-y-3">
//               <div>
//                 <label className="text-sm font-medium text-green-700">Shareable URL:</label>
//                 <div className="mt-1 p-3 bg-white border border-green-300 rounded break-all">
//                   <a 
//                     href={createdPaste.url} 
//                     className="text-blue-600 hover:text-blue-800 hover:underline"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     {createdPaste.url}
//                   </a>
//                 </div>
//               </div>
//               <div>
//                 <label className="text-sm font-medium text-green-700">Paste ID:</label>
//                 <div className="mt-1 p-3 bg-white border border-green-300 rounded font-mono">
//                   {createdPaste.id}
//                 </div>
//               </div>
//               <button
//                 onClick={handleCreateNew}
//                 className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
//               >
//                 Create Another Paste
//               </button>
//             </div>
//           </div>
//         )}

//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
//           <h2 className="text-xl font-semibold text-blue-800 mb-3">Features</h2>
//           <ul className="space-y-2 text-blue-700">
//             <li className="flex items-center">
//               <span className="mr-2">✓</span> Create text pastes with optional constraints
//             </li>
//             <li className="flex items-center">
//               <span className="mr-2">✓</span> Time-based expiration (TTL)
//             </li>
//             <li className="flex items-center">
//               <span className="mr-2">✓</span> View count limits
//             </li>
//             <li className="flex items-center">
//               <span className="mr-2">✓</span> Secure content rendering
//             </li>
//             <li className="flex items-center">
//               <span className="mr-2">✓</span> Shareable URLs
//             </li>
//           </ul>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// import { useState } from 'react';
// import Layout from '../components/Layout';
// import CreatePaste from '../components/CreatePaste';

// export default function Home() {
//   const [createdPaste, setCreatedPaste] = useState(null);

//   const handlePasteCreated = (data) => {
//     setCreatedPaste(data);
//   };

//   const handleCreateNew = () => {
//     setCreatedPaste(null);
//   };

//   return (
//     <Layout>
//       <div className="max-w-6xl mx-auto px-4">
//         {/* Hero Section */}
//         <div className="text-center mb-12 animate-fade-in">
//           <h1 className="text-5xl font-bold text-gray-900 mb-4">
//             <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
//               Pastebin-Lite
//             </span>
//           </h1>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Create, share, and manage text snippets with optional expiration and view limits.
//           </p>
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Form */}
//           <div className="lg:col-span-2">
//             <div className="card p-8 animate-slide-up">
//               <div className="mb-8">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-2">Create New Paste</h2>
//                 <p className="text-gray-600">Share text securely with optional constraints.</p>
//               </div>
//               <CreatePaste onPasteCreated={handlePasteCreated} />
//             </div>

//             {createdPaste && (
//               <div className="card p-8 mt-8 border-2 border-green-200 bg-green-50 animate-slide-up">
//                 <div className="flex items-start mb-6">
//                   <div className="flex-shrink-0">
//                     <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                       <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                       </svg>
//                     </div>
//                   </div>
//                   <div className="ml-4">
//                     <h3 className="text-xl font-bold text-green-800">Paste Created Successfully!</h3>
//                     <p className="text-green-600">Your paste is ready to share.</p>
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   <div>
//                     <label className="label text-green-700">Shareable URL</label>
//                     <div className="flex">
//                       <input
//                         type="text"
//                         value={createdPaste.url}
//                         readOnly
//                         className="input-field rounded-r-none font-mono bg-gray-50"
//                       />
//                       <button
//                         onClick={() => {
//                           navigator.clipboard.writeText(createdPaste.url);
//                           alert('URL copied to clipboard!');
//                         }}
//                         className="btn-secondary rounded-l-none px-4"
//                       >
//                         Copy
//                       </button>
//                     </div>
//                   </div>

//                   <div className="flex items-center space-x-4">
//                     <div>
//                       <span className="text-sm font-medium text-gray-600">Paste ID:</span>
//                       <span className="ml-2 font-mono bg-gray-100 px-3 py-1 rounded-lg">
//                         {createdPaste.id}
//                       </span>
//                     </div>
//                     <button
//                       onClick={() => window.open(createdPaste.url, '_blank')}
//                       className="text-blue-600 hover:text-blue-800 flex items-center"
//                     >
//                       <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                       </svg>
//                       Open
//                     </button>
//                   </div>

//                   <button
//                     onClick={handleCreateNew}
//                     className="btn-primary mt-4"
//                   >
//                     Create Another Paste
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right Column - Features */}
//           <div className="lg:col-span-1">
//             <div className="card p-8 h-full">
//               <h2 className="text-2xl font-bold text-gray-800 mb-6">Features</h2>
              
//               <div className="space-y-6">
//                 <div className="flex items-start space-x-3">
//                   <div className="flex-shrink-0">
//                     <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                       <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                       </svg>
//                     </div>
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-800">Text Storage</h3>
//                     <p className="text-gray-600 text-sm mt-1">Store any text content securely with encryption.</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-3">
//                   <div className="flex-shrink-0">
//                     <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
//                       <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                     </div>
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-800">Time-Based Expiry</h3>
//                     <p className="text-gray-600 text-sm mt-1">Set automatic deletion after specific time.</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-3">
//                   <div className="flex-shrink-0">
//                     <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
//                       <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                       </svg>
//                     </div>
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-800">View Limits</h3>
//                     <p className="text-gray-600 text-sm mt-1">Control how many times your paste can be viewed.</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-3">
//                   <div className="flex-shrink-0">
//                     <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
//                       <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                       </svg>
//                     </div>
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-800">Secure Sharing</h3>
//                     <p className="text-gray-600 text-sm mt-1">Share links safely with auto-expiration.</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-3">
//                   <div className="flex-shrink-0">
//                     <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
//                       <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                     </div>
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-800">API Access</h3>
//                     <p className="text-gray-600 text-sm mt-1">Programmatic access with REST API.</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-8 pt-6 border-t border-gray-200">
//                 <h3 className="font-semibold text-gray-800 mb-3">Quick Stats</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <div className="text-2xl font-bold text-blue-600">∞</div>
//                     <div className="text-sm text-gray-600">Text Size</div>
//                   </div>
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <div className="text-2xl font-bold text-green-600">99.9%</div>
//                     <div className="text-sm text-gray-600">Uptime</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

import { useState } from 'react';
import Layout from '../components/Layout';
import CreatePaste from '../components/CreatePaste';

export default function Home() {
  const [createdPaste, setCreatedPaste] = useState(null);

  const handlePasteCreated = (data) => {
    setCreatedPaste(data);
  };

  const handleCreateNew = () => {
    setCreatedPaste(null);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Pastebin-Lite
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create, share, and manage text snippets with optional expiration and view limits.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Create New Paste
              </h2>
              <p className="text-gray-600 mb-6">
                Share text securely with optional constraints.
              </p>

              <CreatePaste onPasteCreated={handlePasteCreated} />
            </div>

            {createdPaste && (
              <div className="card p-8 mt-8 border-2 border-green-200 bg-green-50">
                <h3 className="text-xl font-bold text-green-800 mb-2">
                  Paste Created Successfully!
                </h3>

                <input
                  type="text"
                  value={createdPaste.url}
                  readOnly
                  className="input-field font-mono mb-4"
                />

                <button
                  onClick={handleCreateNew}
                  className="btn-primary"
                >
                  Create Another Paste
                </button>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Features
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li>✔ Secure text storage</li>
              <li>✔ Time-based expiry</li>
              <li>✔ View limits</li>
              <li>✔ API access</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
