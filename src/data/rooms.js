// ─── Seed Data ────────────────────────────────────────────────────────────────
// All initial rooms, channels, DMs, and members used across the app.

export const MEMBERS = [
  { id: 'alex',   initials: 'AK', name: 'Alex Kim',      avatarBg: '#E1F5EE', avatarColor: '#0F6E56', status: 'online',  role: 'admin' },
  { id: 'priya',  initials: 'PS', name: 'Priya Singh',   avatarBg: '#FBEAF0', avatarColor: '#993556', status: 'online',  role: 'member' },
  { id: 'marcus', initials: 'MJ', name: 'Marcus Jones',  avatarBg: '#E6F1FB', avatarColor: '#0C447C', status: 'online',  role: 'member' },
  { id: 'lena',   initials: 'LT', name: 'Lena Torres',   avatarBg: '#EAF3DE', avatarColor: '#27500A', status: 'online',  role: 'member' },
  { id: 'you',    initials: 'YO', name: 'You',           avatarBg: '#EEEDFE', avatarColor: '#3C3489', status: 'online',  role: 'member' },
  { id: 'carlos', initials: 'CR', name: 'Carlos Rivera', avatarBg: '#FAEEDA', avatarColor: '#854F0B', status: 'away',    role: 'member' },
  { id: 'bea',    initials: 'BN', name: 'Bea Nguyen',    avatarBg: '#FAECE7', avatarColor: '#993C1D', status: 'away',    role: 'member' },
  { id: 'jane',   initials: 'JL', name: 'Jane Liu',      avatarBg: '#EEEDFE', avatarColor: '#3C3489', status: 'offline', role: 'member' },
  { id: 'ryan',   initials: 'RB', name: 'Ryan Brooks',   avatarBg: '#F1EFE8', avatarColor: '#444441', status: 'offline', role: 'member' },
  { id: 'omar',   initials: 'OM', name: 'Omar Malik',    avatarBg: '#F1EFE8', avatarColor: '#444441', status: 'offline', role: 'member' },
];

export const ME = MEMBERS.find(m => m.id === 'you');

// ─── Bot reply pools ───────────────────────────────────────────────────────────
export const BOT_REPLIES = {
  general: [
    { memberId: 'alex',   texts: ['Sounds good!', 'Thanks for the update 👍', 'Got it, will review shortly.', 'On it!'] },
    { memberId: 'priya',  texts: ['Great point!', "I'll take a look now.", 'Makes sense 🎨', 'Thanks!'] },
  ],
  engineering: [
    { memberId: 'marcus', texts: ['Reviewed ✅', 'Looks clean, LGTM.', 'Good catch!', 'PR is up.'] },
  ],
  design: [
    { memberId: 'priya',  texts: ['Love the direction!', 'Updated in Figma 🎨', 'Nice!'] },
  ],
  random: [
    { memberId: 'carlos', texts: ['Haha 😂', 'True!', 'Same here!', '😄'] },
  ],
  'dm-alex':  [{ memberId: 'alex',  texts: ['Sounds good, see you then!', 'Perfect 👍', 'On it.', 'Thanks!'] }],
  'dm-priya': [{ memberId: 'priya', texts: ['Happy to help!', 'Let me know if you need anything else.', 'Great!'] }],
};

