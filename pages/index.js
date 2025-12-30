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
