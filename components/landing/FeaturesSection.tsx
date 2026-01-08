"use client"

import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    title: "Real-time Heatmaps",
    badgeColor: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    description: "Visualize student understanding instantly during class interactions with dynamic grids.",
    link: "Explore Analysis"
  },
  {
    title: "Adaptive Learning",
    badgeColor: "bg-purple-100 text-purple-700 hover:bg-purple-200",
    description: "AI automatically splits classes into remedial and advanced groups based on performance.",
    link: "View Logic"
  },
  {
    title: "Instant Polls",
    badgeColor: "bg-amber-100 text-amber-700 hover:bg-amber-200",
    description: "Launch quick fire polls to gauge engagement and attendance in seconds.",
    link: "Try Polls"
  },
  {
    title: "Classroom Sync",
    badgeColor: "bg-green-100 text-green-700 hover:bg-green-200",
    description: "Seamlessly synchronize student states and teacher controls across devices.",
    link: "Sync Devices"
  },
  {
    title: "AI Copilot",
    badgeColor: "bg-pink-100 text-pink-700 hover:bg-pink-200",
    description: "Get automated grading suggestions and personalized feedback for every student.",
    link: "Meet Copilot"
  },
  {
    title: "Mastery Tracking",
    badgeColor: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200",
    description: "Long-term tracking of skill acquisition and topic mastery over the semester.",
    link: "Track Progress"
  }
]

export function FeaturesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to transform learning into real-world skills.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="group p-8 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300 flex flex-col items-start gap-4">
              <Badge 
                variant="secondary" 
                className={`px-4 py-2 text-sm font-medium rounded-lg border-0 ${feature.badgeColor}`}
              >
                {feature.title}
              </Badge>
              
              <p className="text-base text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              <div className="mt-auto pt-4 flex items-center text-sm font-semibold text-foreground group-hover:text-primary transition-colors cursor-pointer">
                {feature.link} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
