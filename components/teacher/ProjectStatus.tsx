"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FlaskConical, CheckCircle2, AlertCircle } from "lucide-react"

const projects = [
  {
    group: "GROUP ALPHA",
    title: "Urban City",
    status: "Checked",
    icon: <CheckCircle2 className="h-8 w-8 text-blue-900" />,
    color: "bg-blue-50/50",
  },
  {
    group: "GROUP BETA",
    title: "Smart Traffic Lights",
    status: "Need Attention",
    icon: <AlertCircle className="h-8 w-8 text-red-600" />,
    color: "bg-blue-50/50",
  },
]

export function ProjectStatus() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-lg font-bold uppercase tracking-wider">Project Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.group}
            className={`flex items-center justify-between p-4 rounded-xl border ${project.color} transition-all hover:shadow-md`}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <FlaskConical className="h-6 w-6 text-orange-400 fill-orange-400/20" />
              </div>
              <div className="space-y-1">
                <span className="text-sm font-bold text-blue-900 underline decoration-2 underline-offset-4 cursor-pointer">
                  {project.group}
                </span>
                <div className="text-sm">
                  <span className="font-bold">Project Title: </span>
                  <span className="text-muted-foreground">{project.title}</span>
                </div>
                <div className="text-sm">
                  <span className="font-bold">Progress: </span>
                  <span className="text-muted-foreground">{project.status}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
                {project.icon}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
