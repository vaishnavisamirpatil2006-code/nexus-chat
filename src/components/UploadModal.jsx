import React, { useState, useRef } from 'react';
import { formatFileSize, fileIcon, isImageFile } from '../utils/helpers';

/**
 * UploadModal — drag-and-drop / browse file upload dialog.
 *
 * Props:
 *   onClose   {function}
 *   onUpload  {function}  ({ name, size, icon, isImage })
 */
export default function UploadModal({ onClose, onUpload }) {
  const [file, setFile]     = useState(null);
  const [drag, setDrag]     = useState(false);
  const inputRef            = useRef(null);

  function handleSelect(e) {
    if (e.target.files?.[0]) pickFile(e.target.files[0]);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDrag(false);
    if (e.dataTransfer.files?.[0]) pickFile(e.dataTransfer.files[0]);
  }

  function pickFile(f) {
    setFile(f);
  }

  function confirm() {
    if (!file) return;
    onUpload({
      name:    file.name,
      size:    formatFileSize(file.size),
      icon:    fileIcon(file.name),
      isImage: isImageFile(file),
    });
    onClose();
  }

  // Click outside backdrop to close
  function handleBackdrop(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      onClick={handleBackdrop}
      style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.35)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 20,
      }}
    >
      <div style={{
        background: 'var(--bg)', borderRadius: 'var(--radius-lg)',
        border: '0.5px solid var(--border2)', padding: 24, width: 300,
      }}>
        <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4, color: 'var(--txt)' }}>Share a file</div>
        <div style={{ fontSize: 13, color: 'var(--txt2)', marginBottom: 16 }}>Upload an image, document, or any file.</div>

        {/* Drop zone */}
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={handleDrop}
          style={{
            border: `1.5px dashed ${drag ? 'var(--accent)' : 'var(--border2)'}`,
            borderRadius: 'var(--radius-lg)', padding: '28px 16px',
            textAlign: 'center', cursor: 'pointer',
            background: drag ? 'var(--accent-light)' : 'transparent',
            transition: 'border-color 0.15s, background 0.15s',
          }}
        >
          <i className="ti ti-cloud-upload" aria-hidden="true" style={{ fontSize: 32, color: 'var(--accent)', display: 'block', marginBottom: 8 }} />
          <p style={{ fontSize: 13, color: 'var(--txt2)' }}>
            Drop files here or{' '}
            <span style={{ color: 'var(--accent)', fontWeight: 500 }}>browse</span>
          </p>
          <p style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 4 }}>
            {file ? `${file.name} · ${formatFileSize(file.size)}` : 'Max 50 MB per file'}
          </p>
        </div>

        <input ref={inputRef} type="file" style={{ display: 'none' }} onChange={handleSelect} />

        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <button onClick={onClose} style={ghostBtn}>Cancel</button>
          <button onClick={confirm} disabled={!file} style={{ ...primaryBtn, opacity: file ? 1 : 0.45 }}>Upload</button>
        </div>
      </div>
    </div>
  );
}

const ghostBtn = {
  flex: 1, padding: 8, border: '0.5px solid var(--border2)', borderRadius: 'var(--radius)',
  fontSize: 13, cursor: 'pointer', background: 'transparent', color: 'var(--txt2)',
};

const primaryBtn = {
  flex: 1, padding: 8, border: 'none', borderRadius: 'var(--radius)',
  fontSize: 13, cursor: 'pointer', background: 'var(--accent)', color: 'white',
};
