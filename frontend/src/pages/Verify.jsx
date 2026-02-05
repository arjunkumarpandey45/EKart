import React from "react"
import { MailCheck } from "lucide-react"
import { Link } from "react-router"

function Verify() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4
      bg-gradient-to-br from-white via-blue-50 to-pink-50"
    >
      <div
        className="w-full max-w-md bg-white border border-slate-200
        rounded-2xl shadow-2xl p-8 text-center"
      >
        {/* ICON */}
        <div
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center
          rounded-full bg-blue-100"
        >
          <MailCheck className="h-8 w-8 text-blue-600" />
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">
          Verify your email
        </h1>

        {/* DESCRIPTION */}
        <p className="text-sm text-slate-600 leading-relaxed">
          We’ve sent a verification link to your email address.  
          Please check your inbox and click the link to activate your account.
        </p>

        {/* INFO BOX */}
        <div
          className="mt-6 rounded-xl bg-slate-50 border border-slate-200
          p-4 text-sm text-slate-600"
        >
          Didn’t receive the email?  
          <br />
          Check your <span className="font-medium">Spam</span> or{" "}
          <span className="font-medium">Promotions</span> folder.
        </div>

        {/* ACTION */}
        <div className="mt-6">
          <Link
            to="/login"
            className="inline-block w-full rounded-xl bg-blue-600
            py-2.5 text-sm font-medium text-white
            hover:bg-blue-700 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Verify
