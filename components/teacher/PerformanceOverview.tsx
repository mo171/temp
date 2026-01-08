"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const data = [
  { student: 'Roll 21', performance: 85, color: '#f59e0b' },
  { student: 'Roll 22', performance: 72, color: '#f97316' },
  { student: 'Roll 23', performance: 92, color: '#10b981' },
  { student: 'Roll 24', performance: 78, color: '#f59e0b' },
  { student: 'Roll 25', performance: 98, color: '#10b981' },
]

export function PerformanceOverview() {
  return (
    <Card className="col-span-1 border-none shadow-none bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold text-[#1e293b]">Performance</CardTitle>
          <CardDescription className="text-sm text-muted-foreground font-medium">
            Overview of student achievement
          </CardDescription>
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[140px] h-9 rounded-xl border-slate-200 text-slate-600 font-medium">
            <SelectValue placeholder="Select Group" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-slate-200">
            <SelectItem value="all">All Students</SelectItem>
            <SelectItem value="top">Top Performers</SelectItem>
            <SelectItem value="group-a">Group Alpha</SelectItem>
            <SelectItem value="group-b">Group Beta</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="h-[300px] pl-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#f1f5f9" strokeDasharray="3 3" />
            <XAxis 
              dataKey="student" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }}
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
            />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                padding: '12px'
              }}
              itemStyle={{ fontWeight: 700 }}
              labelStyle={{ color: '#1e293b', marginBottom: '4px' }}
            />
            <Bar 
              dataKey="performance" 
              radius={[6, 6, 0, 0]} 
              barSize={45}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
