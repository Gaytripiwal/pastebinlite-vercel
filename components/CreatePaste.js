import { useState } from 'react';

export default function CreatePaste({ onPasteCreated }) {
  const [content, setContent] = useState('');
  const [ttlSeconds, setTtlSeconds] = useState('');
  const [maxViews, setMaxViews] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const pasteData = {
      content: content.trim(),
      ...(ttlSeconds && { ttl_seconds: parseInt(ttlSeconds) }),
      ...(maxViews && { max_views: parseInt(maxViews) }),
    };

    try {
      const response = await fetch('/api/pastes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pasteData),
      });

      const data = await response.json();

      if (response.ok) {
        onPasteCreated(data);
        setContent('');
        setTtlSeconds('');
        setMaxViews('');
      } else {
        setError(data.error || 'Failed to create paste');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div>
            <label className="label">Content *</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              className="textarea-field"
              placeholder="Enter your text here..."
              required
            />
            <p className="mt-2 text-sm text-gray-500">
              Your content is encrypted and securely stored.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="label">
                  Time to Live (Seconds)
                  <span className="text-gray-500 font-normal ml-2">Optional</span>
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="300"
                    step="10"
                    value={ttlSeconds || 0}
                    onChange={(e) => setTtlSeconds(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0s</span>
                    <span>1h</span>
                  </div>
                </div>
                <input
                  type="number"
                  value={ttlSeconds}
                  onChange={(e) => setTtlSeconds(e.target.value)}
                  min="0"
                  max="3600"
                  className="input-field mt-2"
                  placeholder="e.g., 3600 (1 hour)"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Paste auto-deletes after this time.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="label">
                  Maximum Views
                  <span className="text-gray-500 font-normal ml-2">Optional</span>
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={maxViews || 0}
                    onChange={(e) => setMaxViews(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0</span>
                    <span>10</span>
                  </div>
                </div>
                <input
                  type="number"
                  value={maxViews}
                  onChange={(e) => setMaxViews(e.target.value)}
                  min="0"
                  max="100"
                  className="input-field mt-2"
                  placeholder="e.g., 10 views"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Paste auto-deletes after this many views.
                </p>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded animate-slide-up">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="btn-primary w-full py-4 text-lg font-semibold shadow-md"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Paste...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Paste
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}