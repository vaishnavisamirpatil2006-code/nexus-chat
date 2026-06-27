import { FILE_ICON_MAP } from '../data/rooms';

/**
 * Format bytes into a human-readable string.
 * @param {number} bytes
 * @returns {string}
 */
export function formatFileSize(bytes) {
  if (bytes >= 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + ' MB';
  return Math.round(bytes / 1024) + ' KB';
}

/**
 * Determine the Tabler icon class for a given file name.
 * @param {string} fileName
 * @returns {string}
 */
export function fileIcon(fileName) {
  const ext = fileName.split('.').pop().toLowerCase();
  return FILE_ICON_MAP[ext] || 'ti-file';
}

/**
 * Check if a MIME type or file name represents an image.
 * @param {File} file
 * @returns {boolean}
 */
export function isImageFile(file) {
  return file.type.startsWith('image/');
}

/**
 * Return current time as "H:MM AM/PM".
 * @returns {string}
 */
export function nowTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/**
 * Generate a unique ID (timestamp + random suffix).
 * @returns {number}
 */
export function uid() {
  return Date.now() + Math.floor(Math.random() * 1000);
}
