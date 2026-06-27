import React, { useState, useRef } from 'react';
import { EMOJIS } from '../data/rooms';

/**
 * MessageInput — textarea with emoji picker, file attach, reply preview, and send button.
 *
 * Props:
 *   placeholder    {string}
 *   replyTo        {object|null}  — { author, text }
 *   onClearReply   {function}
 *   onSend         {function}  (text)
 *   onAttach       {function}  — open file upload modal
 */
export default function MessageInput({ placeholder, replyTo, onClearReply, onSend, onAttach }) {
  const [value, setValue] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const textareaRef = useRef(null);

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  function submit() {
    const text = value.trim();
    if (!text) return;
    onSend(text);
    setValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  }

  function autoResize(e) {
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 80) + 'px';
  }

  function addEmoji(e) {
    setValue(v => v + e);
    setShowEmoji(false);
    textareaRef.current?.focus();
  }

  return (
    <div style={{ borderTop: '0.5px solid var(--border)', padding: '10px 14px', background: 'var(--bg)', position: 'relative' }}>
      {/* Reply preview */}
      {replyTo && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '6px 10px',
          background: 'var(--bg2)',
          borderLeft: '2.5px solid var(--accent)',
          borderRadius: '0 var(--radius) var(--radius) 0',
          marginBottom: 8,
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 500 }}>Replying to {replyTo.author}</div>
            <div style={{ fontSize: 12, color: 'var(--txt2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {replyTo.text}
            </div>
          </div>
          <button onClick={onClearReply} aria-label="Cancel reply" style={iconActionStyle}>
            <i className="ti ti-x" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Input row */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center',
          background: 'var(--bg2)', border: '0.5px solid var(--border)',
          borderRadius: 20, padding: '6px 12px', gap: 6,
        }}>
          <button onClick={onAttach} title="Attach file" aria-label="Attach file" style={iconActionStyle}>
            <i className="ti ti-paperclip" aria-hidden="true" />
          </button>
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            placeholder={placeholder}
            onChange={e => { setValue(e.target.value); autoResize(e); }}
            onKeyDown={handleKey}
            style={{
              flex: 1, border: 'none', background: 'transparent',
              fontSize: 13, color: 'var(--txt)', outline: 'none',
              resize: 'none', lineHeight: 1.5, maxHeight: 80,
              fontFamily: 'inherit', padding: 0,
            }}
          />
          <button onClick={() => setShowEmoji(s => !s)} title="Emoji" aria-label="Add emoji" style={iconActionStyle}>
            <i className="ti ti-mood-happy" aria-hidden="true" />
          </button>
        </div>
        <button
          onClick={submit}
          disabled={!value.trim()}
          aria-label="Send message"
          style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'var(--accent)', border: 'none',
            cursor: value.trim() ? 'pointer' : 'not-allowed',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: 16, flexShrink: 0,
            opacity: value.trim() ? 1 : 0.4,
            transition: 'opacity 0.15s',
          }}
        >
          <i className="ti ti-send" aria-hidden="true" />
        </button>
      </div>

      {/* Emoji picker */}
      {showEmoji && (
        <div
          style={{
            position: 'absolute', bottom: 64, left: 14,
            background: 'var(--bg)', border: '0.5px solid var(--border2)',
            borderRadius: 'var(--radius-lg)', padding: 10,
            display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 2, zIndex: 10,
          }}
        >
          {EMOJIS.map(e => (
            <button
              key={e}
              onClick={() => addEmoji(e)}
              style={{
                width: 30, height: 30, borderRadius: 'var(--radius)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', fontSize: 17, border: 'none', background: 'transparent',
              }}
            >
              {e}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const iconActionStyle = {
  width: 26, height: 26,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', color: 'var(--txt3)', fontSize: 16,
  borderRadius: '50%', border: 'none', background: 'transparent',
  flexShrink: 0,
};
