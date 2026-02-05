import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"

function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    console.log(formData)
    setLoading(true)

    try {
      const res = await axios.post(`http://localhost:3000/api/user/register`, formData,
        {
          headers: {
            "Content-Type": "Application/json"
          }
        }
      )
      if (res.data.success) {
        toast.success("Email sent successfully 😄", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
setTimeout(() => {
        navigate('/verify')
}, 1000);
    } catch (error) {
      const backendMessage =
        error.response?.data?.message || "Something went wrong ❌";

      toast.error(backendMessage, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });

  console.log("Backend error 👉", error.response?.data);
    } finally {
      setLoading(false); 
    }
    // fake API call
    // setTimeout(() => {
    //   setLoading(false)
    //   navigate("/login")
    // }, 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center 
bg-gradient-to-br from-white via-blue-50 to-pink-50 px-4">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"  
        limit={3}
      />

      <Card className="w-full max-w-sm rounded-2xl shadow-2xl bg-white border border-slate-200">

        {/* HEADER */}
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-semibold text-slate-900">
            Create account
          </CardTitle>
          <p className="text-sm text-slate-500">
            Fill the details below to create your account
          </p>
        </CardHeader>

        {/* FORM */}
        <form onSubmit={handleSignup}>
          <CardContent className="space-y-5">

            {/* FIRST + LAST NAME */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text-sm font-medium text-slate-700"
                >
                  First name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="h-11 rounded-xl text-slate-900 placeholder:text-slate-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="text-sm font-medium text-slate-700"
                >
                  Last name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="h-11 rounded-xl text-slate-900 placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-slate-700"
              >
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="h-11 rounded-xl text-slate-900 placeholder:text-slate-400"
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-slate-700"
              >
                Password
              </Label>

              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleChange}
                  className="h-11 rounded-xl pr-10 text-slate-900 placeholder:text-slate-400"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 
                  text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

          </CardContent>

          {/* FOOTER */}
          <CardFooter className="flex flex-col gap-4 pt-6">

            {/* SUBMIT BUTTON */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl 
              bg-blue-600 hover:bg-blue-700 text-white 
              flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Creating account..." : "Create account"}
            </Button>

            {/* ALREADY HAVE ACCOUNT (BOTTOM) */}
            <p className="text-xs text-center text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Login
              </Link>
            </p>

          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default Signup
