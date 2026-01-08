"use client"

/**
 * STUDENT TASK LIST COMPONENT
 * ---------------------------
 * This component displays adaptive learning tasks based on the student's current mastery score.
 * 
 * FEATURES:
 * - Dynamic UI branching: Shows 'Expert Challenges' for scores >= 80, and 'Skill Builders' for others.
 * - Motivation badges based on performance.
 * - Task estimates and categorization.
 */

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code, BookOpen, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * STUDENT TASK LIST
 * Renders the "Today's Focus" section with adaptive content.
 */
export function StudentTaskList() {
  /**
   * MASTERY STATE
   * @todo TO REPLACE WITH SUPABASE:
   * 1. Calculate the user's weighted average score from 'submissions' table.
   * 2. logic: (sum of scores / total possible) * 100.
   */
  const masteryScore = 85 
  const isAdvanced = masteryScore >= 80

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black tracking-tight text-slate-900">Today's Focus</h2>
        <Badge variant={isAdvanced ? "default" : "secondary"} className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-orange-500 text-white border-none shadow-lg shadow-orange-500/20">
          Mastery: {masteryScore}%
        </Badge>
      </div>

      {/* Main Task Card with dynamic styling based on performance level */}
      <Card className={`border-l-8 rounded-2xl shadow-sm transition-all duration-500 ${isAdvanced ? 'border-l-emerald-500 shadow-emerald-50/50' : 'border-l-amber-500 shadow-amber-50/50'}`}>
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
             <div>
               <CardTitle className="flex items-center gap-2 text-xl font-black tracking-tight text-slate-800">
                 {isAdvanced ? (
                   <>
                     <Star className="text-emerald-500 fill-current w-5 h-5" />
                     Expert Challenge
                   </>
                 ) : (
                   <>
                     <BookOpen className="text-amber-500 w-5 h-5" />
                     Skill Builder
                   </>
                 )}
               </CardTitle>
               <CardDescription className="mt-2 text-slate-500 font-medium leading-relaxed">
                 {isAdvanced 
                   ? "You're ahead of the curve! Push your limits with these advanced algorithmic problems." 
                   : "Let's reinforce the core concepts today to build a rock-solid foundation for future topics."
                 }
               </CardDescription>
             </div>
             {isAdvanced && <Badge className="bg-emerald-500 text-white font-black text-[9px] uppercase tracking-widest border-none">HIGH IQ</Badge>}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 pt-2">
           {isAdvanced ? (
             /* ADVANCED TASKS VIEW 
                @todo: Fetch from 'challenges' table where difficulty is 'hard'.
             */
             <div className="space-y-3">
                {/* Individual Task Item */}
                <div className="p-4 border border-slate-100 rounded-2xl bg-slate-50/30 hover:bg-white hover:border-emerald-200 hover:shadow-xl transition-all duration-300 cursor-pointer flex justify-between items-center group">
                  <div className="flex items-center gap-5">
                     <div className="h-12 w-12 bg-emerald-100/50 text-emerald-600 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
                       <Code size={20} strokeWidth={2.5} />
                     </div>
                     <div>
                       <div className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">Dynamic Programming: Grid Paths</div>
                       <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">EST. 20 MINS &bull; HARD</div>
                     </div>
                  </div>
                  <Button size="sm" className="hidden group-hover:flex bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/20 font-bold px-5">
                    Start Path
                  </Button>
                </div>

                <div className="p-4 border border-slate-100 rounded-2xl bg-slate-50/30 hover:bg-white hover:border-emerald-200 hover:shadow-xl transition-all duration-300 cursor-pointer flex justify-between items-center group">
                  <div className="flex items-center gap-5">
                     <div className="h-12 w-12 bg-emerald-100/50 text-emerald-600 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
                       <Code size={20} strokeWidth={2.5} />
                     </div>
                     <div>
                       <div className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">System Design: Rate Limiter</div>
                       <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">EST. 45 MINS &bull; EXPERT</div>
                     </div>
                  </div>
                  <Button size="sm" className="hidden group-hover:flex bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/20 font-bold px-5">
                    Analyze
                  </Button>
                </div>
             </div>
           ) : (
             /* REMEDIAL / SKILL BUILDER VIEW 
                @todo: Fetch from 'challenges' table where difficulty is 'easy' or 'medium'.
             */
             <div className="space-y-3">
                 <div className="p-10 border-2 border-dashed border-slate-200 rounded-2xl text-center text-slate-400 flex flex-col items-center">
                    <BookOpen size={40} className="mb-4 opacity-10" />
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Loading Skill Builder Tasks...</span>
                 </div>
             </div>
           )}
        </CardContent>
      </Card>
    </div>
  )
}
