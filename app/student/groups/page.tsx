"use client"

/**
 * GROUP PROJECTS MAIN PAGE
 * ------------------------
 * This is the primary route for the "Group Projects" feature (/student/groups).
 * It implements a "Dashboard-within-a-Dashboard" layout where the content is 
 * dynamically swapped based on the selection in the right sidebar.
 * 
 * ARCHITECTURE:
 * - State Management: Uses React 'useState' for current group and tool selection.
 * - Flexbox Layout: 
 *      Left side (Fixed + Scrollable Area): Contains the Header and the active Tool (Kanban, etc.)
 *      Right side (Fixed Sidebar): Contains the Group and Tool selectors.
 * - Overflow Control: Uses 'overflow-hidden' on the container to prevent global window scrolling,
 *   forcing the Kanban board to handle its own scroll area.
 */

import { useState } from "react"
import { GroupRightSidebar } from "@/components/student/GroupRightSidebar"
import { KanbanBoard } from "@/components/student/KanbanBoard"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function GroupProjectsPage() {
  /**
   * PAGE STATE
   * These states control what data is fetched and displayed.
   * 
   * @todo: When integrating Supabase, the starting 'selectedGroup' should 
   * likely come from a URL query parameter or the first item found in the database.
   */
  const [selectedGroup, setSelectedGroup] = useState("hackathon-a")
  const [selectedTool, setSelectedTool] = useState("visual-board")

  /**
   * @note THEME HANDLING
   * The container has '-my-6 -mr-8' to negate the default padding of the dashboard Layout.
   * This allows the right sidebar and header to be "flush" with the edges for a professional app feel.
   */
  return (
    <div className="flex h-[calc(100vh)] -my-6 -mr-8 overflow-hidden bg-[#fafafa]">
      
      {/* MAIN CONTENT AREA 
          ------------------
          The central area that displays the active tool's content.
      */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50/50">
         
         {/* FIXED HEADER 
             Stays at the top while the board content scrolls underneath.
         */}
         <header className="flex-none flex items-center justify-between p-6 border-b border-slate-200/50 bg-white/80 backdrop-blur-md z-10">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900">
                {/* Dynamically display group name based on ID 
                    @todo: In production, fetch the group object and use its 'name' property.
                */}
                {selectedGroup === "hackathon-a" ? "Hackathon Team A" : 
                 selectedGroup === "fyp-2024" ? "Year Project 2024" : "DSA Study Group"}
              </h1>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1.5 opacity-60">
                Project Dashboard &rsaquo; {selectedTool.replace('-', ' ')}
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-2">
               <Button className="bg-orange-500 hover:bg-orange-600 text-white border-none shadow-xl shadow-orange-500/20 rounded-xl px-5 transition-all hover:scale-105 active:scale-95">
                 <Plus className="w-4 h-4 mr-2 stroke-[3px]" />
                 <span className="font-bold">New Task</span>
               </Button>
            </div>
         </header>

         {/* DYNAMIC VIEW CONTEXT
             ---------------------
             Uses a relative container with absolute inset to ensure the child (Kanban)
             can fill the space perfectly and handle internal overflow.
         */}
         <main className="flex-1 overflow-hidden relative">
             {selectedTool === "visual-board" ? (
                 <div className="absolute inset-0 p-6 overflow-hidden">
                    <KanbanBoard groupId={selectedGroup} />
                 </div>
             ) : (
                 /* SETTINGS VIEW PLACEHOLDER */
                 <div className="p-12 m-8 text-center text-slate-500 bg-white rounded-2xl border border-dashed border-slate-200 shadow-sm flex flex-col items-center justify-center h-fit">
                    <div className="w-16 h-16 bg-orange-50 text-orange-400 rounded-full flex items-center justify-center mb-4">
                       <Plus className="rotate-45 w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Project Settings</h3>
                    <p className="max-w-xs text-sm leading-relaxed text-slate-400">
                       Configure roles, policies, and project metadata for {selectedGroup}.
                    </p>
                 </div>
             )}
         </main>
      </div>

      {/* FIXED RIGHT SIDEBAR
          -------------------
          Handles selection logic for Groups and Tools.
      */}
      <GroupRightSidebar 
        selectedGroup={selectedGroup} 
        onSelectGroup={setSelectedGroup}
        selectedTool={selectedTool}
        onSelectTool={setSelectedTool}
        className="hidden lg:flex flex-none h-full z-20 shadow-[-5px_0_30px_0_rgba(0,0,0,0.02)]"
      />
    </div>
  )
}
