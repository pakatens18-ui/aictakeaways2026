import { sessions } from '../data/notes';

export interface ColleagueProfile {
  name: string;
  role: string;
  customQuery: string;
  format: 'bullets' | 'summary' | 'slack' | 'email';
}

export interface Takeaway {
  title: string;
  desc: string;
  improvement: string;
  sourceSessionId: string;
}

export interface ReplayRecommendation {
  title: string;
  speakers: string;
  reason: string;
  id: string;
  url: string;
}

export interface SynthesisResult {
  title: string;
  intro: string;
  topTakeaways: Takeaway[];
  replayRecommendation: ReplayRecommendation;
  highlightedSessionIds: string[];
  slackCopyText: string;
  emailHtml: string;
}

// Pre-defined Replays matching the official portal list
const REPLAY_PORTAL_LIST = [
  { id: 'd1-tech-future', title: 'Technology, power and the future of growth', speakers: 'Prof. Simon Johnson, The Hon. Dr. Kevin Rudd A.C.', url: 'https://conference.ubs.com/reg/page.asp?id=3232&tkn=44faede6f4c84091b06893068224a3a10cc95e78' },
  { id: 'd1-monetary-policy', title: 'Whats next for monetary policy', speakers: 'Adrian Orr, Charles Evans', url: 'https://conference.ubs.com/reg/page.asp?id=3232&tkn=44faede6f4c84091b06893068224a3a10cc95e78' },
  { id: 'd1-middle-east-energy', title: 'Middle East risk and the future of energy', speakers: 'Meghan OSullivan', url: 'https://conference.ubs.com/reg/page.asp?id=3232&tkn=44faede6f4c84091b06893068224a3a10cc95e78' },
  { id: 'd1-space-frontier', title: 'Space: The economic frontier', speakers: 'Dame Dr. Maggie Aderin', url: 'https://conference.ubs.com/reg/page.asp?id=3232&tkn=44faede6f4c84091b06893068224a3a10cc95e78' },
  { id: 'd2-regional-strategy', title: 'Our UBS regional strategy view of markets', speakers: 'Rohit Arora, Sunil Tirumalai, James Wang', url: 'https://conference.ubs.com/reg/page.asp?id=3232&tkn=44faede6f4c84091b06893068224a3a10cc95e78' },
  { id: 'd2-wisdom-investing', title: 'The wisdom of 60 years of investing', speakers: 'Jeremy Grantham', url: 'https://conference.ubs.com/reg/page.asp?id=3232&tkn=44faede6f4c84091b06893068224a3a10cc95e78' },
  { id: 'd2-dataism', title: 'From Homo Sapiens to the age of dataism', speakers: 'Yuval Harari', url: 'https://conference.ubs.com/reg/page.asp?id=3232&tkn=44faede6f4c84091b06893068224a3a10cc95e78' },
  { id: 'd2-ai-infra', title: 'Scaling AI: Next-gen innovation & infrastructure', speakers: 'Lucy Guo, Lila Tretikov', url: 'https://conference.ubs.com/reg/page.asp?id=3232&tkn=44faede6f4c84091b06893068224a3a10cc95e78' }
];

// Shorten a session title to max 7 words
function shortenTitle(title: string): string {
  const words = title.split(' ');
  return words.length > 7 ? words.slice(0, 7).join(' ') + '...' : title;
}

// Generate a role + category aware "what to think about next" hint
function queryImprovement(role: string, category: string): string {
  const categoryHints: Record<string, string> = {
    'tech-ai': 'how this technology shift affects your work and client conversations.',
    'macro-monetary': 'how this macro dynamic should influence your positioning and recommendations.',
    'geopolitics-energy': 'how this geopolitical or energy risk factors into your near-term decisions.',
    'finance-investing': 'how to apply this investing principle to your current mandates.',
    'semiconductors': 'how this semiconductor trend affects the companies or products you follow.',
  };
  const rolePrefix: Record<string, string> = {
    'Management Level': 'Consider',
    'Product Specialist: Fixed Income': 'Reflect on',
    'Product Specialist: Equity Funds': 'Assess',
    'Product Specialist: Equities': 'Assess',
    'Product Specialist: Private Assets': 'Evaluate',
    'Product Specialist: Hedge Funds': 'Factor in',
    'Product Specialist: Structured Products': 'Consider',
    'Investment Consultant': 'Think about',
    'Data Analytics': 'Explore',
    'Sales': 'Consider',
  };
  const prefix = rolePrefix[role] || 'Consider';
  const hint = categoryHints[category] || 'how this insight applies to your current work priorities.';
  return `${prefix} ${hint}`;
}

