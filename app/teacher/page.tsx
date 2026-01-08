"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EngagementHeatmap } from "@/components/teacher/EngagementHeatmap"
import { PollController } from "@/components/teacher/PollController"
import { BridgeLogic } from "@/components/teacher/BridgeLogic"
import { Clock, TrendingDown } from "lucide-react"

export default function TeacherDashboard() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Classroom Overview</h1>
        <div className="flex gap-2">
           <span className="text-sm text-muted-foreground bg-card px-3 py-1 rounded-full shadow-sm border">
             CS 101 - Intro to Programming
           </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45 min</div>
            <p className="text-xs text-muted-foreground">
              +10% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weakest Topic</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Recursion</div>
            <p className="text-xs text-muted-foreground">
              34% mastery rate
            </p>
          </CardContent>
        </Card>
        {/* Placeholder Metrics */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">
              +2 active now
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">
              +5% since start of class
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Interactive Area */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <PollController /> 
        {/* Poll controller takes some space, but might need to be sized. 
            Default in shadcn grid: col-span-x.
            I'll wrap PollController in a div with col-span.
            Actually, PollController returns a Card. I should wrap it or adjust.
            Let's say PollController is col-span-3, Heatmap is col-span-4.
        */}
         <div className="col-span-4 md:col-span-3">
             <PollController />
         </div>
         <div className="col-span-4">
             <EngagementHeatmap />
         </div>
      </div>

      <BridgeLogic />
    </>
  )
}
