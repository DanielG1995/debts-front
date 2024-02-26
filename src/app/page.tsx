// pages/index.js
'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';

export default function Index() {
  const { user } = useUser();
  const router = useRouter()

  if (user) {
    router.push('/dashboard')
  }

  return <></>
}