export function synthesizeBriefing(profile: ColleagueProfile): SynthesisResult {
  const name = profile.name.trim() || 'You';
  const role = profile.role;
  const query = (profile.customQuery || '').toLowerCase().trim();

  // 1. Determine session matching based on role and customQuery
  const scoredSessions = sessions.map(session => {
    let score = 0;

    // Direct text query matching — score each word independently so multi-word queries work
    if (query !== '') {
      const queryWords = query.split(/\s+/).filter(w => w.length > 2);
      queryWords.forEach(word => {
        if (session.title.toLowerCase().includes(word)) score += 8;
        session.tags.forEach(t => {
          if (t.toLowerCase().includes(word)) score += 5;
        });
        session.bullets.forEach(b => {
          if (b.text.toLowerCase().includes(word)) score += 2;
        });
      });
    }

    // Role-based baseline scoring
    if (role === 'Management Level') {
      if (session.id === 'd1-tech-future' || session.id === 'd2-wisdom-investing' || session.id === 'd2-dataism') score += 3;
    } else if (role === 'Product Specialist: Fixed Income') {
      if (session.id === 'd1-monetary-policy' || session.id === 'd2-private-capital') score += 3;
    } else if (role === 'Product Specialist: Equity Funds' || role === 'Product Specialist: Equities') {
      if (session.id === 'd2-wisdom-investing' || session.id === 'd2-regional-strategy' || session.id === 'd2-china-economy') score += 3;
    } else if (role === 'Product Specialist: Private Assets') {
      if (session.id === 'd2-private-capital' || session.id === 'd1-space-frontier' || session.id === 'd1-middle-east-energy') score += 3;
    } else if (role === 'Product Specialist: Hedge Funds') {
      if (session.id === 'd2-wisdom-investing' || session.id === 'd2-regional-strategy' || session.id === 'd2-cybersecurity') score += 3;
    } else if (role === 'Product Specialist: Structured Products') {
      if (session.id === 'd1-memory-semis' || session.id === 'd2-cybersecurity' || session.id === 'd2-wave-intelligence') score += 3;
    } else if (role === 'Investment Consultant') {
      if (session.id === 'd1-global-capital' || session.id === 'd2-wisdom-investing' || session.id === 'd2-dataism') score += 3;
    } else if (role === 'Data Analytics') {
      if (session.id === 'd2-dataism' || session.id === 'd2-wave-intelligence' || session.id === 'd1-space-frontier' || session.id === 'd2-cybersecurity') score += 3;
    } else if (role === 'Sales') {
      if (session.id === 'd1-global-capital' || session.id === 'd1-middle-east-energy' || session.id === 'd2-dataism') score += 3;
    }

    return { session, score };
  });

  // Extract relevant sessions
  const sortedScored = scoredSessions.sort((a, b) => b.score - a.score);
  const highlightedSessionIds = sortedScored.slice(0, 3).map(s => s.session.id);

  // 2. Select Replay Recommendation dynamically
  let recommendedReplayId = '';

  // Priority 1: Custom Query matching
  if (query !== '') {
    if (query.includes('space') || query.includes('satellite') || query.includes('orbit')) {
      recommendedReplayId = 'd1-space-frontier';
    } else if (query.includes('energy') || query.includes('nuclear') || query.includes('oil') || query.includes('hormuz') || query.includes('smr')) {
      recommendedReplayId = 'd1-middle-east-energy';
    } else if (query.includes('monetary') || query.includes('inflation') || query.includes('fed') || query.includes('rate')) {
      recommendedReplayId = 'd1-monetary-policy';
    } else if (query.includes('china') || query.includes('refation') || query.includes('rmb') || query.includes('em') || query.includes('asia')) {
      recommendedReplayId = 'd2-regional-strategy';
    } else if (query.includes('bubble') || query.includes('wisdom') || query.includes('grantham') || query.includes('extrapolat')) {
      recommendedReplayId = 'd2-wisdom-investing';
    } else if (query.includes('trust') || query.includes('dataism') || query.includes('harari') || query.includes('media')) {
      recommendedReplayId = 'd2-dataism';
    } else if (query.includes('ai') || query.includes('llm') || query.includes('infra') || query.includes('compute')) {
      recommendedReplayId = 'd2-ai-infra';
    }
  }

  // Priority 2: Role default
  if (!recommendedReplayId) {
    if (role === 'Management Level') {
      recommendedReplayId = 'd2-dataism';
    } else if (role === 'Product Specialist: Fixed Income') {
      recommendedReplayId = 'd1-monetary-policy';
    } else if (role === 'Product Specialist: Equity Funds' || role === 'Product Specialist: Equities') {
      recommendedReplayId = 'd2-regional-strategy';
    } else if (role === 'Product Specialist: Private Assets') {
      recommendedReplayId = 'd1-middle-east-energy';
    } else if (role === 'Product Specialist: Hedge Funds' || role === 'Investment Consultant') {
      recommendedReplayId = 'd2-wisdom-investing';
    } else if (role === 'Product Specialist: Structured Products') {
      recommendedReplayId = 'd2-ai-infra';
    } else if (role === 'Data Analytics' || role === 'Sales') {
      recommendedReplayId = 'd2-dataism';
    } else {
      recommendedReplayId = 'd1-tech-future';
    }
  }

  const selectedReplay = REPLAY_PORTAL_LIST.find(r => r.id === recommendedReplayId) || REPLAY_PORTAL_LIST[0];

  // Reasons matching the selected replay
  let replayReason = '';
  switch (selectedReplay.id) {
    case 'd2-dataism':
      replayReason = 'Provides crucial perspectives on human cooperation, client trust mechanics, and navigating algorithmic disruptions in a hybrid society.';
      break;
    case 'd1-monetary-policy':
      replayReason = 'Reviews changing US supply-side structures, central bank policy models, and how to manage fixed-income allocations in a higher-baseline inflation regime.';
      break;
    case 'd2-regional-strategy':
      replayReason = 'Highlights regional EM return dispersions, China corporate capex cycles, and tactical currency picks like Renminbi (RMB) and Australian Dollar (AUD).';
      break;
    case 'd1-middle-east-energy':
      replayReason = 'Details the Strait of Hormuz oil transit vulnerability and provides a strong outlook on Nuclear SMR infrastructure investments.';
      break;
    case 'd2-wisdom-investing':
      replayReason = 'Outlines Grantham\'s contrarian rules, demographic shifts, and strategic options for hedging against high-valuation capex bubbles.';
      break;
    case 'd2-ai-infra':
      replayReason = 'Provides real-world assessments of AI scaling bottlenecks, physical grid constraints, and software cost-efficiency execution.';
      break;
    case 'd1-space-frontier':
      replayReason = 'Analyzes the 90% space launch cost compression and how to unlock private capital yields in satellite data analytics.';
      break;
    default:
      replayReason = 'Reviews the overall technology innovation dividends and the private-public collaborations needed to navigate social and economic changes.';
  }

  const replayRecommendation: ReplayRecommendation = {
    ...selectedReplay,
    reason: replayReason,
  };

  // 2b. Generate intro paragraph
  const roleIntros: Record<string, string> = {
    'Management Level': `${name}, as a leader navigating strategic decisions, the AIC 2026 surfaced inflection points that matter most to long-horizon capital allocation — from demographic resource scarcity to algorithmic trust erosion in financial markets.`,
    'Product Specialist: Fixed Income': `${name}, the AIC reinforced that the rate regime is shifting in ways that directly affect which fixed income funds deserve a place on your platform — from duration risk in the Warsh Fed era to the private credit spread widening opportunity in specialty finance.`,
    'Product Specialist: Equity Funds': `${name}, the AIC made clear that passive EM exposure will underperform in a high-dispersion world. Your fund selection calls — particularly on China reflation timing and AI capex discipline — are more consequential than ever.`,
    'Product Specialist: Equities': `${name}, the AIC delivered concrete stock-level signals: memory bandwidth as a structural SK Hynix thesis, China property as a contrarian entry setup, and healthcare as a cheap sector the market has overlooked.`,
    'Product Specialist: Private Assets': `${name}, the AIC gave you a sharper framework for evaluating Blackstone, KKR, Carlyle and peers — from GP selection criteria to the AI infrastructure deployment theme that is defining the next fund cycle, and the private credit spread widening that makes now a good vintage entry.`,
    'Product Specialist: Hedge Funds': `${name}, the AIC outlined the regime conditions that favour specific hedge fund strategies — high EM dispersion for L/S equity, tactical FX overlays in macro, and the manager discipline question that separates funds that capture recoveries from those that miss them.`,
    'Product Specialist: Structured Products': `${name}, the AIC surfaced three concrete note ideas worth developing: a memory semiconductor bandwidth play on SK Hynix, a China reflation recovery structure, and an AI monetisation vs capex divergence basket.`,
    'Investment Consultant': `${name}, the AIC gave you the building blocks to translate CIO and product team views into confident client conversations — from specific asset class overweights to the narrative frameworks that help clients stay invested when uncertainty is high.`,
    'Data Analytics': `${name}, the AIC highlighted where AI is creating real leverage for analytics teams — agentic workflows for client data pipelines, cost-efficient model architectures for internal tools, and the data credibility risk that comes from optimising for the wrong objective.`,
    'Sales': `${name}, the AIC reinforced three things that close deals in the current environment: offline trust as a structural advantage over digital-first competitors, macro themes that make product recommendations land, and GP credibility framing that converts hesitant private asset clients.`,
  };

  const intro = roleIntros[role] || `${name}, the UBS AIC 2026 provided a sharp view of global capital cycles, AI's structural impact on markets, and the geopolitical forces reshaping energy and monetary policy over the next decade.`;

  // 3. Synthesize exactly 3 takeaways based on role
  const takeaways: Takeaway[] = [];

  if (role === 'Management Level') {
    takeaways.push(
      {
        title: 'Demographic Scarcity & Allocation',
        desc: 'A global population bust 30 years in the making is driving structural labor shortages. This, paired with physical resource shortages, requires long-term capital reallocation.',
        improvement: 'Guides strategic cross-asset resource positioning and offsets long-term labor cost structures.',
        sourceSessionId: 'd2-wisdom-investing'
      },
      {
        title: 'AI Capex & Margin Squeezes',
        desc: 'Hyperscaler capital expenditure is compounding rapidly, forming infrastructure bubble indicators. Aside from hardware suppliers, AI will become a baseline business cost that compresses corporate margins.',
        improvement: 'Protects capital allocation by shifting investments into specific utility use-cases with concrete operational ROI.',
        sourceSessionId: 'd2-wisdom-investing'
      },
      {
        title: 'Algorithmic Erosion of Social Trust',
        desc: 'Financial markets rely on inter-personal trust pools. Social media engagement loops optimize for hate and polarization, actively decaying trust, requiring AI legal personhood bans.',
        improvement: 'Improves risk profiling by treating institutional trust decay as a structural corporate risk metric.',
        sourceSessionId: 'd2-dataism'
      }
    );
  } else if (role === 'Product Specialist: Fixed Income') {
    takeaways.push(
      {
        title: 'Higher-for-Longer Favours Short Duration & Credit',
        desc: 'US inflation has run above target for 6 years and structural supply-side shifts suggest this persists. The policy transition from Warsh will be disruptive, keeping rate risk elevated for long-duration funds.',
        improvement: 'When selecting funds for the platform, prioritise short-duration, floating rate, and investment-grade credit managers over long-duration government bond strategies until the rate path clarifies.',
        sourceSessionId: 'd1-monetary-policy'
      },
      {
        title: 'Private Credit Spreads Are Widening — Select Now',
        desc: 'Institutional capital continues flowing into direct lending, but spreads should widen from here. Specialty finance is the next growth wave, while broad direct lending is becoming commoditised.',
        improvement: 'This is the moment to differentiate platform offerings — favour private credit managers with specialty finance and asset-backed expertise over generic direct lenders who will face margin compression.',
        sourceSessionId: 'd2-private-capital'
      },
      {
        title: 'EM Bond Funds: Watch INR and FX Hedge Quality',
        desc: 'The Indian Rupee is structurally vulnerable to Middle East escalation and multi-year low earnings growth. De-dollarisation pressure keeps US Treasury demand intact but adds FX complexity for EM allocations.',
        improvement: 'When doing DD on EM fixed income funds, scrutinise how managers hedge INR exposure and whether their FX overlay is systematic or discretionary — this is a key differentiator in the current regime.',
        sourceSessionId: 'd2-regional-strategy'
      }
    );
  } else if (role === 'Product Specialist: Equity Funds') {
    takeaways.push(
      {
        title: 'High EM Dispersion Rewards Active Managers',
        desc: 'EM equities are not moving in uniform cycles — there is extreme return dispersion across countries and sectors. Index investors will underperform; the winners are localised supply-chain plays, not broad baskets.',
        improvement: 'Use this to justify active EM fund selection over passive on your platform. Prioritise managers with concentrated EM conviction and strong country-level research depth over those running diversified EM indices.',
        sourceSessionId: 'd2-regional-strategy'
      },
      {
        title: 'China Reflation Is the Key Fund Entry Timing Signal',
        desc: 'China is projected to exit deflation by 2026 as property bottoms, oil recovers, and stock market wealth effects kick in. Corporate capex has already turned positive after two years of decline.',
        improvement: 'This is the DD moment for China-focused equity fund managers — assess which ones are positioned ahead of the reflation rather than waiting for confirmation. Fund flows are still very light, suggesting the window is open.',
        sourceSessionId: 'd2-china-economy'
      },
      {
        title: 'Screen Fund Managers on AI Capex Discipline',
        desc: 'Hyperscaler capex is compounding rapidly and the AI bubble risk is real. Managers running generic tech or mega-cap baskets are overexposed. The conference consensus: screen for earnings quality and margin resilience, not AI narrative.',
        improvement: 'In equity fund DD, add a question on how managers distinguish between AI beneficiaries with real cash flows versus those riding the capex hype. This separates disciplined stock-pickers from momentum chasers.',
        sourceSessionId: 'd2-wisdom-investing'
      }
    );
  } else if (role === 'Product Specialist: Equities') {
    takeaways.push(
      {
        title: 'SK Hynix: Structural AI Memory Play',
        desc: 'AI bottlenecks have shifted from compute to memory bandwidth. HBM is a permanent fixture and SK Hynix is the leading beneficiary. KV cache expansion is now pushing demand into NAND flash — extending the cycle.',
        improvement: 'SK Hynix is a high-conviction long. Model the bandwidth bottleneck as a multi-year earnings driver, not a one-quarter cycle. Cross-check with the regional strategy view that Korea is a top UBS equity pick.',
        sourceSessionId: 'd1-memory-semis'
      },
      {
        title: 'China Property Bottom — Entry Window Opening',
        desc: 'The secondary housing market is stabilising, corporate capex has turned positive, and China is on track to exit deflation by 2026. Investor positioning remains very light — a contrarian entry signal.',
        improvement: 'Look at China property-adjacent names (developers, banks, consumer) for asymmetric upside. The setup echoes Japan 2022. The risk is timing; property stabilisation, not a full recovery, is the base case for now.',
        sourceSessionId: 'd2-china-economy'
      },
      {
        title: 'Healthcare: Cheap Versus Fundamentals',
        desc: 'Healthcare is the only sector still meaningfully hiring and is flagged as cheap relative to fundamentals in the equity strategy outlook. It is insulated from AI capex risk and benefits from demographic aging tailwinds.',
        improvement: 'Healthcare is a contrarian long in a market dominated by tech narratives. Screen for healthcare names with pricing power and patent pipelines — the sector has not been bid up despite strong structural demand.',
        sourceSessionId: 'd2-equity-strategy'
      }
    );
  } else if (role === 'Product Specialist: Private Assets') {
    takeaways.push(
      {
        title: 'GP Selection: The Conference Framework for Top Managers',
        desc: 'The conference outlined clear criteria for evaluating GPs: proven long-term track record, aligned and fair fee structures, and career longevity that spans the full fund life cycle. These apply directly when assessing Blackstone, KKR, Carlyle, and peers.',
        improvement: 'Use these as the backbone of your DD framework. When presenting managers to clients, structure your recommendation around these three pillars — track record, fee alignment, and team stability — rather than AUM or brand name alone.',
        sourceSessionId: 'd1-global-capital'
      },
      {
        title: 'AI Infrastructure Is the Dominant PE Deployment Theme',
        desc: 'Major PE houses are concentrating inflows on AI power grids, digital economy infrastructure, and e-commerce supply chains. This is being treated as a CEO-level portfolio priority, not an opportunistic bet.',
        improvement: 'When evaluating managers like Blackstone Infrastructure or KKR Global Infrastructure, assess how explicitly they are positioned on AI power and data centre assets. This is the theme that will drive returns in the next fund cycle.',
        sourceSessionId: 'd2-private-capital'
      },
      {
        title: 'Private Credit Spreads Widening — Timing for Client Allocation',
        desc: 'Spreads in private credit should widen from here, improving the illiquidity premium for new commitments. Private credit manager selection is less critical than PE — the asset class is more commoditised — but vintage timing matters significantly.',
        improvement: 'This is a good moment to recommend new private credit allocations to clients. Focus client conversations on the spread widening opportunity and the cash-flow predictability advantage over liquid fixed income in a volatile rate environment.',
        sourceSessionId: 'd2-private-capital'
      }
    );
  } else if (role === 'Product Specialist: Hedge Funds') {
    takeaways.push(
      {
        title: 'EM Dispersion Favours L/S Equity Managers with Asia Depth',
        desc: 'High return dispersion across EM markets is exactly the environment where skilled long/short equity managers outperform. Localised winners in Korea semis, China A-shares, and AUD/RMB currency plays create multiple independent alpha sources.',
        improvement: 'When doing DD on L/S equity hedge funds, prioritise managers with dedicated Asia/EM research desks and a track record in high-dispersion environments. Generic global macro funds will struggle to capture these localised moves.',
        sourceSessionId: 'd2-regional-strategy'
      },
      {
        title: 'Assess Manager Re-Entry Discipline, Not Just Returns',
        desc: 'Grantham\'s key message: the highest returns come from betting against extreme downward extrapolations, but near-zero managers can time the absolute bottom. What separates great funds is pre-defined policies to scale back into positions systematically.',
        improvement: 'Add a DD question on how managers operationalise contrarian positioning — do they have a rules-based re-entry framework or are they discretionary? The former is far more defensible and reduces the risk of sitting out the recovery.',
        sourceSessionId: 'd2-wisdom-investing'
      },
      {
        title: 'Macro Overlay Capacity: Gold, RMB, AUD vs INR',
        desc: 'The conference flagged clear tactical FX trades: long Gold as the primary USD diversifier, long RMB and AUD on China reflation, short/hedge INR given Middle East and earnings vulnerability. Macro funds with these overlays are best positioned.',
        improvement: 'When presenting macro or multi-strategy hedge funds to clients, assess whether they have active FX overlay capacity and current positioning on these pairs. Managers already long Gold and RMB have the strongest narrative heading into H2.',
        sourceSessionId: 'd2-regional-strategy'
      }
    );
  } else if (role === 'Product Specialist: Structured Products') {
    takeaways.push(
      {
        title: 'SK Hynix / HBM Bandwidth Note Idea',
        desc: 'AI training bottlenecks have permanently shifted to memory bandwidth. HBM demand is structural and KV cache expansion is pushing a second wave into NAND flash. SK Hynix is the clearest beneficiary with high earnings visibility.',
        improvement: 'Launch a capital-protected or leveraged note on SK Hynix or a memory semiconductor basket (SK Hynix + Samsung semis). The bandwidth story is multi-year, giving the note a compelling 12–18 month investment horizon for clients.',
        sourceSessionId: 'd1-memory-semis'
      },
      {
        title: 'China Reflation Recovery Note',
        desc: 'China is positioned to exit deflation by 2026 — property bottoming, capex turning positive, accommodative monetary policy, and very light investor positioning. The setup resembles Japan\'s inflection in 2022.',
        improvement: 'Structure a participation note on China A-shares or a China recovery basket (property, banks, consumer). The light positioning means entry levels are attractive. Frame it around the deflation exit catalyst with a 12–24 month horizon.',
        sourceSessionId: 'd2-china-economy'
      },
      {
        title: 'AI Monetisation vs Capex Divergence Basket',
        desc: 'The conference consensus is clear: AI capex is building toward a bubble while real monetisation lags. Microsoft, Anthropic-adjacent software players, and agent infrastructure are pulling ahead; hardware capex plays face correction risk.',
        improvement: 'Design a long/short structured basket note: long AI monetisation (enterprise software, agents, cloud efficiency players) versus short hyperscaler capex-heavy names. This gives clients a differentiated AI exposure without pure directional risk.',
        sourceSessionId: 'd2-ai-infra'
      }
    );
  } else if (role === 'Investment Consultant') {
    takeaways.push(
      {
        title: 'Translating CIO Views Into Client Portfolios',
        desc: 'The conference crystallised several clear CIO-level asset class signals: overweight Korea and China equities, favour banks in higher-for-longer rates, treat Gold as the primary USD diversifier, and underweight Europe given macro and Iran war headwinds.',
        improvement: 'Use these as the bridge between CIO macro views and client portfolio conversations. When a client pushes back on China or asks about gold, you now have a concrete conference narrative — not just a model view — to anchor the recommendation.',
        sourceSessionId: 'd2-regional-strategy'
      },
      {
        title: 'Private Assets Allocation: When and Why to Commit Now',
        desc: 'Private credit spreads are widening, creating a better entry point for new commitments. PE inflows are concentrating on AI infrastructure themes. Vintage timing in private markets matters more than manager selection in credit — now is a favourable entry.',
        improvement: 'For clients with under-allocated private assets, use the spread widening narrative to make the timing case for new credit commitments. For PE, frame the conversation around the AI infrastructure deployment thesis to align with what top managers like Blackstone and KKR are building.',
        sourceSessionId: 'd2-private-capital'
      },
      {
        title: 'Communicating Uncertainty Without Losing Client Conviction',
        desc: 'Forecast confidence across macro variables is unusually low right now. The conference explicitly noted that uncertainty is very high. Clients will feel this in markets — the advisor role is to hold the framework when sentiment is fragile.',
        improvement: 'Frame client conversations around long-term structural themes (China reflation, AI productivity, demographic-driven resource scarcity) rather than short-term calls. This is exactly what Grantham advocated: pessimism sounds smart, but disciplined optimism is what compounds wealth.',
        sourceSessionId: 'd2-wisdom-investing'
      }
    );
  } else if (role === 'Data Analytics') {
    takeaways.push(
      {
        title: 'Agentic AI Can Automate Repetitive Client Data Work',
        desc: 'Agentic AI is the core system disruptor — it operates 24/7, can run multi-step data pipelines, and is getting cheaper rapidly due to Chinese model competition. Real enterprise adoption is accelerating faster than expected.',
        improvement: 'Identify the most repetitive client data tasks in your current workflow — report generation, segmentation runs, flagging anomalies — and evaluate whether an agentic workflow can handle them. The cost per token is falling fast, making the ROI case stronger every quarter.',
        sourceSessionId: 'd2-ai-infra'
      },
      {
        title: 'Build Internal Models Cheap with Efficient Architectures',
        desc: 'Chinese developers build multimodal models at 1% of US hyperscaler costs through architectural efficiency and data formatting discipline. The lesson applies directly to internal analytics model building — cost efficiency is a design choice, not a constraint.',
        improvement: 'Before commissioning large internal model projects, benchmark against smaller, highly-tuned models. The conference evidence suggests that right-sized, efficient models outperform on cost-to-insight ratio for most client analytics use cases.',
        sourceSessionId: 'd2-wave-intelligence'
      },
      {
        title: 'Data Credibility Is the Core Risk in Client Insights',
        desc: 'The Harari session highlighted how algorithms that optimise for engagement rather than truth systematically degrade trust. The same risk applies to internal analytics: models optimised for the wrong objective function will produce misleading client insights.',
        improvement: 'Audit your current client analytics pipelines for objective function alignment — are you optimising for the insight that is true, or the one that is engaging to stakeholders? Building in data credibility checks is not just good practice; it is how you avoid the trust collapse the conference warned about.',
        sourceSessionId: 'd2-dataism'
      }
    );
  } else if (role === 'Sales') {
    takeaways.push(
      {
        title: 'Rebuild Offline Trust — It Is a Structural Advantage Now',
        desc: 'Financial markets run on trust pools and social media algorithms are actively eroding them by optimising for engagement over truth. In this environment, clients are more anxious and more sceptical of digital-first relationships.',
        improvement: 'High-touch offline client events are not just nice-to-have — they are a structural competitive advantage that digital-native competitors cannot replicate. Prioritise in-person conversations for any client who is hesitant, uncertain, or being targeted by other providers.',
        sourceSessionId: 'd2-dataism'
      },
      {
        title: 'Lead With Conference Themes, Not Just Product Pitches',
        desc: 'The AIC surfaced clear macro narratives clients care about: China recovery, AI productivity, energy security, and gold as a USD hedge. These are the conversations clients want to have — product recommendations land better when they follow a compelling theme.',
        improvement: 'Open client meetings with one of these macro themes before transitioning to product. Ask which themes resonate most, then connect to the relevant offering. This mirrors what the conference said about advisory differentiation: communication and framing matter as much as the product itself.',
        sourceSessionId: 'd2-regional-strategy'
      },
      {
        title: 'GP Track Record and Fee Alignment Close Private Asset Deals',
        desc: 'The conference was explicit: the winning pitch for private assets is built on three things — GP track record, fee alignment, and career longevity of the management team. Clients who hesitate on private markets are usually uncertain about manager quality, not the asset class.',
        improvement: 'When selling private asset products, structure the conversation around these three GP pillars rather than leading with return targets. Clients who trust the manager commit — those who are sold on yield targets alone often redeem or complain later.',
        sourceSessionId: 'd1-global-capital'
      }
    );
  } else {
    // Default
    takeaways.push(
      {
        title: 'Market Cycle Wisdom',
        desc: 'Pessimism sounds smart, but long-term gains belong to optimists. Utilize disciplined policies to reallocate during downturns.',
        improvement: 'Maintains long-term investment discipline.',
        sourceSessionId: 'd2-wisdom-investing'
      },
      {
        title: 'AI Operational Efficiency',
        desc: 'AI is an efficiency play. Focus allocations on companies using AI to expand actual margins rather than hype.',
        improvement: 'Aids in corporate productivity screening.',
        sourceSessionId: 'd2-wisdom-investing'
      },
      {
        title: 'Multipolar Energy Transitions',
        desc: 'National energy resilience is pushing uranium and SMR nuclear solutions into commercial viability.',
        improvement: 'Identifies secure clean energy infrastructure plays.',
        sourceSessionId: 'd1-middle-east-energy'
      }
    );
  }

  // 4. If a custom query produced strong session matches, override takeaways dynamically
  // A score >= 3 means at least a tag match or multiple bullet matches — meaningful signal.
  if (query !== '') {
    const queryWords = query.split(/\s+/).filter(w => w.length > 2);
    const strongMatches = sortedScored.filter(s => s.score >= 3);

    if (strongMatches.length > 0) {
      const queryTakeaways: Takeaway[] = strongMatches.slice(0, 3).map(({ session }) => {
        // Find the single bullet most relevant to the query words
        let bestBullet = session.bullets[0];
        let bestBulletScore = 0;
        session.bullets.forEach(b => {
          const bulletScore = queryWords.reduce((acc, w) => acc + (b.text.toLowerCase().includes(w) ? 1 : 0), 0);
          if (bulletScore > bestBulletScore) {
            bestBulletScore = bulletScore;
            bestBullet = b;
          }
        });

        return {
          title: shortenTitle(session.title),
          desc: bestBullet.text,
          improvement: queryImprovement(role, session.category),
          sourceSessionId: session.id,
        };
      });

      // If fewer than 3 strong query matches, fill remaining slots from role-based takeaways
      if (queryTakeaways.length < 3) {
        const usedIds = new Set(queryTakeaways.map(t => t.sourceSessionId));
        for (const tk of takeaways) {
          if (!usedIds.has(tk.sourceSessionId) && queryTakeaways.length < 3) {
            queryTakeaways.push(tk);
            usedIds.add(tk.sourceSessionId);
          }
        }
      }

      takeaways.splice(0, takeaways.length, ...queryTakeaways);
    }
  }

  // Generate Slack text
  const slackCopyText = `*UBS AIC Conference Takeaways for ${name}* (${role} Focus)
_${intro}_

*3 Key Takeaways:*
${takeaways.map((tk, idx) => `${idx + 1}. *${tk.title}*
   ${tk.desc}
   _What to think about next:_ ${tk.improvement}`).join('\n\n')}

*Recommended Replay Session to Watch:*
🎥 *"${replayRecommendation.title}"*
Speakers: ${replayRecommendation.speakers}
_Why watch:_ ${replayRecommendation.reason}

_Explore the full session notes at your personalized portal link._`;

  // Generate Email HTML
  const emailHtml = `<div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1e293b; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
  <div style="border-bottom: 2px solid #E30613; padding-bottom: 15px; margin-bottom: 20px;">
    <span style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #E30613; letter-spacing: 1.5px;">UBS AIC Briefing</span>
    <h2 style="margin: 5px 0 0 0; color: #0f172a; font-size: 20px; font-weight: 800;">Personalized Takeaways for ${name}</h2>
    <p style="margin: 5px 0 0 0; font-size: 13px; color: #64748b; font-style: italic;">Focus: ${role}</p>
  </div>
  
  <p style="font-size: 14px; line-height: 1.6; color: #334155; margin-bottom: 25px;">${intro}</p>
  
  <h3 style="color: #0f172a; font-size: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-bottom: 15px;">3 TAILORED TAKEAWAYS</h3>
  
  ${takeaways.map(tk => `
  <div style="margin-bottom: 20px; padding-left: 12px; border-left: 3px solid #E30613;">
    <h4 style="margin: 0 0 5px 0; font-size: 14px; color: #0f172a; font-weight: bold;">${tk.title}</h4>
    <p style="margin: 0 0 6px 0; font-size: 13px; line-height: 1.5; color: #475569;">${tk.desc}</p>
    <p style="margin: 0; font-size: 12px; line-height: 1.4; color: #E30613; font-weight: 500;"><strong>What to think about next:</strong> ${tk.improvement}</p>
  </div>
  `).join('')}
  
  <h3 style="color: #0f172a; font-size: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-top: 25px; margin-bottom: 15px;">RECOMMENDED REPLAY</h3>
  <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 15px; margin-bottom: 10px;">
    <h4 style="margin: 0 0 4px 0; font-size: 14px; color: #E30613;">${replayRecommendation.title}</h4>
    <p style="margin: 0 0 8px 0; font-size: 11px; color: #64748b;">Speakers: ${replayRecommendation.speakers}</p>
    <p style="margin: 0; font-size: 13px; line-height: 1.4; color: #475569;">${replayRecommendation.reason}</p>
  </div>
</div>`;

  return {
    title: `UBS AIC Custom Takeaways: ${name}`,
    intro,
    topTakeaways: takeaways,
    replayRecommendation,
    highlightedSessionIds,
    slackCopyText,
    emailHtml
  };
}
