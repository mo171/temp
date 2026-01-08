"use client"

/**
 * STUDENT DASHBOARD ENTRY PAGE
 * ----------------------------
 * This is the landing view for students (/student). 
 * It provides a high-level summary of their learning status, analytics, and immediate tasks.
 * 
 * ARCHITECTURE:
 * - Aggregates multiple student components: StatsRow, Analytics, TaskList.
 * - Uses a Responsive Grid for the main content area.
 * - Includes a sidebar section for quick widgets like "Upcoming Deadlines".
 */

import { StudentStatsRow } from "@/components/student/StatsRow"
import { StudentTaskList } from "@/components/student/TaskList"
import { StudentAnalytics } from "@/components/student/StudentAnalytics"

export default function StudentDashboard() {
  /**
   * @todo TO REPLACE WITH SUPABASE:
   * 1. Personalization: Fetch the user's name from Clerk or Supabase 'profiles' table.
   * 2. Deadlines: `supabase.from('assignments').select('title, due_date').order('due_date').limit(3)`
   */

  return (
    <>
      {/* HEADER SECTION 
          Shows the page title and a personalized welcome message.
      */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">My Learning Hub</h1>
        <div className="text-xs font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-3 py-1 rounded-lg">
          Welcome back, Alex {/* @todo: replace with dynamic user name */}
        </div>
      </div>

      {/* CORE STATS ROW
          Provides the 3 key metric cards.
      */}
      <StudentStatsRow />
      
      {/* PERFORMANCE ANALYTICS
          Displays charts for scores, engagement, and consistency.
      */}
      <StudentAnalytics />
      
      {/* MIDDLE SECTION: MAIN TASKS & SIDEBAR WIDGETS */}
      <div className="grid gap-8 md:grid-cols-3 mt-8">
        
        {/* Adaptive Task List (Left/Main Column) */}
        <div className="md:col-span-2">
          <StudentTaskList />
        </div>

        {/* Sidebar Widgets (Right Column) */}
        <aside className="space-y-6">
           
           {/* UPCOMING DEADLINES WIDGET
               A quick-look area for urgent tasks.
               @todo: Feed this from the database.
           */}
           <div className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm overflow-hidden relative group">
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-full -mr-12 -mt-12 transition-transform duration-500 group-hover:scale-150" />
              
              <h3 className="font-black text-slate-900 mb-6 text-sm flex items-center gap-2 relative z-10">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                CRITICAL DEADLINES
              </h3>
              
              <div className="space-y-4 relative z-10">
                 {/* Item 1 */}
                 <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100/50 hover:bg-white hover:border-red-200 transition-all">
                    <span className="text-xs font-bold text-slate-500">Project Alpha</span>
                    <span className="text-[10px] bg-red-100 text-red-600 font-black px-2 py-0.5 rounded-full uppercase">Today</span>
                 </div>
                 {/* Item 2 */}
                 <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100/50 hover:bg-white hover:border-slate-200 transition-all">
                    <span className="text-xs font-bold text-slate-500">Quiz 3</span>
                    <span className="text-[10px] bg-slate-200 text-slate-600 font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">Tomorrow</span>
                 </div>
              </div>

              <button className="w-full mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors">
                View All Schedule &rsaquo;
              </button>
           </div>

           {/* Placeholder for more widgets (e.g. Announcements, Peer Activity) */}
           <div className="p-10 border border-slate-200 border-dashed rounded-3xl flex flex-col items-center justify-center text-slate-300 gap-2">
              <div className="w-3 h-3 bg-slate-100 rounded-full animate-bounce" />
              <span className="text-[9px] font-black uppercase tracking-widest opacity-40">More Widgets Coming</span>
           </div>
        </aside>
      </div>
    </>
  )
}
