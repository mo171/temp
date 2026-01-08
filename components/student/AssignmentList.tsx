"use client"

/**
 * ASSIGNMENT LIST COMPONENT
 * -------------------------
 * This component displays a list of subject-wise assignments for the student.
 * It supports two visual modes:
 * 1. 'grid': A standard responsive grid (3 columns on large screens).
 * 2. 'slider': A horizontally scrollable row, ideal for dashboards or summaries.
 * 
 * FEATURES:
 * - Visual progress tracking (Completed/Total).
 * - Subject-specific iconography.
 * - Smooth horizontal scrolling in slider mode.
 */

import Link from "next/link"
import { useRef } from "react"
import { Card } from "@/components/ui/card"
import { Code, FileText, Database, Calculator, Beaker, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * MOCK DATA - SUBJECT ASSIGNMENTS
 * @todo TO REPLACE WITH SUPABASE:
 * 1. Table structure: 'subjects' { id, name, icon_name }
 * 2. Table structure: 'assignments' { id, subject_id, status }
 * 3. Fetch data using a join or two parallel calls:
 *    const { data } = await supabase.from('subjects').select('*, assignments(status)')
 */
const assignmentsData = [
  {
    subject: "Mathematics",
    id: "Math",
    totalAssignments: 12,
    completedAssignments: 8,
    icon: Calculator,
  },
  {
    subject: "Physics",
    id: "Physics",
    totalAssignments: 10,
    completedAssignments: 4,
    icon: Code, 
  },
  {
    subject: "Chemistry", 
    id: "Chem",
    totalAssignments: 8,
    completedAssignments: 2,
    icon: Beaker,
  },
  {
    subject: "Biology",
    id: "Bio",
    totalAssignments: 15,
    completedAssignments: 5,
    icon: Database,
  },
    {
    subject: "Computer Science",
    id: "CS",
    totalAssignments: 5,
    completedAssignments: 5,
    icon: FileText,
  },
]

interface AssignmentListProps {
  viewMode?: 'grid' | 'slider'
}

/**
 * ASSIGNMENT LIST COMPONENT
 * @param viewMode Determines if the list is a grid or a horizontal slider.
 */
export function AssignmentList({ viewMode = 'grid' }: AssignmentListProps) {
  /**
   * SLIDER MODE LOGIC
   * -----------------
   * Renders a horizontal container with manual scroll buttons.
   */
  if (viewMode === 'slider') {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    /**
     * SCROLL HANDLER
     * Animates the horizontal scroll position by a fixed step.
     */
    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef
            const scrollAmount = 320 // matches card width + gap
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
            }
        }
    }

    return (
      <div className="relative group/slider">
          {/* Main Scroll Area */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-6 -mx-6 px-6 scrollbar-hide snap-x snap-mandatory scroll-smooth"
          >
            {assignmentsData.map((item) => {
               const Icon = item.icon
               return (
                 <Link 
                    href={`/student/assignments/${item.id}`} 
                    key={item.id} 
                    className="block group min-w-[300px] snap-center first:pl-2"
                 >
                    <Card className="relative h-44 overflow-hidden border border-slate-200 bg-white transition-all duration-300 hover:shadow-lg hover:border-orange-200">
                       {/* DESIGN: Decorative Grid Background */}
                       <div className="absolute inset-0 opacity-[0.2]" 
                            style={{
                                backgroundImage: `linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)`,
                                backgroundSize: '24px 24px'
                            }}
                       />
                       
                       {/* DESIGN: Glow element for hover effect */}
                       <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-orange-100 rounded-full blur-3xl opacity-60 group-hover:opacity-80 transition-opacity" />
        
                       <div className="relative h-full flex flex-col justify-between p-5">
                          {/* Subject Info */}
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold text-slate-800 leading-tight max-w-[70%]">
                              {item.subject}
                            </h3>
                            <div className="flex items-baseline gap-0.5">
                               <span className="text-lg font-bold text-orange-500">{item.completedAssignments}</span>
                               <span className="text-sm font-medium text-slate-400">/{item.totalAssignments}</span>
                            </div>
                          </div>
        
                          {/* Subject Icon (Decorative) */}
                          <div className="flex justify-end items-end mt-2">
                             <div className="relative">
                                <div className="relative z-10 p-2 transform rotate-12 transition-transform duration-300 group-hover:rotate-0">
                                   <Icon className="w-7 h-7 text-orange-500/80" strokeWidth={1.5} />
                                </div>
                             </div>
                          </div>
                       </div>
                    </Card>
                 </Link>
               )
            })}
          </div>
          
          {/* Horizontal Navigation Buttons */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 z-10 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-slate-50 disabled:opacity-0"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-3 z-10 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-slate-50"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
      </div>
    )
  }

  /**
   * GRID MODE LOGIC (Default)
   * -------------------------
   * Renders a static grid layout of subject cards.
   */
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {assignmentsData.map((item) => {
        const Icon = item.icon
        
        return (
          <Link href={`/student/assignments/${item.id}`} key={item.id} className="block group">
            <Card className="relative h-48 overflow-hidden border border-slate-200 bg-white transition-all duration-300 hover:shadow-lg hover:border-orange-200">
               {/* Decorative Background Pattern */}
               <div className="absolute inset-0 opacity-[0.2]" 
                    style={{
                        backgroundImage: `linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)`,
                        backgroundSize: '24px 24px'
                    }}
               />
               
               <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-orange-100 rounded-full blur-3xl opacity-60 group-hover:opacity-80 transition-opacity" />

               <div className="relative h-full flex flex-col justify-between p-6">
                  {/* Subject and Progress Stats */}
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-slate-800 leading-tight max-w-[70%]">
                      {item.subject}
                    </h3>
                    <div className="flex items-baseline gap-0.5">
                       <span className="text-xl font-bold text-orange-500">{item.completedAssignments}</span>
                       <span className="text-lg font-medium text-slate-400">/{item.totalAssignments}</span>
                    </div>
                  </div>

                  {/* Icon section with hover animation */}
                  <div className="flex justify-end items-end mt-4">
                     <div className="relative">
                        <div className="relative z-10 p-2 transform rotate-12 transition-transform duration-300 group-hover:rotate-0">
                           <Icon className="w-8 h-8 text-orange-500/80" strokeWidth={1.5} />
                        </div>
                     </div>
                  </div>
               </div>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
