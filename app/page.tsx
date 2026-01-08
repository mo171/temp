import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Edit2, LayoutGrid } from "lucide-react"
import { FeaturesSection } from "@/components/landing/FeaturesSection"

export default async function Home() {
  const { userId } = await auth()
  const user = await currentUser()

  if (userId && user) {
    const role = user.publicMetadata.role as string | undefined
    if (role === 'teacher') redirect('/teacher')
    if (role === 'student') redirect('/student')
    if (!role) redirect('/onboarding')
  }

  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      
      {/* Navbar */}
      <header className="px-6 py-4 flex items-center justify-between fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b">
         <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span>Mastery Bridge</span>
        </div>
        <div className="flex gap-4">
          <Link href="/sign-in">
            <Button variant="ghost" className="font-semibold hover:text-primary">
              Login
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="rounded-full px-6 font-bold shadow-lg shadow-primary/20">
              Sign Up
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row items-center justify-between max-w-[90rem] mx-auto w-full px-6 pt-32 pb-20 gap-12 lg:gap-20">
        
        {/* Left Content */}
        <div className="lg:w-3/5 space-y-8 z-10 animate-in slide-in-from-left-10 duration-700">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-foreground">
            Bridge the Gap between <span className="text-primary">Classroom Engagement</span> & Student Mastery.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Real-time analytics, adaptive learning paths, and instant feedback for modern classrooms.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/sign-up">
              <Button size="lg" className="rounded-full text-lg px-8 py-6 font-bold shadow-xl shadow-primary/25 hover:scale-105 transition-all">
                Start your journey
              </Button>
            </Link>
             <Link href="/sign-up">
              <Button size="lg" variant="outline" className="rounded-full text-lg px-8 py-6 font-bold border-2 hover:bg-muted transition-all">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Content - Visuals (Floating Cards) */}
        <div className="lg:w-2/5 relative h-[600px] w-full perspective-1000 flex items-center justify-center">
           
           {/* Card 1: Peer Reviews (Back Left) */}
           <div className="absolute top-10 left-0 md:left-10 w-64 bg-[#1a1b26] text-white p-6 rounded-3xl shadow-2xl transform -rotate-12 hover:scale-110 transition-all duration-500 border border-gray-800 z-10">
              <div className="flex justify-between items-start mb-4">
                 <span className="text-gray-400 font-medium text-sm">Peer Reviews</span>
                 <Star className="text-white fill-white h-4 w-4" />
              </div>
              <div className="text-4xl font-light mb-4">12</div>
              <div className="space-y-2 text-xs">
                 <div className="flex items-center justify-between text-gray-300">
                   <span>5 Completed</span>
                   <Check className="h-3 w-3 text-green-500" />
                 </div>
                 <div className="flex items-center justify-between text-gray-500">
                   <span>7 Pending</span>
                   <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                 </div>
              </div>
           </div>

           {/* Card 2: Blogs (Back Right) */}
           <div className="absolute top-0 right-0 md:right-10 w-56 bg-[#1a1b26] text-white p-6 rounded-3xl shadow-2xl transform rotate-12 hover:scale-110 transition-all duration-500 border border-gray-800 z-0">
              <div className="flex justify-between items-start mb-4">
                 <span className="text-gray-400 font-medium text-sm">Blogs</span>
                 <Edit2 className="text-white h-4 w-4" />
              </div>
              <div className="text-4xl font-light mb-4">18</div>
              <div className="space-y-2 text-xs">
                 <div className="flex items-center justify-between text-gray-300">
                   <span>9 Published</span>
                   <Check className="h-3 w-3 text-green-500" />
                 </div>
                 <div className="flex items-center justify-between text-gray-500">
                   <span>9 Pending</span>
                   <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                 </div>
              </div>
           </div>

           {/* Card 3: Project (Front Center) */}
           <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-72 bg-[#1a1b26] text-white p-8 rounded-[2rem] shadow-2xl transform -rotate-3 hover:scale-105 transition-all duration-500 border border-gray-800 z-20">
               <div className="flex justify-between items-start mb-6">
                 <span className="text-gray-400 font-medium text-lg">Project</span>
                 <LayoutGrid className="text-white h-6 w-6" />
              </div>
              <div className="text-6xl font-light mb-8">23</div>
              <div className="space-y-3 text-sm">
                 <div className="flex items-center justify-between text-gray-300">
                   <span>11 Completed</span>
                   <Check className="h-4 w-4 text-green-500" />
                 </div>
                 <div className="flex items-center justify-between text-gray-500">
                   <span>12 Pending</span>
                   <div className="h-2 w-2 rounded-full bg-red-500" />
                 </div>
              </div>
           </div>

        </div>
      </main>

      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 -z-10 h-[800px] w-[800px] bg-primary/5 rounded-full blur-3xl" />
      
      <FeaturesSection />
    </div>
  )
}
