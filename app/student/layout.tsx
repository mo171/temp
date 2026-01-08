import { DashboardSidebar } from "@/components/DashboardSidebar"

/**
 * STUDENT DASHBOARD LAYOUT
 * ------------------------
 * This layout defines the shared UI structure for all student routes (/student/*).
 * 
 * ARCHITECTURE:
 * - Sidebar: Fixed on the left, handles navigation.
 * - Main Content: Padded to the right to account for the sidebar width.
 * - Styling: Light background (muted/20) for a clean dashboard look.
 */

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* 
          DASHBOARD SIDEBAR 
          Passes 'role' to control which links are visible.
          @component DashboardSidebar
      */}
      <DashboardSidebar role="student" />

      {/* 
          MAIN CONTENT AREA 
          - 'pl-64': Accounts for the 16rem (256px) sidebar width.
          - 'container': Centers content with max-width on large screens.
      */}
      <main className="pl-64 min-h-screen">
        <div className="container py-8 max-w-[1400px] mx-auto space-y-8 px-10">
          {children}
        </div>
      </main>
    </div>
  )
}
