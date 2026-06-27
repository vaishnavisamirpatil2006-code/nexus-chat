import React from 'react';

/**
 * ChatHeader — displays current room name, metadata, and action buttons.
 *
 * Props:
 *   room              {object}   — current room object
 *   membersPanelOpen  {bool}
 *   onToggleMembers   {function}
 *   onToast           {function}
 */
export default function ChatHeader({ room, membersPanelOpen, onToggleMembers, onToast }) {
  if (!room) return null;

  return (
    <header style={{
      height: 'var(--header-h)',
      borderBottom: '0.5px solid var(--border)',
      display: 'flex', alignItems: 'center',
      padding: '0 16px', gap: 10,
      background: 'var(--bg)',
      flexShrink: 0,
    }}>
      <i
        className={`ti ${room.icon}`}
        aria-hidden="true"
        style={{ fontSize: 18, color: 'var(--accent)' }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--txt)' }}>{room.name}</div>
        <div style={{ fontSize: 12, color: 'var(--txt3)' }}>{room.meta}</div>
      </div>
      <div style={{ display: 'flex', gap: 2 }}>
        <HeaderBtn
          icon="ti-users"
          label="Toggle members"
          active={membersPanelOpen}
          onClick={onToggleMembers}
        />
        <HeaderBtn
          icon="ti-search"
          label="Search messages"
          onClick={() => onToast('Message search coming soon', 'var(--green)')}
        />
        <HeaderBtn
          icon="ti-pin"
          label="Pinned messages"
          onClick={() => onToast('Pinned messages coming soon', 'var(--accent)')}
        />
      </div>
    </header>
  );
}

function HeaderBtn({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      style={{
        width: 32, height: 32,
        borderRadius: 'var(--radius)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', fontSize: 17, border: 'none',
        background: active ? 'var(--accent-light)' : 'transparent',
        color: active ? 'var(--accent)' : 'var(--txt3)',
      }}
    >
      <i className={`ti ${icon}`} aria-hidden="true" />
    </button>
  );
}
