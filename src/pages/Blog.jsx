import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import {
  ArrowLeft, Clock, Calendar, Tag, ArrowRight,
  Rss, ChevronRight, Search
} from 'lucide-react'

const CATEGORY_COLORS = {
  'AI & Automation': { bg: 'bg-indigo-500/20', text: 'text-indigo-300' },
  'Products': { bg: 'bg-cyan-500/20', text: 'text-cyan-300' },
  'Concepts': { bg: 'bg-purple-500/20', text: 'text-purple-300' },
  'Healthcare': { bg: 'bg-emerald-500/20', text: 'text-emerald-300' },
  'Engineering': { bg: 'bg-amber-500/20', text: 'text-amber-300' },
  'Industry': { bg: 'bg-rose-500/20', text: 'text-rose-300' },
}

function getCategoryStyle(cat) {
  return CATEGORY_COLORS[cat] || { bg: 'bg-white/[0.06]', text: 'text-gray-400' }
}

export function BlogList() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/blog/posts.json')
      .then(r => r.json())
      .then(data => setPosts(data.sort((a, b) => new Date(b.date) - new Date(a.date))))
      .catch(() => {})
  }, [])

  const categories = [...new Set(posts.map(p => p.category))]
  const filtered = posts.filter(p => {
    const matchCat = !filter || p.category === filter
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="section-dark border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 pt-24 pb-16">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-purple-400 font-medium mb-6 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <Rss className="text-white" size={20} />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">Blog</h1>
          </div>
          <p className="text-gray-400 text-lg max-w-xl">
            AI, automation, products, and ideas. Fresh content daily — written by our AI content engine.
          </p>

          {/* Search + Filters */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search posts..."
                className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 transition-all"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter('')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  !filter ? 'bg-purple-500/30 text-purple-300' : 'bg-white/[0.04] text-gray-500 hover:bg-white/[0.08]'
                }`}
              >
                All
              </button>
              {categories.map(c => {
                const s = getCategoryStyle(c)
                return (
                  <button
                    key={c}
                    onClick={() => setFilter(filter === c ? '' : c)}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      filter === c ? 'bg-purple-500/30 text-purple-300' : `${s.bg} ${s.text} hover:opacity-80`
                    }`}
                  >
                    {c}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-20">No posts found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {filtered.map((post, i) => {
              const catStyle = getCategoryStyle(post.category)
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={`/blog/${post.id}`}
                    className="block p-6 glass-card rounded-2xl hover:border-white/[0.12] transition-all hover:-translate-y-1 group h-full"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${catStyle.bg} ${catStyle.text}`}>
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock size={12} /> {post.readTime}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-400 leading-relaxed mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <Calendar size={12} /> {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="text-purple-400 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Read <ChevronRight size={14} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export function BlogPost() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [allPosts, setAllPosts] = useState([])

  useEffect(() => {
    fetch('/blog/posts.json')
      .then(r => r.json())
      .then(data => {
        setAllPosts(data)
        const found = data.find(p => p.id === id)
        setPost(found || null)
      })
      .catch(() => {})
  }, [id])

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  const catStyle = getCategoryStyle(post.category)
  const related = allPosts.filter(p => p.id !== post.id).slice(0, 2)

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-16">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-purple-400 font-medium mb-8 transition-colors">
          <ArrowLeft size={16} /> All Posts
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${catStyle.bg} ${catStyle.text}`}>
              {post.category}
            </span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Calendar size={12} /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Clock size={12} /> {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex gap-2 mb-8 flex-wrap">
            {post.tags.map(t => (
              <span key={t} className="px-2.5 py-1 bg-white/[0.04] text-gray-400 text-xs rounded-lg font-medium border border-white/[0.06]">
                #{t}
              </span>
            ))}
          </div>

          {/* Article body */}
          <div className="prose prose-invert prose-lg max-w-none
            prose-headings:text-white prose-headings:font-bold
            prose-p:text-gray-300 prose-p:leading-relaxed
            prose-strong:text-white
            prose-li:text-gray-300
            prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline
            prose-code:bg-white/[0.06] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:text-purple-300
          ">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </motion.article>

        {/* Related Posts */}
        {related.length > 0 && (
          <div className="mt-16 pt-8 border-t border-white/[0.06]">
            <h3 className="text-lg font-bold text-white mb-6">More from the blog</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map(r => (
                <Link
                  key={r.id}
                  to={`/blog/${r.id}`}
                  className="p-4 glass-card rounded-xl hover:border-white/[0.12] transition-all group"
                >
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-2 ${getCategoryStyle(r.category).bg} ${getCategoryStyle(r.category).text}`}>
                    {r.category}
                  </span>
                  <h4 className="font-semibold text-white group-hover:text-purple-300 transition-colors text-sm">{r.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
