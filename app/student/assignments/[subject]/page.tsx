import { AssignmentNodeGraph } from "@/components/student/AssignmentNodeGraph"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

/**
 * SUBJECT ROADMAP PAGE
 * --------------------
 * This is a dynamic route (/student/assignments/[subject]) that renders the
 * interactive learning path graph for a specific subject.
 * 
 * ARCHITECTURE:
 * - Dynamic parameter handling (Next.js 13+ App Router pattern).
 * - Full-height canvas containing the ReactFlow graph.
 * - Back-button navigation to the main assignments list.
 */

type Props = {
  params: Promise<{
    subject: string
  }>
}

/**
 * SUBJECT ROADMAP PAGE COMPONENT
 * @param params Contains the 'subject' ID from the URL.
 */
export default async function AssignmentSubjectPage({ params }: Props) {
  /**
   * DATA RESOLUTION
   * --------------
   * 1. Await dynamic params.
   * 2. @todo: You can also fetch specific subject metadata (like a custom title or description)
   *    from Supabase here: `supabase.from('subjects').select('*').eq('id', subject).single()`
   */
  const resolvedParams = await params
  const { subject } = resolvedParams

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)]">
      
      {/* HEADER BAR 
          Provides context and navigation controls.
      */}
      <div className="flex items-center space-x-6 mb-4 shrink-0 px-6 pt-4">
        {/* Navigation Back Link */}
        <Button variant="ghost" size="icon" className="h-11 w-11 rounded-2xl hover:bg-slate-100" asChild>
          <Link href="/student/assignments">
             <ArrowLeft className="h-5 w-5 text-slate-600" />
          </Link>
        </Button>
        
        <div>
            {/* Displaying specific subject name */}
            <h2 className="text-2xl font-black text-slate-900 tracking-tight capitalize leading-none mb-1">
                {subject} Learning Path
            </h2>
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                Unit-wise roadmap for Academic Session 2026
            </p>
        </div>
      </div>
      
      {/* GRAPH CANVAS 
          Takes up the remaining screen space.
          The 'flex-1 min-h-0' is critical for ensuring the flow canvas handles resizing correctly.
      */}
      <div className="flex-1 w-full min-h-0 border-t border-slate-100 bg-white shadow-inner">
          {/* 
             ASSIGNMENT NODE GRAPH
             The main interactive component using @xyflow/react.
             @component AssignmentNodeGraph - Props: subjectId used to filter nodes/edges.
          */}
          <AssignmentNodeGraph subjectId={subject} />
      </div>
    </div>
  )
}
