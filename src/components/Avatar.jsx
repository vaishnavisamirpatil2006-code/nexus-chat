import React from 'react';

/**
 * Avatar — shows initials in a colored circle with an optional status dot.
 *
 * Props:
 *   member    {object}  — from MEMBERS data ({ initials, avatarBg, avatarColor, status })
 *   size      {number}  — diameter in px (default 32)
 *   showStatus {bool}   — whether to render the status indicator dot
 */
export default function Avatar({ member, size = 32, showStatus = false }) {
  const fontSize = Math.round(size * 0.36);

  const statusColor = {
    online:  '#1D9E75',
    away:    '#BA7517',
    offline: '#888780',
  }[member.status] || '#888780';

  return (
    <div style={{ position: 'relative', flexShrink: 0, width: size, height: size }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: member.avatarBg,
          color: member.avatarColor,
          fontSize,
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none',
        }}
        aria-label={member.name}
      >
        {member.initials}
      </div>

      {showStatus && (
        <span
          style={{
            position: 'absolute',
            bottom: -1,
            right: -1,
            width: Math.round(size * 0.3),
            height: Math.round(size * 0.3),
            borderRadius: '50%',
            background: statusColor,
            border: '1.5px solid var(--bg3)',
          }}
          aria-label={member.status}
        />
      )}
    </div>
  );
}
