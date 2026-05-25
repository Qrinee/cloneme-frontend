import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { FaHome } from "react-icons/fa"

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted p-4">
      <Card className="w-full max-w-md text-center rounded-2xl">
        <CardContent className="py-10 px-6">
          <h1 className="text-5xl font-bold text-destructive mb-4">404</h1>
          <p className="text-muted-foreground mb-6">
            Oops! The page you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/"><FaHome/> Back to Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}





