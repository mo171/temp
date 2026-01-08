"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'

type UserRole = 'teacher' | 'student' | null

interface PollState {
  isActive: boolean
  question?: string
  options?: string[]
  responses?: any[]
  timeLeft?: number
}

interface AppContextType {
  role: UserRole
  schoolId: string | null
  classId: string | null
  setClassId: (id: string) => void
  pollState: PollState
  setPollState: (state: PollState) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser()
  const [role, setRole] = useState<UserRole>(null)
  const [schoolId, setSchoolId] = useState<string|null>(null)
  const [classId, setClassId] = useState<string|null>(null)
  const [pollState, setPollState] = useState<PollState>({ isActive: false })

  useEffect(() => {
    if (user) {
      // Sync with optional metadata
      const metadata = user.publicMetadata as any
      setRole(metadata?.role || null)
      setSchoolId(metadata?.school_id || null)
    }
  }, [user])

  return (
    <AppContext.Provider value={{ role, schoolId, classId, setClassId, pollState, setPollState }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
