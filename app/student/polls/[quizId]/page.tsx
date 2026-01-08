"use client"

/**
 * INTERACTIVE QUIZ PAGE
 * --------------------
 * Path: /student/polls/[quizId]
 * This is a comprehensive quiz player that handles question transitions,
 * scoring logic, result calculation, and leaderboard display.
 * 
 * ARCHITECTURE:
 * - State-driven: Uses React state for question navigation and answer tracking.
 * - View Modes: 
 *   1. 'Player': The active quiz taking interface.
 *   2. 'Result': The completion view with scores and stats.
 */

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ChevronRight, Timer, Trophy, RotateCcw, CheckCircle2, XCircle, BarChart3, Users } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

/**
 * MOCK QUIZ DATA
 * @todo TO REPLACE WITH SUPABASE:
 * 1. Fetch quiz structure from 'quizzes' and 'questions' tables.
 *    `supabase.from('questions').select('*').eq('quiz_id', quizId)`
 */
const quizQuestions = [
  {
    id: 1,
    question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    options: [
      { id: 'a', text: "<script href='xxx.js'>" },
      { id: 'b', text: "<script name='xxx.js'>" },
      { id: 'c', text: "<script src='xxx.js'>" },
      { id: 'd', text: "<script file='xxx.js'>" }
    ],
    correctAnswer: 'c'
  },
  {
    id: 2,
    question: "Which built-in method returns the length of the string?",
    options: [
      { id: 'a', text: "length()" },
      { id: 'b', text: "size()" },
      { id: 'c', text: "index()" },
      { id: 'd', text: "length" }
    ],
    correctAnswer: 'd'
  },
  {
    id: 3,
    question: "How do you write 'Hello World' in an alert box?",
    options: [
      { id: 'a', text: "msg('Hello World');" },
      { id: 'b', text: "alert('Hello World');" },
      { id: 'c', text: "msgBox('Hello World');" },
      { id: 'd', text: "alertBox('Hello World');" }
    ],
    correctAnswer: 'b'
  },
  {
    id: 4,
    question: "Which symbol is used for comments in JavaScript?",
    options: [
      { id: 'a', text: "//" },
      { id: 'b', text: "<!---->" },
      { id: 'c', text: "**" },
      { id: 'd', text: "/* */" }
    ],
    correctAnswer: 'a' 
  },
  {
    id: 5,
    question: "How do you create a function in JavaScript?",
    options: [
      { id: 'a', text: "function = myFunction()" },
      { id: 'b', text: "function:myFunction()" },
      { id: 'c', text: "function myFunction()" },
      { id: 'd', text: "createMyFunction()" }
    ],
    correctAnswer: 'c'
  },
  {
    id: 6,
    question: "How does a WHILE loop start?",
    options: [
      { id: 'a', text: "while (i <= 10)" },
      { id: 'b', text: "while i = 1 to 10" },
      { id: 'c', text: "while (i <= 10; i++)" },
      { id: 'd', text: "do while i <= 10" }
    ],
    correctAnswer: 'a'
  },
  {
    id: 7,
    question: "Which operator is used to assign a value to a variable?",
    options: [
      { id: 'a', text: "*" },
      { id: 'b', text: "-" },
      { id: 'c', text: "=" },
      { id: 'd', text: "x" }
    ],
    correctAnswer: 'c'
  },
  {
    id: 8,
    question: "What is the correct way to write a JavaScript array?",
    options: [
      { id: 'a', text: "var colors = \"red\", \"green\", \"blue\"" },
      { id: 'b', text: "var colors = (1:\"red\", 2:\"green\", 3:\"blue\")" },
      { id: 'c', text: "var colors = [\"red\", \"green\", \"blue\"]" },
      { id: 'd', text: "var colors = 1 = (\"red\"), 2 = (\"green\"), 3 = (\"blue\")" }
    ],
    correctAnswer: 'c'
  },
  {
    id: 9,
    question: "How do you round the number 7.25, to the nearest integer?",
    options: [
      { id: 'a', text: "Math.rnd(7.25)" },
      { id: 'b', text: "Math.round(7.25)" },
      { id: 'c', text: "rnd(7.25)" },
      { id: 'd', text: "round(7.25)" }
    ],
    correctAnswer: 'b'
  },
  {
    id: 10,
    question: "Which event occurs when the user clicks on an HTML element?",
    options: [
      { id: 'a', text: "onmouseclick" },
      { id: 'b', text: "onchange" },
      { id: 'c', text: "onclick" },
      { id: 'd', text: "onmouseover" }
    ],
    correctAnswer: 'c'
  }
];

