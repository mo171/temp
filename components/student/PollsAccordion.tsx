"use client"

/**
 * POLLS ACCORDION COMPONENT
 * -------------------------
 * This component organizes quizzes and polls into collapsible chapter sections.
 * It provides a summary of the student's performance (Avg. Score, Completion) per chapter.
 * 
 * FEATURES:
 * - Grouping by Chapter/Topic.
 * - Performance analytics per category.
 * - Visual status indicators (Attempted, Missed, Upcoming).
 * - Navigation to individual quiz pages.
 */

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, XCircle, CheckCircle2, Clock, BarChart3 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

/**
 * MOCK DATA - POLLS BY CHAPTER
 * @todo TO REPLACE WITH SUPABASE:
 * 1. Table structure: 'chapters' { id, title, order }
 * 2. Table structure: 'polls' { id, chapter_id, title, status, score }
 * 3. Fetch data using:
 *    const { data } = await supabase.from('chapters').select('*, polls(*)').order('order')
 */
const pollsData = [
  {
    chapter: "Fundamentals",
    polls: [
      { id: 1, title: "Basic Syntax Quiz", status: "attempted", score: 85, date: "2 days ago" },
      { id: 2, title: "Variables & Types", status: "missed", score: null, date: "5 days ago" },
      { id: 3, title: "Control Flow", status: "attempted", score: 92, date: "1 week ago" },
    ]
  },
  {
    chapter: "Tools",
    polls: [
       { id: 4, title: "VS Code Shortcuts", status: "attempted", score: 100, date: "Yesterday" },
       { id: 5, title: "Git Basics", status: "upcoming", score: null, date: "Tomorrow" },
    ]
  },
  {
    chapter: "Building Blocks",
    polls: [
       { id: 6, title: "React Components", status: "attempted", score: 78, date: "3 days ago" },
       { id: 7, title: "Props & State", status: "missed", score: null, date: "1 week ago" },
       { id: 8, title: "Hooks Intro", status: "attempted", score: 88, date: "2 weeks ago" },
    ]
  },
   {
    chapter: "Interacting With Browser",
    polls: []
  },
  {
    chapter: "TypeScript Essentials",
    polls: [
        { id: 9, title: "Type vs Interface", status: "attempted", score: 95, date: "1 day ago" }
    ]
  }
]

/**
 * POLLS ACCORDION
 * Renders the main lists of quizzes grouped by logical chapters.
 */
export function PollsAccordion() {
  const router = useRouter();

  return (
    <div className="w-full space-y-4">
      <Accordion type="single" collapsible className="w-full space-y-4">
        {pollsData.map((chapter, index) => {
           /**
            * CHAPTER ANALYTICS CALCULATION
            * Computed dynamically based on the polls array for each chapter.
            */
           const total = chapter.polls.length;
           const attempted = chapter.polls.filter(p => p.status === 'attempted').length;
           const missed = chapter.polls.filter(p => p.status === 'missed').length;
           const avgScore = attempted > 0 
                ? Math.round(chapter.polls.reduce((acc, curr) => acc + (curr.score || 0), 0) / attempted) 
                : 0;

           return (
            <AccordionItem 
              key={index} 
              value={`item-${index}`} 
              className="border rounded-xl px-4 bg-white shadow-sm data-[state=open]:border-orange-200 transition-all duration-300"
            >
                {/* ACCORDION TRIGGER (The Chapter Title Bar) */}
                <AccordionTrigger className="hover:no-underline py-5">
                    <div className="flex items-center gap-4 w-full">
                        <div className="flex items-center gap-3 flex-1 text-left">
                            <span className="text-lg font-bold text-slate-800 tracking-tight">{chapter.chapter}</span>
                             {total > 0 && (
                                <Badge variant="secondary" className="bg-slate-100 text-slate-500 font-bold text-[10px] uppercase">
                                    {total} Polls
                                </Badge>
                             )}
                        </div>
                        
                        {/* Summary Stats (Visible when collapsed) */}
                        <div className="hidden sm:flex items-center gap-6 mr-4 text-[10px] font-black uppercase tracking-widest">
                            {attempted > 0 && (
                                <div className="flex items-center gap-1.5 text-emerald-600">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>{attempted} Done</span>
                                </div>
                            )}
                             {missed > 0 && (
                                <div className="flex items-center gap-1.5 text-red-500">
                                    <XCircle className="w-3.5 h-3.5" />
                                    <span>{missed} Missed</span>
                                </div>
                            )}
                        </div>
                    </div>
                </AccordionTrigger>
                
                {/* ACCORDION CONTENT (The Quizzes List) */}
                <AccordionContent className="pb-6 pt-2">
                    {chapter.polls.length > 0 ? (
                        <div className="space-y-4">
                             {/* Chapter-Level Analytics Dashboard */}
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <Card className="p-4 bg-orange-50 border-orange-100 flex items-center justify-between shadow-none">
                                    <div>
                                         <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Average Mastery</p>
                                         <p className="text-2xl font-black text-slate-900 mt-1">{avgScore}%</p>
                                    </div>
                                    <Trophy className="w-8 h-8 text-orange-400 opacity-60" />
                                </Card>
                                <Card className="p-4 bg-slate-50 border-slate-100 flex items-center justify-between shadow-none">
                                    <div>
                                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Completion</p>
                                         <p className="text-2xl font-black text-slate-900 mt-1">{Math.round((attempted / total) * 100)}%</p>
                                    </div>
                                    <BarChart3 className="w-8 h-8 text-slate-300 opacity-60" />
                                </Card>
                             </div>

                             {/* Individual Poll Cards */}
                            <div className="grid gap-2">
                                {chapter.polls.map((poll) => (
                                    <div 
                                        key={poll.id} 
                                        onClick={() => router.push(`/student/polls/${poll.id}`)}
                                        className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/30 hover:bg-white hover:border-orange-200 hover:shadow-md transition-all duration-200 cursor-pointer group"
                                    >
                                        <div className="flex items-center gap-4">
                                            {/* Status Icons */}
                                            {poll.status === 'attempted' ? (
                                                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                                                    <CheckCircle2 size={18} />
                                                </div>
                                            ) : poll.status === 'missed' ? (
                                                 <div className="p-2 bg-red-100 rounded-lg text-red-500">
                                                    <XCircle size={18} />
                                                </div>
                                            ) : (
                                                <div className="p-2 bg-blue-100 rounded-lg text-blue-500">
                                                    <Clock size={18} />
                                                </div>
                                            )}
                                            
                                            <div>
                                                <h4 className="font-bold text-slate-800 text-sm group-hover:text-orange-950">{poll.title}</h4>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{poll.date}</p>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            {poll.status === 'attempted' ? (
                                                <span className="text-lg font-black text-slate-800">{poll.score}%</span>
                                            ) : poll.status === 'missed' ? (
                                                <span className="text-[10px] font-black text-red-500 uppercase tracking-tight">Not Attempted</span>
                                            ) : (
                                                <span className="text-[10px] font-black text-blue-500 uppercase tracking-tight">Upcoming</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="text-center py-10 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-slate-400">
                            <BarChart3 className="w-10 h-10 mx-auto mb-3 opacity-10" />
                            <p className="text-xs font-bold uppercase tracking-widest opacity-40">No polls available here.</p>
                        </div>
                    )}
                </AccordionContent>
            </AccordionItem>
           )
        })}
      </Accordion>
    </div>
  )
}
