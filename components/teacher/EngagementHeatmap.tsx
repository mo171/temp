"use client"

import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { student: 1, question: 1, score: 100 },
  { student: 1, question: 2, score: 80 },
  { student: 1, question: 3, score: 40 },
  { student: 2, question: 1, score: 90 },
  { student: 2, question: 2, score: 70 },
  { student: 2, question: 3, score: 20 },
  { student: 3, question: 1, score: 100 },
  { student: 3, question: 2, score: 100 },
  { student: 3, question: 3, score: 90 },
  { student: 4, question: 1, score: 60 },
  { student: 4, question: 2, score: 50 },
  { student: 4, question: 3, score: 0 },
  { student: 5, question: 1, score: 20 },
  { student: 5, question: 2, score: 30 },
  { student: 5, question: 3, score: 10 },
]

const COLORS = ['#ef4444', '#f59e0b', '#22c55e'] // Red, Amber, Green

export function EngagementHeatmap() {
  const getColor = (score: number) => {
    if (score >= 80) return COLORS[2];
    if (score >= 50) return COLORS[1];
    return COLORS[0];
  }

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Class Participation Heatmap</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <XAxis type="number" dataKey="question" name="Question" tickCount={3} domain={[1, 3]} />
            <YAxis type="number" dataKey="student" name="Student" tickCount={5} domain={[1, 5]} />
            <ZAxis type="number" dataKey="score" range={[100, 300]} name="Score" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={data} fill="#8884d8">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.score)} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
