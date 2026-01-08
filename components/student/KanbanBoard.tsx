"use client"

/**
 * KANBAN BOARD COMPONENT
 * ----------------------
 * This component provides a visual interface for managing group tasks using a member-based Kanban system.
 * It allows students to see who is working on what and drag-and-drop tasks to reassign them.
 * 
 * DESIGN PATTERN:
 * - Columns represent Team Members (plus one "Unassigned" column).
 * - Cards represent Tasks.
 * - Drag and Drop reassigns the 'assigneeId' of a task.
 */

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { MoreHorizontal, Plus, GripVertical } from "lucide-react"

// Types for data structure
type TaskStatus = "queue" | "progress" | "done"

interface Member {
  id: string
  name: string
  avatar: string
  role: string
}

interface Task {
  id: string
  title: string
  assigneeId: string | null // null for unassigned
  priority: "low" | "medium" | "high"
  status: TaskStatus 
}

interface KanbanBoardProps {
  groupId: string
}

/**
 * STATIC MOCK DATA - MEMBERS
 * @todo TO REPLACE WITH SUPABASE:
 * 1. Create a 'group_members' table in Supabase.
 * 2. Fetch members using: `supabase.from('group_members').select('*').eq('group_id', groupId)`
 * 3. Map the database results to this Member interface.
 */
const mockMembers: Record<string, Member[]> = {
  "hackathon-a": [
    { id: "m1", name: "Alex Chen", avatar: "👨‍💻", role: "Frontend" },
    { id: "m2", name: "Sarah Smith", avatar: "🎨", role: "Design" },
    { id: "m3", name: "Mike Ross", avatar: "😎", role: "Backend" },
  ],
  "fyp-2024": [
    { id: "m4", name: "You", avatar: "😎", role: "Researcher" },
    { id: "m5", name: "Dr. Watson", avatar: "👨‍🏫", role: "Supervisor" },
  ],
  "study-group": [
     { id: "m6", name: "You", avatar: "😎", role: "Student" },
     { id: "m7", name: "Emily", avatar: "👩‍💻", role: "Student" },
  ]
}

/**
 * STATIC MOCK DATA - TASKS
 * @todo TO REPLACE WITH SUPABASE:
 * 1. Create a 'tasks' table: { id, title, assignee_id, group_id, priority, status }
 * 2. Fetch tasks using: `supabase.from('tasks').select('*').eq('group_id', groupId)`
 * 3. Use real-time subscriptions to sync changes across the team automatically.
 */
const mockTasks: Record<string, Task[]> = {
  "hackathon-a": [
    { id: "1", title: "Design Landing Page", assigneeId: "m2", priority: "high", status: "progress" },
    { id: "2", title: "Setup Database Schema", assigneeId: "m3", priority: "high", status: "done" },
    { id: "3", title: "User Authentication", assigneeId: "m1", priority: "medium", status: "queue" },
    { id: "4", title: "Mobile Responsive Fixes", assigneeId: "m2", priority: "low", status: "queue" },
    { id: "5", title: "API Integration", assigneeId: null, priority: "high", status: "queue" },
  ],
  "fyp-2024": [
    { id: "6", title: "Literature Review", assigneeId: "m4", priority: "high", status: "progress" },
    { id: "7", title: "Initial Proposal", assigneeId: "m4", priority: "high", status: "done" },
  ],
  "study-group": [
    { id: "8", title: "Arrays & Hashing Problems", assigneeId: "m6", priority: "medium", status: "queue" },
  ]
}

