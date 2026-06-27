# Nexus Chat

A real-time chat application built with React featuring rooms, online status indicators, and file sharing.

## Features

- **Channels & DMs** — 5 public channels and 4 direct message threads
- **Online status** — members shown as online, away, or offline with colored indicators
- **Real-time feel** — bot users reply with animated typing indicators after you send a message
- **Reactions** — add emoji reactions to any message; toggle your own on/off
- **Reply threads** — reply to specific messages with quoted preview
- **File sharing** — drag-and-drop or browse to share files; images render inline, other files show as download cards
- **Members panel** — togglable right sidebar listing room members by status
- **Emoji picker** — 16-emoji picker built into the message input

## Project structure

```
nexus-chat/
├── public/
│   └── index.html          # HTML shell with font + icon imports
├── src/
│   ├── data/
│   │   └── rooms.js        # Seed data: rooms, DMs, members, bot reply pools
│   ├── hooks/
│   │   └── useChat.js      # Central state: messages, reactions, typing simulation
│   ├── utils/
│   │   └── helpers.js      # formatFileSize, fileIcon, isImageFile, uid
│   ├── components/
│   │   ├── Avatar.jsx        # Initials avatar with optional status dot
│   │   ├── Sidebar.jsx       # Left nav: brand, search, channels, DMs, user footer
│   │   ├── ChatHeader.jsx    # Room name, meta, action buttons
│   │   ├── MessageList.jsx   # Scrollable message feed (text / file / image / typing)
│   │   ├── MessageInput.jsx  # Textarea, emoji picker, reply preview, send button
│   │   ├── MembersPanel.jsx  # Right sidebar: members grouped by status
│   │   ├── UploadModal.jsx   # Drag-and-drop file upload dialog
│   │   └── Toast.jsx         # Stacked notification toasts
│   ├── App.jsx             # Root component — wires everything together
│   ├── index.js            # React entry point
│   └── index.css           # CSS variables, resets, dark mode, animations
└── package.json
```

## Getting started

```bash
# Install dependencies
npm install

# Start development server (opens at http://localhost:3000)
npm start

# Build for production
npm run build
```

## Extending the app

### Add a new channel
In `src/data/rooms.js`, push a new entry into the `ROOMS` array:

```js
{
  id: 'my-channel',
  type: 'channel',
  icon: 'ti-hash',
  name: 'my-channel',
  meta: '5 members · Description here',
  memberIds: ['alex', 'you'],
  messages: [],
}
```

### Add bot replies for a channel
Add an entry to `BOT_REPLIES` in `src/data/rooms.js`:

```js
'my-channel': [
  { memberId: 'alex', texts: ['Interesting!', 'Thanks for sharing.'] },
],
```

### Connect a real backend
Replace the state logic in `src/hooks/useChat.js` with WebSocket calls (e.g. Socket.io) or a real-time DB (Supabase, Firebase). The component API stays the same — components only consume the hook's output.

## Tech stack

- React 18
- CSS custom properties (no CSS-in-JS library)
- Tabler Icons webfont
- Inter typeface (Google Fonts)
