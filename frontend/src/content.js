export const links = {
  signup: "/member/signup",
  howItWorks: "#how-it-works",
};

export const nav = { cta: "Create a Member profile" };

export const hero = {
  eyebrow: "A gifting platform for certified creators",
  title: "Gift to certified creators. Set your own limits.",
  sub: "Know who you're gifting to. Control your spending. Fee shown first.",
  cta: "Create a Member profile",
  quiet: "How it works",
  note: "Illustrative example.",
};

export const screens = [
  {
    id: "certificate",
    label: "Certificate",
    head: "Know who you're gifting to.",
    body: "Certified creators pass a live face scan matched to their picture. The public certificate shows the result.",
    callouts: [
      { text: "Public certificate", top: "28%" },
      { text: "Live scan result", top: "52%" },
    ],
  },
  {
    id: "checkout",
    label: "Checkout",
    head: "See exactly what you pay before you pay.",
    body: "No account needed to gift. Price, fee and total are visible before you pay.",
    callouts: [{ text: "Fee on its own line", top: "62%" }],
  },
  {
    id: "limits",
    label: "Limits",
    head: "Set your own limits. Crowned enforces them.",
    body: "Members set daily and monthly limits. Lowering is immediate. Raising takes 72 hours.",
    callouts: [{ text: "Checked at payment", top: "42%" }],
  },
  {
    id: "gifter-test",
    label: "Gifter Test",
    head: "Tell creators how you want to be treated before you gift.",
    body: "Your Gifter Test, preferences and hard limits live on your Member profile, one profile across every creator. Creators see them from the payment.",
    callouts: [{ text: "Shown to creators", top: "30%" }],
  },
  {
    id: "reviews",
    label: "Reviews",
    head: "Reviews only from people who have actually gifted.",
    body: "Only verified Members who have gifted $100 or more can review a certificate.",
    callouts: [{ text: "Verified Members only", top: "44%" }],
  },
];

export const certificate = {
  avatar:
    "https://images.unsplash.com/photo-1506863530036-1efeddceb993?crop=entropy&cs=srgb&fm=jpg&w=400&q=80",
  monogram: "M",
  handle: "@maya",
  pill: "Certified",
  status: "Face scan matched",
  rows: [
    ["Verification", "Live face scan"],
    ["Result", "Matched"],
    ["Issued", "October 2026"],
  ],
};

export const checkout = {
  title: "Gift, your choice",
  amounts: [10, 25, 50, 100],
  first: 50,
  second: 25,
  extras: [
    ["Thank-you gift", "$20.00"],
    ["Monthly gift", "$10.00 per month"],
  ],
  guest: "Guest checkout",
  feeRate: 0.1,
};

export const limits = {
  monthly: { label: "Monthly limit", value: "$120 of $200", pct: 60 },
  daily: { label: "Daily limit", value: "$18 of $40", pct: 45 },
  attempt: { label: "Gift attempt", value: "$100.00" },
  blocked: "Blocked: this gift would pass your monthly limit.",
  lower: { label: "New monthly limit", value: "$150", note: "Updated now" },
  raise: { label: "Raise limit", value: "$300", chip: "Raising takes 72 hours" },
  pending: "Pending: $300",
};

export const gifterTest = {
  axes: [
    { name: "Experience", color: "#4B4BB5", v: 0.82 },
    { name: "Clarity", color: "#1F6F8B", v: 0.66 },
    { name: "Respect", color: "#9A4A1F", v: 0.74 },
    { name: "Stability", color: "#2F7D32", v: 0.9 },
  ],
  prefLabel: "Preferences",
  prefs: ["Clear messages", "No pressure", "No last-minute changes"],
  hardLabel: "Hard limits",
  hard: ["No pressure to spend more"],
};

export const reviews = {
  avatar:
    "https://images.unsplash.com/photo-1587668223851-c157d8d353ab?crop=entropy&cs=srgb&fm=jpg&w=240&q=80",
  monogram: "M",
  name: "Member profile",
  pill: "Verified Member",
  ring: { amount: "$100", label: "Gifted $100" },
  unlocked: "Can review a certificate",
};

export const how = {
  label: "How it works",
  title: "How it works.",
  steps: [
    "Find a certified creator.",
    "Gift, no account required.",
    "Optionally create a Member profile and set your limits.",
  ],
};

export const faq = {
  title: "Questions",
  items: [
    {
      q: "Do I need an account to gift?",
      a: "No. Guest checkout works. A Member account is optional and adds spend limits, a profile, and your Gifter Test.",
    },
    {
      q: "How do limits work?",
      a: "Members set daily and monthly spend limits. Lowering a limit is immediate. Raising one takes 72 hours. If a gift would go over your limit, the payment is blocked.",
    },
    {
      q: "Who can leave a review?",
      a: "Only verified Members who have gifted $100 or more can review a certificate.",
    },
    {
      q: "Is every creator certified?",
      a: "No. Certified creators hold a public certificate. If a creator is certified, you can view their certificate.",
    },
  ],
};

export const closing = {
  title: "Set your limits before you gift.",
  cta: "Create a Member profile",
};

export const marquee = [
  "Certified creators",
  "Fee shown first",
  "Your limits, enforced",
  "Reviews from real gifters",
  "No account needed to gift",
];

export const windowChrome = {
  tour: "Product tour",
  state: "Sample data",
};


export const footer = {
  brand: "Powered by Crowned",
  links: [
    ["Terms of Service", "#"],
    ["Privacy Notice", "#"],
    ["Refund and Cancellation Policy", "#"],
    ["Legal Notice", "#"],
    ["All policies", "#"],
    ["Contact Support", "#"],
  ],
};
