export interface NoteBullet {
  text: string;
}

export interface Session {
  id: string;
  day: number;
  title: string;
  speakers?: string[];
  bullets: NoteBullet[];
  tags: string[];
  category: 'tech-ai' | 'macro-monetary' | 'geopolitics-energy' | 'finance-investing' | 'semiconductors';
}

export const sessions: Session[] = [
  {
    id: 'd1-tech-future',
    day: 1,
    title: 'Technology, Power and the Future of Growth',
    speakers: ['Prof. Simon Johnson', 'The Hon. Dr. Kevin Rudd A.C.'],
    category: 'tech-ai',
    tags: ['ai', 'automation', 'labor', 'growth', 'regulation', 'politics'],
    bullets: [
      { text: 'Direct Automation: Machines are increasingly substituting human labor, leading to significant workforce restructuring.' },
      { text: 'AI is pushing out the new frontier of innovation, accelerating the pace of discoveries compared to previous technology waves.' },
      { text: 'Labor Market Polarization: High-skilled expertise is capturing most of the economic gains, while middle-to-low-tier jobs face stagnation and replacement.' },
      { text: 'The Fourth Industrial Revolution is unfolding at a faster rate than the previous three, shortening the timeline for social adaptation.' },
      { text: 'Political polarization on both the far right and far left is a lagging indicator of these rapid economic and social shifts.' },
      { text: 'Strong public-private collaborations are necessary to create a "soft landing" for labor policies and social safety nets.' },
      { text: 'Over 60% of current job tasks did not exist in 1940, illustrating massive creative destruction and shifts in expertise.' },
      { text: 'New sectors and tasks are increasing the demand for specialized expertise, pushing the productivity frontier.' },
      { text: 'Key Policy Question: Can AI be designed to be worker-friendly and augment human capacity rather than replace it?' },
      { text: 'Governments need to get ahead of the technology curve by actively working with true technical experts.' },
      { text: 'The AI transition is a "slow burn" structural shift, unlike the sudden, single-event shock of the 2008 financial crisis.' },
      { text: 'Public anxiety and narrative-driven fears are likely to accelerate AI safety and ethics legislation.' },
      { text: 'The policy risk of the "Innovation Dividend" (MIT): Private companies capture the upside of productivity gains, while society bears the downside of labor displacement.' }
    ]
  },
  {
    id: 'd1-monetary-policy',
    day: 1,
    title: 'What’s Next for Monetary Policy?',
    speakers: ['Adrian Orr', 'Charles Evans'],
    category: 'macro-monetary',
    tags: ['monetary-policy', 'inflation', 'usa', 'macroeconomics', 'central-banks'],
    bullets: [
      { text: 'US Supply-Side Shifts: Structural changes in the US supply chain are impacting global macroeconomic dynamics.' },
      { text: 'The economic and geopolitical power imbalance remains heavily skewed in favor of the US relative to the rest of the world.' },
      { text: 'Central banks are re-evaluating whether they should "look through" temporary supply-side shocks, risking their credibility.' },
      { text: 'US inflation has consistently run above the target for 6 years, suggesting that a higher baseline inflation rate is here to stay.' },
      { text: 'Focus is shifting to central bank credibility vs. the real economy\'s actual capacity to absorb persistent inflation.' },
      { text: 'The monetary framework has shifted post-Kevin Warsh: introducing new inflation target frameworks and criticizing institutional groupthink.' },
      { text: 'Transition to this new monetary regime is likely to be highly disruptive for global capital markets.' },
      { text: 'Clear forward guidance is necessary to bridge the timeline gap between central bank policy actions and real-world outcomes.' },
      { text: 'Inflation targeting must focus on its core mission: stabilizing the purchasing power and value of money.' }
    ]
  },
  {
    id: 'd1-geopolitics',
    day: 1,
    title: 'Geopolitics: Who Holds the Cards?',
    speakers: ['Max (Speaker)', 'Dr. Ng (Speaker)'],
    category: 'geopolitics-energy',
    tags: ['geopolitics', 'china', 'europe', 'us-policy', 'trade'],
    bullets: [
      { text: 'Debate over whether Trump-era tariff and isolationist policies will reverse under future administrations.' },
      { text: 'Geopolitical Cycle View (Max): Friction and stability move in cyclical waves, suggesting eventual normalization.' },
      { text: 'Geopolitical Structural View (Dr. Ng): The shift is permanent. The world is staying multi-polar with two stable leading blocks: the US/Europe and China.' },
      { text: 'Europe remains structurally trapped, caught in the friction between the US and China.' },
      { text: 'The new world order is organized into distinct, localized trading blocks.' }
    ]
  },
  {
    id: 'd1-middle-east-energy',
    day: 1,
    title: 'Middle East Risk and the Future of Energy',
    speakers: ['Meghan O\'Sullivan'],
    category: 'geopolitics-energy',
    tags: ['energy', 'oil', 'nuclear', 'middle-east', 'geopolitics'],
    bullets: [
      { text: 'Geopolitical Posturing: Neither side in the Middle East has a rational interest in full-scale escalatory conflict.' },
      { text: 'The Strait of Hormuz is the primary leverage point. Iran recognizes that managing access here is far more effective than a nuclear deterrent.' },
      { text: 'Short-to-medium-term regime change in Iran is highly unlikely.' },
      { text: 'US Energy Independence: The US is now a net exporter of oil, making it less vulnerable to local shocks, though allies remain exposed while US influence declines.' },
      { text: 'Gulf States remain the dominant players in oil due to their status as the lowest-cost producers.' },
      { text: 'OPEC is structurally stable; other member nations lack incentives to leave since they cannot increase production capacity anyway.' },
      { text: 'The nuclear energy outlook is extremely positive for the next 5-10 years, driven primarily by energy resilience and national security.' },
      { text: 'Technology advancements in Small Modular Reactors (SMRs) are approaching commercial viability.' },
      { text: 'Europe is actively rethinking nuclear energy, forced to choose between nuclear, green alternatives, or paying a high premium on traditional energy.' }
    ]
  },
  {
    id: 'd1-space-frontier',
    day: 1,
    title: 'Space: The Final Frontier',
    speakers: ['Dame Dr. Maggie Aderin-Pocock'],
    category: 'tech-ai',
    tags: ['space', 'satellite', 'china', 'defense', 'infrastructure'],
    bullets: [
      { text: 'Massive Cost Compression: The cost of launching satellites has plummeted by 90% over the last decade.' },
      { text: 'Launch success rates have reached historic highs.' },
      { text: 'China is rapidly rising as a dominant satellite launch competitor.' },
      { text: 'Recent launches are heavily dominated by SpaceX\'s Starlink mega-constellation.' },
      { text: 'AI is unlocking value in space data, e.g., using AI on high-frequency satellite images to track micro-plastics by analyzing changing wave forms.' },
      { text: 'Geopolitical friction is heating up satellite competition; nations refuse to rely on single-country services.' },
      { text: 'The Three Eras of Space: Confrontation (1957-1975), Collaboration (1975-2010s led by governments), and Commercialization (2010s-present led by private capital).' },
      { text: 'Orbits definition: Low Earth Orbit (LEO: 160-2,000 km, observation/Starlink), Medium Earth Orbit (MEO: 2,000-35,500 km, GPS), and High/Geostationary Orbit (GEO: >35,000 km, critical communications).' },
      { text: 'The Space Infrastructure Stack: Launch systems (getting smaller alongside smaller satellites), Satellites, Ground stations, and support systems.' },
      { text: 'Economic Stack opportunities: Launch vehicles, Satellites, Ground infra, Data analytics (climate, maritime, agriculture), Broadband/Defense, and Future frontier (lunar infrastructure, moon polar hydrogen resource extraction).' },
      { text: 'Governance vacuum: No solid international legal framework is currently in place. The Moon will serve as the first test case.' },
      { text: 'Future governance designs: Safe zones, non-interference boundaries, and resource sharing agreements.' },
      { text: 'Space-based data centers represent a highly interesting emerging sub-sector.' }
    ]
  },
  {
    id: 'd1-global-capital',
    day: 1,
    title: 'Global Capital at Inflection Point',
    category: 'finance-investing',
    tags: ['investing', 'capital-markets', 'dollar', 'defense', 'education'],
    bullets: [
      { text: 'US Politics: Mid-term elections typically result in the ruling party losing congressional control.' },
      { text: 'De-dollarization: Reserve currency dominance goes in cycles (e.g., historical British Pound decline due to over-borrowing). Trump favors a weaker dollar for export competitiveness, but US must preserve its capability to borrow at reasonable interest rates.' },
      { text: 'Societal AI Concerns: Core issues involve potential threats to humanity, labor disruption, educational system misalignment, and impact on youth development.' },
      { text: 'Defense dynamics: Modern defense technology (e.g., Ukraine vs. Russia) is prolonging conflicts rather than ending them quickly.' },
      { text: 'SpaceX holds a unique, highly centralized position. Driven by Elon Musk, it makes significant revenue from satellites and risks becoming a space monopoly.' },
      { text: 'GP Selection Rules: Invest with general partners (GPs) who have a proven track record, fair fee structures, a long enough career horizon to stay with the firm, and realistic return expectations.' },
      { text: 'Career Advice: Obtain the best education possible, but focus heavily on learning how to communicate and persuade effectively.' }
    ]
  },
  {
    id: 'd1-memory-semis',
    day: 1,
    title: 'Memory Semis',
    category: 'semiconductors',
    tags: ['semiconductors', 'memory', 'hbm', 'hardware', 'ai-infrastructure'],
    bullets: [
      { text: 'Hardware requirement: Higher bandwidth needs denser connections and 3D chip stacking.' },
      { text: 'Bandwidth has become the critical performance bottleneck in AI training.' },
      { text: 'High Bandwidth Memory (HBM) is established as a permanent industry fixture.' },
      { text: 'Agentic AI is driving substantial demand for CPU processing power.' },
      { text: 'KV Cache bottleneck: Memory context for LLMs is expanding beyond HBM limits, forcing a architectural migration of context data to NAND flash.' },
      { text: 'Sector constraint: The primary bottleneck is human capital, specifically specialized mechanical engineering talent.' }
    ]
  },
  {
    id: 'd2-wisdom-investing',
    day: 2,
    title: 'The Wisdom of 60 Years of Investing',
    speakers: ['Jeremy Grantham'],
    category: 'finance-investing',
    tags: ['investing-strategy', 'wisdom', 'ai-bubble', 'market-cycle'],
    bullets: [
      { text: 'Human Bias: Extrapolation is the default human shortcut to reduce cognitive load, but it increases systematic forecasting errors.' },
      { text: 'Pessimism sounds sophisticated, but long-term investment success historically belongs to optimists.' },
      { text: 'Long-term self-interest is core to human progress and market recovery.' },
      { text: 'Two-sigma (extreme) market events occur roughly every 30 years, yet historically none have permanently broken the market paradigm.' },
      { text: 'Conviction: Have the courage of your convictions. Successful investors seek discreet value, not public heroism.' },
      { text: 'Demographics: We are currently 30 years into a global population bust, which will constrain future growth.' },
      { text: 'Resource scarcity: Major supply crises are looming in basic physical resources.' },
      { text: 'Clean Energy: Climate technologies and renewables are structural imperatives, not temporary trends.' },
      { text: 'AI cost of doing business: AI will become table stakes. It represents a new era of intense competition where corporate margins will be squeezed ("blood on the streets").' },
      { text: 'Contrarian opportunities: The highest returns are achieved by betting against extreme downward extrapolations.' },
      { text: 'Market Timing: It is nearly impossible to time the absolute bottom. Successful investors operate on pre-defined policies to scale back into positions.' },
      { text: 'Upside/Downside Asymmetry: Upside is privatized (you are on your own), while systemic downside is socialized (central bank interventions and bailouts).' },
      { text: 'AI Bubble debate: AI is a candidate for the most life-changing tech event in human history. History shows bubbles always occur during structural shifts (e.g., the Railroad boom). If this is not a bubble, it will be a historical anomaly.' },
      { text: 'Capex Warning: Capital expenditure from hyperscalers is compounding rapidly. The risk of near-term over-investment is highly elevated.' },
      { text: 'Market fundamentals: Equity markets care about company margins, inflation trends, and stable, mild economic growth.' },
      { text: 'Emerging Markets: Historically, EM equities move in multi-year cycles relative to the S&P 500. Currently, strong dispersion exists across EM returns.' }
    ]
  },
  {
    id: 'd2-wave-intelligence',
    day: 2,
    title: 'Navigating the Wave of Intelligence',
    category: 'tech-ai',
    tags: ['ai', 'china', 'efficiency', 'llm'],
    bullets: [
      { text: 'China AI Strategy: Chinese LLMs are optimized heavily for cost and computational efficiency.' },
      { text: 'Efficiency scale: Chinese developers spend approximately 1% of the capital compared to US counterparts to build equivalent functionality.' },
      { text: 'Multimodality is the immediate focus.' }
    ]
  },
  {
    id: 'd2-private-capital',
    day: 2,
    title: 'Is Private Capital at an Inflection Point?',
    category: 'finance-investing',
    tags: ['private-equity', 'private-credit', 'infrastructure', 'capital-allocation'],
    bullets: [
      { text: 'Inflows remain robust: Despite negative media coverage, institutional capital continues to flow into private markets.' },
      { text: 'Private credit focuses heavily on cash flow predictability, remaining relatively insulated from AI speculation.' },
      { text: 'Direct lending has grown steadily for decades. The next major growth wave is in specialty finance.' },
      { text: 'Private Equity Focus Areas: Infrastructure assets—specifically AI power grids, digital economy, e-commerce supply chains, and life sciences.' },
      { text: 'AI implementation: Portfolio companies focus strictly on ROI, with implementation driven as a CEO-level responsibility.' },
      { text: 'AI is currently viewed primarily as a game of cost and operational efficiency.' }
    ]
  },
  {
    id: 'd2-regional-strategy',
    day: 2,
    title: 'Regional Strategy & Emerging Markets',
    speakers: ['Rohit Arora', 'Sunil Tirumalai', 'James Wang'],
    category: 'macro-monetary',
    tags: ['china', 'emerging-markets', 'currency', 'semiconductors'],
    bullets: [
      { text: 'China Tech Strategy: Semiconductors remain the top pick, currently riding a domestic localization super-cycle.' },
      { text: 'Corporate AI: Focus is on hyperscaler investments and corporate adoption timelines.' },
      { text: 'Supply constraints in specialized tech components will likely persist for another 2-3 years.' },
      { text: 'Currency stability: Countries embedded in the AI supply chain are seeing stable/strengthening currencies due to export expansion.' },
      { text: 'China Macro: The economy is transitioning from deflation to reflation.' },
      { text: 'Equity Picks: A-Shares, specifically ChiNext (which makes up ~25% of focus), and non-consumer electronics.' },
      { text: 'EM Energy: Emerging markets are net beneficiaries of structurally higher energy prices.' },
      { text: 'EM Inflation: Inflation risks are rebounding toward the upper bound due to El Niño climate impacts.' },
      { text: 'De-dollarization critique: The narrative faces practical hurdles. If central banks diversify away from US Treasuries, what alternative asset can absorb the capital?' },
      { text: 'Asset spillover: Strong regional stories are getting over-rewarded, leading to spikes in assets like Gold.' },
      { text: 'Currency vulnerability: The Indian Rupee is vulnerable to Middle East conflict escalations, compounded by multi-year low earnings growth.' },
      { text: 'China Capex: Corporate-level capital expenditure has turned positive after two consecutive years of decline.' },
      { text: 'China Property: The secondary housing market is stabilizing, though overall demand remains weak.' },
      { text: 'Top Currency Trades: RMB and AUD.' },
      { text: 'Korea Equities: SK Hynix remains a key beneficiary.' }
    ]
  },
  {
    id: 'd2-cybersecurity',
    day: 2,
    title: 'Cybersecurity in the Age of Quantum',
    category: 'tech-ai',
    tags: ['cybersecurity', 'quantum', 'encryption', 'defense'],
    bullets: [
      { text: 'Threat vector: "Harvest now, decrypt later" is an active risk where adversaries intercept encrypted data today to decrypt once quantum power is live.' },
      { text: 'Post-Quantum Cryptography (PQC): The transition to quantum-resistant standards is a critical priority.' },
      { text: 'Solutions: Solving the quantum threat is currently an engineering challenge rather than a theoretical physics problem.' },
      { text: 'Feasibility: Quantum computing faces significant bottlenecks, particularly electricity consumption and cooling infrastructure.' },
      { text: 'Investment thesis: Cybersecurity firms remain highly investable, but selectivity is required. Broad generalizations fail.' }
    ]
  },
  {
    id: 'd2-china-economy',
    day: 2,
    title: 'The Next Phase of China’s Economy',
    category: 'macro-monetary',
    tags: ['china', 'macroeconomics', 'deflation', 'currency'],
    bullets: [
      { text: 'Macro transition: By 2026, China is projected to exit its deflationary phase, similar to Japan\'s inflection point in 2022.' },
      { text: 'Currency: The Renminbi (RMB) has significant room for appreciation.' },
      { text: 'AI integration: The AI revolution will trigger short-term structural disruption but yield long-term benefits, comparable to the Industrial Revolution.' }
    ]
  },
  {
    id: 'd2-dataism',
    day: 2,
    title: 'From Homo Sapiens to the Age of Dataism',
    speakers: ['Yuval Noah Harari'],
    category: 'tech-ai',
    tags: ['philosophy', 'ai-society', 'trust', 'regulation'],
    bullets: [
      { text: 'Human uniqueness: Cooperation based on inter-personal trust is what allowed humans to dominate (e.g., comparing millions of humans to chimpanzees).' },
      { text: 'Trust networks: Building trust among strangers is our core capability. Money and financial markets are pure representations of institutional trust.' },
      { text: 'Trust cycle: Societies go through cycles of losing trust and building new mechanisms to restore it.' },
      { text: 'Trust erosion: Social media has significantly accelerated the breakdown of traditional trust systems.' },
      { text: 'Media shift: Social media represents a decentralized, algorithmic model compared to historical centralized broadcasting.' },
      { text: 'Engagement loops: Social media algorithms control public consumption. They optimize for engagement rather than truth, and the most engaging content is love or hate.' },
      { text: 'AI financial governance: We risk becoming "horses" in the new economy. AI systems may soon hire, manage, or fire humans based on criteria we cannot understand.' },
      { text: 'AI Maturity: The technology is still in its infancy with vast development runway ahead.' },
      { text: 'Disruptive core: Agentic AI represents the primary disruptive threat.' },
      { text: 'Navigation strategy: Avoid rushing to definitive conclusions. Determine the magnitude of changes. We are entering a hybrid human-AI society.' },
      { text: 'Cultural shifts: AI is analogous to a massive wave of migration—altering labor markets and changing social culture.' },
      { text: 'Regulatory proposal: Strict laws should prevent granting AI "legal personhood".' },
      { text: 'Ethical investing: Venture capitalists and companies should discourage products that exploit human vulnerabilities (e.g., AI companionship).' }
    ]
  },
  {
    id: 'd2-cio-debate',
    day: 2,
    title: 'CIO Debate: What Did We Learn?',
    category: 'finance-investing',
    tags: ['investing', 'macro', 'takeaways', 'allocation'],
    bullets: [
      { text: 'Divergence: High dispersion in regional returns means index investing will underperform active stock selection.' },
      { text: 'AI Execution: Shift focus from AI hype and hardware Capex to actual corporate ROI and software monetization.' },
      { text: 'Deglobalization: Global capital flows are fracturing into regional trading blocks, requiring localized portfolio strategies.' }
    ]
  }
];
