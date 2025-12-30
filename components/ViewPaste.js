export default function ViewPaste({ paste, id }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Paste #{id}</h2>
            <div className="text-sm text-gray-500">
              Created just now
            </div>
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg font-mono whitespace-pre-wrap min-h-[200px]">
              {paste.content}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">View Limits</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Maximum Views:</span>
                  <span className="font-medium">
                    {paste.max_views || 'Unlimited'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Remaining Views:</span>
                  <span className="font-medium">
                    {paste.remaining_views !== null ? paste.remaining_views : 'Unlimited'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <h3 className="text-sm font-medium text-green-800 mb-2">Expiration</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Expires At:</span>
                  <span className="font-medium">
                    {formatDate(paste.expires_at)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${paste.expires_at && new Date(paste.expires_at) < new Date() ? 'text-red-600' : 'text-green-600'}`}>
                    {paste.expires_at && new Date(paste.expires_at) < new Date() ? 'Expired' : 'Active'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-1">Share this paste</h3>
                <p className="text-sm text-gray-500">
                  Copy the URL to share with others
                </p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('URL copied to clipboard!');
                }}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
              >
                Copy URL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}