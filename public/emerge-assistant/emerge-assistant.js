/*!
 * EMERGE AURO Assistant - help chat for emergestartupfest.com
 *
 * Rule-based on purpose: no AI service, no per-message cost, nothing sent to a
 * third party. Questions are matched against the knowledge base below: phrases
 * score highest, then keywords, which tolerate small typos ("regstration",
 * "dats"). Up to two topics are answered per question.
 *
 * To change what it knows, edit DEFAULTS, PEOPLE and INTENTS in this file.
 * Site settings can also be overridden without editing it, by defining
 * window.EmergeAssistantConfig before this script loads (see README.md).
 *
 * The engine has no DOM dependency, so test/engine.test.js runs it in Node.
 */
(function (root) {
  'use strict';

  // Read now: document.currentScript is only set while this file is executing.
  const SCRIPT_SRC = (typeof document !== 'undefined' && document.currentScript && document.currentScript.src) || '';

  /* ============================================================ settings */

  const DEFAULTS = {
    title: 'EMERGE Assistant',
    subtitle: 'Answers about EMERGE AURO 2026',
    registerUrl: 'https://forms.zohopublic.in/infosectio1/form/ClientDetails/formperma/Ou2moWIn4JWNQPOqsPB0tHxOEBFwqaz3oXxgB1h3Sms',
    contactUrl: '/#contact',
    agendaUrl: '/#agenda',
    speakersUrl: '/#speakers',
    venueUrl: '/#venue',
    sponsorsUrl: '/sponsors',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=2R43%2BMZX%20Auroville%20Tamil%20Nadu',
    universityUrl: 'https://www.pondiuni.edu.in/',
    timeZone: 'Asia/Kolkata',
    // Prices exclude GST. Keep these in step with the registration form.
    passes: [
      { name: 'Delegate Pass', price: 1999, unit: 'per person' },
      { name: 'Startup Pass', price: 3999, unit: 'per founder' }
    ],
    stalls: [
      { name: 'Purpose Desk (desk setup)', price: 8000 },
      { name: 'Steward Space (3 m × 2 m)', price: 20000 },
      { name: 'Legacy Stall (3 m × 3 m)', price: 30000 }
    ],
    days: {
      day1: '2026-10-28',
      day2: '2026-12-05',
      day3: '2026-12-06'
    },
    cssUrl: '',
    openOnLoad: false,
    onEvent: null
  };

  const CFG = Object.assign({}, DEFAULTS, root.EmergeAssistantConfig || {});

  /* ============================================================ knowledge */

  // group: 'speaker' appears in the speakers list; every entry can be asked about by name.
  const PEOPLE = [
    { name: 'Dr. Jayanti S. Ravi, IAS', role: 'Secretary, Auroville Foundation, and Additional Chief Secretary, Revenue Department, Govt of Gujarat', group: 'speaker' },
    { name: 'Dr CK Ashok Kumar', role: 'Chairperson, EMERGE AURO 2026, and Founder, First World Community', group: 'speaker' },
    { name: 'Prof. (Dr.) P. Prakash Babu', role: 'Vice-Chancellor, Pondicherry University', group: 'speaker' },
    { name: 'Prof (Dr.) Y Venkata Rao', role: 'Professor, Tourism Studies, and Dean of Students’ Welfare, Pondicherry University', group: 'speaker' },
    { name: 'Swami Nityeshananda', role: 'Monk-in-Charge, Ramakrishna Math, Puducherry', group: 'speaker' },
    { name: 'C K Kumaravel', role: 'Co-founder & CMD, Naturals Salon & Spa', group: 'speaker' },
    { name: 'R. Mananathan', role: 'Chairman, Manatec Group', group: 'speaker' },
    { name: 'Ezhilmaran Arumugam', role: 'Director, Axis Global Automation', group: 'speaker' },
    { name: 'Sivakumar Govindassamy', role: 'Founder & CEO, IINVYSYS', group: 'speaker' },
    { name: 'Saravanan Sundaramoorthy', role: 'Founder, Skill Angels, and Convenor, FICCI Puducherry', group: 'speaker' },
    { name: 'Dr. Sapna Poti', role: 'Director, Strategic Alliances, Office of the Principal Scientific Adviser, GOI', group: 'speaker' },
    { name: 'Sundararaman M', role: 'Veteran technologist and industrial entrepreneur', group: 'speaker' },
    { name: 'Dr (Inv) Shivakiran Makam', role: 'Co-Convenor, EMERGE AURO 2026, and Director, Strategy & Collaboration, Section Infin-8 Foundation', group: 'speaker' },
    { name: 'Anand Kannan', role: 'National Director, IFIA Bharath', group: 'speaker' },
    { name: 'Dr. Selvarajan', role: 'Senior Consultant Paediatric Surgeon', group: 'speaker' },
    { name: 'Dr Badri Narayanan Gopalakrishnan', role: 'Fellow, NITI Aayog, GOI', group: 'speaker' },
    { name: 'Dr Vishal Rao', role: 'Chief, Head & Neck Surgical Oncology, HCG Cancer Centre', group: 'speaker' },
    { name: 'Chandra Mishra', role: 'Founder, Beggars Corporation', group: 'speaker' },
    { name: 'Mohammed Azhar', role: 'Entrepreneurship Lead, TechnoServe', group: 'speaker' },
    { name: 'Shalabh Mittal', role: 'CEO, School of Social Entrepreneurs', group: 'speaker' },
    { name: 'Vishwas US', role: 'Founder Director, Section Infin8 Foundation (organising team)', group: 'team' },
    { name: 'Desika Prabhakar', role: 'Founder, Director, DPurpose Foundation (organising team)', group: 'team' },
    { name: 'Aravind C Kumar', role: 'CEO, Section Infin8 Foundation (organising team)', group: 'team' },
    { name: 'Vishwanathan', role: 'First World Community (organising team)', group: 'team' },
    { name: 'Ashok Reddy', role: 'First World Community (organising team)', group: 'team' },
    { name: 'Senthil K Kumar', role: 'Strategic Advisor, Section Infin8 Foundation (organising team)', group: 'team' },
    { name: 'M. Kishore Menon', role: 'Veteran brand strategist; board member, Biosfera Foundation and Valley of Words Foundation Trust (organising team)', group: 'team' }
  ];

  const rupees = (n) => '₹' + Number(n).toLocaleString('en-IN');
  const passLines = () => CFG.passes.map((p) => `• ${p.name}: ${rupees(p.price)}${p.unit ? ' ' + p.unit : ''}`).join('\n');
  const stallLines = () => CFG.stalls.map((s) => `• ${s.name}: ${rupees(s.price)}`).join('\n');

  const DAY1 = '**Day 1: Submerge** (Wed 28 Oct, Pondicherry University): official inauguration with the Vice-Chancellor and chief guest, the Conscious Capital keynote, the School Science Model Competition, an IPR and research commercialisation showcase, and the Innovation Challenge finale.';
  const DAY2 = '**Day 2: Merge** (Sat 5 Dec, Bharat Nivas, Auroville): the startup showcase opens, a deal lounge with pre-scheduled investor 1:1s, founder masterclasses (fundraising, go-to-market, impact, ESG), and startup pitches batch 1 with live investor reactions.';
  const DAY3 = '**Day 3: Emerge** (Sun 6 Dec, Bharat Nivas, Auroville): dawn practice and yoga, the final showcase day with the deal lounge and due-diligence clinics, startup pitches batch 2, and the closing keynote with a multicultural send-off.';

  // Each intent: phrases (strongest), keywords, an answer (text or function of ctx),
  // optional links (keys of LINKS), next (suggested follow-ups) and covers (intents
  // whose content this answer already includes, so they are not answered twice).
  // small: greetings and thanks, which never win over a real question.
  const INTENTS = [
    {
      id: 'greet', small: true,
      phrases: ['good morning', 'good afternoon', 'good evening', 'hey there'],
      keywords: ['hi', 'hello', 'hey', 'hii', 'hola', 'namaste', 'vanakkam'],
      answer: 'Hello! 👋 I can help with dates, venues, passes, the agenda, speakers and registration for EMERGE AURO 2026.',
      next: ['dates', 'passes', 'register', 'venue']
    },
    {
      id: 'thanks', small: true,
      phrases: ['thank you', 'thanks a lot', 'that helped', 'got it'],
      keywords: ['thanks', 'thank', 'thx', 'ty', 'great', 'awesome', 'cool', 'ok', 'okay', 'perfect'],
      answer: 'You’re welcome! Anything else about EMERGE AURO?',
      next: ['register', 'agenda', 'contact']
    },
    {
      id: 'bye', small: true,
      phrases: ['see you', 'good bye'],
      keywords: ['bye', 'goodbye', 'cya'],
      answer: 'Thanks for visiting. See you at EMERGE AURO!',
      next: ['register']
    },
    {
      id: 'help',
      phrases: ['what can you do', 'how can you help', 'what do you know', 'help me'],
      keywords: ['help', 'menu', 'options', 'assistant', 'bot', 'topics'],
      answer: 'I can answer questions about:\n• Dates, venues and directions\n• Passes, stalls and prices\n• Registration and payment\n• The agenda, speakers and organisers\n• Becoming an Enabler (sponsor)\n\nType a question or tap a topic below.',
      next: ['dates', 'passes', 'register', 'agenda', 'speakers', 'sponsors']
    },
    {
      id: 'dates',
      phrases: ['when is it', 'when is the event', 'when is emerge', 'when does it start', 'when does it happen', 'what are the dates','which dates', 'event date', 'how many days left', 'days left', 'how long until', 'how many days to go'],
      keywords: ['date', 'dates', 'when', 'dec', 'oct', 'countdown', 'timing', 'timings', 'days', 'day', 'month', 'year'],
      answer: (c) => `**EMERGE AURO 2026** runs across three days:\n• Day 1 (Submerge): Wed 28 Oct 2026, Pondicherry University\n• Day 2 (Merge): Sat 5 Dec 2026, Bharat Nivas, Auroville\n• Day 3 (Emerge): Sun 6 Dec 2026, Bharat Nivas, Auroville\n\n${c.countdown()}`,
      next: ['venue', 'agenda', 'register']
    },
    {
      id: 'about',
      phrases: ['what is emerge auro', 'what is emerge', 'what is this event', 'about the event', 'about the conclave', 'tell me about', 'conscious capital', 'conscious capitalism'],
      keywords: ['about', 'conscious', 'capitalism', 'mission', 'purpose', 'theme', 'overview', 'event', 'conclave', 'fest', 'festival'],
      answer: '**EMERGE AURO** is Bharat’s first Conscious Capital Conclave: three days that put startup founders at the centre, alongside investors, institutions, policy makers and students. It brings together businesses that create value for people, planet and shared prosperity, grounded in Auroville’s practice of human unity and ecological stewardship.\n\nIt is “not an expo, not a pitch competition”, but a working laboratory of conscious commerce, built to produce commitments that outlast the weekend.',
      next: ['dates', 'audience', 'agenda', 'register']
    },
    {
      id: 'audience',
      phrases: ['who can attend', 'who should attend', 'who is it for', 'why should i attend', 'why attend', 'is it for me', 'can i attend'],
      keywords: ['audience', 'eligible', 'eligibility', 'benefit', 'benefits', 'why', 'attendees', 'participants'],
      answer: 'EMERGE AURO brings together:\n• **Startups**: find capital, customers, mentors and partners\n• **Investors**: find startups that combine purpose with potential\n• **Industries**: discover the next generation of ideas and businesses\n• **Students**: solve real problems and build something that matters\n• **Policy makers**: shape the policy architecture conscious capital needs\n• **Media**: amplify purpose-driven stories',
      next: ['startups', 'investors', 'students', 'passes']
    },
    {
      id: 'venue',
      phrases: ['where is it', 'where is the event', 'where is emerge', 'which place','which city', 'venue address', 'where will it be held', 'where is it held'],
      keywords: ['venue', 'venues', 'where', 'location', 'address', 'place', 'held', 'auroville', 'nivas', 'pavilion', 'campus', 'pincode'],
      answer: '**Days 2 & 3 (5–6 Dec 2026):** Bharat Nivas, the Pavilion of Bharat in Auroville International Township, Irumbai, Tamil Nadu 605101 (Plus Code 2R43+MZX). It has an open-air amphitheatre and modern auditorium halls on a solar-powered campus.\n\n**Day 1 (28 Oct 2026):** Pondicherry University.',
      links: ['map', 'venue'],
      next: ['directions', 'dates', 'agenda']
    },
    {
      id: 'directions',
      phrases: ['how to reach', 'how do i reach', 'how to get there', 'how do i get there', 'how to come', 'get directions', 'google map', 'google maps'],
      keywords: ['directions', 'direction', 'reach', 'route', 'map', 'maps', 'travel', 'transport', 'bus', 'taxi', 'cab', 'train', 'airport', 'nearest'],
      answer: 'Bharat Nivas is in Auroville, Tamil Nadu (Plus Code **2R43+MZX**). Open the map below for directions from where you are. Day 1 is at the Pondicherry University campus in Puducherry.',
      links: ['map', 'university'],
      next: ['venue', 'logistics']
    },
    {
      id: 'agenda',
      phrases: ['full schedule', 'event schedule', 'what is the plan', 'list of sessions'],
      keywords: ['what happens', 'agenda','schedule', 'program', 'itinerary', 'sessions', 'session', 'plan', 'lineup', 'activities', 'journey'],
      answer: `${DAY1}\n\n${DAY2}\n\n${DAY3}\n\nRDI Fund and policy clinics also run across Days 2 and 3.`,
      covers: ['day1', 'day2', 'day3'],
      links: ['agenda'],
      next: ['speakers', 'passes', 'register']
    },
    {
      id: 'day1',
      phrases: ['day 1', 'day one', 'first day', '28 oct', 'oct 28', 'submerge', 'inauguration'],
      keywords: ['submerge', 'inauguration', 'inaugural', 'opening'],
      answer: (c) => DAY1 + (c.isPast('day1') ? '\n\nDay 1 has already taken place. Days 2 and 3 follow on 5–6 Dec in Auroville.' : ''),
      links: ['agenda'],
      next: ['day2', 'students', 'venue']
    },
    {
      id: 'day2',
      phrases: ['day 2', 'day two', 'second day', '5 dec', 'dec 5', 'merge day', 'on saturday'],
      keywords: ['merge', 'saturday'],
      answer: DAY2,
      links: ['agenda'],
      next: ['day3', 'startups', 'investors']
    },
    {
      id: 'day3',
      phrases: ['day 3', 'day three', 'third day', 'last day', 'final day', '6 dec', 'dec 6', 'emerge day', 'on sunday', 'closing day'],
      keywords: ['sunday', 'closing', 'yoga', 'dawn'],
      answer: DAY3,
      links: ['agenda'],
      next: ['day2', 'register']
    },
    {
      id: 'passes',
      phrases: ['how much', 'ticket price', 'pass price', 'entry fee', 'registration fee', 'cost of', 'price of', 'is it free'],
      keywords: ['pass', 'passes', 'ticket', 'tickets', 'price', 'prices', 'pricing', 'cost', 'costs', 'fee', 'fees', 'charge', 'charges', 'delegate', 'rupees', 'rs', 'inr', 'amount', 'free'],
      answer: () => `**Passes** (GST extra):\n${passLines()}\n\n**Exhibitor spaces** (GST extra):\n${stallLines()}\n\nChoose your category and pay online on the registration form.`,
      covers: ['stalls'],
      links: ['register'],
      next: ['register', 'payment', 'sponsors']
    },
    {
      id: 'stalls',
      phrases: ['book a stall', 'stall booking', 'exhibition space', 'exhibit my', 'exhibitor space'],
      keywords: ['stall', 'stalls', 'exhibit', 'exhibitor', 'exhibitors', 'exhibition', 'booth', 'booths', 'desk', 'space', 'expo'],
      answer: () => `Exhibitor spaces (GST extra):\n${stallLines()}\n\nPick your space under **Select Registration Category** on the registration form, then pay online.`,
      covers: ['passes'],
      links: ['register'],
      next: ['payment', 'sponsors', 'contact']
    },
    {
      id: 'register',
      phrases: ['how to register', 'how do i register', 'how can i register', 'sign up', 'book a pass', 'buy a pass', 'buy ticket', 'buy tickets', 'registration link', 'register now'],
      keywords: ['register', 'registration', 'signup', 'enrol', 'enroll', 'book', 'booking', 'buy', 'join', 'attend', 'participate', 'apply', 'form'],
      answer: 'Register on the official registration form:\n1. Choose your registration category.\n2. Fill in your name, email, phone, organisation and job designation. Add your GSTIN if you want it on the invoice (optional).\n3. Pay online on the next page.',
      links: ['register'],
      next: ['passes', 'payment', 'contact']
    },
    {
      id: 'payment',
      phrases: ['how to pay', 'how do i pay', 'payment method', 'payment methods', 'pay online', 'payment failed', 'payment issue'],
      keywords: ['pay', 'payment', 'payments', 'upi', 'card', 'razorpay', 'netbanking', 'gst', 'gstin', 'invoice', 'receipt', 'bill', 'billing', 'transaction'],
      answer: 'Payment is made online on the registration form through **Razorpay**, a secure payment gateway. The payment methods available are shown at checkout. GST is added to the listed prices, and you can enter your GSTIN and invoice name on the form.\n\nIf a payment fails or you were charged twice, contact the team. Never share card numbers, UPI PINs or OTPs in a chat.',
      links: ['register', 'contact'],
      next: ['passes', 'refund']
    },
    {
      id: 'refund',
      phrases: ['get a refund', 'refund policy', 'money back', 'cancel my registration', 'cancel my pass', 'cancel my booking'],
      keywords: ['refund', 'refunds', 'cancel', 'cancellation', 'cancelled', 'reschedule', 'transfer'],
      answer: 'Refunds, cancellations and pass transfers are handled by the organising team. Please write to them through **Get in touch** with your name, the email you registered with, and your payment reference. Never send card details.',
      links: ['contact'],
      next: ['payment', 'contact']
    },
    {
      id: 'sponsors',
      phrases: ['become a sponsor', 'become an enabler', 'partner with', 'sponsorship packages', 'partnership opportunities'],
      keywords: ['sponsor', 'sponsors', 'sponsorship', 'enabler', 'enablers', 'partner', 'partnership', 'tier', 'tiers', 'founding', 'catalyst', 'csr'],
      answer: 'Organisations can partner as an **Enabler** at four levels: **Enabling Partner**, **Impact Partner**, **Catalyst Partner** and **Founding Partner**.\n\nDepending on the level, benefits include logo placement on the website and mainstage partner wall, social media features (1 to 6 posts), a branded on-site zone, complimentary passes (2 to 6), reserved seating, a main-stage keynote, a Leadership Roundtable seat, an Innovation Challenge jury seat, and the networking dinner on 5 Dec.\n\nPrices aren’t listed online, so ask the team for details.',
      links: ['sponsors', 'contact'],
      next: ['stalls', 'contact']
    },
    {
      id: 'speakers',
      phrases: ['who are the speakers', 'who is speaking', 'keynote speakers', 'chief guest', 'list of speakers'],
      keywords: ['speaker', 'speakers', 'speaking', 'keynote', 'keynotes', 'panelists', 'panelist', 'panel', 'guests', 'guest', 'voices'],
      answer: () => {
        const speakers = PEOPLE.filter((p) => p.group === 'speaker');
        const shown = speakers.slice(0, 7).map((p) => `• ${p.name}: ${p.role}`).join('\n');
        return `Speakers include:\n${shown}\n\n…and ${speakers.length - 7} more. Ask me about anyone by name.`;
      },
      links: ['speakers'],
      next: ['leaders', 'agenda']
    },
    {
      id: 'leaders',
      phrases: ['who is the chairperson', 'chair of', 'founder of fwc', 'who leads', 'who is behind'],
      keywords: ['chairperson', 'chairman', 'chair', 'convenor', 'convener', 'leaders', 'leadership', 'head'],
      answer: '• **Dr CK Ashok Kumar**: Chairperson, EMERGE AURO 2026, and Founder, First World Community\n• **Dr Shivakiran Makam**: Co-Convenor, EMERGE AURO 2026, and Director, Strategy & Collaboration, Section Infin-8 Foundation\n• **Dr. Jayanti S. Ravi, IAS**: Secretary, Auroville Foundation',
      next: ['organisers', 'speakers']
    },
    {
      id: 'organisers',
      phrases: ['who is organizing', 'who organizes', 'organized by', 'first world community', 'section infin8', 'section infin 8'],
      keywords: ['organizer', 'organizers', 'organizing', 'organized', 'organize', 'host', 'hosts', 'team', 'fwc', 'infin8', 'infin', 'si8', 'utthan', 'ecosystem'],
      answer: 'EMERGE AURO is organised by:\n• **Section Infin8 Foundation (SI-8)**: architect and execution lead for the EMERGE format\n• **First World Community (FWC)**: on-ground execution lead and Puducherry implementation partner\n• **Pondicherry University**: host institution for Day 1\n• **UTTHAN**: programme partner, with the Office of the Principal Scientific Adviser to the Government of Bharat',
      next: ['leaders', 'speakers', 'contact']
    },
    {
      id: 'startups',
      phrases: ['pitch my startup', 'startup showcase', 'for startups', 'as a founder', 'raise funds', 'raise funding'],
      keywords: ['startup', 'startups', 'founder', 'founders', 'pitch', 'pitches', 'pitching', 'showcase', 'funding', 'fundraise', 'fundraising', 'entrepreneur', 'entrepreneurs'],
      answer: () => `For founders, the programme includes:\n• The startup showcase floor (Days 2 and 3)\n• Startup pitches with live investor reactions: batch 1 on Day 2, batch 2 on Day 3\n• The deal lounge with pre-scheduled investor 1:1s\n• Masterclasses on fundraising, go-to-market, impact and ESG\n\nThe **Startup Pass** is ${rupees(CFG.passes[1] ? CFG.passes[1].price : 3999)} + GST per founder. To ask about pitching or showcasing, contact the team.`,
      links: ['register'],
      next: ['investors', 'stalls', 'contact']
    },
    {
      id: 'investors',
      phrases: ['for investors', 'meet investors', 'investor meeting', 'investor meetings', 'deal lounge'],
      keywords: ['investor', 'investors', 'invest', 'investing', 'investment', 'vc', 'vcs', 'angel', 'angels', 'deal', 'deals', 'dealflow'],
      answer: 'Investors can use the **deal lounge** with pre-scheduled 1:1 meetings with startups on Day 2, return to the deal lounge and due-diligence clinics on Day 3, and watch two batches of startup pitches.\n\nTo set up 1:1s, contact the team.',
      links: ['contact'],
      next: ['startups', 'day2', 'passes']
    },
    {
      id: 'students',
      phrases: ['for students', 'science model', 'school students', 'college students'],
      keywords: ['student', 'students', 'college', 'colleges', 'school', 'schools', 'youth', 'model', 'models', 'academia', 'research', 'ipr'],
      answer: 'Day 1 at Pondicherry University features the **School Science Model Competition** (student models from schools in and around Puducherry, judged at the desk), an IPR and research commercialisation showcase, and the **Innovation Challenge** finale.\n\nFor student participation or passes, contact the team.',
      links: ['contact'],
      next: ['innovation', 'day1']
    },
    {
      id: 'innovation',
      phrases: ['innovation challenge', 'challenge finale'],
      keywords: ['challenge', 'prize', 'prizes', 'award', 'awards', 'competition', 'contest', 'jury', 'winner', 'winners'],
      answer: 'The **Innovation Challenge** finale opens the conclave on Day 1 at Pondicherry University. IINVSYS is the Innovation Challenge Prize Enabler.\n\nFor rules and entries, contact the team.',
      links: ['contact'],
      next: ['students', 'day1']
    },
    {
      id: 'masterclasses',
      phrases: ['rdi fund', 'policy clinic', 'policy clinics'],
      keywords: ['masterclass', 'masterclasses', 'workshop', 'workshops', 'clinic', 'clinics', 'rdi', 'policy', 'esg', 'gtm', 'mentor', 'mentors', 'mentoring', 'learning'],
      answer: 'Day 2 has founder **masterclasses** on fundraising, go-to-market (GTM), impact and ESG. Dedicated **RDI Fund and policy clinics** run across Days 2 and 3, and Day 3 includes due-diligence clinics.',
      links: ['agenda'],
      next: ['startups', 'agenda']
    },
    {
      id: 'networking',
      phrases: ['networking dinner'],
      keywords: ['networking', 'network', 'dinner', 'connect', 'connections', 'meet', 'meetup'],
      answer: 'Networking runs through the whole conclave: the deal lounge, the startup showcase floor and the masterclasses. A networking dinner on 5 Dec is listed among Enabler (partner) benefits.',
      next: ['investors', 'sponsors']
    },
    {
      id: 'logistics',
      phrases: ['place to stay', 'where to stay', 'is food provided', 'dress code'],
      keywords: ['accommodation', 'accomodation', 'stay', 'hotel', 'hotels', 'room', 'rooms', 'food', 'lunch', 'meals', 'meal', 'breakfast', 'parking', 'wifi', 'dress', 'visa', 'accessibility', 'wheelchair', 'certificate', 'certificates', 'volunteer', 'volunteers'],
      answer: 'I don’t have details on accommodation, food, parking, certificates or volunteering yet. Please ask the organising team through **Get in touch**.',
      links: ['contact'],
      next: ['venue', 'contact']
    },
    {
      id: 'online',
      phrases: ['attend online', 'live stream', 'watch online'],
      keywords: ['online', 'virtual', 'livestream', 'stream', 'streaming', 'recording', 'recordings', 'zoom', 'youtube', 'hybrid'],
      answer: 'The website doesn’t mention online streaming or recordings. Please check with the organising team through **Get in touch**.',
      links: ['contact'],
      next: ['venue', 'register']
    },
    {
      id: 'media',
      phrases: ['press pass', 'media pass'],
      keywords: ['media', 'press', 'journalist', 'journalists', 'coverage', 'interview', 'interviews', 'news'],
      answer: 'Media is one of the groups EMERGE AURO welcomes. For press access or interviews, write to the organising team through **Get in touch**.',
      links: ['contact'],
      next: ['speakers', 'contact']
    },
    {
      id: 'contact',
      phrases: ['talk to a human', 'talk to someone', 'speak to someone', 'contact you', 'contact the team', 'phone number', 'email address', 'customer care', 'real person'],
      keywords: ['contact', 'email', 'mail', 'phone', 'call', 'number', 'whatsapp', 'human', 'person', 'someone', 'support', 'query', 'queries', 'complaint', 'enquiry', 'inquiry'],
      answer: 'You can reach the organising team through the **Get in touch** form on the website. Add your name, email and message, and include your phone number if you’d like a call.',
      links: ['contact'],
      next: ['register', 'refund']
    }
  ];

  const CHIP_LABELS = {
    dates: 'Dates', about: 'About', audience: 'Who should attend', venue: 'Venue', directions: 'Directions',
    agenda: 'Agenda', day1: 'Day 1', day2: 'Day 2', day3: 'Day 3', passes: 'Passes & prices', stalls: 'Stalls',
    register: 'How to register', payment: 'Payment', refund: 'Refunds', sponsors: 'Become an Enabler',
    speakers: 'Speakers', leaders: 'Leaders', organisers: 'Organisers', startups: 'For startups',
    investors: 'For investors', students: 'For students', innovation: 'Innovation Challenge',
    logistics: 'Stay & food', contact: 'Talk to the team'
  };

  const WELCOME_CHIPS = ['dates', 'passes', 'register', 'venue', 'agenda', 'contact'];
  const FALLBACK_CHIPS = ['dates', 'passes', 'venue', 'agenda', 'contact'];

  function linkFor(key) {
    switch (key) {
      case 'register': return { label: 'Register now', href: CFG.registerUrl };
      case 'contact': return { label: 'Get in touch', href: CFG.contactUrl };
      case 'agenda': return { label: 'View the agenda', href: CFG.agendaUrl };
      case 'speakers': return { label: 'See all speakers', href: CFG.speakersUrl };
      case 'venue': return { label: 'Venue details', href: CFG.venueUrl };
      case 'sponsors': return { label: 'Enabler options', href: CFG.sponsorsUrl };
      case 'map': return { label: 'Open in Google Maps', href: CFG.mapUrl };
      case 'university': return { label: 'Pondicherry University', href: CFG.universityUrl };
      default: return null;
    }
  }

  /* ============================================================ engine */

  const STOP = new Set(('a an the i im me my mine we our you your u ur to of for in on at by with about from into and or ' +
    'is are am be was were do does did can could would should will shall may might please pls plz kindly ' +
    'it its this that these those there here any some all just also then than so very much more most ' +
    'what which who whom whose how tell know show give get got want need like let us emerge auro 2026 ' +
    'startupfest website site page info information details detail sir madam bro').split(' '));

  // Words that hint at a topic but should not decide it on their own.
  // "where" and "when" depend on what follows, so "where is lunch" is about food, not the venue.
  const WEAK = new Set(['event', 'conclave', 'fest', 'festival', 'day', 'days', 'form', 'space', 'head', 'meet', 'number',
    'free', 'plan', 'where', 'when']);

  // Spelling variants folded to one form, on both questions and the knowledge base.
  const CANON = {
    december: 'dec', october: 'oct', programme: 'program', programmes: 'program', programs: 'program',
    organiser: 'organizer', organisers: 'organizers', organising: 'organizing', organised: 'organized',
    organise: 'organize', organisation: 'organization', organisations: 'organization', organizations: 'organization',
    registeration: 'registration', regsitration: 'registration', tkt: 'ticket', tkts: 'tickets',
    pondy: 'pondicherry', puducherry: 'pondicherry', centre: 'center', whats: 'what', wheres: 'where', whens: 'when',
    wat: 'what', wht: 'what', wher: 'where', wen: 'when'
  };

  function normalize(text) {
    let s = String(text == null ? '' : text).toLowerCase();
    s = s.replace(/[’‘`]/g, "'").replace(/&/g, ' and ');
    s = s.replace(/(\d+)(st|nd|rd|th)\b/g, '$1');                 // 5th -> 5
    s = s.replace(/([a-z])(\d)/g, '$1 $2').replace(/(\d)([a-z])/g, '$1 $2'); // day1 -> day 1
    s = s.replace(/[^a-z0-9 ]+/g, ' ');
    return s.split(/\s+/).filter(Boolean).map((t) => CANON[t] || t).join(' ');
  }

  function editDistance(a, b, max) {
    if (Math.abs(a.length - b.length) > max) return max + 1;
    let prev2 = null;
    let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
    for (let i = 1; i <= a.length; i++) {
      const cur = [i];
      let rowMin = i;
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        let v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
        if (prev2 && i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, prev2[j - 2] + 1);
        cur[j] = v;
        if (v < rowMin) rowMin = v;
      }
      if (rowMin > max) return max + 1;
      prev2 = prev;
      prev = cur;
    }
    return prev[b.length];
  }

  const typoAllowance = (w) => (w.length >= 8 ? 2 : w.length >= 4 ? 1 : 0);

  // Real words that sit one letter away from a keyword, so they are never read as typos.
  const NOT_TYPOS = new Set(['past', 'fast', 'last', 'test', 'mass', 'data', 'late', 'rate', 'gate', 'note', 'pace',
    'face', 'race', 'time', 'mate', 'stay', 'stale', 'still', 'meat', 'heat', 'beat', 'fees']);

  // Same first letter is required, so "book" never matches "look".
  function fuzzyEquals(token, word) {
    if (token === word) return true;
    if (token[0] !== word[0] || NOT_TYPOS.has(token)) return false;
    // A cut-off word such as "regist" (but not "capital" for "capitalism").
    if (token.length >= 5 && word.length > token.length && word.length - token.length <= 2 && word.startsWith(token)) return true;
    const max = Math.min(typoAllowance(token), typoAllowance(word));
    return max > 0 && editDistance(token, word, max) <= max;
  }

  INTENTS.forEach((intent, order) => {
    intent._order = order;
    intent._phrases = (intent.phrases || []).map(normalize).filter(Boolean);
    intent._keywords = new Set();
    intent._multi = [];
    (intent.keywords || []).forEach((k) => {
      const n = normalize(k);
      if (!n) return;
      if (n.includes(' ')) intent._multi.push(n);
      else intent._keywords.add(n);
    });
  });

  const TITLES = new Set(['dr', 'prof', 'ias', 'inv', 'mr', 'mrs', 'ms', 'shri', 'smt']);
  PEOPLE.forEach((p) => {
    p._tokens = normalize(p.name).split(' ').filter((t) => t.length >= 3 && !TITLES.has(t) && !STOP.has(t));
  });

  function scoreIntent(intent, padded, tokens) {
    let score = 0;
    const hits = [];
    intent._phrases.forEach((p) => {
      if (padded.includes(' ' + p + ' ')) { score += 10; hits.push(p); }
    });
    intent._multi.forEach((p) => {
      if (padded.includes(' ' + p + ' ')) { score += 5; hits.push(p); }
    });
    const used = new Set();
    tokens.forEach((t) => {
      if (intent._keywords.has(t)) {
        if (!used.has(t)) { used.add(t); score += WEAK.has(t) ? 1 : 3; hits.push(t); }
        return;
      }
      for (const k of intent._keywords) {
        if (!used.has(k) && fuzzyEquals(t, k)) {
          used.add(k);
          score += WEAK.has(k) ? 1 : 3;
          hits.push(t);
          break;
        }
      }
    });
    return { score, hits };
  }

  function matchPeople(tokens) {
    const found = PEOPLE.filter((p) => p._tokens.some((n) => tokens.some((t) =>
      t === n || (n.length >= 6 && t.length >= 6 && fuzzyEquals(t, n)))));
    if (!found.length) return null;
    const hits = tokens.filter((t) => found.some((p) => p._tokens.includes(t)));
    return {
      intent: {
        id: 'person',
        _order: -1,
        answer: () => found.slice(0, 4).map((p) => `**${p.name}**: ${p.role}`).join('\n') +
          (found.length > 4 ? `\n…and ${found.length - 4} more with that name.` : ''),
        links: ['speakers'],
        next: ['speakers', 'agenda']
      },
      score: 12, // a name is more specific than any topic phrase
      hits: hits.length ? hits : tokens
    };
  }

  function makeContext(now) {
    const date = now instanceof Date ? now : new Date();
    let today;
    try {
      today = new Intl.DateTimeFormat('en-CA', { timeZone: CFG.timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
    } catch (e) {
      today = date.toISOString().slice(0, 10);
    }
    const daysUntil = (iso) => Math.round((Date.parse(iso + 'T00:00:00Z') - Date.parse(today + 'T00:00:00Z')) / 86400000);
    const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
    return {
      today,
      isPast: (dayKey) => daysUntil(CFG.days[dayKey]) < 0,
      countdown() {
        const toDay1 = daysUntil(CFG.days.day1);
        const toDay2 = daysUntil(CFG.days.day2);
        const toDay3 = daysUntil(CFG.days.day3);
        if (toDay1 > 0) return `${plural(toDay1, 'day')} to go until Day 1.`;
        if (toDay1 === 0) return 'Day 1 is happening today at Pondicherry University.';
        if (toDay2 > 1) return `Day 1 has taken place. ${plural(toDay2, 'day')} to go until Days 2 and 3 in Auroville.`;
        if (toDay2 === 1) return 'Days 2 and 3 start tomorrow at Bharat Nivas, Auroville.';
        if (toDay2 === 0 || toDay3 === 0) return 'EMERGE AURO is happening today at Bharat Nivas, Auroville.';
        return 'EMERGE AURO 2026 has concluded. Thank you to everyone who took part!';
      }
    };
  }

  function render(intent, ctx) {
    const text = typeof intent.answer === 'function' ? intent.answer(ctx) : intent.answer;
    return {
      id: intent.id,
      text,
      links: (intent.links || []).map(linkFor).filter(Boolean),
      chips: (intent.next || []).filter((id) => CHIP_LABELS[id]).map((id) => ({ id, label: CHIP_LABELS[id] }))
    };
  }

  const chipsFor = (ids) => ids.map((id) => ({ id, label: CHIP_LABELS[id] }));

  function welcome() {
    return {
      id: 'welcome',
      text: 'Hi! 👋 I’m the EMERGE AURO assistant. Ask me about dates, venues, passes, the agenda, speakers or how to register.',
      links: [],
      chips: chipsFor(WELCOME_CHIPS)
    };
  }

  function fallback() {
    return {
      id: 'fallback',
      text: 'Sorry, I don’t have an answer for that yet. Try one of the topics below, or ask the organising team directly.',
      links: [linkFor('contact')],
      chips: chipsFor(FALLBACK_CHIPS)
    };
  }

  /** Answers a typed question with one or two replies, or a fallback. */
  function ask(question, now) {
    const norm = normalize(question);
    if (!norm) return { replies: [fallback()], matched: [], fallback: true };
    const padded = ' ' + norm + ' ';
    const tokens = norm.split(' ').filter((t) => !STOP.has(t));
    const ctx = makeContext(now);

    const scored = INTENTS
      .map((intent) => Object.assign({ intent }, scoreIntent(intent, padded, tokens)))
      .filter((r) => r.score >= 3);
    const person = matchPeople(tokens);
    if (person) scored.push(person);
    scored.sort((a, b) => b.score - a.score || a.intent._order - b.intent._order);

    const real = scored.filter((r) => !r.intent.small);
    const picked = [];
    if (real.length) {
      const first = real[0];
      picked.push(first);
      const second = real.slice(1).find((r) =>
        !r.hits.some((h) => first.hits.includes(h)) &&
        !(first.intent.covers || []).includes(r.intent.id) &&
        !(r.intent.covers || []).includes(first.intent.id));
      if (second) picked.push(second);
    } else if (scored.length) {
      picked.push(scored[0]);
    }

    if (!picked.length) return { replies: [fallback()], matched: [], fallback: true };
    return {
      replies: picked.map((r) => render(r.intent, ctx)),
      matched: picked.map((r) => r.intent.id),
      fallback: false
    };
  }

  /** Answers a topic chosen from a suggestion button. */
  function reply(intentId, now) {
    const intent = INTENTS.find((i) => i.id === intentId);
    return intent ? render(intent, makeContext(now)) : fallback();
  }

  const Engine = { ask, reply, welcome, normalize, fuzzyEquals, config: CFG, intents: INTENTS, chipLabels: CHIP_LABELS };
  root.EmergeAssistantEngine = Engine;
  if (typeof module === 'object' && module.exports) module.exports = Engine;

  /* ============================================================ widget */

  if (typeof document === 'undefined') return;

  const ICONS = {
    chat: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4 3.5V16A2.5 2.5 0 0 1 4 13.5v-8A2.5 2.5 0 0 1 6.5 3z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="9" cy="9.5" r="1.1" fill="currentColor"/><circle cx="12" cy="9.5" r="1.1" fill="currentColor"/><circle cx="15" cy="9.5" r="1.1" fill="currentColor"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    send: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 12l15-7-5 15-2.5-6.5z" fill="currentColor"/></svg>',
    mic: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="9" y="3" width="6" height="11" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    speaker: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    reset: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 4.5v4h4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  const STORAGE_KEY = 'emerge-assistant-v1';
  const MAX_HISTORY = 40;

  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const safeHref = (href) => /^(https?:\/\/|\/|#|mailto:|tel:)/i.test(href);
  const isExternal = (href) => /^https?:\/\//i.test(href) && !href.startsWith(root.location.origin);
  const plain = (text) => String(text).replace(/\*\*/g, '').replace(/•/g, '');

  /** Escapes everything, then allows **bold** and line breaks only. */
  function format(text) {
    return esc(text).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
  }

  function emit(type, detail) {
    const payload = Object.assign({ type }, detail || {});
    try { root.dispatchEvent(new CustomEvent('emerge-assistant', { detail: payload })); } catch (e) { /* old browsers */ }
    if (typeof CFG.onEvent === 'function') {
      try { CFG.onEvent(payload); } catch (e) { /* never let site code break the chat */ }
    }
  }

  function loadHistory() {
    try {
      const saved = JSON.parse(root.sessionStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(saved) ? saved.slice(-MAX_HISTORY) : [];
    } catch (e) {
      return [];
    }
  }

  function saveHistory(history) {
    try { root.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-MAX_HISTORY))); } catch (e) { /* private mode */ }
  }

  function loadStyles(onReady) {
    let href = CFG.cssUrl;
    if (!href) {
      const src = SCRIPT_SRC || (document.querySelector('script[src*="emerge-assistant.js"]') || {}).src || '';
      href = src ? src.replace(/emerge-assistant(\.min)?\.js(\?.*)?$/, 'emerge-assistant.css$2') : '';
    }
    if (!href || document.querySelector('link[data-emerge-assistant]')) { onReady(); return; }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.setAttribute('data-emerge-assistant', '');
    let done = false;
    const ready = () => { if (!done) { done = true; onReady(); } };
    link.onload = ready;
    link.onerror = ready;
    setTimeout(ready, 3000);
    document.head.appendChild(link);
  }

  function mount() {
    if (root.__emergeAssistant) return;
    root.__emergeAssistant = true;

    const rootEl = document.createElement('div');
    rootEl.className = 'ea-root';
    rootEl.setAttribute('data-lenis-prevent', '');
    rootEl.style.visibility = 'hidden';
    rootEl.innerHTML = `
      <button type="button" class="ea-launcher" aria-label="Open the EMERGE AURO assistant" aria-expanded="false" aria-controls="ea-panel">
        ${ICONS.chat}<span class="ea-launcher-label">Ask us</span>
      </button>
      <section id="ea-panel" class="ea-panel" data-lenis-prevent role="dialog" aria-modal="false" aria-labelledby="ea-title" hidden>
        <header class="ea-head">
          <div class="ea-avatar" aria-hidden="true">EA</div>
          <div class="ea-head-text">
            <h2 id="ea-title" class="ea-title">${esc(CFG.title)}</h2>
            <p class="ea-sub">${esc(CFG.subtitle)}</p>
          </div>
          <div class="ea-head-actions">
            <button type="button" class="ea-icon-btn" data-ea="speak" aria-pressed="false" aria-label="Read answers aloud" title="Read answers aloud" hidden>${ICONS.speaker}</button>
            <button type="button" class="ea-icon-btn" data-ea="reset" aria-label="Start a new chat" title="Start a new chat">${ICONS.reset}</button>
            <button type="button" class="ea-icon-btn" data-ea="close" aria-label="Close the assistant" title="Close">${ICONS.close}</button>
          </div>
        </header>
        <div class="ea-log" data-lenis-prevent role="log" aria-live="polite" aria-relevant="additions"></div>
        <div class="ea-chips" role="group" aria-label="Suggested questions"></div>
        <form class="ea-form" autocomplete="off">
          <label for="ea-input" class="ea-sr">Ask a question</label>
          <input id="ea-input" class="ea-input" type="text" maxlength="300" placeholder="Ask about dates, passes, venue…" enterkeyhint="send">
          <button type="button" class="ea-icon-btn ea-mic" data-ea="mic" aria-label="Ask by voice" title="Ask by voice" hidden>${ICONS.mic}</button>
          <button type="submit" class="ea-send" aria-label="Send">${ICONS.send}</button>
        </form>
        <p class="ea-foot">Automated answers. Need a person? <a href="${esc(CFG.contactUrl)}" data-ea-nav>Contact the team</a>.</p>
      </section>`;
    document.body.appendChild(rootEl);

    const launcher = rootEl.querySelector('.ea-launcher');
    const panel = rootEl.querySelector('.ea-panel');
    const log = rootEl.querySelector('.ea-log');
    const chipsEl = rootEl.querySelector('.ea-chips');
    const form = rootEl.querySelector('.ea-form');
    const input = rootEl.querySelector('.ea-input');
    const speakBtn = rootEl.querySelector('[data-ea="speak"]');
    const micBtn = rootEl.querySelector('[data-ea="mic"]');

    const reduceMotion = root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let history = loadHistory();
    let isOpen = false;
    let busy = false;
    let speak = false;

    loadStyles(() => { rootEl.style.visibility = ''; });

    /* ---------------------------------------------------------- rendering */

    function scrollToEnd() {
      log.scrollTop = log.scrollHeight;
    }

    function setChips(chips) {
      chipsEl.innerHTML = '';
      (chips || []).forEach((chip) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'ea-chip';
        b.textContent = chip.label;
        b.addEventListener('click', () => chooseTopic(chip));
        chipsEl.appendChild(b);
      });
    }

    function userBubble(text) {
      const row = document.createElement('div');
      row.className = 'ea-row ea-row-user';
      row.innerHTML = `<div class="ea-bubble ea-user"><span class="ea-sr">You said: </span>${esc(text)}</div>`;
      log.appendChild(row);
      scrollToEnd();
    }

    function botBubble(r, { feedback } = {}) {
      const row = document.createElement('div');
      row.className = 'ea-row ea-row-bot';
      const links = (r.links || []).filter((l) => l && safeHref(l.href)).map((l) => {
        const ext = isExternal(l.href);
        return `<a class="ea-link" href="${esc(l.href)}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ' data-ea-nav'}>${esc(l.label)}${ext ? '<span class="ea-sr"> (opens in a new tab)</span> ↗' : ''}</a>`;
      }).join('');
      row.innerHTML = `<div class="ea-bubble ea-bot"><span class="ea-sr">Assistant: </span>${format(r.text)}` +
        (links ? `<div class="ea-links">${links}</div>` : '') + '</div>';
      if (feedback && r.id !== 'welcome') {
        const fb = document.createElement('div');
        fb.className = 'ea-feedback';
        fb.innerHTML = '<span class="ea-feedback-q">Helpful?</span>' +
          '<button type="button" data-v="up" aria-label="Yes, this was helpful">👍</button>' +
          '<button type="button" data-v="down" aria-label="No, this was not helpful">👎</button>';
        fb.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => {
          fb.querySelectorAll('button').forEach((x) => { x.disabled = true; });
          b.setAttribute('aria-pressed', 'true');
          fb.querySelector('.ea-feedback-q').textContent = 'Thanks for the feedback.';
          emit('feedback', { intent: r.id, helpful: b.dataset.v === 'up' });
        }));
        row.appendChild(fb);
      }
      log.appendChild(row);
      scrollToEnd();
    }

    function typing(on) {
      let t = log.querySelector('.ea-typing');
      if (on && !t) {
        t = document.createElement('div');
        t.className = 'ea-row ea-row-bot ea-typing';
        t.innerHTML = '<div class="ea-bubble ea-bot" aria-label="Assistant is typing"><span></span><span></span><span></span></div>';
        log.appendChild(t);
        scrollToEnd();
      } else if (!on && t) {
        t.remove();
      }
    }

    function readAloud(replies) {
      if (!speak || !('speechSynthesis' in root)) return;
      try {
        root.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(replies.map((r) => plain(r.text)).join(' '));
        u.lang = 'en-IN';
        root.speechSynthesis.speak(u);
      } catch (e) { /* speech is optional */ }
    }

    function remember(entry) {
      history.push(entry);
      if (history.length > MAX_HISTORY) history = history.slice(-MAX_HISTORY);
      saveHistory(history);
    }

    function restore() {
      log.innerHTML = '';
      if (!history.length) {
        const w = Engine.welcome();
        botBubble(w);
        setChips(w.chips);
        remember({ role: 'bot', reply: w });
        return;
      }
      let lastChips = [];
      history.forEach((h) => {
        if (h.role === 'user') userBubble(h.text);
        else { botBubble(h.reply); lastChips = h.reply.chips || lastChips; }
      });
      setChips(lastChips);
    }

    /* ---------------------------------------------------------- answering */

    function respond(question, produce) {
      if (busy) return;
      busy = true;
      userBubble(question);
      remember({ role: 'user', text: question });
      setChips([]);
      typing(true);
      setTimeout(() => {
        typing(false);
        const result = produce();
        result.replies.forEach((r) => {
          botBubble(r, { feedback: true });
          remember({ role: 'bot', reply: r });
        });
        setChips(result.replies[result.replies.length - 1].chips);
        readAloud(result.replies);
        emit(result.fallback ? 'unanswered' : 'answered', { question, intents: result.matched });
        busy = false;
      }, reduceMotion ? 0 : 450);
    }

    function send(text) {
      const q = String(text || '').trim().slice(0, 300);
      if (!q) return;
      respond(q, () => Engine.ask(q));
    }

    function chooseTopic(chip) {
      respond(chip.label, () => ({ replies: [Engine.reply(chip.id)], matched: [chip.id], fallback: false }));
    }

    /* ---------------------------------------------------------- open/close */

    function open() {
      if (isOpen) { input.focus(); return; }
      isOpen = true;
      panel.hidden = false;
      rootEl.classList.add('ea-open');
      launcher.setAttribute('aria-expanded', 'true');
      if (typeof window !== 'undefined' && window.innerWidth <= 520) {
        document.body.style.overflow = 'hidden';
      }
      if (!log.childElementCount) restore();
      scrollToEnd();
      input.focus();
      emit('open');
    }

    function close() {
      if (!isOpen) return;
      isOpen = false;
      const hadFocus = panel.contains(document.activeElement);
      panel.hidden = true;
      rootEl.classList.remove('ea-open');
      launcher.setAttribute('aria-expanded', 'false');
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
      if ('speechSynthesis' in root) { try { root.speechSynthesis.cancel(); } catch (e) { /* ignore */ } }
      if (hadFocus) launcher.focus();
      emit('close');
    }

    launcher.addEventListener('click', () => (isOpen ? close() : open()));
    rootEl.querySelector('[data-ea="close"]').addEventListener('click', close);
    rootEl.querySelector('[data-ea="reset"]').addEventListener('click', () => {
      history = [];
      saveHistory(history);
      restore();
      input.focus();
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = input.value;
      input.value = '';
      send(q);
    });

    panel.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); close(); }
    });

    panel.addEventListener('wheel', (e) => {
      e.stopPropagation();
      if (e.cancelable) e.preventDefault();
      const logEl = panel.querySelector('.ea-log');
      if (logEl) {
        let delta = e.deltaY;
        if (e.deltaMode === 1) delta *= 33;
        else if (e.deltaMode === 2) delta *= 100;
        logEl.scrollTop += delta;
      }
    }, { passive: false });

    let touchStartY = 0;
    panel.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    panel.addEventListener('touchmove', (e) => {
      e.stopPropagation();
      const logEl = panel.querySelector('.ea-log');
      if (!logEl || !e.touches || !e.touches[0]) {
        if (e.cancelable) e.preventDefault();
        return;
      }
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY;
      touchStartY = currentY;

      if (!e.target.closest('.ea-log')) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      const atTop = logEl.scrollTop <= 0 && deltaY < 0;
      const atBottom = logEl.scrollTop + logEl.clientHeight >= logEl.scrollHeight - 1 && deltaY > 0;
      if (atTop || atBottom) {
        if (e.cancelable) e.preventDefault();
      }
    }, { passive: false });

    // Links to sections of this site close the panel so the section is visible.
    panel.addEventListener('click', (e) => {
      if (e.target.closest('[data-ea-nav]')) close();
    });

    // Any element on the site with data-open-assistant opens the chat.
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest && e.target.closest('[data-open-assistant]');
      if (!trigger) return;
      e.preventDefault();
      open();
    });

    /* ---------------------------------------------------------- voice */

    if ('speechSynthesis' in root && typeof SpeechSynthesisUtterance !== 'undefined') {
      speakBtn.hidden = false;
      speakBtn.addEventListener('click', () => {
        speak = !speak;
        speakBtn.setAttribute('aria-pressed', String(speak));
        speakBtn.classList.toggle('ea-on', speak);
        if (!speak) { try { root.speechSynthesis.cancel(); } catch (e) { /* ignore */ } }
      });
    }

    const Recognition = root.SpeechRecognition || root.webkitSpeechRecognition;
    if (Recognition) {
      micBtn.hidden = false;
      let listening = null;
      micBtn.addEventListener('click', () => {
        if (listening) { listening.stop(); return; }
        try {
          const rec = new Recognition();
          rec.lang = 'en-IN';
          rec.interimResults = false;
          rec.maxAlternatives = 1;
          rec.onresult = (ev) => {
            const said = ev.results[0] && ev.results[0][0] ? ev.results[0][0].transcript : '';
            if (said) send(said);
          };
          rec.onend = () => { listening = null; micBtn.classList.remove('ea-on'); micBtn.setAttribute('aria-label', 'Ask by voice'); };
          rec.onerror = rec.onend;
          listening = rec;
          micBtn.classList.add('ea-on');
          micBtn.setAttribute('aria-label', 'Stop listening');
          rec.start();
        } catch (e) {
          listening = null;
          micBtn.classList.remove('ea-on');
        }
      });
    }

    /* ---------------------------------------------------------- public API */

    root.EmergeAssistant = {
      open,
      close,
      ask(question) { open(); send(question); }
    };

    const params = new URLSearchParams(root.location.search);
    if (CFG.openOnLoad || params.get('assistant') === 'open') open();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})(typeof window !== 'undefined' ? window : globalThis);
