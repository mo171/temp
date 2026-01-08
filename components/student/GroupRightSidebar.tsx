"use client"

/**
 * GROUP RIGHT SIDEBAR COMPONENT
 * ----------------------------
 * This component handles navigation between different student groups and their associated tools.
 * It uses a themed "Orange & Off-White" aesthetic to match the application's branding.
 * 
 * FEATURES:
 * - Lists all groups the student is part of.
 * - Managed selection state passed from parent (app/student/groups/page.tsx).
 * - Switches between different tools like "Visual Board" and "Project Settings".
 */

import { cn } from "@/lib/utils"
import { Database, Folder, Settings, Shield, Table, Wrench } from "lucide-react"
import { useState } from "react"

interface GroupRightSidebarProps {
  className?: string
  selectedGroup: string // Controlled from parent
  onSelectGroup: (group: string) => void
  selectedTool: string // Controlled from parent
  onSelectTool: (tool: string) => void
}

export function GroupRightSidebar({ 
  className,
  selectedGroup,
  onSelectGroup,
  selectedTool,
  onSelectTool
}: GroupRightSidebarProps) {
  
  /**
   * STATIC GROUP LIST
   * @todo TO REPLACE WITH SUPABASE:
   * 1. Create a 'groups' table and a 'group_members' junction table.
   * 2. Fetch the groups where the current user (auth.uid()) is a member.
   * 3. Recommended fetch: 
   *    const { data } = await supabase
   *      .from('groups')
   *      .select('id, name')
   *      .in('id', userGroupIds)
   */
  const groups = [
    { id: "hackathon-a", name: "Hackathon Team A" },
    { id: "fyp-2024", name: "Year Project 2024" },
    { id: "study-group", name: "DSA Study Group" }
  ]

  /**
   * TOOL DEFINITIONS
   * These are usually static as they define the features of the page.
   */
  const tools = [
    { id: "visual-board", name: "Visual Board", icon: Table },
    { id: "settings", name: "Project Settings", icon: Settings },
  ]

  return (
    <aside className={cn(
      "w-80 border-l border-orange-100 bg-[#FFFBF7] text-slate-600 flex flex-col h-[calc(100vh-4rem)] lg:h-screen sticky top-0", 
      className
    )}>
      <div className="p-4 space-y-8">
        
        {/* GROUPS LIST SECTION */}
        <div>
          <h3 className="text-[10px] font-black text-orange-900/40 uppercase tracking-[0.2em] mb-5 px-2">
            GROUP PROJECTS
          </h3>
          <div className="space-y-1.5">
            {groups.map((group) => (
              <button
                key={group.id}
                onClick={() => onSelectGroup(group.id)}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300",
                  selectedGroup === group.id 
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25 ring-1 ring-orange-400/50" 
                    : "hover:bg-orange-100/40 text-slate-500 hover:text-orange-900"
                )}
              >
                {group.name}
              </button>
            ))}
          </div>
        </div>

        {/* PROJECT TOOLS SECTION */}
        <div>
           <h3 className="text-[10px] font-black text-orange-900/40 uppercase tracking-[0.2em] mb-5 px-2">
            UTILITIES & TOOLS
          </h3>
          <div className="space-y-1">
            {tools.map((tool) => {
              const Icon = tool.icon
              const isActive = selectedTool === tool.id
              return (
                <button
                  key={tool.id}
                  onClick={() => onSelectTool(tool.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200",
                    isActive 
                      ? "bg-orange-100/60 text-orange-800 border-l-4 border-orange-500 rounded-l-none" 
                      : "hover:bg-orange-50 text-slate-500 hover:text-orange-800"
                  )}
                >
                  <Icon className={cn("w-4 h-4 transition-transform duration-300", isActive ? "text-orange-600 scale-110" : "text-slate-400")} />
                  {tool.name}
                </button>
              )
            })}
          </div>
        </div>
        
        {/* PROJECT MANAGEMENT (PLACEHOLDERS) */}
        <div className="pt-6 border-t border-orange-100/50">
           <h3 className="text-[10px] font-black text-orange-900/40 uppercase tracking-[0.2em] mb-5 px-2">
            MANAGE
          </h3>
           <div className="space-y-1">
              <button className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-orange-50 text-slate-500 hover:text-orange-800 transition-colors">
                 <span>Member Roles</span>
                 <Shield className="w-3.5 h-3.5 opacity-30" />
              </button>
              <button className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-orange-50 text-slate-500 hover:text-orange-800 transition-colors">
                 <span>Group Policies</span>
                 <Database className="w-3.5 h-3.5 opacity-30" />
              </button>
           </div>
        </div>

      </div>
    </aside>
  )
}
