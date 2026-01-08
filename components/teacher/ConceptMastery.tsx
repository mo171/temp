"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const modules = [
  { name: "Module 1: Algebra", mastery: 95 },
  { name: "Module 2: Geometry", mastery: 75 },
]

export function ConceptMastery() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="text-lg font-bold uppercase tracking-wider">Concept Mastery</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {modules.map((module) => (
          <div key={module.name} className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span>{module.name}</span>
              <span>{module.mastery}%</span>
            </div>
            <Progress value={module.mastery} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
