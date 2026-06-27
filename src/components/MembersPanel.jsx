import React from 'react';
import { MEMBERS } from '../data/rooms';
import Avatar from './Avatar';

/**
 * MembersPanel — right-side panel listing room members grouped by status.
 *
 * Props:
 *   memberIds  {string[]}  — IDs of members in the current room
 */
export default function MembersPanel({ memberIds }) {
  const roomMembers = MEMBERS.filter(m => memberIds?.includes(m.id));

  const online  = roomMembers.filter(m => m.status === 'online');
  const away    = roomMembers.filter(m => m.status === 'away');
  const offline = roomMembers.filter(m => m.status === 'offline');

  return (
    <aside style={{
      width: 220, minWidth: 220,
      borderLeft: '0.5px solid var(--border)',
      background: 'var(--bg3)',
      display: 'flex', flexDirection: 'column',
      overflowY: 'auto',
    }}>
      <MemberGroup label={`Online — ${online.length}`} members={online} />
      {away.length > 0 && <MemberGroup label={`Away — ${away.length}`} members={away} />}
      {offline.length > 0 && <MemberGroup label={`Offline — ${offline.length}`} members={offline} />}
    </aside>
  );
}

function MemberGroup({ label, members }) {
  return (
    <>
      <div style={{
        padding: '14px 14px 8px',
        fontSize: 11, fontWeight: 500, color: 'var(--txt3)',
        letterSpacing: '0.06em', textTransform: 'uppercase',
      }}>
        {label}
      </div>
      {members.map(m => (
        <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 14px' }}>
          <Avatar member={m} size={26} showStatus />
          <span style={{ fontSize: 13, color: 'var(--txt2)', flex: 1 }}>{m.name}</span>
          {m.role === 'admin' && (
            <span style={{
              fontSize: 10, color: 'var(--txt3)',
              background: 'var(--bg2)', padding: '1px 5px', borderRadius: 4,
            }}>
              admin
            </span>
          )}
        </div>
      ))}
    </>
  );
}
