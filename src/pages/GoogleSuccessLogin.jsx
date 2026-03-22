import React, { useEffect, useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function GoogleSuccessLogin() {
  const navigate = useNavigate()
  const [secondsLeft, setSecondsLeft] = useState(5)

  const handleContinue = () => {
  window.location.href = '/'
  }

  useEffect(() => {
    // Fetch user data
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_URL}/auth/google/success`, {
          credentials: 'include',
        })
        const data = await res.json()
        console.log('Fetched user:', data)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }

    fetchUser()

    // Countdown and redirect
    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1)
    }, 1000)

    const timeout = setTimeout(() => {
  window.location.href = '/'
    }, 5000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="rounded-2xl shadow-xl">
          <CardContent className="py-10 px-6 text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h1 className="text-2xl font-bold mb-2">Login Successful</h1>
            <p className="text-muted-foreground mb-2">
              You have successfully logged in with your Google account.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Redirecting to dashboard in {secondsLeft} second{secondsLeft !== 1 ? 's' : ''}...
            </p>
            <Button onClick={handleContinue} className="w-full">
              Continue to Dashboard
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
