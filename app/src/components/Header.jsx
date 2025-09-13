import { useEffect, useState } from 'react'
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'

export default function Header() {
  const { currentUser } = useSelector(state => state.user)
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('search', search)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchFromUrl = urlParams.get('search')
    if (searchFromUrl) {
      setSearch(searchFromUrl)
    }
  }, [location.search])

  return (
    <header className="bg-gray-300 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">

        {/* Logo */}
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-2xl flex flex-wrap'>
            <span style={{ color: '#FF7A3D' }}>Real</span>
            <span style={{ color: '#FF9966' }}>Estate</span>
          </h1>
        </Link>

        {/* Search bar */}
        <form
          onSubmit={handleSubmit}
          className="hidden sm:flex bg-slate-100 p-2 rounded-lg items-center"
        >
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-0 w-24 sm:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>
            <FaSearch className="text-black" />
          </button>
        </form>

        {/* Desktop menu */}
        <ul className="hidden sm:flex gap-4">
          <Link to='/'>
            <li className="text-gray-500 hover:underline">Home</li>
          </Link>
          <Link to='/about'>
            <li className="text-gray-500 hover:underline">About</li>
          </Link>
          {currentUser?.isAdmin && (
            <Link to='/users'>
              <li className="text-gray-500 hover:underline">Manage Users</li>
            </Link>
          )}
          <Link to='/profile'>
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt=""
              />
            ) : (
              <li className="text-gray-500 hover:underline">Sign In</li>
            )}
          </Link>
        </ul>

        {/* Mobile menu button */}
        <button
          className="sm:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="sm:hidden bg-gray-200 p-4 space-y-4">
          <form onSubmit={handleSubmit} className="flex bg-slate-100 p-2 rounded-lg items-center">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent focus:outline-0 w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button>
              <FaSearch className="text-black" />
            </button>
          </form>
          <Link to='/' onClick={() => setMenuOpen(false)}>
            <p className="text-gray-500 hover:underline">Home</p>
          </Link>
          <Link to='/about' onClick={() => setMenuOpen(false)}>
            <p className="text-gray-500 hover:underline">About</p>
          </Link>
          {currentUser?.isAdmin && (
            <Link to='/users' onClick={() => setMenuOpen(false)}>
              <p className="text-gray-500 hover:underline">Manage Users</p>
            </Link>
          )}
          <Link to='/profile' onClick={() => setMenuOpen(false)}>
            {currentUser ? (
              <div className="flex items-center gap-2">
                <img
                  className="rounded-full h-7 w-7 object-cover"
                  src={currentUser.avatar}
                  alt=""
                />
                <span className="text-gray-500">{currentUser.username}</span>
              </div>
            ) : (
              <p className="text-gray-500 hover:underline">Sign In</p>
            )}
          </Link>
        </div>
      )}
    </header>
  )
}
