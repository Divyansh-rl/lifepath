import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';
import { Siren, Shield, Building2, Car, Eye, EyeOff, CheckCircle, XCircle, ArrowLeft, Home } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { User, UserRole } from '../types/user';

interface AuthPageProps {
  onSignIn: (role: UserRole, user: User) => void;
  onSignUp: (role: UserRole, user: User) => void;
  onBackToHome?: () => void;
}

interface ValidationResult {
  isValid: boolean;
  hasLowercase: boolean;
  hasUppercase: boolean;
  hasDigit: boolean;
  hasMinLength: boolean;
}

export function AuthPage({ onSignIn, onSignUp, onBackToHome }: AuthPageProps) {
  const { t } = useLanguage();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: '' as UserRole,
    employeeId: ''
  });

  const validatePassword = (password: string): ValidationResult => {
    return {
      isValid: password.length >= 8 && 
               /[a-z]/.test(password) && 
               /[A-Z]/.test(password) && 
               /\d/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasDigit: /\d/.test(password),
      hasMinLength: password.length >= 8
    };
  };

  const passwordValidation = validatePassword(formData.password);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!formData.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (isSignUp) {
      if (!passwordValidation.isValid) {
        toast.error('Password does not meet requirements');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }

      if (!formData.name || !formData.role) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Create new user
      const newUser: User = {
        id: `user_${Date.now()}`,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        employeeId: formData.employeeId || `${formData.role.toUpperCase()}-${Math.floor(Math.random() * 9999)}`,
        phone: `+91 ${Math.floor(Math.random() * 90000) + 10000} ${Math.floor(Math.random() * 90000) + 10000}`,
        unit: formData.role === 'ambulance' ? `Unit ${Math.floor(Math.random() * 50) + 1}` : undefined,
        station: formData.role === 'ambulance' ? 'Station 1 - Central Jaipur' : formData.role === 'hospital' ? 'SMS Hospital' : 'Traffic Control Center',
        certification: formData.role === 'ambulance' ? 'EMT-P' : formData.role === 'hospital' ? 'MD' : 'Traffic Police Officer',
        yearsOfService: Math.floor(Math.random() * 15) + 1,
        createdAt: new Date()
      };

      // Store user data in localStorage
      localStorage.setItem('lifepath_user', JSON.stringify(newUser));

      toast.success(`Account created successfully! Welcome, ${formData.name}`);
      onSignUp(formData.role, newUser);
    } else {
      // For sign in, check if user exists or create a demo user
      const existingUser = localStorage.getItem('lifepath_user');
      
      if (existingUser) {
        const user = JSON.parse(existingUser) as User;
        if (user.email === formData.email) {
          toast.success(`Welcome back, ${user.name}!`);
          onSignIn(user.role, user);
          return;
        }
      }

      // Create a demo user for sign in if no existing user
      const demoUser: User = {
        id: `user_${Date.now()}`,
        name: 'Demo User',
        email: formData.email,
        role: formData.role || 'ambulance',
        employeeId: `${(formData.role || 'ambulance').toUpperCase()}-${Math.floor(Math.random() * 9999)}`,
        phone: `+91 ${Math.floor(Math.random() * 90000) + 10000} ${Math.floor(Math.random() * 90000) + 10000}`,
        unit: (formData.role || 'ambulance') === 'ambulance' ? `Unit ${Math.floor(Math.random() * 50) + 1}` : undefined,
        station: (formData.role || 'ambulance') === 'ambulance' ? 'Station 1 - Central Jaipur' : (formData.role || 'ambulance') === 'hospital' ? 'SMS Hospital' : 'Traffic Control Center',
        certification: (formData.role || 'ambulance') === 'ambulance' ? 'EMT-P' : (formData.role || 'ambulance') === 'hospital' ? 'MD' : 'Traffic Police Officer',
        yearsOfService: Math.floor(Math.random() * 15) + 1,
        createdAt: new Date()
      };

      // Store user data in localStorage
      localStorage.setItem('lifepath_user', JSON.stringify(demoUser));

      toast.success('Signed in successfully!');
      onSignIn(formData.role || 'ambulance', demoUser);
    }
  };

  const getRoleInfo = (role: UserRole) => {
    switch (role) {
      case 'ambulance':
        return {
          icon: Siren,
          title: 'Ambulance Staff',
          description: 'Emergency medical services and patient transport',
          color: 'text-red-600'
        };
      case 'hospital':
        return {
          icon: Building2,
          title: 'Hospital Staff',
          description: 'Hospital management and patient care',
          color: 'text-blue-600'
        };
      case 'traffic-police':
        return {
          icon: Shield,
          title: 'Traffic Police',
          description: 'Traffic control and emergency route management',
          color: 'text-green-600'
        };
      default:
        return { icon: Car, title: '', description: '', color: '' };
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Back to Home Button */}
        {onBackToHome && (
          <div className="flex justify-start">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToHome}
              className="text-gray-600 hover:text-black"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        )}

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
            <Siren className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-black">LifePath</h1>
            <p className="text-gray-600">Emergency Management System</p>
          </div>
          <div className="flex justify-center">
            <LanguageSelector variant="compact" />
          </div>
        </div>

        {/* Auth Form */}
        <Card className="bg-white border border-gray-200">
          <CardHeader className="text-center">
            <CardTitle className="text-black">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-black">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-white border-gray-300 text-black"
                  placeholder="your@email.com"
                  required
                />
              </div>

              {/* Name (Sign Up only) */}
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-black">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-white border-gray-300 text-black"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}

              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role" className="text-black">Role</Label>
                <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value as UserRole)}>
                  <SelectTrigger className="bg-white border-gray-300 text-black">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="ambulance" className="text-black">
                      <div className="flex items-center gap-2">
                        <Siren className="h-4 w-4 text-red-600" />
                        <span>Ambulance Staff</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="hospital" className="text-black">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-blue-600" />
                        <span>Hospital Staff</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="traffic-police" className="text-black">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span>Traffic Police</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Employee ID (Sign Up only) */}
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="employeeId" className="text-black">Employee ID</Label>
                  <Input
                    id="employeeId"
                    type="text"
                    value={formData.employeeId}
                    onChange={(e) => handleInputChange('employeeId', e.target.value)}
                    className="bg-white border-gray-300 text-black"
                    placeholder="Enter your employee ID"
                  />
                </div>
              )}

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-black">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="bg-white border-gray-300 text-black pr-10"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                
                {/* Password Requirements (Sign Up only) */}
                {isSignUp && formData.password && (
                  <div className="space-y-1 text-sm">
                    <div className={`flex items-center gap-2 ${passwordValidation.hasMinLength ? 'text-green-600' : 'text-red-600'}`}>
                      {passwordValidation.hasMinLength ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                      <span>At least 8 characters</span>
                    </div>
                    <div className={`flex items-center gap-2 ${passwordValidation.hasLowercase ? 'text-green-600' : 'text-red-600'}`}>
                      {passwordValidation.hasLowercase ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                      <span>At least one lowercase letter</span>
                    </div>
                    <div className={`flex items-center gap-2 ${passwordValidation.hasUppercase ? 'text-green-600' : 'text-red-600'}`}>
                      {passwordValidation.hasUppercase ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                      <span>At least one uppercase letter</span>
                    </div>
                    <div className={`flex items-center gap-2 ${passwordValidation.hasDigit ? 'text-green-600' : 'text-red-600'}`}>
                      {passwordValidation.hasDigit ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                      <span>At least one digit</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password (Sign Up only) */}
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-black">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="bg-white border-gray-300 text-black"
                    placeholder="Confirm your password"
                    required
                  />
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-red-600 text-sm">Passwords do not match</p>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-black hover:bg-gray-800 text-white"
                disabled={isSignUp && !passwordValidation.isValid}
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
              </Button>
            </form>

            {/* Toggle Sign In/Sign Up */}
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setFormData({
                    email: '',
                    password: '',
                    confirmPassword: '',
                    name: '',
                    role: '' as UserRole,
                    employeeId: ''
                  });
                }}
                className="text-black hover:underline"
              >
                {isSignUp 
                  ? 'Already have an account? Sign In' 
                  : "Don't have an account? Sign Up"
                }
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Role Information */}
        {formData.role && (
          <Card className="bg-gray-50 border border-gray-200">
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                {(() => {
                  const roleInfo = getRoleInfo(formData.role);
                  const IconComponent = roleInfo.icon;
                  return (
                    <>
                      <IconComponent className={`h-6 w-6 ${roleInfo.color}`} />
                      <div className="flex-1">
                        <h4 className="font-medium text-black">{roleInfo.title}</h4>
                        <p className="text-sm text-gray-600">{roleInfo.description}</p>
                      </div>
                    </>
                  );
                })()}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}