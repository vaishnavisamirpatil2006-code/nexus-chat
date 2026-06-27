import React, { useState } from 'react';
import { ROOMS, DMS, MEMBERS } from '../data/rooms';
import Avatar from './Avatar';

/**
 * Sidebar — shows app brand, search, channel list, DM list, and current-user footer.
 *
 * Props:
 *   currentRoomId  {string}
 *   unread         {object}   — { roomId: count }
 *   onSelectRoom   {function}
 *   me             {object}   — current user member object
 *   onSettingsClick {function}
 */
export default function Sidebar({ currentRoomId, unread, onSelectRoom, me, onSettingsClick }) {
  const [query, setQuery] = useState('');

  const channels = ROOMS.filter(r => r.name.includes(query.toLowerCase()));
  const dms = DMS.filter(r => {
    const m = MEMBERS.find(x => x.id === r.memberId);
    return m && m.name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <aside
      style={{
        width: 'var(--sidebar-w)',
        minWidth: 'var(--sidebar-w)',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg3)',
        borderRight: '0.5px solid var(--border)',
      }}
    >
      {/* Header */}
      <div style={{ padding: '14px 16px 10px', borderBottom: '0.5px solid var(--border)' }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{
            width: 28, height: 28, background: 'var(--accent)', borderRadius: 7,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: 14, flexShrink: 0,
          }}>
            <i className="ti ti-bolt" aria-hidden="true" />
          </div>
          <span style={{ fontWeight: 500, fontSize: 15, color: 'var(--txt)' }}>Nexus</span>
        </div>

        {/* Search */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'var(--bg2)', border: '0.5px solid var(--border)',
          borderRadius: 'var(--radius)', padding: '6px 10px',
        }}>
          <i className="ti ti-search" aria-hidden="true" style={{ color: 'var(--txt3)', fontSize: 14 }} />
          <input
            type="text"
            placeholder="Search rooms, people…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              border: 'none', background: 'transparent', fontSize: 13,
              color: 'var(--txt)', outline: 'none', width: '100%',
            }}
          />
        </div>
      </div>

      {/* Nav lists */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        <SectionLabel>Channels</SectionLabel>
        {channels.map(room => (
          <RoomRow
            key={room.id}
            icon={room.icon}
            label={room.name}
            active={currentRoomId === room.id}
            badge={unread[room.id] || 0}
            onClick={() => onSelectRoom(room.id)}
          />
        ))}

        <SectionLabel style={{ marginTop: 4 }}>Direct Messages</SectionLabel>
        {dms.map(room => {
          const member = MEMBERS.find(m => m.id === room.memberId);
          if (!member) return null;
          return (
            <DmRow
              key={room.id}
              member={member}
              active={currentRoomId === room.id}
              onClick={() => onSelectRoom(room.id)}
            />
          );
        })}
      </div>

      {/* Footer */}
      <div style={{
        padding: '10px 14px',
        borderTop: '0.5px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: 9,
      }}>
        <Avatar member={me} size={30} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--txt)' }}>{me.name}</div>
          <div style={{ fontSize: 11, color: 'var(--green)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
            Active now
          </div>
        </div>
        <button
          onClick={onSettingsClick}
          title="Settings"
          aria-label="Settings"
          style={{ ...iconBtnStyle }}
        >
          <i className="ti ti-settings" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({ children, style }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 500, color: 'var(--txt3)',
      letterSpacing: '0.06em', textTransform: 'uppercase',
      padding: '8px 16px 4px', ...style,
    }}>
      {children}
    </div>
  );
}

function RoomRow({ icon, label, active, badge, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 9,
        padding: '7px 16px', cursor: 'pointer',
        background: active ? 'var(--accent-light)' : 'transparent',
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--bg2)'; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
    >
      <i
        className={`ti ${icon}`}
        aria-hidden="true"
        style={{ fontSize: 15, color: active ? 'var(--accent)' : 'var(--txt3)', flexShrink: 0 }}
      />
      <span style={{
        fontSize: 13, flex: 1,
        color: active ? 'var(--accent)' : 'var(--txt2)',
        fontWeight: active ? 500 : 400,
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>
        {label}
      </span>
      {badge > 0 && (
        <span style={{
          fontSize: 10, fontWeight: 500, background: 'var(--accent)',
          color: 'white', padding: '1px 5px', borderRadius: 8,
          minWidth: 16, textAlign: 'center',
        }}>
          {badge}
        </span>
      )}
    </div>
  );
}

function DmRow({ member, active, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 9,
        padding: '6px 16px', cursor: 'pointer',
        background: active ? 'var(--accent-light)' : 'transparent',
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--bg2)'; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
    >
      <Avatar member={member} size={26} showStatus />
      <span style={{
        fontSize: 13, flex: 1,
        color: active ? 'var(--accent)' : 'var(--txt2)',
        fontWeight: active ? 500 : 400,
      }}>
        {member.name}
      </span>
    </div>
  );
}

const iconBtnStyle = {
  width: 26, height: 26, borderRadius: 'var(--radius)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', color: 'var(--txt3)', fontSize: 15,
  border: 'none', background: 'transparent',
};
