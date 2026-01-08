"use client"

/**
 * MAIN DASHBOARD SIDEBAR
 * ----------------------
 * The primary navigation component for the entire application.
 * It switches links based on the user's role (Teacher vs Student).
 */

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils" 
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  BookOpen, 
  GraduationCap, 
  Layout, 
  LogOut, 
  Settings, 
  User,
  FileText,
  ListChecks,
  LayoutDashboard,
  Bot,
  Users
} from "lucide-react"
import { useClerk } from "@clerk/nextjs"

interface SidebarProps {
  role: 'teacher' | 'student'
}

export function DashboardSidebar({ role }: SidebarProps) {
  const pathname = usePathname()
  const { signOut } = useClerk()

  /**
   * NAVIGATION LINKS - TEACHER
   */
  const teacherLinks = [
    { href: "/teacher", label: "Dashboard", icon: LayoutDashboard },
    { href: "/teacher/classes", label: "My Classes", icon: BookOpen },
    { href: "/teacher/analytics", label: "Analytics", icon: BarChart3 },
  ]

  /**
   * NAVIGATION LINKS - STUDENT
   * Note: The order here determines the visual order in the UI.
   */
  const studentLinks = [
    { href: "/student", label: "My Learning", icon: LayoutDashboard },
    { href: "/student/assignments", label: "Assignments", icon: FileText },
    { href: "/student/polls", label: "Polls & Quizzes", icon: ListChecks },
    { href: "/student/groups", label: "Group Projects", icon: Users }, // Positioned above Progress
    { href: "/student/progress", label: "Progress", icon: BarChart3 },
  ]

  // Select the appropriate links array based on the role prop passed from the Layout
  const links = role === 'teacher' ? teacherLinks : studentLinks

  return (
    <aside className="h-screen w-64 border-r bg-card/50 backdrop-blur-xl flex flex-col fixed left-0 top-0 z-40">
      
      {/* BRANDING SECTION */}
      <div className="p-6 border-b flex items-center gap-2">
        <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold shadow-soft">
          M
        </div>
        <span className="font-bold text-lg tracking-tight">Mastery Bridge</span>
      </div>

      {/* NAVIGATION SECTION */}
      <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href
          
          return (
            <Link key={link.href} href={link.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 relative overflow-hidden group transition-all duration-200",
                  isActive && "bg-primary/10 text-primary font-bold shadow-sm"
                )}
              >
                 {/* Active Indicator Line */}
                 {isActive && (
                   <div className="absolute left-0 top-2 bottom-2 w-1.25 bg-primary rounded-r-full" />
                 )}
                 <Icon className={cn("h-4 w-4 shrink-0 transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                 <span className="truncate">{link.label}</span>
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* FOOTER SECTION: AI & ACCOUNT */}
      <div className="p-4 border-t space-y-2 bg-slate-50/10">
        {/* AI Copilot shortcut - could open a modal or side drawer */}
        <Button variant="outline" className="w-full justify-start gap-3 border-dashed hover:border-primary/50 hover:bg-primary/5 transition-all">
          <Bot className="h-4 w-4 text-purple-500" />
          <span className="font-semibold text-xs">AI Copilot</span>
        </Button>

        {/* Clerk Sign Out - Triggers Clerk's auth logout flow */}
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive transition-colors"
          onClick={() => signOut({ redirectUrl: '/' })}
        >
          <LogOut className="h-4 w-4" />
          <span className="font-medium text-xs">Logout</span>
        </Button>
      </div>
    </aside>
  )
}