// ─── Rooms ────────────────────────────────────────────────────────────────────
export const ROOMS = [
  {
    id: 'general',
    type: 'channel',
    icon: 'ti-hash',
    name: 'general',
    meta: '24 members · Team-wide announcements and updates',
    memberIds: ['alex', 'priya', 'marcus', 'lena', 'you', 'carlos', 'bea', 'jane', 'ryan', 'omar'],
    messages: [
      { id: 1, authorId: 'alex',   time: '9:02 AM', text: 'Good morning everyone! 👋 Standup in 30 minutes.', reactions: [{ e: '👋', n: 3, mine: false }, { e: '☀️', n: 2, mine: false }] },
      { id: 2, authorId: 'priya',  time: '9:04 AM', text: "I'll have the new dashboard mockups ready before then.", reactions: [] },
      { id: 3, authorId: 'marcus', time: '9:06 AM', text: 'Just pushed the API changes. Should be ready for review. Tagging @Priya for the front-end integration.', reactions: [{ e: '🚀', n: 1, mine: false }] },
      { id: 4, authorId: 'priya',  time: '9:08 AM', type: 'file', fileName: 'dashboard-v3.fig', fileSize: '4.2 MB', fileIcon: 'ti-vector', reactions: [] },
      { id: 5, authorId: 'lena',   time: '9:09 AM', text: 'Looks great! Love the new color palette on the charts.', reactions: [{ e: '❤️', n: 2, mine: true }] },
      { id: 6, authorId: 'alex',   time: '9:11 AM', type: 'image', text: 'Quick screenshot from staging:', reactions: [] },
    ],
  },
  {
    id: 'design',
    type: 'channel',
    icon: 'ti-brush',
    name: 'design',
    meta: '8 members · UI/UX and visual design work',
    memberIds: ['alex', 'priya', 'lena', 'you', 'bea', 'jane'],
    messages: [
      { id: 1, authorId: 'priya', time: '8:45 AM', text: 'Shared the new icon set in Figma. Check the community file!', reactions: [{ e: '🎨', n: 4, mine: false }] },
      { id: 2, authorId: 'lena',  time: '8:50 AM', text: 'The rounded corners on the nav items look much better. Good call switching from 4px to 8px.', reactions: [] },
      { id: 3, authorId: 'priya', time: '8:52 AM', type: 'file', fileName: 'icon-set-v2.zip', fileSize: '12.8 MB', fileIcon: 'ti-folder-zip', reactions: [] },
    ],
  },
  {
    id: 'engineering',
    type: 'channel',
    icon: 'ti-code',
    name: 'engineering',
    meta: '12 members · Engineering discussions and code reviews',
    memberIds: ['alex', 'marcus', 'you', 'carlos', 'ryan', 'omar'],
    messages: [
      { id: 1, authorId: 'marcus', time: '8:30 AM', text: 'PR #247 is up for review — rewrote the auth middleware to support refresh tokens. Only one breaking change in the session schema.', reactions: [] },
      { id: 2, authorId: 'carlos', time: '8:35 AM', text: 'On it. Quick question — did you run the integration tests against the staging DB?', reactions: [] },
      { id: 3, authorId: 'marcus', time: '8:37 AM', text: 'Yes, all passing. CI is green 🟢', reactions: [{ e: '✅', n: 2, mine: false }] },
    ],
  },
  {
    id: 'random',
    type: 'channel',
    icon: 'ti-confetti',
    name: 'random',
    meta: '24 members · Off-topic chatter',
    memberIds: ['alex', 'priya', 'marcus', 'lena', 'you', 'carlos', 'bea'],
    messages: [
      { id: 1, authorId: 'carlos', time: 'Yesterday',       text: 'Anyone catch the game last night? 🏀', reactions: [{ e: '🏀', n: 3, mine: false }] },
      { id: 2, authorId: 'bea',    time: 'Yesterday',       text: 'Yes! That last quarter was insane.', reactions: [{ e: '🔥', n: 5, mine: false }] },
      { id: 3, authorId: 'lena',   time: 'Today 8:00 AM',   text: 'Good morning coffee crew ☕', reactions: [{ e: '☕', n: 4, mine: true }] },
    ],
  },
  {
    id: 'announcements',
    type: 'channel',
    icon: 'ti-speakerphone',
    name: 'announcements',
    meta: '24 members · Company-wide announcements',
    memberIds: ['alex', 'priya', 'marcus', 'lena', 'you', 'carlos', 'bea', 'jane', 'ryan', 'omar'],
    messages: [
      { id: 1, authorId: 'alex', time: 'Mon 10:00 AM', text: "🎉 We've hit 10,000 users! Thank you all for the incredible work. Celebrating with lunch on us tomorrow — details in the invite.", reactions: [{ e: '🎉', n: 12, mine: true }, { e: '🙌', n: 8, mine: false }, { e: '❤️', n: 6, mine: false }] },
    ],
  },
];

export const DMS = [
  {
    id: 'dm-alex',
    type: 'dm',
    icon: 'ti-user',
    memberId: 'alex',
    meta: 'Active now',
    messages: [
      { id: 1, authorId: 'alex', time: '9:00 AM', text: 'Hey! Did you get a chance to review the Q3 roadmap doc?', reactions: [] },
      { id: 2, authorId: 'you',  time: '9:01 AM', text: 'Yes, just finished reading it. Some great priorities there.', reactions: [] },
      { id: 3, authorId: 'alex', time: '9:03 AM', text: "Great! Let's sync before standup to align on the messaging.", reactions: [{ e: '👍', n: 1, mine: true }] },
    ],
  },
  {
    id: 'dm-priya',
    type: 'dm',
    icon: 'ti-user',
    memberId: 'priya',
    meta: 'Active now',
    messages: [
      { id: 1, authorId: 'priya', time: '8:55 AM', text: "Hey, quick FYI — I've updated the component library docs. Shared access in the team drive.", reactions: [] },
      { id: 2, authorId: 'you',   time: '8:57 AM', text: 'Awesome, thanks for keeping that updated!', reactions: [{ e: '🙏', n: 1, mine: false }] },
    ],
  },
  {
    id: 'dm-carlos',
    type: 'dm',
    icon: 'ti-user',
    memberId: 'carlos',
    meta: 'Away',
    messages: [
      { id: 1, authorId: 'carlos', time: 'Yesterday 4:30 PM', text: 'Heading out early today, back tomorrow.', reactions: [] },
    ],
  },
  {
    id: 'dm-jane',
    type: 'dm',
    icon: 'ti-user',
    memberId: 'jane',
    meta: 'Offline',
    messages: [
      { id: 1, authorId: 'jane', time: '2 days ago', text: 'OOO this week, back Monday!', reactions: [] },
    ],
  },
];

export const EMOJIS = ['😊','👍','🎉','🔥','❤️','😂','🚀','💡','✅','😮','🙌','💯','👀','🎨','🛠️','📎'];

export const FILE_ICON_MAP = {
  pdf: 'ti-file-type-pdf',
  zip: 'ti-folder-zip',
  doc: 'ti-file-type-doc',
  docx: 'ti-file-type-doc',
  xls: 'ti-file-type-xls',
  xlsx: 'ti-file-type-xls',
  fig: 'ti-vector',
  sketch: 'ti-vector',
  mp4: 'ti-video',
  mp3: 'ti-music',
};
