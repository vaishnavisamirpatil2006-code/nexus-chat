import { useState, useCallback, useRef } from 'react';
import { ROOMS, DMS, MEMBERS, ME, BOT_REPLIES } from '../data/rooms';

// Deep-clone seed data so mutations don't affect the module-level constants
function cloneRooms(list) {
  return list.map(r => ({
    ...r,
    messages: r.messages.map(m => ({ ...m, reactions: m.reactions ? [...m.reactions.map(rx => ({ ...rx }))] : [] })),
  }));
}

export function useChat() {
  const [rooms, setRooms]           = useState(() => cloneRooms([...ROOMS, ...DMS]));
  const [currentRoomId, setCurrentRoomId] = useState('general');
  const [replyTo, setReplyTo]       = useState(null);
  const [typingRoomId, setTypingRoomId]   = useState(null);
  const [toasts, setToasts]         = useState([]);
  const [unread, setUnread]         = useState({});
  const botTimer = useRef(null);

  // ─── Derived ────────────────────────────────────────────────────────────────
  const currentRoom = rooms.find(r => r.id === currentRoomId);
  const getMember   = id => MEMBERS.find(m => m.id === id);

  // ─── Toast ──────────────────────────────────────────────────────────────────
  const addToast = useCallback((msg, color = 'var(--accent)') => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, color }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }, []);

  // ─── Switch room ────────────────────────────────────────────────────────────
  const switchRoom = useCallback((id) => {
    setCurrentRoomId(id);
    setReplyTo(null);
    setUnread(u => ({ ...u, [id]: 0 }));
    // Schedule a bot reply a few seconds after switching
    if (botTimer.current) clearTimeout(botTimer.current);
    const pool = BOT_REPLIES[id];
    if (!pool) return;
    const delay = 3500 + Math.random() * 3000;
    botTimer.current = setTimeout(() => {
      setTypingRoomId(id);
      setTimeout(() => {
        setTypingRoomId(null);
        const bot    = pool[Math.floor(Math.random() * pool.length)];
        const member = MEMBERS.find(m => m.id === bot.memberId);
        const text   = bot.texts[Math.floor(Math.random() * bot.texts.length)];
        const now    = new Date();
        const time   = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setRooms(rs => rs.map(r => r.id !== id ? r : {
          ...r,
          messages: [...r.messages, { id: Date.now(), authorId: member.id, time, text, reactions: [] }],
        }));
      }, 1800 + Math.random() * 1200);
    }, delay);
  }, []);

  // ─── Send message ───────────────────────────────────────────────────────────
  const sendMessage = useCallback((text, file = null) => {
    const now  = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let newMsg;

    if (file) {
      newMsg = {
        id: Date.now(), authorId: ME.id, time,
        type: file.isImage ? 'image' : 'file',
        text: file.isImage ? '' : undefined,
        fileName: file.name, fileSize: file.size, fileIcon: file.icon,
        reactions: [],
      };
    } else {
      const finalText = replyTo
        ? `↩ @${replyTo.author} "${replyTo.text.substring(0, 40)}…"\n${text}`
        : text;
      newMsg = { id: Date.now(), authorId: ME.id, time, text: finalText, reactions: [] };
    }

    setRooms(rs => rs.map(r => r.id !== currentRoomId ? r : {
      ...r, messages: [...r.messages, newMsg],
    }));
    setReplyTo(null);
  }, [currentRoomId, replyTo]);

  // ─── Toggle reaction ────────────────────────────────────────────────────────
  const toggleReaction = useCallback((roomId, msgId, emoji) => {
    setRooms(rs => rs.map(r => {
      if (r.id !== roomId) return r;
      return {
        ...r,
        messages: r.messages.map(m => {
          if (m.id !== msgId) return m;
          const existing = m.reactions.find(rx => rx.e === emoji);
          let reactions;
          if (existing) {
            const updated = { ...existing, mine: !existing.mine, n: existing.n + (existing.mine ? -1 : 1) };
            reactions = updated.n <= 0
              ? m.reactions.filter(rx => rx.e !== emoji)
              : m.reactions.map(rx => rx.e === emoji ? updated : rx);
          } else {
            reactions = [...m.reactions, { e: emoji, n: 1, mine: true }];
          }
          return { ...m, reactions };
        }),
      };
    }));
  }, []);

  // ─── Quick react (random emoji) ─────────────────────────────────────────────
  const quickReact = useCallback((roomId, msgId) => {
    const pool  = ['👍', '❤️', '😂', '🔥', '🚀', '✅'];
    const emoji = pool[Math.floor(Math.random() * pool.length)];
    toggleReaction(roomId, msgId, emoji);
  }, [toggleReaction]);

  return {
    rooms, currentRoom, currentRoomId, switchRoom,
    getMember, ME,
    replyTo, setReplyTo, clearReply: () => setReplyTo(null),
    typingRoomId,
    toasts, addToast,
    unread,
    sendMessage, toggleReaction, quickReact,
  };
}
