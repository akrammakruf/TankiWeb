import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Droplets } from 'lucide-react';
import { useSiteSettings } from '@/lib/useContent';

const navItems = [
  { to: '/', label: 'Beranda' },
  { to: '/services', label: 'Layanan' },
  { to: '/projects', label: 'Proyek' },
  { to: '/about', label: 'Tentang Kami' },
  { to: '/contact', label: 'Kontak' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { settings } = useSiteSettings();

  const companyName = settings?.company_name ?? 'TankPro';
  const tagline = settings?.tagline ?? '';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-md' : ''
      } bg-primary-700`}
    >
      <nav className="container-custom flex h-16 items-center justify-between lg:h-20">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
            <Droplets className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-xl font-extrabold tracking-tight text-white">
              {companyName}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-primary-200">
              {tagline}
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `relative rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'text-white'
                    : 'text-primary-100 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-white" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-primary-700 shadow-lg transition-all hover:bg-primary-50 active:scale-95"
          >
            Konsultasi Gratis
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 lg:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={`overflow-hidden bg-primary-800 lg:hidden ${
          isOpen ? 'max-h-[400px]' : 'max-h-0'
        } transition-all duration-300`}
      >
        <div className="container-custom flex flex-col gap-1 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-white/15 text-white'
                    : 'text-primary-100 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-primary-700"
          >
            Konsultasi Gratis
          </Link>
        </div>
      </div>
    </header>
  );
}
