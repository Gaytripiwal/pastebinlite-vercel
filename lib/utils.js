const { nanoid } = require('nanoid');
const validator = require('validator');

function generateId() {
  return nanoid(10); // 10-character ID
}

function validatePasteData(data) {
  const errors = [];

  // Validate content
  if (!data.content || typeof data.content !== 'string' || data.content.trim().length === 0) {
    errors.push('content is required and must be a non-empty string');
  }

  // Validate ttl_seconds
  if (data.ttl_seconds !== undefined && data.ttl_seconds !== null) {
    if (!Number.isInteger(data.ttl_seconds) || data.ttl_seconds < 1) {
      errors.push('ttl_seconds must be an integer ≥ 1 if provided');
    }
  }

  // Validate max_views
  if (data.max_views !== undefined && data.max_views !== null) {
    if (!Number.isInteger(data.max_views) || data.max_views < 1) {
      errors.push('max_views must be an integer ≥ 1 if provided');
    }
  }

  return errors;
}

function sanitizeContent(content) {
  return validator.escape(content);
}

function getCurrentTime(testMode, headers) {
  if (testMode && headers['x-test-now-ms']) {
    return new Date(parseInt(headers['x-test-now-ms'], 10));
  }
  return new Date();
}

function calculateExpiresAt(ttlSeconds, currentTime) {
  if (!ttlSeconds) {
    return null;
  }
  const expiresAt = new Date(currentTime);
  expiresAt.setSeconds(expiresAt.getSeconds() + ttlSeconds);
  return expiresAt.toISOString();
}

module.exports = {
  generateId,
  validatePasteData,
  sanitizeContent,
  getCurrentTime,
  calculateExpiresAt,
};