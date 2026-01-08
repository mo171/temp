"use client"

/**
 * PROGRESS PAGE
 * -------------
 * This page serves as a comprehensive dashboard for students to track their 
 * learning journey, coding practice, and class standing.
 * 
 * ARCHITECTURE:
 * - Layout: Two-column grid (Left: Content, Right: Sidebar).
 * - Components: Reuses 'AssignmentList' for practice sheets.
 * - Visualizations: Uses 'recharts' for weekly progress and custom SVG for problem distribution.
 */

import { AssignmentList } from "@/components/student/AssignmentList"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { 
    Calendar as CalendarIcon, 
    Trophy, 
    Flame, 
    Target, 
    Zap, 
    Share2, 
    Edit2, 
    ChevronRight, 
    ChevronLeft, 
    Info,
    TrendingUp
} from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

/**
 * PROGRESS PAGE COMPONENT
 * -----------------------
 * Main component rendering the student's progress summary.
 */
export default function ProgressPage() {
  /**
   * @todo TO REPLACE WITH SUPABASE (General Strategy):
   * 1. Profile Data: supabase.from('profiles').select('*').eq('id', user.id)
   * 2. Submission Stats: supabase.rpc('get_user_submission_counts') - Create this DB function.
   * 3. Leaderboard: supabase.from('profiles').select('name, points').order('points', { ascending: false }).limit(10)
   * 4. Activity: supabase.from('activity_log').select('*').gte('created_at', last_7_days)
   */

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
       <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            
            {/* === LEFT COLUMN (MAIN CONTENT) === 
                Contains visual data representations and practice materials.
            */}
            <div className="xl:col-span-8 space-y-8">
                
                {/* 1. PRACTICE SHEETS 
                    Displays tasks in a horizontal slider view.
                    @component AssignmentList - Fetches its own data or can be passed props.
                */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-slate-800 tracking-tight">Practice Sheets</h2>
                    <AssignmentList viewMode="slider" />
                </section>

                {/* 2. PROBLEM SOLVING OVERVIEW 
                    Displays breakdown by difficulty (Easy, Medium, Hard).
                    @todo: Replace these hardcoded numbers (12, 5, 2) with counts 
                    aggregated from the 'task_submissions' table.
                */}
                <section className="space-y-4">
                     <h2 className="text-xl font-semibold text-slate-800 tracking-tight">Problem Solving Overview</h2>
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        
                        {/* STATS CARDS */}
                        <div className="space-y-4 flex flex-col justify-center">
                            {/* Easy Problems Row */}
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                                 <div>
                                    <p className="text-sm font-semibold text-emerald-600">Easy</p>
                                    <div className="flex items-baseline gap-1 mt-1">
                                        <span className="text-xl font-extrabold text-slate-900">12</span>
                                        <span className="text-sm text-slate-400 font-medium">/ 171</span>
                                    </div>
                                 </div>
                            </div>
                            {/* Medium Problems Row */}
                             <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                                 <div>
                                    <p className="text-sm font-semibold text-amber-500">Medium</p>
                                    <div className="flex items-baseline gap-1 mt-1">
                                        <span className="text-xl font-extrabold text-slate-900">5</span>
                                        <span className="text-sm text-slate-400 font-medium">/ 349</span>
                                    </div>
                                 </div>
                            </div>
                            {/* Hard Problems Row */}
                             <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                                 <div>
                                    <p className="text-sm font-semibold text-red-500">Hard</p>
                                    <div className="flex items-baseline gap-1 mt-1">
                                        <span className="text-xl font-extrabold text-slate-900">2</span>
                                        <span className="text-sm text-slate-400 font-medium">/ 104</span>
                                    </div>
                                 </div>
                            </div>
                        </div>

                        {/* CIRCULAR PROGRESS (SVG)
                            Visualizes the percentage of total problems solved.
                        */}
                        <div className="flex items-center justify-center py-6 border-l border-slate-100/50">
                             <div className="relative w-48 h-48 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                    {/* Background Circle */}
                                    <circle cx="96" cy="96" r="88" stroke="#f1f5f9" strokeWidth="12" fill="transparent" />
                                    {/* Success Segment (Emerald) 
                                        Calculated using strokeDashoffset: (Circumference - (Circumference * percentage))
                                    */}
                                    <circle cx="96" cy="96" r="88" stroke="#10b981" strokeWidth="12" fill="transparent" 
                                        strokeDasharray="552" strokeDashoffset={552 - (552 * 0.05)} strokeLinecap="round" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                    <span className="text-4xl font-black text-slate-800 tracking-tighter">19</span>
                                    <span className="text-sm text-slate-400 font-bold tracking-wide">/ 624</span>
                                    <span className="text-[10px] text-slate-400 font-black uppercase mt-1 tracking-widest">Solved</span>
                                </div>
                             </div>
                        </div>
                     </div>
                </section>

                {/* 2.5 PERFORMANCE ANALYTICS (RANKING & GRAPH) 
                    Provides competitive context and temporal performance tracking.
                */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* CLASS RANKING CARD 
                        @todo: Replace with dynamic data from 'profiles' ordered by 'points'
                    */}
                    <Card className="p-6 bg-white border-slate-200 overflow-hidden shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-amber-500" />
                                Class Ranking
                            </h3>
                            <Button variant="ghost" size="sm" className="text-orange-500 font-bold text-xs hover:text-orange-600 hover:bg-orange-50">
                                LEADERBOARD &rsaquo;
                            </Button>
                        </div>
                        <div className="space-y-3">
                            {[
                                { rank: 1, name: "Alex Chen", points: 2450, avatar: "👨‍🎓" },
                                { rank: 2, name: "Sarah Smith", points: 2320, avatar: "👩‍🎓" },
                                { rank: 3, name: "You", points: 2150, avatar: "😎", isUser: true },
                                { rank: 4, name: "Mike Ross", points: 1980, avatar: "👨‍💻" },
                            ].map((user) => (
                                <div key={user.rank} className={cn(
                                    "flex items-center justify-between p-3.5 rounded-xl transition-all hover:translate-x-1", 
                                    user.isUser ? "bg-orange-50/80 border border-orange-200" : "bg-slate-50 hover:bg-slate-100"
                                )}>
                                    <div className="flex items-center gap-3">
                                         <div className={cn("flex items-center justify-center w-8 h-8 rounded-full font-black text-xs", 
                                            user.rank === 1 ? "bg-amber-100 text-amber-600 ring-2 ring-amber-50" : 
                                            user.rank === 2 ? "bg-slate-200 text-slate-600 ring-2 ring-slate-100" :
                                            user.rank === 3 ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30" : "bg-slate-100 text-slate-400"
                                         )}>
                                            {user.rank}
                                         </div>
                                         <span className="text-lg">{user.avatar}</span>
                                         <span className={cn("font-bold text-sm", user.isUser ? "text-orange-950" : "text-slate-700")}>{user.name}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="block font-black text-slate-900 leading-none">{user.points}</span>
                                        <span className="text-[9px] text-slate-400 uppercase font-black tracking-tighter">Points</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* WEEKLY PROGRESS GRAPH
                        @todo: Aggregate daily submission counts from 'activity_log'
                    */}
                    <Card className="p-6 bg-white border-slate-200 shadow-sm flex flex-col overflow-hidden">
                         <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-emerald-500" />
                                Weekly Pulse
                            </h3>
                            <div className="flex gap-1">
                                <div className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded text-[9px] font-black uppercase tracking-widest">Active Week</div>
                            </div>
                        </div>
                        <div className="flex-1 w-full min-h-[250px] mt-2">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={[
                                      { name: 'Mon', problems: 4 },
                                      { name: 'Tue', problems: 3 },
                                      { name: 'Wed', problems: 7 },
                                      { name: 'Thu', problems: 4 },
                                      { name: 'Fri', problems: 9 },
                                      { name: 'Sat', problems: 12 },
                                      { name: 'Sun', problems: 8 },
                                ]}>
                                    <defs>
                                        <linearGradient id="colorProblems" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.15}/>
                                            <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                                    <Tooltip 
                                        contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 800, fontSize: '12px'}}
                                        cursor={{stroke: '#f97316', strokeWidth: 2, strokeDasharray: '5 5'}}
                                    />
                                    <Area type="monotone" dataKey="problems" stroke="#f97316" strokeWidth={4} fillOpacity={1} fill="url(#colorProblems)" animationDuration={1500} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </section>

                 {/* 3. ACTIVITY / CALENDAR 
                     Visualizes long-term consistency and streaks.
                 */}
                 <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
                     {/* CALENDAR VIEW */}
                     <Card className="p-6 bg-white border-slate-200 shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest leading-none mb-1">Activity Log</p>
                                <h3 className="text-xl font-black text-slate-800 leading-none">January 2026</h3>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="secondary" size="icon" className="h-9 w-9 bg-slate-100 text-slate-500 hover:bg-slate-200"><ChevronLeft className="w-5 h-5" /></Button>
                                {/* THE STREAK INDICATOR */}
                                <div className="h-9 w-9 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/25 ring-2 ring-orange-100">
                                    <Flame className="w-5 h-5 fill-current" />
                                </div>
                                <Button variant="secondary" size="icon" className="h-9 w-9 bg-slate-100 text-slate-500 hover:bg-slate-200"><ChevronRight className="w-5 h-5" /></Button>
                            </div>
                        </div>

                        {/* WEEKDAY LABELS */}
                        <div className="grid grid-cols-7 gap-1 text-center text-[10px] mb-4 text-slate-400 font-black uppercase tracking-tight">
                            <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
                        </div>

                         {/* CALENDAR GRID
                             @todo: Dynamically generate grid based on month and year using date-fns or similar.
                         */}
                         <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold">
                             {/* Mock Prefill Days */}
                             <div className="p-2.5 text-slate-200">28</div><div className="p-2.5 text-slate-100">29</div><div className="p-2.5 text-slate-100">30</div>
                             <div className="p-2.5 text-slate-100">31</div>
                             {/* January Days */}
                             {[...Array(31)].map((_, i) => (
                                 <div key={i} className={cn(
                                     "p-2.5 rounded-xl cursor-pointer transition-all duration-200",
                                     i + 1 === 8 ? "bg-orange-500 text-white shadow-md shadow-orange-500/20 scale-110" : "text-slate-600 hover:bg-slate-100 active:scale-90"
                                     )}>
                                     {i + 1}
                                 </div>
                             ))}
                         </div>

                         {/* LEGEND & STATUS */}
                         <div className="mt-8 flex items-center justify-between text-[11px] font-black uppercase tracking-wide">
                             <div className="flex gap-6">
                                 <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-sm" /><span className="text-slate-700">Streak: 8 Days</span></div>
                                 <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm" /><span className="text-slate-700">Best: 12 Days</span></div>
                             </div>
                             <button className="text-slate-300 hover:text-slate-400"><Info className="w-4 h-4" /></button>
                         </div>

                         <Button className="w-full mt-6 bg-gradient-to-r from-orange-500 to-amber-500 hover:shadow-xl hover:shadow-orange-500/20 text-white font-black uppercase tracking-widest text-xs h-12 rounded-xl transition-all">
                             <Zap className="w-4 h-4 mr-2" />
                             Restore Daily Streak
                         </Button>
                     </Card>

                     {/* YEARLY VIEW / RECENT SUBMISSIONS
                         @todo: Fetch recent submission records and generate a real heat map.
                     */}
                     <div className="space-y-6">
                        <Card className="p-6 bg-white border-slate-200 shadow-sm border-l-4 border-l-slate-800">
                             <div className="flex items-center justify-between mb-5">
                                 <div>
                                    <h3 className="font-black text-slate-800 leading-none">2026 Submission Pulse</h3>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-tight">0 Contributions this year</p>
                                 </div>
                                 <div className="text-[10px] border border-slate-200 bg-slate-50 px-2.5 py-1 rounded-lg text-slate-500 font-black">ACTIVE</div>
                             </div>
                             {/* MOCK HEAT MAP - Visual grid of activity */}
                             <div className="flex flex-wrap gap-1.5 opacity-40 grayscale">
                                   {[...Array(60)].map((_, i) => (
                                       <div key={i} className="w-3.5 h-3.5 bg-slate-100 rounded-[2px] transition-colors hover:bg-emerald-200 cursor-crosshair" />
                                   ))}
                             </div>
                             <p className="text-[9px] text-slate-400 mt-4 font-bold uppercase tracking-tight italic">Interactive heatmap coming soon with Supabase sync.</p>
                        </Card>

                        <div className="space-y-4">
                            <h3 className="font-bold text-slate-800 tracking-tight">Recent Activity Log</h3>
                            <div className="py-14 bg-white border border-slate-200 border-dashed rounded-2xl flex flex-col items-center justify-center text-slate-400 space-y-3 shadow-inner">
                                <CalendarIcon className="w-10 h-10 opacity-10" />
                                <span className="text-[11px] font-black uppercase tracking-widest opacity-40">No records found</span>
                            </div>
                        </div>
                     </div>
                 </section>
            </div>

            {/* === RIGHT COLUMN (SIDEBAR) === 
                User Profile, Points, and Social/Achievement data.
            */}
            <aside className="xl:col-span-4 space-y-8">
                
                {/* 1. USER PROFILE CARD */}
                <Card className="p-6 border-slate-200 shadow-sm bg-white overflow-hidden relative">
                    <div className="aspect-square w-full bg-slate-100 rounded-2xl mb-6 overflow-hidden relative shadow-inner group">
                         {/* PROFILE IMAGE PLACEHOLDER 
                             @todo: Connect to supabase storage URL from 'profiles.avatar_url'
                         */}
                         <div className="absolute inset-0 flex items-center justify-center text-slate-300 transition-transform duration-500 group-hover:scale-110">
                             <span className="text-7xl group-hover:drop-shadow-xl transition-all">👤</span>
                         </div>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-2">Student Name</h2>
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.15em]">L3 &rsaquo; Mastering React</p>
                    </div>
                    <div className="flex gap-4">
                        <Button className="bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/20 text-white flex-1 rounded-xl font-bold h-11">
                            <Edit2 className="w-4 h-4 mr-2" /> Modify
                        </Button>
                        <Button variant="outline" className="flex-1 rounded-xl border-slate-200 text-slate-600 font-bold h-11 hover:bg-slate-50 transition-colors">
                            <Share2 className="w-4 h-4 mr-2" /> Share
                        </Button>
                    </div>
                </Card>

                {/* 2. ACHIEVEMENTS SECTION */}
                <Card className="p-6 border-slate-200 shadow-sm bg-white border-t-4 border-t-amber-400">
                    <h3 className="text-lg font-black text-slate-800 mb-6 tracking-tight">Earned Badges</h3>
                    <div className="text-center py-10 bg-slate-50/50 rounded-2xl border border-slate-100">
                        <Trophy className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                        <p className="text-slate-500 font-bold text-sm mb-1 uppercase tracking-tight">Vault Empty</p>
                        <p className="text-[10px] text-slate-400 max-w-[180px] mx-auto leading-relaxed font-medium">
                            Complete milestones to unlock permanent achievements on your profile.
                        </p>
                    </div>
                </Card>

                {/* 3. BYTE VAULT (GAMIFICATION CURRENCY)
                    @todo: Fetch 'core_bytes' and 'epic_bytes' from 'profiles' table.
                */}
                <div className="space-y-5">
                    <h3 className="text-xl font-black text-slate-800 tracking-tight px-1">Byte Vault</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                        {/* Core Currency */}
                        <Card className="p-5 border-slate-200 bg-white shadow-sm flex flex-col items-center justify-center text-center hover:border-purple-200 transition-colors cursor-pointer">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Core Bytes</p>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-purple-500 rotate-45 shadow-[0_0_10px_rgba(168,85,247,0.4)]" />
                                <span className="text-2xl font-black text-slate-900 tabular-nums">100</span>
                                <Info className="w-3 h-3 text-slate-200" />
                            </div>
                        </Card>
                        {/* Premium Currency */}
                        <Card className="p-5 border-slate-200 bg-white shadow-sm flex flex-col items-center justify-center text-center hover:border-amber-200 transition-colors cursor-pointer">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Epic Bytes</p>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-amber-400 rotate-45 shadow-[0_0_10px_rgba(251,191,36,0.4)]" />
                                <span className="text-2xl font-black text-slate-900 tabular-nums">0</span>
                                <Info className="w-3 h-3 text-slate-200" />
                            </div>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                         <Button variant="outline" className="w-full bg-white border-slate-200 text-slate-900 font-bold h-12 shadow-sm rounded-xl hover:bg-orange-50 hover:border-orange-200 transition-all">
                            Forge Multiplier
                         </Button>
                         <Button variant="outline" className="w-full bg-white border-slate-200 text-slate-900 font-bold h-12 shadow-sm rounded-xl hover:bg-emerald-50 hover:border-emerald-200 transition-all">
                            Claim Rewards
                         </Button>
                    </div>
                </div>

                {/* 4. LANGUAGES BREAKDOWN 
                    @todo: Fetch counts from 'submissions' grouped by 'language'.
                */}
                <div className="space-y-5 pt-8 border-t border-slate-100 border-dashed">
                    <h3 className="text-xl font-black text-slate-800 tracking-tight px-1 uppercase text-sm">Skills Mastery</h3>
                    <div className="space-y-4">
                        {["Cpp", "Java", "JavaScript", "Python"].map((lang) => (
                            <div key={lang} className="flex items-center justify-between group cursor-pointer">
                                <div className="px-3.5 py-1.5 bg-slate-100 rounded-xl text-[11px] font-black text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                                    {lang}
                                </div>
                                <div className="text-[11px] text-slate-400 font-bold uppercase tracking-tighter">
                                    <span className="font-black text-slate-900 group-hover:text-orange-600 transition-colors">0</span> Solved
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>
       </div>
    </div>
  )
}
