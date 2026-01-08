"use client"

/**
 * ASSIGNMENTS LISTING PAGE
 * -------------------------
 * This page (/student/assignments) displays the full list of subject-wise assignment categories.
 * It serves as a directory for the student to navigate into specific subjects (e.g. Mathematics, Physics).
 * 
 * ARCHITECTURE:
 * - Simple layout with a header.
 * - Reuses the 'AssignmentList' component in 'grid' mode for consistency.
 */

import { AssignmentList } from "@/components/student/AssignmentList"

export default function AssignmentsPage() {
  return (
    <div className="flex-1 space-y-6 pt-6 pb-20">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-3xl font-black tracking-tight text-slate-900">Assignments Library</h2>
           <p className="text-slate-500 font-medium text-sm mt-1">Select a subject to view your progress and learning path.</p>
        </div>
      </div>

      <div className="mt-8">
          {/* 
            ASSIGNMENT LIST 
            Renders subject cards in a grid.
            @component AssignmentList - Logic for fetching categories and rendering cards.
          */}
          <AssignmentList viewMode="grid" />
      </div>
    </div>
  )
}
