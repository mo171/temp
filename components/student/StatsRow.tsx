"use client"

/**
 * STUDENT STATS ROW COMPONENT
 * ---------------------------
 * A high-level horizontal summary of the student's core metrics.
 * 
 * METRICS DISPLAYED:
 * 1. Problems Solved: Total count and weekly delta.
 * 2. Poll Participation: Raw count and attendance rate.
 * 3. Current Mastery: Student's level/rank title.
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, CheckCircle, Activity } from "lucide-react"

/**
 * STUDENT STATS ROW
 * Renders three quick-glance stat cards.
 */
export function StudentStatsRow() {
  /**
   * @todo TO REPLACE WITH SUPABASE:
   * 1. Problems Solved: `supabase.from('submissions').select('id', { count: 'exact' }).eq('status', 'correct')`
   * 2. This Week Delta: Filter 'submissions' where 'created_at' > current_week_start.
   * 3. Mastery: Fetch 'level_title' and 'points' from the 'profiles' table.
   */

  return (
    <div className="grid gap-4 md:grid-cols-3">
      
      {/* PROBLEMS SOLVED STAT */}
      <Card className="rounded-2xl border-slate-200 shadow-sm border-b-4 border-b-emerald-500 hover:scale-[1.02] transition-transform">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Problems Solved</CardTitle>
          <CheckCircle className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-black text-slate-900 tracking-tight">124</div>
          <p className="text-[10px] text-emerald-600 font-bold mt-1 uppercase">
            +12 this week
          </p>
        </CardContent>
      </Card>

      {/* POLL PARTICIPATION STAT */}
      <Card className="rounded-2xl border-slate-200 shadow-sm border-b-4 border-b-blue-500 hover:scale-[1.02] transition-transform">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Poll Engagement</CardTitle>
          <Activity className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-black text-slate-900 tracking-tight">42</div>
          <p className="text-[10px] text-blue-600 font-bold mt-1 uppercase">
            100% active streak
          </p>
        </CardContent>
      </Card>

      {/* MASTERY LEVEL STAT */}
      <Card className="rounded-2xl border-slate-200 shadow-sm border-b-4 border-b-amber-500 hover:scale-[1.02] transition-transform">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Mastery</CardTitle>
          <Trophy className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-black text-slate-900 tracking-tight">Level 4</div>
          <p className="text-[10px] text-amber-600 font-bold mt-1 uppercase tracking-tight">
            Expert Architect Rank
          </p>
        </CardContent>
      </Card>

    </div>
  )
}
