"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ArrowRight, User } from "lucide-react"

export function BridgeLogic() {
  const [generated, setGenerated] = useState(false)

  const handleGenerate = () => {
    // Simulate AI processing
    setGenerated(true)
  }

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
         <h2 className="text-2xl font-bold tracking-tight">The Bridge Action</h2>
         {!generated && (
           <Button onClick={handleGenerate} className="gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0">
             <Sparkles className="h-4 w-4" /> Generate Adaptive Path
           </Button>
         )}
       </div>

       {generated ? (
         <div className="grid md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-5 duration-700">
           {/* Group A: Remedial */}
           <Card className="border-l-4 border-l-amber-500 bg-amber-50/50 dark:bg-amber-950/20">
             <CardHeader>
               <CardTitle className="text-amber-700 dark:text-amber-400 flex items-center gap-2">
                 <Badge variant="outline" className="border-amber-500 text-amber-500">Group A</Badge>
                 Remedial Focus
               </CardTitle>
               <CardDescription>Target: [Weak Concept Tag]</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
               <div className="text-sm font-medium">Recommended Activity:</div>
               <div className="p-3 bg-background rounded-lg border shadow-sm flex items-center justify-between">
                 <span>Fundamentals of Loops</span>
                 <ArrowRight className="h-4 w-4 text-muted-foreground" />
               </div>
               <div className="flex -space-x-2">
                 {[1,2,3,4,5].map(i => (
                   <div key={i} className="h-8 w-8 rounded-full bg-amber-200 border-2 border-background flex items-center justify-center text-xs font-bold text-amber-800">
                     S{i}
                   </div>
                 ))}
                 <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs text-muted-foreground">+12</div>
               </div>
             </CardContent>
           </Card>

           {/* Group B: Challenge */}
           <Card className="border-l-4 border-l-green-500 bg-green-50/50 dark:bg-green-950/20">
             <CardHeader>
               <CardTitle className="text-green-700 dark:text-green-400 flex items-center gap-2">
                 <Badge variant="outline" className="border-green-500 text-green-500">Group B</Badge>
                 Expert Challenge
               </CardTitle>
               <CardDescription>Target: Advanced Optimization</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
               <div className="text-sm font-medium">Recommended Activity:</div>
               <div className="p-3 bg-background rounded-lg border shadow-sm flex items-center justify-between">
                 <span>Algorithm Efficiency Challenge</span>
                 <ArrowRight className="h-4 w-4 text-muted-foreground" />
               </div>
               <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                   <div key={i} className="h-8 w-8 rounded-full bg-green-200 border-2 border-background flex items-center justify-center text-xs font-bold text-green-800">
                     S{i}
                   </div>
                 ))}
                 <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs text-muted-foreground">+8</div>
               </div>
             </CardContent>
           </Card>
         </div>
       ) : (
         <Card className="border-dashed flex items-center justify-center py-12 bg-muted/20">
            <div className="text-center space-y-2">
              <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto text-primary">
                <Sparkles />
              </div>
              <h3 className="font-semibold text-lg">Detailed Analysis Ready</h3>
              <p className="text-muted-foreground">Click generate to split the class based on recent poll performance.</p>
            </div>
         </Card>
       )}
    </div>
  )
}
