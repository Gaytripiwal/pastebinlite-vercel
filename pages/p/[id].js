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
        const res = await fetch(`https://pastebinlite-vercel-production.up.railway.app/api/paste/${pasteId}`);

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
