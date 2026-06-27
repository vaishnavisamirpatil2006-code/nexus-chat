import React, { useEffect, useRef } from 'react';
import Avatar from './Avatar';

/**
 * MessageList — scrollable area containing all messages for the active room.
 *
 * Props:
 *   messages        {Array}
 *   getMember       {function}
 *   isTyping        {bool}     — show typing indicator
 *   typingMember    {object}   — member who is typing
 *   onReact         {function} (msgId, emoji)
 *   onQuickReact    {function} (msgId)
 *   onReply         {function} (msgId, author, text)
 *   onToast         {function}
 */
export default function MessageList({
  messages, getMember, isTyping, typingMember,
  onReact, onQuickReact, onReply, onToast,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div
      style={{
        flex: 1, overflowY: 'auto', padding: '16px', display: 'flex',
        flexDirection: 'column', gap: 2,
      }}
    >
      <DateDivider label="Today" />

      {messages.map(msg => {
        const member = getMember(msg.authorId);
        if (!member) return null;
        if (msg.type === 'file') return <FileMessage key={msg.id} msg={msg} member={member} onToast={onToast} />;
        if (msg.type === 'image') return <ImageMessage key={msg.id} msg={msg} member={member} onToast={onToast} />;
        return (
          <TextMessage
            key={msg.id}
            msg={msg}
            member={member}
            onQuickReact={onQuickReact}
            onReply={onReply}
            onReact={onReact}
          />
        );
      })}

      {isTyping && typingMember && <TypingIndicator member={typingMember} />}

      <div ref={bottomRef} />
    </div>
  );
}

// ─── Date divider ─────────────────────────────────────────────────────────────
function DateDivider({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '12px 0' }}>
      <div style={{ flex: 1, height: '0.5px', background: 'var(--border)' }} />
      <span style={{ fontSize: 11, color: 'var(--txt3)', whiteSpace: 'nowrap' }}>{label}</span>
      <div style={{ flex: 1, height: '0.5px', background: 'var(--border)' }} />
    </div>
  );
}

// ─── Text message ─────────────────────────────────────────────────────────────
function TextMessage({ msg, member, onQuickReact, onReply, onReact }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      style={{ display: 'flex', gap: 10, padding: '4px 0', position: 'relative' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Avatar member={member} size={32} style={{ marginTop: 2 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 3 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--txt)' }}>{member.name}</span>
          <span style={{ fontSize: 11, color: 'var(--txt3)' }}>{msg.time}</span>
          {hovered && (
            <div style={{ display: 'flex', gap: 2, marginLeft: 'auto' }}>
              <MsgActionBtn icon="ti-mood-happy" label="React" onClick={() => onQuickReact(msg.id)} />
              <MsgActionBtn icon="ti-arrow-back-up" label="Reply" onClick={() => onReply(msg.id, member.name, msg.text)} />
            </div>
          )}
        </div>
        <div style={{ fontSize: 13, color: 'var(--txt)', lineHeight: 1.55, wordBreak: 'break-word', whiteSpace: 'pre-line' }}>
          {msg.text}
        </div>
        {msg.reactions?.length > 0 && (
          <div style={{ display: 'flex', gap: 4, marginTop: 4, flexWrap: 'wrap' }}>
            {msg.reactions.map(r => (
              <button
                key={r.e}
                onClick={() => onReact(msg.id, r.e)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 3,
                  padding: '2px 7px', borderRadius: 10, fontSize: 12, cursor: 'pointer',
                  background: r.mine ? 'var(--accent-light)' : 'var(--bg2)',
                  border: r.mine ? '0.5px solid var(--accent-mid)' : '0.5px solid var(--border)',
                  color: r.mine ? 'var(--accent)' : 'var(--txt2)',
                }}
              >
                {r.e} {r.n}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── File message ─────────────────────────────────────────────────────────────
function FileMessage({ msg, member, onToast }) {
  return (
    <div style={{ display: 'flex', gap: 10, padding: '4px 0' }}>
      <Avatar member={member} size={32} />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 3 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--txt)' }}>{member.name}</span>
          <span style={{ fontSize: 11, color: 'var(--txt3)' }}>{msg.time}</span>
        </div>
        <div
          onClick={() => onToast(`Downloading ${msg.fileName}…`, 'var(--green)')}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 12px', background: 'var(--bg2)',
            border: '0.5px solid var(--border)',
            borderRadius: 'var(--radius-lg)', maxWidth: 280, cursor: 'pointer',
          }}
        >
          <div style={{
            width: 36, height: 36, borderRadius: 'var(--radius)',
            background: 'var(--accent-light)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--accent)', fontSize: 18, flexShrink: 0,
          }}>
            <i className={`ti ${msg.fileIcon}`} aria-hidden="true" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--txt)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{msg.fileName}</div>
            <div style={{ fontSize: 11, color: 'var(--txt3)' }}>{msg.fileSize}</div>
          </div>
          <i className="ti ti-download" aria-hidden="true" style={{ color: 'var(--accent)', fontSize: 16, flexShrink: 0 }} />
        </div>
      </div>
    </div>
  );
}

// ─── Image message ────────────────────────────────────────────────────────────
function ImageMessage({ msg, member, onToast }) {
  return (
    <div style={{ display: 'flex', gap: 10, padding: '4px 0' }}>
      <Avatar member={member} size={32} />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 3 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--txt)' }}>{member.name}</span>
          <span style={{ fontSize: 11, color: 'var(--txt3)' }}>{msg.time}</span>
        </div>
        {msg.text && <div style={{ fontSize: 13, color: 'var(--txt)', marginBottom: 4 }}>{msg.text}</div>}
        <div
          onClick={() => onToast('Opening image…', 'var(--accent)')}
          style={{
            borderRadius: 'var(--radius-lg)', overflow: 'hidden',
            border: '0.5px solid var(--border)', maxWidth: 220, cursor: 'pointer',
          }}
        >
          <div style={{
            width: 220, height: 140,
            background: 'linear-gradient(135deg, #EEEDFE 0%, #AFA9EC 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <i className="ti ti-photo" aria-hidden="true" style={{ fontSize: 36, color: '#534AB7', opacity: 0.6 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Typing indicator ─────────────────────────────────────────────────────────
function TypingIndicator({ member }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 0 8px' }}>
      <Avatar member={member} size={32} />
      <div style={{
        display: 'flex', gap: 3, padding: '6px 10px',
        background: 'var(--bg2)', borderRadius: 12,
      }}>
        {[0, 0.2, 0.4].map((delay, i) => (
          <span
            key={i}
            style={{
              width: 5, height: 5, borderRadius: '50%', background: 'var(--txt3)',
              display: 'inline-block',
              animation: `bounce 1.2s ${delay}s infinite`,
            }}
          />
        ))}
      </div>
      <span style={{ fontSize: 12, color: 'var(--txt3)' }}>{member.name} is typing…</span>
    </div>
  );
}

// ─── Message action button ────────────────────────────────────────────────────
function MsgActionBtn({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      style={{
        width: 24, height: 24, borderRadius: 'var(--radius)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', fontSize: 13, color: 'var(--txt3)',
        border: 'none', background: 'transparent',
      }}
    >
      <i className={`ti ${icon}`} aria-hidden="true" />
    </button>
  );
}
