// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Layout from '../../components/Layout';
// import ViewPaste from '../../components/ViewPaste';
// import ErrorMessage from '../../components/ErrorMessage';

// export default function PastePage() {
//   const router = useRouter();
//   const { id } = router.query;
//   const [paste, setPaste] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!id) return;

//     async function fetchPaste() {
//       try {
//         setLoading(true);
//         const response = await fetch(`/api/pastes/${id}`);
        
//         if (response.ok) {
//           const data = await response.json();
//           setPaste(data);
//           setError(null);
//         } else {
//           setError('Paste not found or unavailable');
//           setPaste(null);
//         }
//       } catch (error) {
//         console.error('Error fetching paste:', error);
//         setError('Failed to load paste');
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchPaste();
//   }, [id]);

//   if (loading) {
//     return (
//       <Layout>
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//         </div>
//       </Layout>
//     );
//   }

//   if (error) {
//     return (
//       <Layout>
//         <ErrorMessage message={error} />
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <ViewPaste paste={paste} id={id} />
//     </Layout>
//   );
// }

import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import ViewPaste from "../../components/ViewPaste";
import ErrorMessage from "../../components/ErrorMessage";

export default function PastePage() {
  const [paste, setPaste] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const path = window.location.pathname;
    const pasteId = path.split("/").pop();
    if (!pasteId) return;

    setId(pasteId);

    const fetchPaste = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/pastes/${pasteId}`);

        if (!res.ok) {
          throw new Error("Paste not found or unavailable");
        }

        const data = await res.json();
        setPaste(data);
        setError("");
      } catch (err) {
        setError(err.message);
        setPaste(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPaste();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <ErrorMessage message={error} />
      </Layout>
    );
  }

  return (
    <Layout>
      <ViewPaste paste={paste} id={id} />
    </Layout>
  );
}
