import { DashboardSidebar } from "@/components/DashboardSidebar"

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-muted/20">
      <DashboardSidebar role="teacher" />
      <main className="pl-64 min-h-screen">
        <div className="container py-6 max-w-7xl mx-auto space-y-8 px-8">
          {children}
        </div>
      </main>
    </div>
  )
}