export function KanbanBoard({ groupId }: KanbanBoardProps) {
  // Local state for tasks. In production, this might be managed by a global context or SWR/React Query.
  const [tasks, setTasks] = useState<Task[]>(mockTasks[groupId] || [])
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null)

  /**
   * SYNC EFFECT
   * Updates the board whenever the parent switches the active group.
   * @todo: Add an async fetch call here once Supabase is connected.
   */
  useEffect(() => {
    // RESET AND FETCH:
    // const fetchTasks = async () => {
    //    const { data } = await supabase.from('tasks').select('*').eq('group_id', groupId)
    //    setTasks(data)
    // }
    setTasks(mockTasks[groupId] || [])
  }, [groupId])
  
  /**
   * DRAG START HANDLER
   * Stores the ID of the task being moved.
   */
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId)
    e.dataTransfer.effectAllowed = "move"
    // Optional: Add visual feedback for starting drag
  }

  /**
   * DRAG OVER HANDLER
   * Necessary to prevent default browser behavior and allow dropping.
   */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  /**
   * DROP HANDLER
   * Performs the actual reassignment logic.
   * @param memberId The ID of the member (column) where the task was dropped.
   * 
   * @todo TO REPLACE WITH SUPABASE:
   * 1. Update local state (optimistic UI).
   * 2. Call `supabase.from('tasks').update({ assignee_id: memberId }).eq('id', draggedTaskId)`
   * 3. Handle errors by reverting local state if the DB update fails.
   */
  const handleDrop = async (e: React.DragEvent, memberId: string | null) => {
    e.preventDefault()
    if (!draggedTaskId) return

    // UPDATE LOCAL STATE
    setTasks(prev => prev.map(t => 
      t.id === draggedTaskId ? { ...t, assigneeId: memberId } : t
    ))
    
    // RESET DRAG STATE
    setDraggedTaskId(null)

    // @todo: Add database push here
    // console.log(`Task ${draggedTaskId} reassigned to member: ${memberId || 'Unassigned'}`)
  }

  // Pre-calculate columns based on group members
  const members = mockMembers[groupId] || []
  const columns = [
    { id: null, name: "Unassigned", avatar: "❓", role: "Backlog" },
    ...members
  ]

  return (
    <div className="h-full flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-orange-200">
      {columns.map((col) => {
        // Filter tasks that belong specifically to this member/column
        const colTasks = tasks.filter(t => t.assigneeId === (col.id || null))
        
        return (
          <div 
            key={col.id || 'unassigned'} 
            className="flex-shrink-0 w-80 flex flex-col rounded-xl bg-slate-50/50 border border-slate-200 h-full max-h-full transition-colors duration-300"
            onDragOver={handleDragOver}
            onDrop={(e: React.DragEvent) => handleDrop(e, col.id)}
          >
            {/* COLUMN HEADER */}
            <div className={cn(
              "p-4 rounded-t-xl border-b border-slate-100 flex items-center justify-between", 
              col.id === null ? "bg-slate-100/50" : "bg-white"
            )}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm border-2 border-white shadow-sm ring-1 ring-slate-100">
                    {col.avatar}
                </div>
                <div>
                    <h3 className="font-semibold text-slate-800 text-sm leading-none">{col.name}</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight mt-1">{col.role}</p>
                </div>
              </div>
              <span className="bg-white border px-2 py-0.5 rounded-full text-[10px] font-black text-slate-400">
                  {colTasks.length}
              </span>
            </div>

            {/* TASK CARDS LIST */}
            <div className="flex-1 p-3 overflow-y-auto space-y-3 custom-scrollbar">
              {colTasks.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  className={cn(
                    "bg-white p-4 rounded-xl shadow-sm border border-slate-100 cursor-grab active:cursor-grabbing group hover:shadow-md hover:border-orange-200 transition-all duration-200",
                    draggedTaskId === task.id ? "opacity-30 scale-95" : ""
                  )}
                >
                  {/* Priority & Status Row */}
                  <div className="flex justify-between items-start mb-3">
                     <span className={cn(
                        "text-[9px] uppercase font-black px-2 py-0.5 rounded-full border",
                        task.priority === 'high' ? "bg-red-50 text-red-600 border-red-100" :
                        task.priority === 'medium' ? "bg-amber-50 text-amber-600 border-amber-100" :
                        "bg-slate-50 text-slate-600 border-slate-100"
                     )}>
                        {task.priority}
                     </span>
                     
                     {/* Small status dot for quick monitoring */}
                     <span className={cn(
                        "w-2 h-2 rounded-full shadow-sm",
                        task.status === 'done' ? "bg-emerald-500" :
                        task.status === 'progress' ? "bg-amber-400 animate-pulse" : "bg-slate-300"
                     )} title={`Status: ${task.status}`} />
                  </div>
                  
                  {/* Title */}
                  <h4 className="font-semibold text-slate-800 mb-4 text-sm leading-tight group-hover:text-orange-950">
                    {task.title}
                  </h4>

                  {/* Card Footer: Status Text & Drag Handle */}
                  <div className="flex items-center justify-between mt-4 border-t pt-3 border-slate-50">
                     <div className="flex items-center gap-1.5">
                        <div className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          task.status === 'done' ? "bg-emerald-500" : "bg-slate-300"
                        )} />
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                           {task.status.replace('-', ' ')}
                        </span>
                     </div>
                    <div className="text-slate-200 group-hover:text-slate-400 transition-colors">
                       <GripVertical className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}

              {/* EMPTY COLUMN PLACEHOLDER */}
              {colTasks.length === 0 && (
                 <div className="h-24 flex flex-col items-center justify-center border-2 border-dashed border-slate-200/50 rounded-xl text-slate-300 gap-2 bg-white/30">
                    <Plus className="w-5 h-5 opacity-20" />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Drop Task Here</span>
                 </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
