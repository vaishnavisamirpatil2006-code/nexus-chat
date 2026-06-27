import React, { useState } from 'react';
import { MEMBERS } from './data/rooms';
import { useChat } from './hooks/useChat';
import Sidebar from './components/Sidebar';
import ChatHeader from './components/ChatHeader';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import MembersPanel from './components/MembersPanel';
import UploadModal from './components/UploadModal';
import ToastContainer from './components/Toast';

export default function App() {
  const {
    rooms, currentRoom, currentRoomId, switchRoom,
    getMember, ME,
    replyTo, setReplyTo, clearReply,
    typingRoomId,
    toasts, addToast,
    unread,
    sendMessage, toggleReaction, quickReact,
  } = useChat();

  const [membersPanelOpen, setMembersPanelOpen] = useState(true);
  const [showUpload, setShowUpload]             = useState(false);

  const isTyping     = typingRoomId === currentRoomId;
  const typingMember = isTyping
    ? MEMBERS.find(m => {
       
        // pick last bot author as "typing" member — fallback to first non-me member
        return m.id !== ME.id;
      })
    : null;

  function handleUpload(fileInfo) {
    sendMessage(null, fileInfo);
    addToast(`File shared in #${currentRoom?.name}`, 'var(--green)');
  }

  return (
    <div style={{ position: 'relative', fontFamily: 'Inter, var(--font-sans, sans-serif)' }}>
      <div style={{
        display: 'flex', height: '100vh',
        border: '0.5px solid var(--color-border-secondary, #d0cfc8)',
        borderRadius: 12, overflow: 'hidden',
        background: 'var(--color-background-primary, #fff)',
      }}>
        <Sidebar
          currentRoomId={currentRoomId}
          unread={unread}
          onSelectRoom={switchRoom}
          me={ME}
          onSettingsClick={() => addToast('Settings coming soon', 'var(--accent)')}
        />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <ChatHeader
            room={currentRoom}
            membersPanelOpen={membersPanelOpen}
            onToggleMembers={() => setMembersPanelOpen(o => !o)}
            onToast={addToast}
          />

          <MessageList
            messages={currentRoom?.messages ?? []}
            getMember={getMember}
            isTyping={isTyping}
            typingMember={typingMember}
            onReact={(msgId, emoji) => toggleReaction(currentRoomId, msgId, emoji)}
            onQuickReact={msgId => quickReact(currentRoomId, msgId)}
            onReply={(msgId, author, text) => setReplyTo({ msgId, author, text })}
            onToast={addToast}
          />

          <MessageInput
            placeholder={`Message ${currentRoom?.type === 'dm' ? currentRoom.name : '#' + currentRoom?.name}`}
            replyTo={replyTo}
            onClearReply={clearReply}
            onSend={sendMessage}
            onAttach={() => setShowUpload(true)}
          />
        </div>

        {membersPanelOpen && (
          <MembersPanel memberIds={currentRoom?.memberIds} />
        )}
      </div>

      <ToastContainer toasts={toasts} />

      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          onUpload={handleUpload}
        />
      )}
    </div>
  );
}
