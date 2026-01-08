"use client"

/**
 * STUDENT ANALYTICS COMPONENT
 * ---------------------------
 * This component provides various data visualizations to help students 
 * understand their academic performance and engagement.
 * 
 * CHARTS INCLUDED:
 * 1. Performance Bar Chart: Shows subject-wise scores or detailed test history.
 * 2. Poll Participation Donut: Shows engagement in interactive polls.
 * 3. Assignments Line Chart: Tracks weekly task completion trends.
 */

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend, LineChart, Line, CartesianGrid } from "recharts"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

/**
 * SUBJECT DEFINITIONS
 */
const subjects = [
  { name: "Math", color: "#f59e0b" },
  { name: "Physics", color: "#f97316" },
  { name: "Chem", color: "#10b981" },
  { name: "Bio", color: "#6366f1" },
  { name: "CS", color: "#8b5cf6" },
]

/**
 * MOCK DATA - TEST HISTORY
 * @todo TO REPLACE WITH SUPABASE:
 * Fetch from 'test_results' table:
 * `supabase.from('test_results').select('subject, title, score, total_marks')`
 */
const subjectHistory = {
  Math: [
    { test: "Unit 1", score: 78, total: 100 },
    { test: "Unit 2", score: 85, total: 100 },
    { test: "Midterm", score: 82, total: 100 },
    { test: "Final", score: 90, total: 100 },
  ],
  Physics: [
    { test: "Unit 1", score: 65, total: 100 },
    { test: "Unit 2", score: 70, total: 100 },
    { test: "Midterm", score: 75, total: 100 },
  ],
  Chem: [
     { test: "Unit 1", score: 88, total: 100 },
     { test: "Unit 2", score: 92, total: 100 },
  ],
  Bio: [
     { test: "Unit 1", score: 70, total: 100 },
  ],
  CS: [
     { test: "Project 1", score: 95, total: 100 },
     { test: "Project 2", score: 98, total: 100 },
  ]
}

/**
 * MOCK DATA - AGGREGATED SCORES
 */
const marksData = [
  { subject: "Math", score: 85 },
  { subject: "Physics", score: 72 },
  { subject: "Chem", score: 90 },
  { subject: "Bio", score: 78 },
  { subject: "CS", score: 95 },
]

/**
 * MOCK DATA - POLLS ENGAGEMENT
 * @todo: Aggregate from 'poll_responses' where user_id matches.
 */
const pollsData = [
  { name: "Participated", value: 42, color: "#10b981" }, 
  { name: "Missed", value: 8, color: "#ef4444" },
]

/**
 * MOCK DATA - WEEKLY ASSIGNMENTS
 */
const assignmentsData = [
    { week: "W1", completed: 3 },
    { week: "W2", completed: 5 },
    { week: "W3", completed: 4 },
    { week: "W4", completed: 7 },
    { week: "W5", completed: 6 },
]

/**
 * STUDENT ANALYTICS
 * The main container for progress visualizations.
 */
export function StudentAnalytics() {
  const [selectedSubject, setSelectedSubject] = useState<string>("All")

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
      
      {/* PERFORMANCE CHART (SUBJECT-WISE OR TEST-WISE) 
          Uses a dropdown filter to switch between cumulative and granular views.
      */}
      <Card className="col-span-1 shadow-sm border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-lg font-bold text-slate-800">Performance</CardTitle>
            <CardDescription className="text-xs">
                {selectedSubject === "All" ? "Cumlative subject overview" : `Growth in ${selectedSubject}`}
            </CardDescription>
          </div>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-[120px] h-9 text-xs font-bold rounded-xl bg-slate-50 border-slate-200">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="All">All Subjects</SelectItem>
              {subjects.map(s => <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="h-[250px] pt-4">
          <ResponsiveContainer width="100%" height="100%">
            {selectedSubject === "All" ? (
              /* BAR CHART: OVERALL SUBJECT PERFORMANCE */
              <BarChart data={marksData}>
                <XAxis dataKey="subject" tick={{ fontSize: 10, fontWeight: 700 }} stroke="#94a3b8" axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} 
                />
                <Bar dataKey="score" radius={[6, 6, 0, 0]} barSize={32}>
                  {marksData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.score >= 90 ? "#10b981" : "#f59e0b"} />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              /* BAR CHART: GRANULAR TEST HISTORY FOR ONE SUBJECT */
             <BarChart data={subjectHistory[selectedSubject as keyof typeof subjectHistory] || []}>
                <XAxis dataKey="test" tick={{ fontSize: 10, fontWeight: 700 }} stroke="#94a3b8" axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                 <Tooltip 
                  cursor={{ fill: '#fff7ed' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} 
                />
                <Bar dataKey="score" fill="#f97316" radius={[6, 6, 0, 0]} name="Score" barSize={40} />
             </BarChart>
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* POLL PARTICIPATION (ENGAGEMENT TRACKER) 
          Visualized as a semi-transparent donut chart.
      */}
      <Card className="col-span-1 shadow-sm border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-800">Engagement</CardTitle>
          <CardDescription className="text-xs">Overall participation in class polls.</CardDescription>
        </CardHeader>
        <CardContent className="h-[250px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pollsData}
                cx="50%"
                cy="45%"
                innerRadius={65}
                outerRadius={85}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {pollsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} opacity={0.8} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} 
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ASSIGNMENT COMPLETION TREND 
          Visualized as a smooth line chart with temporal data.
      */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-1 shadow-sm border-slate-200">
        <CardHeader>
           <CardTitle className="text-lg font-bold text-slate-800">Efficiency</CardTitle>
           <CardDescription className="text-xs">Weekly assignment completion trend.</CardDescription>
        </CardHeader>
        <CardContent className="h-[250px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={assignmentsData}>
                   <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#f1f5f9" />
                   <XAxis dataKey="week" stroke="#94a3b8" tickLine={false} axisLine={false} tick={{fontSize: 10, fontWeight: 700}} dy={5} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} 
                    />
                   <Line 
                    type="monotone" 
                    dataKey="completed" 
                    stroke="#f97316" 
                    strokeWidth={4} 
                    dot={{ r: 5, fill: "#f97316", strokeWidth: 2, stroke: "#fff" }} 
                    activeDot={{ r: 8, strokeWidth: 0 }} 
                   />
                </LineChart>
            </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
