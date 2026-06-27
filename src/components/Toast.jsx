import React from 'react';

/**
 * ToastContainer — renders stacked notification toasts.
 *
 * Props:
 *   toasts  {Array<{ id, msg, color }>}
 */
export default function ToastContainer({ toasts }) {
  if (!toasts.length) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 12,
        right: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        zIndex: 100,
        pointerEvents: 'none',
      }}
    >
      {toasts.map(t => (
        <div
          key={t.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 14px',
            background: 'var(--bg)',
            border: '0.5px solid var(--border2)',
            borderRadius: 'var(--radius-lg)',
            fontSize: 13,
            pointerEvents: 'auto',
            minWidth: 200,
            animation: 'slideIn 0.2s ease',
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: t.color, flexShrink: 0 }} />
          <span style={{ color: 'var(--txt2)' }}>{t.msg}</span>
        </div>
      ))}
    </div>
  );
}
