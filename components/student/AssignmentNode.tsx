"use client"

/**
 * ASSIGNMENT NODE COMPONENT
 * -------------------------
 * This is a custom node component for the @xyflow/react graph.
 * It renders a detailed card representing an assignment, experiment, or milestone.
 * 
 * FEATURES:
 * - Handles 'target' and 'source' connecting points for the graph edges.
 * - Dynamic styling based on status (Locked, Active, Completed).
 * - Displays deadline information and submission timestamps.
 */

import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Clock, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { cn } from "@/lib/utils";

type AssignmentNodeProps = {
  /**
   * Node data structure passed from AssignmentNodeGraph.tsx
   * @todo: When integrating Supabase, map the DB fields to these props.
   */
  data: {
    title: string;
    subTitle?: string;
    deadline?: string;             // e.g. "12 Jan 2024"
    submittedDate?: string;        // null if not submitted
    status: 'locked' | 'active' | 'completed';
  };
};

/**
 * ASSIGNMENT NODE
 * Renders a specialized card within the learning path graph.
 */
const AssignmentNode = ({ data }: AssignmentNodeProps) => {
  const isCompleted = data.status === 'completed';
  const isActive = data.status === 'active';
  const isLocked = data.status === 'locked';

  return (
    <div className={cn(
      "w-[350px] bg-white rounded-xl shadow-md border transition-all duration-300",
      isCompleted && "border-emerald-500 shadow-emerald-100", // Green for success
      isActive && "border-orange-500 shadow-orange-100 ring-4 ring-orange-50", // Orange for current focus
      isLocked && "border-slate-200 bg-slate-50 opacity-80" // Gray for locked
    )}>
      
      {/* TARGET HANDLE (Connecting Point)
          ------------------------------
          Connects to the source handle of a PREVIOUS assignment.
      */}
      <Handle 
        type="target" 
        position={Position.Left} 
        className={cn(
          "!w-3 !h-3 !border-2 !bg-white",
          isCompleted ? "!border-emerald-500" : isActive ? "!border-orange-500" : "!border-slate-300"
        )} 
      />

      <div className="p-5">
        {/* Header Section: Status Icon and Title */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2.5 rounded-xl transition-all duration-500",
              isCompleted ? "bg-emerald-100 text-emerald-600 rotate-0" : 
              isActive ? "bg-orange-100 text-orange-600" : "bg-slate-100 text-slate-500"
            )}>
              {/* Dynamic Icon selection based on status */}
              {isCompleted ? <CheckCircle2 size={20} /> : 
               isActive ? <FileText size={20} className="animate-pulse" /> : 
               <AlertCircle size={20} />}
            </div>
            <div>
              <h3 className={cn("font-extrabold text-sm tracking-tight", isLocked ? "text-slate-500" : "text-slate-900")}>
                {data.title}
              </h3>
              {data.subTitle && (
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.1em] mt-0.5">{data.subTitle}</p>
              )}
            </div>
          </div>
        </div>

        {/* Info Rows: Details about timing and submissions */}
        <div className="space-y-2 mt-4">
          <div className="flex items-center justify-between py-1.5 border-b border-dashed border-slate-100">
             <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">Submission Deadline</span>
             <span className={cn("text-xs font-black", isLocked ? "text-slate-400" : "text-slate-800")}>
                {data.deadline || <span className="text-slate-300 italic font-medium">Not Fixed</span>}
             </span>
          </div>
          
          <div className="flex items-center justify-between py-1.5">
             <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">Submitted On</span>
             <span className={cn(
                "text-xs font-black",
                data.submittedDate ? "text-emerald-600" : "text-slate-300 italic font-medium"
             )}>
                {data.submittedDate || "Pending"}
             </span>
          </div>
        </div>
      </div>

       {/* SOURCE HANDLE (Connecting Point)
           ------------------------------
           Connects to the target handle of the NEXT assignment in the path.
       */}
       <Handle 
        type="source" 
        position={Position.Right} 
         className={cn(
          "!w-3 !h-3 !border-2 !bg-white",
           isCompleted ? "!border-emerald-500" : isActive ? "!border-orange-500" : "!border-slate-300"
        )} 
      />
    </div>
  );
};

/**
 * Optimized with React.memo to prevent unnecessary re-renders when the graph pans or zooms.
 */
export default memo(AssignmentNode);
