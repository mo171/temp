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
    <Card className="border-primary/20 shadow-md overflow-hidden">
      <div className="bg-primary/5 px-6 py-3 border-b border-primary/10">
        <CardTitle className="flex justify-between items-center text-lg font-bold">
          Quick Poll
          {pollState.isActive && (
            <span className="flex items-center gap-1.5 text-red-500 animate-pulse text-xs font-black bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
              <span className="h-2 w-2 rounded-full bg-red-500" /> LIVE
            </span>
          )}
        </CardTitle>
        <CardDescription className="text-primary/70">Check class understanding instantly</CardDescription>
      </div>
      <CardContent className="p-6">
        {!pollState.isActive ? (
          <Button 
            onClick={startPoll} 
            className="w-full h-16 gap-3 text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
          >
            <div className="bg-white/20 p-2 rounded-lg">
              <Play className="fill-white h-5 w-5" />
            </div>
            Start Quick Poll
          </Button>
        ) : (
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-500">
             <div className="flex justify-between items-end">
               <div className="space-y-1">
                 <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Time Remaining</span>
                 <div className="text-3xl font-black tabular-nums">
                   {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                 </div>
               </div>
               <div className="text-right space-y-1">
                 <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Participation</span>
                 <div className="text-xl font-bold text-primary">24/32</div>
               </div>
             </div>
             
             <div className="relative h-4 w-full bg-muted rounded-full overflow-hidden border">
                <div 
                  className="absolute inset-y-0 left-0 bg-primary transition-all duration-1000 ease-linear rounded-full"
                  style={{ width: `${(timeLeft / 120) * 100}%` }}
                />
             </div>

             <Button variant="outline" onClick={stopPoll} className="w-full gap-2 border-destructive/20 text-destructive hover:bg-destructive/5 font-semibold">
               <Square className="h-4 w-4 fill-current" /> Stop Poll
             </Button>
          </div>
        )}
      </CardContent>
    </Card>

  )
}