/**
 * MOCK LEADERBOARD
 * @todo TO REPLACE WITH SUPABASE:
 * Fetch top 3 results for this quiz:
 * `supabase.from('quiz_results').select('users(name), score, time_taken').eq('quiz_id', quizId).order('score').limit(3)`
 */
const mockLeaderboard = [
    { name: "Alex Johnson", score: 100, time: "2m 15s" },
    { name: "Sam Smith", score: 90, time: "3m 45s" },
    { name: "Jordan Lee", score: 90, time: "4m 10s" },
];

export default function QuizPage({ params }: { params: { quizId: string } }) {
  // STATE MANAGEMENT
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // DERIVED DATA
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const totalQuestions = quizQuestions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  /**
   * SELECTION HANDLER
   * Stores the user's choice for the current question.
   */
  const handleOptionSelect = (optionId: string) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  /**
   * RESULTS CALCULATION
   * Compares selected answers with the 'correctAnswer' key.
   * @todo: Final score should be pushed to Supabase 'quiz_results' table here.
   */
  const calculateResults = () => {
    let correct = 0;
    quizQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    const total = totalQuestions;
    const attempted = Object.keys(selectedAnswers).length;
    const wrong = attempted - correct;
    const percentage = Math.round((correct / total) * 100);
    
    return { correct, wrong, attempted, total, percentage };
  };

  const handleSubmit = () => {
    /**
     * @todo SUPABASE PERSISTENCE:
     * const results = calculateResults();
     * await supabase.from('quiz_results').insert({
     *    user_id: user.id,
     *    quiz_id: params.quizId,
     *    score: results.percentage
     * });
     */
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  /**
   * RENDER VIEW: COMPLETION SCREEN
   * Shown after the user finishes or submits the quiz.
   */
  if (isSubmitted) {
    const { correct, wrong, attempted, total, percentage } = calculateResults();
    return (
      <div className="flex flex-col h-[calc(100vh-4rem)] max-w-6xl mx-auto p-4 md:p-8 animate-in fade-in zoom-in duration-300">
         {/* Navigation Header */}
         <div className="flex items-center mb-6">
            <Button variant="ghost" size="sm" asChild className="text-slate-400 font-bold uppercase tracking-widest hover:text-slate-900 transition-colors">
                <Link href="/student/polls">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Polls
                </Link>
            </Button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 flex-1 items-center">
            
            {/* COLUMN 1: ANALYTICS & LEADERBOARD */}
            <div className="space-y-6 order-2 md:order-1">
                <div className="grid grid-cols-2 gap-4">
                    {/* Attempted Stat */}
                    <Card className="p-4 border-slate-200 bg-white shadow-sm rounded-2xl">
                        <div className="flex items-center gap-3 mb-2">
                             <div className="p-2 bg-blue-100/50 rounded-lg text-blue-600">
                                <BarChart3 className="w-5 h-5" />
                             </div>
                             <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Attempted</span>
                        </div>
                        <p className="text-2xl font-bold text-slate-900 leading-none">{attempted} <span className="text-xs text-slate-300">/ {total}</span></p>
                    </Card>
                    {/* Errors Stat */}
                    <Card className="p-4 border-slate-200 bg-white shadow-sm rounded-2xl">
                         <div className="flex items-center gap-3 mb-2">
                             <div className="p-2 bg-red-100/50 rounded-lg text-red-600">
                                <XCircle className="w-5 h-5" />
                             </div>
                             <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Wrong</span>
                        </div>
                        <p className="text-2xl font-bold text-slate-900 leading-none">{wrong}</p>
                    </Card>
                </div>

                {/* Leaderboard Table Widget */}
                <Card className="border-slate-200 bg-white shadow-sm overflow-hidden rounded-3xl">
                    <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-slate-500" />
                            <h3 className="font-bold text-slate-900 text-sm tracking-tight">Top Hall of Fame</h3>
                        </div>
                        <span className="text-[9px] font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded-full uppercase">Class Global</span>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {mockLeaderboard.map((user, i) => (
                            <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors cursor-default">
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold",
                                        i === 0 ? "bg-amber-100 text-amber-600 ring-2 ring-amber-50" : 
                                        i === 1 ? "bg-slate-200 text-slate-600 ring-2 ring-slate-100" : 
                                        "bg-orange-50 text-orange-600"
                                    )}>
                                        {i + 1}
                                    </div>
                                    <span className="text-sm font-bold text-slate-700">{user.name}</span>
                                </div>
                                <div className="flex items-center gap-6 text-xs font-semibold">
                                    <span className="text-slate-300 font-bold">{user.time}</span>
                                    <span className="text-emerald-600">{user.score}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* COLUMN 2: CENTERPIECE RESULT (STUNNING VIEW) */}
            <div className="flex flex-col items-center text-center space-y-8 order-1 md:order-2 py-12">
                 <div className="relative group">
                    {/* Glowing effect background */}
                    <div className="absolute inset-0 bg-orange-400/30 blur-[80px] rounded-full group-hover:bg-orange-400/50 transition-all duration-1000" />
                    
                    <div className="relative inline-flex p-8 bg-white/80 backdrop-blur-xl rounded-[40px] shadow-2xl border border-white shadow-orange-500/10 mb-2 transform transition-transform duration-500 hover:scale-110">
                        <Trophy className="w-32 h-32 text-orange-500 drop-shadow-xl" />
                    </div>
                 </div>
                
                <div>
                     <h2 className="text-5xl font-bold text-slate-950 tracking-tighter mb-2">Quiz Finished!</h2>
                     <p className="text-slate-400 font-bold text-sm tracking-widest uppercase">Performance Breakdown Below</p>
                </div>
                
                <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
                    {/* The Big Percent Card */}
                    <Card className="p-8 bg-white border-2 border-slate-100 shadow-xl rounded-3xl hover:border-orange-500/20 transition-all">
                        <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-widest mb-2">Accuracy</p>
                        <p className="text-6xl font-bold text-orange-600 tracking-tighter leading-none">{percentage}%</p>
                    </Card>
                    {/* Evaluation Card */}
                    <Card className="p-8 bg-white border-2 border-slate-100 shadow-xl rounded-3xl">
                         <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-widest mb-2">Verdict</p>
                         <p className={cn("text-2xl font-bold mt-2 leading-tight", percentage >= 70 ? "text-emerald-600" : "text-amber-500")}>
                            {percentage >= 70 ? "EXPERT PASS" : "NEEDS PRACTICE"}
                         </p>
                    </Card>
                </div>

                {/* Primary Actions */}
                <div className="flex gap-4 w-full max-w-sm">
                    <Button variant="ghost" className="flex-1 h-14 rounded-2xl bg-slate-50 text-slate-500 font-semibold uppercase tracking-widest text-[10px] hover:bg-slate-100" onClick={() => {
                        setIsSubmitted(false);
                        setCurrentQuestionIndex(0);
                        setSelectedAnswers({});
                    }}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Restart
                    </Button>
                    <Button className="flex-1 h-14 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-semibold uppercase tracking-widest text-[10px] shadow-2xl shadow-slate-950/20" asChild>
                        <Link href="/student/polls">Finish Session</Link>
                    </Button>
                </div>
            </div>

         </div>
      </div>
    )
  }

  /**
   * RENDER VIEW: QUIZ PLAYER
   * The live quiz interface while the student is answering questions.
   */
  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] max-w-3xl mx-auto p-4 md:p-6 pb-12">
      {/* HEADER: TITLE & TIMER */}
      <div className="flex items-center justify-between mb-8">
         <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl hover:bg-slate-100 transition-colors" asChild>
                <Link href="/student/polls">
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                </Link>
            </Button>
            <div>
                <h2 className="font-bold text-slate-950 text-xl tracking-tight leading-none mb-1">Javascript Fundamentals</h2>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">Question {currentQuestionIndex + 1} of {totalQuestions}</p>
            </div>
         </div>
         
         {/* Timer Component 
             @todo: Add countdown logic.
         */}
         <div className="flex items-center gap-3 text-orange-600 bg-orange-50 border border-orange-100 px-5 py-2.5 rounded-2xl text-xs font-bold shadow-sm ring-4 ring-orange-50/50">
            <Timer className="w-4 h-4 animate-pulse" />
            <span className="tabular-nums tracking-tighter">10:00</span>
         </div>
      </div>

      {/* OVERALL PROGRESS BAR */}
      <Progress value={progress} className="h-2.5 mb-12 bg-slate-100 rounded-full" />

      {/* THE QUESTION DISPLAY */}
      <div className="flex-1 flex flex-col justify-start pt-12 max-w-2xl mx-auto w-full">
         <h3 className="text-xl md:text-2xl font-medium text-slate-950 mb-8 leading-[1.3] tracking-tight">
            {currentQuestion.question}
         </h3>

         {/* OPTION SELECTION LIST */}
         <div className="space-y-3">
            {currentQuestion.options.map((option) => {
                const isSelected = selectedAnswers[currentQuestion.id] === option.id;
                return (
                    <div 
                        key={option.id}
                        onClick={() => handleOptionSelect(option.id)}
                        className={cn(
                            "group flex items-center p-3 px-4 rounded-[20px] border-2 transition-all duration-300 cursor-pointer shadow-sm",
                            isSelected 
                                ? "border-orange-500 bg-orange-50 ring-4 ring-orange-500/5 shadow-orange-500/10" 
                                : "border-slate-100 bg-white hover:border-orange-200 hover:shadow-lg"
                        )}
                    >
                        {/* Custom Radio Circle */}
                        <div className={cn(
                            "w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-all duration-500",
                            isSelected ? "border-orange-500 shadow-lg shadow-orange-500/40" : "border-slate-200 group-hover:border-orange-300 bg-slate-50"
                        )}>
                            <div className={cn(
                                "w-2.5 h-2.5 rounded-full transition-all duration-500",
                                isSelected ? "bg-orange-500 scale-100" : "bg-transparent scale-0"
                            )} />
                        </div>
                        <span className={cn("font-semibold text-base transition-colors", isSelected ? "text-slate-950" : "text-slate-600 group-hover:text-slate-900")}>
                            {option.text}
                        </span>
                    </div>
                )
            })}
         </div>
      </div>

      {/* FOOTER NAVIGATION: PREVIOUS/NEXT */}
      <div className="mt-4 flex justify-between items-center max-w-2xl mx-auto w-full border-t border-slate-100 pt-6">
         <Button 
            variant="ghost" 
            onClick={handlePrevious} 
            disabled={currentQuestionIndex === 0}
            className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 hover:text-slate-950 h-14 rounded-2xl px-8"
         >
            Previous
         </Button>
         <Button 
            onClick={handleNext} 
            className="bg-slate-950 hover:bg-slate-900 text-white px-10 h-14 rounded-2xl font-semibold text-[10px] uppercase tracking-widest shadow-2xl shadow-slate-950/20 active:scale-95 transition-all"
            disabled={!selectedAnswers[currentQuestion.id]}
          >
            {currentQuestionIndex === totalQuestions - 1 ? 'Finish Challenge' : 'Confirm Choice'}
            <ChevronRight className="w-4 h-4 ml-2" />
         </Button>
      </div>
    </div>
  )
}
