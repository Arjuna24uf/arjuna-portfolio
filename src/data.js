// ============================================================
//  Semua konten portfolio ada di sini. Edit file ini saja
//  kalau mau ganti teks, link, project, dll.
// ============================================================

// Isi dengan Access Key dari https://web3forms.com agar form kontak
// mengirim langsung ke email. Jika kosong, form akan membuka WhatsApp.
export const WEB3FORMS_KEY = ''

export const profile = {
  name: 'Arjuna Rauf Surya Putra',
  shortName: 'ARJUNA',
  role: 'Informatics Student',
  roles: ['Informatics Student', 'Aspiring Web Developer', 'Content Creator', 'Personal Trainer'],
  intro:
    'an Informatics Student who is passionate about technology, creativity, and self-development.',
  email: 'arjunarauf05@gmail.com',
  phone: '+62 878-1974-3600',
  whatsapp: '6287819743600',
  location: 'Kunciran Indah, Pinang, Tangerang',
  cv: '/files/CV-Arjuna-Rauf.pdf',
}

export const socials = [
  { name: 'TikTok', icon: 'tiktok', url: 'https://www.tiktok.com/@arjuna.r_01' },
  { name: 'YouTube', icon: 'youtube', url: 'https://youtube.com/@a4a-ai' },
  { name: 'GitHub', icon: 'github', url: 'https://github.com/Arjuna24uf' },
  { name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/arjuna-rauf-surya-putra-25730a310' },
  { name: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/ajun33333' },
]

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export const about = {
  text: [
    'A third-semester Informatics student at Universitas Pamulang (UNPAM), passionate about web development, digital content, and creative problem-solving.',
    'Outside the code editor, I coach people as a Personal Trainer and build audiences as a Content Creator on TikTok & YouTube. Discipline from the gym, storytelling from content, and logic from code — that is how I build.',
  ],
  cards: [
    { icon: 'cap', title: 'Education', text: 'Universitas Pamulang — Informatics Engineering' },
    { icon: 'code', title: 'Focus', text: 'Web Development & Digital Content' },
    { icon: 'star', title: 'Personal Interest', text: 'Fitness & Sports, Content Creation, Digital Creativity' },
  ],
  stats: [
    { value: 40.6, suffix: 'K', decimals: 1, label: 'YouTube Subscribers' },
    { value: 1, suffix: 'M+', decimals: 0, label: 'TikTok Likes' },
    { value: 23.4, suffix: 'K', decimals: 1, label: 'TikTok Followers' },
    { value: 3, suffix: '', decimals: 0, label: 'Live Web Projects' },
  ],
}

export const experiences = [
  {
    period: 'Sep 2025 — Present',
    role: 'Cashier & Personal Trainer',
    company: 'AkhibroGYM',
    type: 'Part-time',
    points: [
      'Handled payment transactions and member administration.',
      'Provided training consultation and coaching for members.',
      'Promoted membership packages and personal trainer services.',
      'Managed member data and training schedules.',
    ],
  },
  {
    period: 'Ongoing',
    role: 'Content Creator',
    company: 'TikTok & YouTube',
    type: 'Self-employed',
    points: [
      'Created and edited video content — 1M+ likes on TikTok, 40.6K subscribers on YouTube (A4A-AI).',
      'Managed social media independently and built a personal brand.',
      'Applied digital marketing basics and social media algorithms.',
    ],
  },
  {
    period: 'Sep 2024 — Jan 2025',
    role: 'Cashier & Baker',
    company: 'Rotibo',
    type: 'Full-time',
    points: [
      'Served customers and handled sales transactions.',
      'Supported outlet operations and stock management.',
      'Rotated between outlets based on operational needs.',
    ],
  },
  {
    period: 'Oct 2022 — Jan 2023',
    role: 'Technician (Internship)',
    company: 'Bless CCTV',
    type: 'Internship',
    points: [
      'Installed and maintained CCTV systems.',
      'Troubleshot CCTV devices on site.',
      'Managed technician equipment inventory.',
    ],
  },
  {
    period: 'Jul 2022 — Sep 2022',
    role: 'Cashier & Personal Trainer',
    company: 'AkhibroGYM',
    type: 'Part-time',
    points: [
      'Served members, handled transactions, and assisted training sessions.',
      'Maintained good relationships to improve member satisfaction.',
    ],
  },
]

export const education = [
  {
    period: '2025 — Present',
    title: 'S1 Informatics Engineering',
    place: 'Universitas Pamulang (UNPAM) — Reguler A',
    text: 'Active in organizations and self-development in technology and digital fields.',
  },
  {
    period: '2021 — 2024',
    title: 'Computer & Network Engineering (TKJ)',
    place: 'SMK KI Hajar Dewantoro',
    text: 'Networking, hardware, and the foundation of my journey into tech.',
  },
]

export const projects = [
  {
    id: 'coacharjuna',
    featured: true,
    category: 'Web App',
    title: 'CoachArjuna',
    subtitle: 'Personal Trainer Management System',
    badge: 'Deployed',
    image: '/images/project-coacharjuna.jpg',
    description:
      'A dashboard I built to solve my own problem as a Personal Trainer — tracking clients, sessions, workout logs, and package quotas in one place instead of scattered notes.',
    features: [
      'Live dashboard: active members, today’s sessions, low-quota alerts',
      'Quick workout logger — exercise, sets, reps, load & tempo',
      'Client progress: session quota & total lifting volume',
      'Schedules, packages & renewal reminders',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Vercel'],
    demo: 'https://coach-arjuna-pt-management-system.vercel.app/',
    repo: null,
  },
  {
    id: 'isc',
    category: 'Website',
    title: 'Informatics Study Club',
    subtitle: 'Organization Website',
    badge: 'Organization',
    image: '/images/project-isc.jpg',
    description: 'Profile website for a student study club — “Bersama, Berkembang, Berdampak.” Vision, divisions, and a join call-to-action.',
    tech: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    demo: 'https://arjuna24uf.github.io/ISC_Profile/',
    repo: 'https://github.com/Arjuna24uf/ISC_Profile',
  },
  {
    id: 'xfitness',
    category: 'Website',
    title: 'X-Fitness',
    subtitle: 'Gym Landing Page',
    badge: 'Landing Page',
    image: '/images/project-xfitness.jpg',
    description: 'Bold landing page for a gym — programs, trainers, pricing, and contact, designed to convert visitors into members.',
    tech: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    demo: 'https://arjuna24uf.github.io/X-Fitnes/',
    repo: 'https://github.com/Arjuna24uf/X-Fitnes',
  },
  {
    id: 'a4a',
    category: 'Content',
    title: 'A4A-AI',
    subtitle: 'YouTube Channel — AI Animation',
    badge: '40.6K Subs',
    visual: 'youtube',
    description: 'AI-generated animated storytelling channel. Scripting, generating, editing, and growing an audience from zero.',
    tech: ['AI Tools', 'Video Editing', 'Storytelling'],
    demo: 'https://youtube.com/@a4a-ai',
    repo: null,
  },
  {
    id: 'tiktok',
    category: 'Content',
    title: '@arjuna.r_01',
    subtitle: 'TikTok — Fitness Content',
    badge: '1M+ Likes',
    visual: 'tiktok',
    description: 'Fitness & gym lifestyle content. “Always Natural!!” — 23.4K followers and a top video with 2M views.',
    tech: ['Short-form Video', 'Personal Branding', 'Fitness'],
    demo: 'https://www.tiktok.com/@arjuna.r_01',
    repo: null,
  },
]

export const projectFilters = ['All', 'Web App', 'Website', 'Content']

export const skills = {
  using: [
    'HTML', 'CSS', 'JavaScript', 'Node.js (basic)', 'Git & GitHub', 'Vercel', 'GitHub Pages', 'Computer Networking', 'CCTV Systems',
  ],
  learning: ['React', 'Vite', 'Three.js', 'UI/UX Design'],
  creative: ['Video Editing', 'Content Creation', 'Social Media Management', 'Digital Marketing', 'Graphic Design (basic)', 'AI Tools'],
  soft: ['Communication', 'Customer Service', 'Coaching', 'Discipline', 'Teamwork', 'Fast Learner'],
}
