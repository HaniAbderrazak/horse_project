// src/pages/Login.tsx
import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaSignInAlt, FaEye, FaEyeSlash, FaExclamationCircle, FaEnvelope, FaLock } from 'react-icons/fa';
import horseLogo from '../../assets/horse_logo.png';

export const Login = () => {
  const [email, setEmail] = useState('noonacademy.an@gmail.com');
  const [password, setPassword] = useState('2d4ILZCLc5NX');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { login, error } = authContext;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(email, password);
      const origin = location.state?.from?.pathname || '/horses';
      navigate(origin);
    } catch (err) {
      // Error is already handled in the auth context
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
<div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-4">
  <div className="max-w-screen-xl w-full bg-white shadow-2xl rounded-xl overflow-hidden flex flex-col lg:flex-row">
    {/* Left Side - Form */}
    <div className="w-full lg:w-1/2 xl:w-5/12 p-8 sm:p-12">
      <div className="flex justify-center mb-10">
        <img 
          src={horseLogo}
          className="h-20 "
          alt="Company Logo"
        />
      </div>

      {/* Form Card with Shadow */}
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start shadow-sm">
            <FaExclamationCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-sm font-medium text-red-700">{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                className="block w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 placeholder-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className="block w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 placeholder-gray-400 shadow-lg  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center py-3 px-4 rounded-lg shadow-lg text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              <>
                <FaSignInAlt className="mr-2" />
                Sign In
              </>
            )}
          </button>
        </form>
      </div>

    {/* Right Side - Image */}
    <div className="hidden lg:flex flex-1 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://a-z-animals.com/media/horse-2.jpg')" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-black/10"></div>
      <div className="relative z-10 p-12 flex items-end">
        <div className="text-white">
          <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">Welcome Back</h2>
          <p className="text-lg opacity-90 drop-shadow-md">Manage your horses with our powerful platform</p>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};