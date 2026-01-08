"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'

export default function OnboardingPage() {
  const { user } = useUser()
  const router = useRouter()
  const [role, setRole] = useState<'teacher' | 'student' | null>(null)
  const [joinCode, setJoinCode] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!role) return;
    setLoading(true);

    try {
      const res = await fetch('/api/auth/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, joinCode })
      });

      if (!res.ok) throw new Error('Failed to update profile');

      // Force reload to sync session or just redirect
      window.location.href = role === 'teacher' ? '/teacher' : '/student';
      
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Welcome to Mastery Bridge
        </h1>
        <p className="text-muted-foreground">Select your role to continue.</p>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setRole('teacher')}
            className={`p-6 border rounded-xl flex flex-col items-center gap-4 transition-all ${
              role === 'teacher' 
              ? 'border-primary ring-2 ring-primary/20 bg-primary/5' 
              : 'hover:border-primary/50'
            }`}
          >
            <span className="text-4xl">👨‍🏫</span>
            <span className="font-semibold">Teacher</span>
          </button>

          <button
            onClick={() => setRole('student')}
            className={`p-6 border rounded-xl flex flex-col items-center gap-4 transition-all ${
              role === 'student' 
              ? 'border-primary ring-2 ring-primary/20 bg-primary/5' 
              : 'hover:border-primary/50'
            }`}
          >
            <span className="text-4xl">🎓</span>
            <span className="font-semibold">Student</span>
          </button>
        </div>

        {role && (
          <div className="space-y-4 fade-in slide-in-from-bottom-5 animate-in">
            <input 
              type="text" 
              placeholder="Enter School Join Code"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              className="w-full p-3 border rounded-lg bg-background"
            />
            
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:opacity-90 disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Complete Setup
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
