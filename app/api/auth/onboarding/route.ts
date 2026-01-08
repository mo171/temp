import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { role, joinCode } = await req.json();

  // Mock Join Code Validation
  // In real app, query Supabase for code -> school_id
  const schoolId = 'school_demo_123'; 

  // Basic validation
  if (!role || !['teacher', 'student'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }

  try {
    const client = await clerkClient()
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        role,
        school_id: schoolId
      }
    });

    return NextResponse.json({ success: true, schoolId });
  } catch (error) {
    console.error('Metadata update failed:', error);
    return NextResponse.json({ error: 'Failed to update metadata' }, { status: 500 });
  }
}
