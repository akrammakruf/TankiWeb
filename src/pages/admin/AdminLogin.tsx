import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Droplets, Lock, Mail, Loader2, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth';

export default function AdminLogin() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const fn = mode === 'login' ? signIn : signUp;
    const { error } = await fn(email, password);

    if (error) {
      setError(error);
      setLoading(false);
    } else if (mode === 'signup') {
      setError('Akun berhasil dibuat. Silakan login.');
      setMode('login');
      setLoading(false);
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-900 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 shadow-lg shadow-primary-600/30">
            <Droplets className="h-7 w-7 text-white" />
          </div>
          <h1 className="mt-4 text-2xl font-extrabold text-white">Admin Panel TankPro</h1>
          <p className="mt-1 text-sm text-neutral-400">
            {mode === 'login' ? 'Masuk untuk mengelola konten website' : 'Buat akun admin baru'}
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-800/50 p-6 backdrop-blur-sm">
          {error && (
            <div className="mb-4 flex items-start gap-3 rounded-lg border border-error-500/30 bg-error-500/10 p-3">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-error-400" />
              <p className="text-sm text-error-300">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-neutral-300">Email</label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-900 py-3 pl-10 pr-4 text-sm text-white placeholder:text-neutral-600 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  placeholder="admin@tankpro.co.id"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-300">Password</label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-900 py-3 pl-10 pr-4 text-sm text-white placeholder:text-neutral-600 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-primary-700 disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : mode === 'login' ? (
                'Masuk'
              ) : (
                'Daftar'
              )}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setError('');
              }}
              className="text-xs font-medium text-neutral-400 transition-colors hover:text-primary-400"
            >
              {mode === 'login'
                ? 'Belum punya akun? Daftar di sini'
                : 'Sudah punya akun? Login di sini'}
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 transition-colors hover:text-neutral-300"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Kembali ke Website
          </Link>
        </div>
      </div>
    </div>
  );
}
