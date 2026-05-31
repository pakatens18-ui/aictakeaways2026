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
      { text: 'AI will increase productivity across the economy, but gains are distributed unevenly.' },
      { text: 'Current economic regime is not good for all people — a few knowledgeable people gain disproportionately while others get poorer, which is socially unsustainable.' },
      { text: 'Tax increases to redistribute AI-driven wealth are likely needed to avoid political instability.' },
      { text: 'Kevin Rudd: Superannuation-style funds are a model for distributing economic gains broadly — everyone gets an economic share.' },
      { text: 'Direct Automation: Machines are increasingly substituting human labor, leading to significant workforce restructuring.' },
      { text: 'Labor Market Polarization: High-skilled expertise is capturing most of the economic gains, while middle-to-low-tier jobs face stagnation and replacement.' },
      { text: 'The Fourth Industrial Revolution is unfolding faster than previous ones, shortening the timeline for social adaptation.' },
      { text: 'Political polarization on both the far right and far left is a lagging indicator of these rapid economic and social shifts.' },
      { text: 'Strong public-private collaborations are necessary to create a "soft landing" for labor policies and social safety nets.' },
      { text: 'Key Policy Question: Can AI be designed to augment human capacity rather than replace it?' },
      { text: 'The policy risk of the "Innovation Dividend": Private companies capture the upside of productivity gains, while society bears the downside of labor displacement.' }
    ]
  },
  {
    id: 'd1-monetary-policy',
    day: 1,
    title: "What's Next for Monetary Policy?",
    speakers: ['Adrian Orr', 'Charles Evans'],
    category: 'macro-monetary',
    tags: ['monetary-policy', 'inflation', 'usa', 'macroeconomics', 'central-banks', 'fed'],
    bullets: [
      { text: 'US has had strong economic growth, but this has not translated evenly into public confidence.' },
      { text: 'Lack of trust in corporations is a structural headwind for policy transmission.' },
      { text: 'US inflation has been above 2% for 5+ years — people feel it in daily life, eroding political support for the Fed.' },
      { text: 'Kevin Warsh may face a difficult early period as Fed Chair given his prior public criticism of the institution — credibility re-establishment will be key.' },
      { text: 'The Fed must maintain credibility above all else; its effectiveness depends on belief in its commitment.' },
      { text: 'US policy uncertainty is directly increasing the risk premium demanded on long-term US Treasuries.' },
      { text: 'US Supply-Side Shifts: Structural changes in the supply chain are impacting global macroeconomic dynamics.' },
      { text: 'Central banks are re-evaluating whether they should "look through" temporary supply-side shocks, risking their credibility.' },
      { text: 'Transition to a new monetary regime is likely to be highly disruptive for global capital markets.' },
      { text: 'Clear forward guidance is necessary to bridge the gap between policy actions and real-world outcomes.' },
      { text: 'Inflation targeting must focus on its core mission: stabilizing the purchasing power and value of money.' }
    ]
  },
  {
    id: 'd1-geopolitics',
    day: 1,
    title: 'Geopolitics: Who Holds the Cards?',
    category: 'geopolitics-energy',
    tags: ['geopolitics', 'china', 'europe', 'us-policy', 'trade', 'trump'],
    bullets: [
      { text: 'Trump is unpredictable — markets and allies must build in higher geopolitical risk premiums.' },
      { text: 'Trump will try to win mid-term elections by any means — expect policy populism to intensify.' },
      { text: 'Europe is hedging by building better relationships with China to reduce dependence on the US.' },
      { text: 'US nationalism policy is structural, not temporary — Trump is a symptom, not a cause; it will likely survive him.' },
      { text: 'People are moving more right in the TikTok era — algorithmic media is accelerating political polarization globally.' },
      { text: 'A Hormuz toll by Iran is hard to execute — too many countries with high stakes in open passage would retaliate.' },
      { text: 'Resource independence (energy, minerals) is now a critical national security priority for all major powers.' },
      { text: 'Debate over whether Trump-era tariff and isolationist policies will reverse under future administrations.' },
      { text: 'Geopolitical Structural View: The shift to multipolarity is permanent — two stable leading blocs: US/Europe and China.' },
      { text: 'Europe remains structurally trapped, caught in the friction between the US and China.' }
    ]
  },
  {
    id: 'd1-middle-east-energy',
    day: 1,
    title: 'Middle East Risk and the Future of Energy',
    speakers: ['Meghan O\'Sullivan'],
    category: 'geopolitics-energy',
    tags: ['energy', 'oil', 'nuclear', 'middle-east', 'geopolitics', 'iran', 'opec'],
    bullets: [
      { text: 'Geopolitics is hard to predict — the US was wrong to expect a quick outcome in Iraq, and appears wrong about a quick win against Iran.' },
      { text: 'Current Iranian regime looks likely to survive despite pressure.' },
      { text: 'Middle East may be less prosperous than pre-Iran-war era.' },
      { text: 'Middle East countries will lean less on the US and build relationships with China as a hedge.' },
      { text: 'Fossil fuel is still very critical — 80% of energy consumption. Oil consumption grows every year and has never declined.' },
      { text: 'Energy transition is accelerating in parallel with continued fossil fuel dependence — both trends are real.' },
      { text: 'US can be geopolitically aggressive due to its energy independence — less constrained by supply vulnerability.' },
      { text: 'OPEC is not dead as long as Saudi Arabia remains in it — no member can increase production enough to leave.' },
      { text: 'Geoengineering is probably needed as a tool to fight climate change alongside conventional transitions.' },
      { text: 'Nuclear energy is likely needed to meet both climate and energy security goals.' },
      { text: 'Clean energy needs Chinese rare earth materials — Europe is in a very difficult position, depending on the US for oil and China for renewables.' },
      { text: 'The Strait of Hormuz remains the primary global energy leverage point.' },
      { text: 'Technology advancements in Small Modular Reactors (SMRs) are approaching commercial viability.' },
      { text: 'The nuclear energy outlook is extremely positive for the next 5-10 years, driven primarily by energy resilience and national security.' }
    ]
  },
  {
    id: 'd1-space-frontier',
    day: 1,
    title: 'Space: The Economic Frontier',
    speakers: ['Dame Dr. Maggie Aderin-Pocock'],
    category: 'tech-ai',
    tags: ['space', 'satellite', 'china', 'defense', 'infrastructure'],
    bullets: [
      { text: 'Massive Cost Compression: The cost of launching satellites has plummeted by 90% over the last decade.' },
      { text: 'China is rapidly rising as a dominant satellite launch competitor.' },
      { text: 'Recent launches are heavily dominated by SpaceX\'s Starlink mega-constellation.' },
      { text: 'AI is unlocking value in space data — e.g., using AI on high-frequency satellite images to track micro-plastics by analyzing wave forms.' },
      { text: 'Geopolitical friction is heating up satellite competition; nations refuse to rely on single-country services.' },
      { text: 'Economic Stack opportunities: Launch vehicles, Satellites, Ground infra, Data analytics (climate, maritime, agriculture), Broadband/Defense, and Future frontier (lunar infrastructure).' },
      { text: 'Governance vacuum: No solid international legal framework is currently in place. The Moon will serve as the first test case.' },
      { text: 'Space-based data centers represent a highly interesting emerging sub-sector.' }
    ]
  },
  {
    id: 'd1-global-capital',
    day: 1,
    title: 'Global Capital at an Inflection Point',
    category: 'finance-investing',
    tags: ['investing', 'capital-markets', 'dollar', 'philanthropy', 'gp-selection'],
    bullets: [
      { text: 'You can miss many investment opportunities and still perform really well — discipline and process matter more than catching every move.' },
      { text: 'At end of life, you will not care much about your wealth — you will care about what you contributed to the world and people.' },
      { text: 'Be philanthropic — wealth is a tool, not a score.' },
      { text: 'Investing is more about capital preservation than maximisation — have reasonable return expectations, stay diversified, and pick people with track record and integrity.' },
      { text: 'GP Selection Rules: Invest with general partners who have a proven track record, fair fee structures, a long career horizon, and realistic return expectations.' },
      { text: 'Career Advice: Obtain the best education possible, but focus heavily on learning how to communicate and persuade effectively.' },
      { text: 'De-dollarization: Reserve currency dominance goes in cycles — Trump favors a weaker dollar for export competitiveness, but the US must preserve its ability to borrow at reasonable rates.' },
      { text: 'Defense dynamics: Modern defense technology is prolonging conflicts rather than ending them quickly (e.g., Ukraine vs. Russia).' }
    ]
  },
  {
    id: 'd1-memory-semis',
    day: 1,
    title: 'Memory Semiconductors',
    category: 'semiconductors',
    tags: ['semiconductors', 'memory', 'hbm', 'hardware', 'ai-infrastructure'],
    bullets: [
      { text: 'Bandwidth has become the critical performance bottleneck in AI training.' },
      { text: 'High Bandwidth Memory (HBM) is established as a permanent industry fixture.' },
      { text: 'Agentic AI is driving substantial demand for CPU processing power.' },
      { text: 'KV Cache bottleneck: Memory context for LLMs is expanding beyond HBM limits, forcing a migration of context data to NAND flash.' },
      { text: 'Hardware requirement: Higher bandwidth needs denser connections and 3D chip stacking.' },
      { text: 'Sector constraint: The primary bottleneck is human capital — specifically specialized mechanical engineering talent.' }
    ]
  },
  {
    id: 'd1-growth-illusion',
    day: 1,
    title: 'Growth Without Illusion: Africa & Emerging Demographics',
    category: 'macro-monetary',
    tags: ['africa', 'demographics', 'emerging-markets', 'china', 'robots', 'population'],
    bullets: [
      { text: 'Africa has very low population density relative to land area but is growing quickly — a future labor and consumption story.' },
      { text: 'Multi-ethnicity is a governance challenge — Asian countries are more ethnically homogenous; African ethnic leaders need to cooperate for political stability.' },
      { text: 'African labor is currently cheaper than robots — manufacturing migration window is open but may be short.' },
      { text: 'China is investing heavily in Africa but not buying African goods — a one-directional capital relationship.' },
      { text: 'Indians are influential in many African countries — a significant but underappreciated soft power factor.' },
      { text: 'Politics is very critical in developing countries — political risk often overrides economic fundamentals.' },
      { text: 'Africa has enormous natural resources, which risks creating oligarch-run economies rather than broad-based growth.' },
      { text: 'Asian population is decreasing — robotics is becoming structurally essential to sustain productivity.' },
      { text: 'China is still moving in the right direction despite headwinds — long-term trajectory remains constructive.' }
    ]
  },
  {
    id: 'd2-econ-bigpicture',
    day: 2,
    title: 'Economic Big Picture',
    category: 'macro-monetary',
    tags: ['macro', 'oil', 'ai', 'labor', 'inequality', 'uncertainty', 'tax'],
    bullets: [
      { text: 'Oil inventory is running down — if Hormuz does not reopen quickly, oil prices will spike sharply.' },
      { text: 'Uncertainty is very high; forecast confidence is low across all major macro variables.' },
      { text: 'Markets are driven by tech — the rest of the economy is not growing much.' },
      { text: 'AI investment is contributing ~1% to GDP growth. The wealth effect from AI stock gains is also supporting consumption.' },
      { text: 'Wealthy people are doing well from markets; others are doing poorly — inequality is widening.' },
      { text: 'Healthcare is the only sector that is still meaningfully hiring.' },
      { text: '25% of layoffs now cite AI as a contributing factor.' },
      { text: 'Europe is too complacent ("too chill") about its structural economic position.' },
      { text: 'Mag7 accounts for approximately 60% of total S&P 500 capex.' },
      { text: 'AI implementation is actually slower than companies expected — adoption curves are lagging executive hype.' },
      { text: 'The US should be able to generate enough electricity for data center demand — power is not the binding constraint.' },
      { text: '50% of government revenue is income-related tax — if AI replaces human workers, the tax system will need a fundamental redesign.' }
    ]
  },
  {
    id: 'd2-equity-strategy',
    day: 2,
    title: 'Equity Strategy Outlook',
    category: 'finance-investing',
    tags: ['equities', 'ai-bubble', 'us-equities', 'china', 'europe', 'healthcare'],
    bullets: [
      { text: 'AI will end in a bubble — markets are hot now but not yet at crazy valuations.' },
      { text: 'US is very resilient — investors should not underestimate the structural strength of US equities.' },
      { text: 'Tech can go up further — EPS growth remains high and supports current valuations.' },
      { text: 'China has fiscal and monetary flexibility, no inflation problem, and investor positioning is very light — significant upside potential.' },
      { text: 'Europe is bottom ranked — most affected by Iran war, low tech exposure, and faces possible rate hikes.' },
      { text: 'Healthcare is cheap relative to fundamentals — a contrarian opportunity.' }
    ]
  },
  {
    id: 'd2-craft-sport',
    day: 2,
    title: 'The Craft of Sport: Leadership and Performance',
    category: 'finance-investing',
    tags: ['leadership', 'mindset', 'performance', 'coaching', 'resilience'],
    bullets: [
      { text: 'Accept failure as a prerequisite for growth — avoiding failure means avoiding learning.' },
      { text: 'Adjust yourself to bring out the strength in others — leadership is about enabling everyone to win.' },
      { text: 'Be coachable — staying open to learning is the most durable competitive advantage.' },
      { text: 'Ego is okay, but only when aligned with a shared team goal rather than personal score-keeping.' }
    ]
  },
  {
    id: 'd2-ai-infra',
    day: 2,
    title: 'AI Monetisation vs. Capex: Scaling the Next Generation',
    speakers: ['Lucy Guo', 'Lila Tretikov'],
    category: 'tech-ai',
    tags: ['ai', 'capex', 'monetisation', 'anthropic', 'microsoft', 'china', 'agents'],
    bullets: [
      { text: 'Microsoft believes AI adoption is faster than expected — AI agents are the key driver of enterprise uptake.' },
      { text: 'Fierce competition is making everything in AI move much quicker — a race with no clear finish line.' },
      { text: 'Developers will choose a $20,000 token budget over hiring a $200,000 junior employee — the economic case is clear.' },
      { text: 'Token costs are getting cheaper quickly, accelerated by Chinese competition on model efficiency.' },
      { text: 'Anthropic ARR is approximately $50bn USD.' },
      { text: 'Anthropic\'s strength is its focus on enterprise and safety — not consumer gimmicks.' },
      { text: 'Codex performance has been better than Claude Code for some time, but clients are still sticky — switching costs are real.' },
      { text: 'China is innovating quickly — already a leader in physical AI, with much better cost efficiency than US counterparts.' },
      { text: 'Hyperscalers are investing in AI at less than 100% of cash flow — the spending is sustainable at current levels.' }
    ]
  },
  {
    id: 'd2-wave-intelligence',
    day: 2,
    title: 'The Next Wave of Intelligence',
    category: 'tech-ai',
    tags: ['ai', 'china', 'efficiency', 'llm', 'multimodal', 'agents'],
    bullets: [
      { text: 'All models are competing aggressively — a single misstep can be enough to fail the company.' },
      { text: 'AI is still not good in some specialised verticals — domain-specific gaps remain significant.' },
      { text: 'Cost is critical for agents too — since agents run 24/7, inference cost per token directly impacts economics.' },
      { text: 'Multimodal AI processes and generates multiple data types (text, images, audio, video, code) within a single unified framework.' },
      { text: 'China AI Strategy: Chinese LLMs are optimised heavily for cost and computational efficiency.' },
      { text: 'Chinese developers spend approximately 1% of the capital compared to US counterparts to build equivalent functionality.' }
    ]
  },
  {
    id: 'd2-private-capital',
    day: 2,
    title: 'Is Private Capital at an Inflection Point?',
    category: 'finance-investing',
    tags: ['private-equity', 'private-credit', 'infrastructure', 'capital-allocation', 'manager-selection'],
    bullets: [
      { text: 'Institutional capital continues buying more private credit — inflows remain robust despite macro uncertainty.' },
      { text: 'AI is under B. focus in private markets — emphasis on improving business efficiency rather than speculative bets.' },
      { text: 'Spreads in private credit should widen from here — compensation for illiquidity is improving.' },
      { text: 'Infrastructure for the future is the key PE theme: AI power grids and digital economy assets.' },
      { text: 'Private credit manager selection is less important than private equity manager selection — the asset class is more commoditised.' },
      { text: 'Private markets must generate returns that justify illiquidity — the bar for new commitments is rising.' },
      { text: 'Direct lending has grown steadily for decades. The next major growth wave is in specialty finance.' },
      { text: 'AI implementation at portfolio companies: strictly ROI-driven, treated as a CEO-level responsibility.' }
    ]
  },
  {
    id: 'd2-public-market',
    day: 2,
    title: 'Public Market Dynamics',
    category: 'finance-investing',
    tags: ['public-markets', 'singapore', 'fx', 'shareholder-returns', 'communication'],
    bullets: [
      { text: 'Proper capital allocation for shareholder return remains the core discipline that separates well-run public companies.' },
      { text: 'For small countries like Singapore, managing FX carefully matters — investing abroad while liabilities are in SGD creates structural currency risk.' },
      { text: 'Public companies need to communicate better with investors to build real understanding of strategy and reduce valuation discount.' }
    ]
  },
  {
    id: 'd2-regional-strategy',
    day: 2,
    title: 'UBS Regional Strategy: Markets Outlook',
    speakers: ['Rohit Arora', 'Sunil Tirumalai', 'James Wang'],
    category: 'macro-monetary',
    tags: ['china', 'emerging-markets', 'currency', 'semiconductors', 'korea', 'gold'],
    bullets: [
      { text: 'Inflation is good for China — companies can start raising prices again after years of deflation.' },
      { text: 'AI capex has much more impact on equity markets than the Hormuz situation.' },
      { text: 'Banks are good investments in a higher-for-longer rate environment.' },
      { text: 'North Asian FX (KRW, CNY, TWD) are more resilient than South Asian FX (INR, IDR).' },
      { text: 'People want to diversify out of USD but there are very limited credible alternatives — gold is probably the top choice now.' },
      { text: 'China consumption is still weak, but property has probably already passed its bottom.' },
      { text: 'UBS likes Korea and China as top equity picks.' },
      { text: 'China Tech: Semiconductors remain the top pick, riding a domestic localisation super-cycle.' },
      { text: 'Supply constraints in specialised tech components will likely persist for another 2-3 years.' },
      { text: 'Currency vulnerability: The Indian Rupee is vulnerable to Middle East escalations.' },
      { text: 'China Capex: Corporate-level capital expenditure has turned positive after two consecutive years of decline.' },
      { text: 'Top Currency Trades: RMB and AUD. Korea Equities: SK Hynix remains a key beneficiary.' }
    ]
  },
  {
    id: 'd2-wisdom-investing',
    day: 2,
    title: 'The Wisdom of 60 Years of Investing',
    speakers: ['Jeremy Grantham'],
    category: 'finance-investing',
    tags: ['investing-strategy', 'wisdom', 'ai-bubble', 'market-cycle', 'demographics'],
    bullets: [
      { text: 'Pessimism sounds sophisticated, but long-term investment success historically belongs to optimists.' },
      { text: 'Human Bias: Extrapolation is the default shortcut to reduce cognitive load, but it increases systematic forecasting errors.' },
      { text: 'Two-sigma (extreme) market events occur roughly every 30 years, yet historically none have permanently broken the market paradigm.' },
      { text: 'Demographics: We are currently 30 years into a global population bust, which will constrain future growth.' },
      { text: 'Resource scarcity: Major supply crises are looming in basic physical resources.' },
      { text: 'AI cost of doing business: AI will become table stakes — margins will be squeezed across all sectors ("blood on the streets").' },
      { text: 'Contrarian opportunities: The highest returns are achieved by betting against extreme downward extrapolations.' },
      { text: 'Market Timing: It is nearly impossible to time the absolute bottom — operate on pre-defined policies to scale back into positions.' },
      { text: 'AI Bubble debate: AI is a candidate for the most life-changing tech event in history. If this is not a bubble, it will be a historical anomaly.' },
      { text: 'Capex Warning: Capital expenditure from hyperscalers is compounding rapidly — risk of near-term over-investment is elevated.' },
      { text: 'Emerging Markets: Historically, EM equities move in multi-year cycles relative to the S&P 500. Strong dispersion currently exists.' }
    ]
  },
  {
    id: 'd2-cybersecurity',
    day: 2,
    title: 'Cybersecurity in the Age of Quantum',
    category: 'tech-ai',
    tags: ['cybersecurity', 'quantum', 'encryption', 'defense', 'basic-hygiene'],
    bullets: [
      { text: 'Basic security practices can help a lot — e.g. using a password manager reduces the majority of common attack vectors.' },
      { text: 'Quantum is a few years away, but companies should start thinking and planning for it now.' },
      { text: 'Threat vector: "Harvest now, decrypt later" is an active risk — adversaries intercept encrypted data today to decrypt once quantum computing is live.' },
      { text: 'Post-Quantum Cryptography (PQC): Transition to quantum-resistant standards is a critical priority.' },
      { text: 'Solving the quantum threat is currently an engineering challenge, not a theoretical physics problem.' },
      { text: 'Quantum computing faces significant bottlenecks: electricity consumption and cooling infrastructure.' }
    ]
  },
  {
    id: 'd2-china-economy',
    day: 2,
    title: "The Next Phase of China's Economy",
    category: 'macro-monetary',
    tags: ['china', 'macroeconomics', 'deflation', 'currency', 'consumption', 'rmb', 'property'],
    bullets: [
      { text: 'China MPC member thinks RMB is likely to appreciate — policy supports a stronger currency.' },
      { text: 'China should exit deflation in 2026 — driven by oil price recovery, property market bottoming, and wealth effect from rising stock market.' },
      { text: 'China monetary policy is accommodative — rate environment supports growth.' },
      { text: 'MPC is currently in wait-and-see mode — no major policy moves expected imminently.' },
      { text: 'GDP growth in 2026 expected at 4.5%.' },
      { text: 'Trump\'s visit to China is a relationship improvement signal — Xi is expected to also visit the US.' },
      { text: 'Government strongly supports innovation — technology investment is a state priority.' },
      { text: 'Concerned about unemployment — this is a key risk to domestic stability.' },
      { text: 'Do not expect massive fiscal stimulus — policy will be targeted rather than broad.' },
      { text: 'Read the Premier\'s report to Congress in March for the clearest policy signals.' },
      { text: 'Consumption should improve if property market stabilises — household balance sheet recovery is the key variable.' },
      { text: 'Macro transition: By 2026, China is projected to exit its deflationary phase, similar to Japan\'s inflection point in 2022.' }
    ]
  },
  {
    id: 'd2-dataism',
    day: 2,
    title: 'From Homo Sapiens to the Age of Dataism',
    speakers: ['Yuval Noah Harari'],
    category: 'tech-ai',
    tags: ['philosophy', 'ai-society', 'trust', 'regulation', 'banking', 'history'],
    bullets: [
      { text: 'Human strength is cooperation — it is what allowed humans to dominate at scale compared to any other species.' },
      { text: 'Banking jobs are fundamentally about building trust — the core product of financial services is trustworthiness.' },
      { text: 'Money is the most important invention in the world — it enables cooperation among strangers at civilisational scale.' },
      { text: 'Trust collapses from time to time — people learn mostly from real experience, not instruction.' },
      { text: 'Many inventions caused social problems before society learned how to handle them — e.g., the printing press led to religious wars (Catholic vs Protestant) before reliable news production became possible.' },
      { text: 'Algorithms maximise engagement by any method — the most engaging content is extreme love or extreme hate.' },
      { text: 'Humans are flawed — there is enormous room to exploit our biases, and AI makes exploitation far more scalable.' },
      { text: 'We are entering a new age of human-and-agent society — the boundary between human and AI decision-making is dissolving.' },
      { text: 'AI is likely to feel like immigration — it will alter labor markets and change social culture, creating tension and adaptation.' },
      { text: 'Government should put AI regulation in place — specifically laws preventing granting AI "legal personhood".' },
      { text: 'Social media has significantly accelerated the breakdown of traditional trust systems.' },
      { text: 'Agentic AI represents the primary disruptive threat — operating autonomously and at scale.' }
    ]
  },
  {
    id: 'd2-cio-debate',
    day: 2,
    title: 'CIO Debate: What Did We Learn?',
    category: 'finance-investing',
    tags: ['investing', 'macro', 'takeaways', 'allocation', 'ai-valuation', 'tax'],
    bullets: [
      { text: 'When Anthropic and OpenAI IPO, we will see much more financial information — it will be a valuation reset moment.' },
      { text: 'Main beneficiaries of AI right now are components in data centres — hardware, power, cooling.' },
      { text: 'Real use cases now are still not enough to justify the investment — the productivity evidence remains thin.' },
      { text: 'Tax on AI will come in some form — governments will need to recapture revenue lost from labour displacement.' },
      { text: 'Divergence: High dispersion in regional returns means index investing will underperform active stock selection.' },
      { text: 'AI Execution: Shift focus from AI hype and hardware Capex to actual corporate ROI and software monetisation.' },
      { text: 'Deglobalisation: Global capital flows are fracturing into regional trading blocks, requiring localised portfolio strategies.' }
    ]
  }
];
