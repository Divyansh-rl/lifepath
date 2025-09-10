import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Clock,
  Shield,
  Hospital,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  CheckCircle,
  Activity
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner@2.0.3';

interface SOSButtonProps {
  userLocation: { lat: number; lng: number };
  onEmergencyTriggered?: () => void;
}

export function SOSButton({ userLocation, onEmergencyTriggered }: SOSButtonProps) {
  const { t } = useLanguage();
  const [isPressed, setIsPressed] = useState(false);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [pressStartTime, setPressStartTime] = useState<number | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [recognitionSupported, setRecognitionSupported] = useState(false);
  
  const pressTimerRef = useRef<NodeJS.Timeout>();
  const recognitionRef = useRef<any>(null);
  
  const PRESS_DURATION = 3000; // 3 seconds

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event: any) => {
        const command = event.results[0][0].transcript.toLowerCase();
        handleVoiceCommand(command);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      
      setRecognitionSupported(true);
    }
  }, []);

  const handleVoiceCommand = (command: string) => {
    if (command.includes('emergency') || command.includes('help') || command.includes('sos')) {
      triggerEmergency();
      speak('Emergency services have been notified');
    } else if (command.includes('cancel')) {
      cancelEmergency();
      speak('Emergency cancelled');
    }
  };

  const speak = (text: string) => {
    if (!audioEnabled) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    speechSynthesis.speak(utterance);
  };

  const startVoiceRecognition = () => {
    if (!recognitionSupported) {
      toast.error(t('audio.not_supported'));
      return;
    }
    
    setIsListening(true);
    recognitionRef.current?.start();
  };

  const handleMouseDown = () => {
    setIsPressed(true);
    setPressStartTime(Date.now());
    setCountdown(PRESS_DURATION);
    
    // Haptic feedback if available
    if ('vibrate' in navigator) {
      navigator.vibrate(100);
    }
    
    pressTimerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 100) {
          triggerEmergency();
          return 0;
        }
        return prev - 100;
      });
    }, 100);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    setPressStartTime(null);
    setCountdown(0);
    
    if (pressTimerRef.current) {
      clearInterval(pressTimerRef.current);
    }
  };

  const triggerEmergency = () => {
    setIsEmergencyActive(true);
    handleMouseUp();
    
    // Notify all emergency services
    const services = [
      { name: 'Ambulance Services', delay: 0 },
      { name: 'Traffic Police', delay: 500 },
      { name: 'Nearby Hospitals', delay: 1000 }
    ];
    
    services.forEach(({ name, delay }) => {
      setTimeout(() => {
        toast.success(`${name} notified`, {
          description: `Location: ${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}`
        });
      }, delay);
    });
    
    // Audio announcement
    speak(t('sos.services_notified'));
    
    // Call parent callback
    onEmergencyTriggered?.();
    
    // Auto-deactivate after 5 minutes
    setTimeout(() => {
      setIsEmergencyActive(false);
    }, 300000);
  };

  const cancelEmergency = () => {
    setIsEmergencyActive(false);
    toast.info('Emergency cancelled');
    speak('Emergency cancelled');
  };

  const getProgressPercentage = () => {
    return ((PRESS_DURATION - countdown) / PRESS_DURATION) * 100;
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 md:relative md:bottom-0 md:right-0">
      <Card className="w-80 shadow-lg border-2">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">{t('sos.emergency_button')}</h3>
            <Badge variant={isEmergencyActive ? "destructive" : "secondary"}>
              {isEmergencyActive ? 'ACTIVE' : 'READY'}
            </Badge>
          </div>

          {/* SOS Button */}
          <div className="relative mb-4">
            <Button
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchEnd={handleMouseUp}
              disabled={isEmergencyActive}
              className={`w-full h-32 text-xl font-bold transition-all duration-300 relative overflow-hidden ${
                isEmergencyActive 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : isPressed 
                    ? 'bg-red-700 scale-95' 
                    : 'bg-red-600 hover:bg-red-700'
              }`}
              style={{
                background: isPressed 
                  ? `linear-gradient(to right, #dc2626 ${getProgressPercentage()}%, #b91c1c ${getProgressPercentage()}%)`
                  : undefined
              }}
            >
              {isEmergencyActive ? (
                <>
                  <CheckCircle className="h-8 w-8 mb-2" />
                  {t('sos.help_requested')}
                </>
              ) : (
                <>
                  <AlertTriangle className="h-8 w-8 mb-2" />
                  {isPressed ? `${Math.ceil(countdown / 1000)}...` : 'SOS'}
                </>
              )}
            </Button>
            
            {isPressed && (
              <div className="absolute bottom-2 left-2 right-2 h-1 bg-white/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-100 ease-out"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
            )}
          </div>

          <p className="text-sm text-center text-muted-foreground mb-4">
            {t('sos.press_for_help')}
          </p>

          {/* Audio Controls */}
          <div className="flex gap-2 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAudioEnabled(!audioEnabled)}
              className="flex-1"
            >
              {audioEnabled ? <Volume2 className="h-4 w-4 mr-2" /> : <VolumeX className="h-4 w-4 mr-2" />}
              {audioEnabled ? t('audio.disable_audio') : t('audio.enable_audio')}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={startVoiceRecognition}
              disabled={!recognitionSupported || isListening}
              className="flex-1"
            >
              {isListening ? <Mic className="h-4 w-4 mr-2 animate-pulse" /> : <MicOff className="h-4 w-4 mr-2" />}
              {isListening ? t('audio.listening') : t('audio.voice_commands')}
            </Button>
          </div>

          {/* Emergency Status */}
          {isEmergencyActive && (
            <Alert className="mb-4 border-green-200 bg-green-50">
              <Activity className="h-4 w-4" />
              <AlertDescription className="text-green-800">
                <div className="space-y-1">
                  <p>{t('sos.services_notified')}</p>
                  <p className="text-xs">{t('sos.location_shared')}</p>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Cancel Button */}
          {isEmergencyActive && (
            <Button
              variant="outline"
              onClick={cancelEmergency}
              className="w-full"
            >
              Cancel Emergency
            </Button>
          )}

          {/* Service Status */}
          <div className="mt-4 space-y-2">
            <div className="text-xs font-medium text-muted-foreground">Emergency Services:</div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Ambulance</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Police</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Hospital</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}