"use client"

/**
 * POLLS & QUIZZES ENTRY PAGE
 * --------------------------
 * Path: /student/polls
 * This page lists all available and completed quizzes for the student.
 * 
 * ARCHITECTURE:
 * - Simple header with a summary description.
 * - Main content consists of the 'PollsAccordion' which handles grouping logic.
 */

import { PollsAccordion } from "@/components/student/PollsAccordion"

export default function PollsPage() {
  return (
    <div className="flex-1 space-y-6 pt-6 pb-20">
      {/* HEADER SECTION 
          Explains the purpose of the polling/quiz system.
      */}
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 underline decoration-orange-500/20 underline-offset-8">
            Polls & Performance
        </h2>
        <p className="text-slate-500 font-medium text-sm">
          A comprehensive view of your active quizzes, participation history, and chapter-wise mastery scores.
        </p>
      </div>
      
      {/* ACCORDION CONTENT 
          @component PollsAccordion - Renders quizzes grouped by chapters.
      */}
      <div className="mt-8">
          <PollsAccordion />
      </div>
    </div>
  )
}
