"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ConceptMastery } from "@/components/teacher/ConceptMastery"
import { ProjectStatus } from "@/components/teacher/ProjectStatus"
import { PollController } from "@/components/teacher/PollController"
import { PerformanceOverview } from "@/components/teacher/PerformanceOverview"
import { BridgeLogic } from "@/components/teacher/BridgeLogic"
import { Clock, TrendingDown } from "lucide-react"

export default function TeacherDashboard() {
  return (
    <div className="space-y-8 pt-12">
      <div className="flex items-center justify-between">
        <div className="relative">
           <div className="absolute -top-12 left-0 bg-[#E0F7FF] px-4 py-2 rounded-t-lg border-x border-t font-bold shadow-sm">
             Teacher View
           </div>
           <h1 className="text-3xl font-bold tracking-tight uppercase">Class Overview</h1>
        </div>
        <div className="flex gap-2">
           <span className="text-sm text-muted-foreground bg-card px-3 py-1 rounded-full shadow-sm border">
             CS 101 - Intro to Programming
           </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        {/* Left Side: Performance and Mastery */}
        <div className="lg:col-span-3 space-y-6">
          <PerformanceOverview />
          <ConceptMastery />
        </div>

        {/* Right Side: Project Status and Poll */}
        <div className="lg:col-span-4 space-y-6">
          <ProjectStatus />
          <PollController />
        </div>
      </div>

      {/* Additional Metrics Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm">
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
        <Card className="shadow-sm">
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
        <Card className="shadow-sm">
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
        <Card className="shadow-sm">
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

      <BridgeLogic />
    </div>
  )
}
