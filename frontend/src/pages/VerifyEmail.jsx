import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams, Link, Navigate, useNavigate } from "react-router"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

function VerifyEmail() {
  const { token } = useParams()
  const [status, setStatus] = useState("loading") 
  const [message, setMessage] = useState("")
const navigate=useNavigate()
  const verifyEmail = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/verification",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (res.data.success) {
      
        setTimeout(() => {
              setStatus("success")
        }, 500);
        setMessage("Your email has been verified successfully 🎉")
        setTimeout(() => {
            navigate('/login')
        }, 2500);
      }
    } catch (error) {
      console.log(error)
      setStatus("error")
      setMessage(
        error.response?.data?.message ||
          "Verification failed. Please try again."
      )
    }
  }

  useEffect(() => {
    verifyEmail()
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center px-4
      bg-gradient-to-br from-white via-blue-50 to-pink-50"
    >
      <div className="w-full max-w-md rounded-2xl bg-white
        border border-slate-200 shadow-2xl p-8 text-center"
      >

        {/* LOADING */}
        {status === "loading" && (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
            <p className="text-slate-600 text-sm">
              Verifying your email, please wait...
            </p>
          </div>
        )}

        {/* SUCCESS */}
        {status === "success" && (
          <div className="flex flex-col items-center gap-4">
            <CheckCircle className="h-14 w-14 text-green-600" />
            <h1 className="text-2xl font-semibold text-slate-900">
              Email Verified
            </h1>
            <p className="text-sm text-slate-600">{message}</p>

            <Link
              to="/login"
              className="mt-4 inline-block w-full rounded-xl
              bg-green-600 py-2.5 text-sm font-medium text-white
              hover:bg-green-700 transition"
            >
              Go to Login
            </Link>
          </div>
        )}

        {/* ERROR */}
        {status === "error" && (
          <div className="flex flex-col items-center gap-4">
            <XCircle className="h-14 w-14 text-red-600" />
            <h1 className="text-2xl font-semibold text-slate-900">
              Verification Failed
            </h1>
            <p className="text-sm text-slate-600">{message}</p>

            <Link
              to="/signup"
              className="mt-4 inline-block w-full rounded-xl
              bg-blue-600 py-2.5 text-sm font-medium text-white
              hover:bg-blue-700 transition"
            >
              Back to Signup
            </Link>
          </div>
        )}

      </div>
    </div>
  )
}

export default VerifyEmail
