import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"

import {
    Card,
    CardAction,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router"

function Login() {
    const [showPassword, setShowPassword] = useState(false)

    return (
    <div className="min-h-screen flex items-center justify-center 
bg-gradient-to-br from-white via-blue-50 to-pink-50

 ">


            <Card className="w-full max-w-sm rounded-2xl border border-border/60 shadow-2xl bg-card">

                {/* HEADER */}
                <CardHeader className="space-y-3 pb-6">
                    <div className="flex items-start justify-between">
                        <CardTitle className="text-2xl font-semibold tracking-tight text-foreground leading-tight">
                            Welcome back
                        </CardTitle>

                        <CardAction>
                            <Link to="/signup">
                                <Button
                                    variant="link"
                                    className="text-sm font-medium text-primary hover:underline"
                                >
                                    Sign up
                                </Button>
                            </Link>
                        </CardAction>
                    </div>
                </CardHeader>

                {/* FORM */}
                <CardContent className="space-y-6">
                    <form className="space-y-5">

                        {/* EMAIL */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">
                                Email address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="h-11 rounded-xl"
                                required
                            />
                        </div>

                        {/* PASSWORD */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-sm font-medium">
                                    Password
                                </Label>
                                <a
                                    href="#"
                                    className="text-xs font-medium text-primary hover:underline"
                                >
                                    Forgot Password?
                                </a>
                            </div>

                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    className="h-11 rounded-xl pr-10"
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>

                            </div>
                        </div>

                    </form>
                </CardContent>

                {/* FOOTER */}
                <CardFooter className="flex flex-col gap-4 pt-6">
                    <Button className="w-full h-11 rounded-xl">
                        Login
                    </Button>

                    <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="bg-card px-2 text-muted-foreground">
                                OR
                            </span>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        className="w-full h-11 rounded-xl"
                    >
                        Login with Google
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Login
