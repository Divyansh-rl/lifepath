import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { LanguageSelector } from './LanguageSelector';
import { 
  Clock, 
  MapPin, 
  Brain, 
  Heart, 
  Shield, 
  Truck,
  Hospital,
  Users,
  Activity,
  AlertTriangle,
  Zap,
  Star,
  ChevronRight,
  Play
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LandingProps {
  onSignIn: () => void;
  onSignUp: () => void;
}

export function Landing({ onSignIn, onSignUp }: LandingProps) {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: Brain,
      title: t('features.ai_recommendations'),
      description: t('features.ai_recommendations.desc')
    },
    {
      icon: Clock,
      title: t('features.golden_hour'),
      description: t('features.golden_hour.desc')
    },
    {
      icon: Activity,
      title: t('features.patient_data'),
      description: t('features.patient_data.desc')
    },
    {
      icon: MapPin,
      title: t('features.traffic_control'),
      description: t('features.traffic_control.desc')
    },
    {
      icon: Users,
      title: t('features.multi_user'),
      description: t('features.multi_user.desc')
    },
    {
      icon: Shield,
      title: t('features.realtime'),
      description: t('features.realtime.desc')
    }
  ];

  const stats = [
    { number: "60", label: "Minutes Golden Hour", icon: Clock },
    { number: "24/7", label: "Emergency Response", icon: AlertTriangle },
    { number: "3+", label: "Major Hospitals", icon: Hospital },
    { number: "100%", label: "Mobile Optimized", icon: Truck }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Language selector in top right */}
      <div className="absolute top-4 right-4 z-50">
        <LanguageSelector />
      </div>
      
      {/* Hero Section */}
      <div className="relative bg-red-50 border-b border-border">
        
        <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8">
              <Badge variant="secondary" className="mb-4 text-sm px-4 py-2 bg-red-100 text-red-700 border-red-200">
                <Zap className="mr-2 h-4 w-4 text-red-600" />
                Emergency Medical Services Platform
              </Badge>
              
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
                <span className="text-red-600">{t('lifepath')}</span>
                <br />
                <span className="text-gray-800">{t('tagline')}</span>
              </h1>
              
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed mb-8">
                {t('hero.subtitle')}
              </p>
              
              {/* Key highlights */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded border border-red-200">
                  <Heart className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium">60 Min Golden Hour</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded border border-blue-200">
                  <Brain className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">AI Recommendations</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded border border-green-200">
                  <Activity className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Real-time Tracking</span>
                </div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                onClick={onSignIn}
                className="text-lg px-8 py-4 h-auto"
              >
                <Users className="mr-2 h-5 w-5" />
                {t('cta.signin')}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={onSignUp}
                className="text-lg px-8 py-4 h-auto"
              >
                <Play className="mr-2 h-5 w-5" />
                {t('cta.demo')}
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Problem Statement */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-orange-50 border-b border-border">
        
        <div className="mx-auto max-w-4xl relative">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-red-100 text-red-700 border-red-200">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Critical Challenges
            </Badge>
            <h2 className="text-3xl font-bold mb-4 text-red-700">
              The Challenge
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Emergency medical services face critical coordination challenges that can mean 
              the difference between life and death during the crucial Golden Hour.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-red-200 hover:border-red-300 transition-colors bg-white">
              <CardContent className="p-6 text-center">
                <div className="bg-red-100 p-3 rounded w-fit mx-auto mb-4">
                  <AlertTriangle className="h-12 w-12 text-red-600" />
                </div>
                <h3 className="font-semibold mb-2 text-red-800">Time-Critical Decisions</h3>
                <p className="text-sm text-muted-foreground">
                  Ambulance crews struggle to quickly identify the best hospital 
                  for specific medical emergencies.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-orange-200 hover:border-orange-300 transition-colors bg-white">
              <CardContent className="p-6 text-center">
                <div className="bg-orange-100 p-3 rounded w-fit mx-auto mb-4">
                  <MapPin className="h-12 w-12 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2 text-orange-800">Traffic Delays</h3>
                <p className="text-sm text-muted-foreground">
                  Emergency vehicles lose precious minutes navigating through 
                  traffic without coordinated route clearance.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-yellow-200 hover:border-yellow-300 transition-colors bg-white">
              <CardContent className="p-6 text-center">
                <div className="bg-yellow-100 p-3 rounded w-fit mx-auto mb-4">
                  <Hospital className="h-12 w-12 text-yellow-600" />
                </div>
                <h3 className="font-semibold mb-2 text-yellow-800">Hospital Coordination</h3>
                <p className="text-sm text-muted-foreground">
                  Hospitals receive incomplete patient information, 
                  delaying critical treatment preparation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Solution Features */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50 border-b border-border">
        
        <div className="mx-auto max-w-6xl relative">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-700 border-green-200">
              <Star className="mr-2 h-4 w-4" />
              Innovative Solutions
            </Badge>
            <h2 className="text-3xl font-bold mb-4 text-blue-700">
              Our Solution
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              LifePath integrates all emergency stakeholders into a unified platform 
              that saves lives through intelligent coordination and real-time communication.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const colors = [
                'bg-red-100 text-red-600 border-red-200',
                'bg-blue-100 text-blue-600 border-blue-200', 
                'bg-green-100 text-green-600 border-green-200',
                'bg-purple-100 text-purple-600 border-purple-200',
                'bg-orange-100 text-orange-600 border-orange-200',
                'bg-teal-100 text-teal-600 border-teal-200'
              ];
              const colorClass = colors[index % colors.length];
              const [bgColor, textColor, borderColor] = colorClass.split(' ');
              
              return (
                <Card 
                  key={index} 
                  className={`${borderColor} hover:border-opacity-70 transition-colors bg-white`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className={`p-3 ${bgColor} rounded`}>
                          <feature.icon className={`h-6 w-6 ${textColor}`} />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How LifePath Works</h2>
            <p className="text-lg text-muted-foreground">
              A streamlined workflow that connects every step of emergency care
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Emergency Activated</h3>
                <p className="text-muted-foreground">
                  Ambulance crew activates emergency mode and begins patient assessment
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">AI Hospital Recommendation</h3>
                <p className="text-muted-foreground">
                  System analyzes patient condition and recommends optimal hospital with real-time availability
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Route Optimization</h3>
                <p className="text-muted-foreground">
                  Traffic control system clears route and provides real-time navigation updates
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold mb-1">Hospital Preparation</h3>
                <p className="text-muted-foreground">
                  Hospital receives patient data and ETA, preparing resources and staff for arrival
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-red-600 text-white border-b border-border">
        
        <div className="mx-auto max-w-4xl text-center relative">
          <div className="bg-white/10 p-4 rounded w-fit mx-auto mb-6">
            <Heart className="h-16 w-16 mx-auto text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Ready to Save Lives?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join the LifePath platform and experience the future of emergency medical services. 
            Every second counts in emergency care.
          </p>
          
          {/* Stats before CTA */}
          <div className="grid grid-cols-3 gap-6 mb-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm opacity-80">Response</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">98.5%</div>
              <div className="text-sm opacity-80">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">&lt;60s</div>
              <div className="text-sm opacity-80">Setup Time</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={onSignIn}
              className="text-lg px-8 py-4 h-auto bg-white text-red-700 hover:bg-gray-50"
            >
              <Users className="mr-2 h-5 w-5" />
              Sign In to Dashboard
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={onSignUp}
              className="text-lg px-8 py-4 h-auto border-white text-white hover:bg-white/10"
            >
              <Play className="mr-2 h-5 w-5" />
              Request Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 border-t bg-background">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm text-muted-foreground">
            LifePath Emergency Medical Services Platform • Integrated with Government Healthcare Initiative
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Featuring hospital recommendations 
          </p>
        </div>
      </div>
    </div>
  );
}