'use client'

import { useState } from 'react'
import promptsData from '../data/prompts.json'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPrompt, setSelectedPrompt] = useState<any>(null)
  const [isPremium, setIsPremium] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const allPrompts = [...promptsData.free, ...(isPremium ? promptsData.premium : [])]
  const categories = ['All', ...Array.from(new Set(allPrompts.map(p => p.category)))]

  const filteredPrompts = allPrompts.filter(prompt => {
    const matchesCategory = selectedCategory === 'All' || prompt.category === selectedCategory
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prompt.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleCheckout = async () => {
    setIsLoading(true)

    try {
      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Failed to create checkout session: ' + (data.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">✨</div>
              <div>
                <h1 className="text-2xl font-bold text-white">AI Prompt Hub</h1>
                <p className="text-sm text-gray-400">Supercharge your AI workflow</p>
              </div>
            </div>
            {!isPremium && (
              <button
                onClick={() => setIsPremium(true)}
                className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-orange-500/50 transition-all"
              >
                🔓 Unlock Premium
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            100+ AI Prompts at Your Fingertips
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Copy-paste prompts that work. Save hours of work with our curated collection of AI prompts.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search prompts..."
              className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-3 mb-8 flex-wrap justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">{promptsData.free.length}</div>
            <div className="text-sm text-gray-400">Free Prompts</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">{promptsData.premium.length}</div>
            <div className="text-sm text-gray-400">Premium Prompts</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">6+</div>
            <div className="text-sm text-gray-400">Categories</div>
          </div>
        </div>

        {/* Prompts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map(prompt => (
            <div
              key={prompt.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer group"
              onClick={() => setSelectedPrompt(prompt)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{prompt.icon}</div>
                {prompt.id > 100 && !isPremium && (
                  <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
                    PRO
                  </span>
                )}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                {prompt.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4">{prompt.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-purple-400 bg-purple-400/10 px-3 py-1 rounded-full">
                  {prompt.category}
                </span>
                <span className="text-gray-500 text-sm group-hover:text-white transition-colors">
                  Use Prompt →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Upsell */}
        {!isPremium && promptsData.premium.length > 0 && (
          <div className="mt-16 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-400/20 rounded-3xl p-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              🔓 Unlock {promptsData.premium.length} Premium Prompts
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Get access to advanced prompts for sales, marketing, content creation, and business planning.
              <br />Commercial use license included.
            </p>
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">$9</div>
                <div className="text-sm text-gray-400">/month</div>
              </div>
              <div className="text-left text-gray-300">
                <div>✅ Unlimited access to all premium prompts</div>
                <div>✅ Commercial use license</div>
                <div>✅ New prompts added weekly</div>
                <div>✅ Priority support</div>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="px-12 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-full text-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '🔄 Processing...' : '💳 Get Started Now'}
            </button>
          </div>
        )}
      </main>

      {/* Prompt Modal */}
      {selectedPrompt && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedPrompt(null)}
        >
          <div
            className="bg-slate-900 border border-white/20 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{selectedPrompt.icon}</div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedPrompt.title}</h2>
                  <p className="text-gray-400">{selectedPrompt.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPrompt(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Prompt Template
              </label>
              <div className="bg-black/30 border border-white/10 rounded-xl p-6 text-white font-mono text-sm leading-relaxed">
                {selectedPrompt.prompt}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedPrompt.prompt)
                  alert('Copied to clipboard!')
                }}
                className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors"
              >
                📋 Copy Prompt
              </button>
              <button
                onClick={() => window.open('https://chat.openai.com/', '_blank')}
                className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors"
              >
                🚀 Open ChatGPT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-gray-400">
          <p>Made with ❤️ for the AI community</p>
        </div>
      </footer>
    </div>
  )
}
