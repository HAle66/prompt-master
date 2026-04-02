import { Suspense } from 'react'

function SuccessContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-12 max-w-2xl w-full text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          Thank you for your purchase! You now have access to all premium prompts.
        </p>

        <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-green-400 mb-4">
            ✅ Premium Activated
          </h2>
          <ul className="text-gray-300 text-left space-y-2">
            <li>✅ Access to 8 premium prompts</li>
            <li>✅ Commercial use license</li>
            <li>✅ Weekly new prompts</li>
            <li>✅ Priority support</li>
          </ul>
        </div>

        <div className="space-y-4">
          <a
            href="/"
            className="block w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full transition-colors"
          >
            🚀 Start Using Premium Prompts
          </a>
          <a
            href="mailto:support@aiprompthub.com"
            className="block text-gray-400 hover:text-white transition-colors"
          >
            Need help? Contact support
          </a>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center"><div className="text-white text-xl">Loading...</div></div>}>
      <SuccessContent />
    </Suspense>
  )
}
