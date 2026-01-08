"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Play, Square, Users } from "lucide-react"
import { useApp } from "@/context/AppContext"

export function PollController() {
  const { pollState, setPollState } = useApp()
  const [timeLeft, setTimeLeft] = useState(0)

  // Countdown effect
  useEffect(() => {
    if (pollState.isActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && pollState.isActive) {
       // Poll ended
       setPollState({ ...pollState, isActive: false })
    }
  }, [pollState.isActive, timeLeft, pollState, setPollState])

  const startPoll = () => {
    setPollState({ isActive: true })
    setTimeLeft(120) // 2 minutes
  }

  const stopPoll = () => {
    setPollState({ isActive: false })
    setTimeLeft(0)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Live Poll
          {pollState.isActive && (
            <span className="text-red-500 animate-pulse text-sm">● LIVE</span>
          )}
        </CardTitle>
        <CardDescription>Launch a quick check for understanding.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!pollState.isActive ? (
          <Button onClick={startPoll} className="w-full gap-2 text-lg py-6 shadow-lg shadow-primary/20">
            <Play className="fill-current" /> Start 2-Minute Poll
          </Button>
        ) : (
          <div className="space-y-4">
             <div className="flex justify-between text-sm font-bold">
               <span>Time Remaining</span>
               <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
             </div>
             <Progress value={(timeLeft / 120) * 100} className="h-4" />
             
             <div className="flex justify-between items-center bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                   <Users className="text-primary" />
                   <span className="font-bold text-2xl">24/32</span>
                </div>
                <span className="text-sm text-muted-foreground">Responses</span>
             </div>

             <Button variant="destructive" onClick={stopPoll} className="w-full gap-2">
               <Square className="fill-current" /> End Poll Now
             </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
