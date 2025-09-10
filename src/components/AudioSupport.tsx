import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner@2.0.3';

interface AudioSupportProps {
  onVoiceCommand?: (command: string) => void;
  autoSpeak?: boolean;
  className?: string;
}

export function AudioSupport({ onVoiceCommand, autoSpeak = true, className }: AudioSupportProps) {
  const { t, language } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [recognitionSupported, setRecognitionSupported] = useState(false);
  const [currentCommand, setCurrentCommand] = useState('');
  
  const recognitionRef = useRef<any>(null);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Voice recognition setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      // Set language based on current language selection
      const langCodes = {
        'en': 'en-US',
        'hi': 'hi-IN',
        'gu': 'gu-IN',
        'mr': 'mr-IN',
        'ta': 'ta-IN'
      };
      recognitionRef.current.lang = langCodes[language] || 'en-US';
      
      recognitionRef.current.onstart = () => {
        setIsListening(true);
        speak('Listening for command');
      };
      
      recognitionRef.current.onresult = (event: any) => {
        const command = event.results[0][0].transcript.toLowerCase();
        setCurrentCommand(command);
        handleVoiceCommand(command);
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast.error('Voice recognition error');
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      
      setRecognitionSupported(true);
    } else {
      setRecognitionSupported(false);
    }
  }, [language]);

  const speak = (text: string) => {
    if (!isAudioEnabled || !autoSpeak) return;
    
    // Cancel previous speech
    if (speechUtteranceRef.current) {
      speechSynthesis.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Set voice based on language
    const voices = speechSynthesis.getVoices();
    const langVoice = voices.find(voice => voice.lang.startsWith(language));
    if (langVoice) {
      utterance.voice = langVoice;
    }
    
    speechUtteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  const handleVoiceCommand = (command: string) => {
    // Common voice commands
    const commands = {
      'start emergency': () => speak('Starting emergency protocol'),
      'call ambulance': () => speak('Calling nearest ambulance'),
      'hospital list': () => speak('Showing nearby hospitals'),
      'cancel': () => speak('Operation cancelled'),
      'help': () => speak('Voice commands available: start emergency, call ambulance, hospital list, cancel'),
      'status': () => speak('System is operational'),
    };

    // Check for matching command
    const matchedCommand = Object.keys(commands).find(cmd => 
      command.includes(cmd.toLowerCase())
    );

    if (matchedCommand) {
      commands[matchedCommand as keyof typeof commands]();
      onVoiceCommand?.(matchedCommand);
    } else {
      speak('Command not recognized. Say help for available commands.');
    }

    toast.info(`Command: "${command}"`);
  };

  const startListening = () => {
    if (!recognitionSupported) {
      toast.error(t('audio.not_supported'));
      return;
    }
    
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      try {
        recognitionRef.current?.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
        toast.error('Could not start voice recognition');
      }
    }
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    if (!isAudioEnabled) {
      speak('Audio enabled');
    }
  };

  const testAudio = () => {
    speak(t('audio.voice_commands'));
  };

  const stopSpeech = () => {
    speechSynthesis.cancel();
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          {isAudioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          {t('audio.voice_commands')}
          {!recognitionSupported && (
            <Badge variant="destructive" className="text-xs">Unsupported</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Voice Recognition Button */}
          <Button
            onClick={startListening}
            disabled={!recognitionSupported}
            variant={isListening ? "default" : "outline"}
            size="sm"
            className="w-full"
          >
            {isListening ? (
              <>
                <Mic className="h-4 w-4 mr-2 animate-pulse text-red-500" />
                {t('audio.listening')}
              </>
            ) : (
              <>
                <MicOff className="h-4 w-4 mr-2" />
                {t('audio.speak_command')}
              </>
            )}
          </Button>

          {/* Audio Controls */}
          <div className="flex gap-2">
            <Button
              onClick={toggleAudio}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              {isAudioEnabled ? (
                <>
                  <VolumeX className="h-4 w-4 mr-1" />
                  Mute
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4 mr-1" />
                  Unmute
                </>
              )}
            </Button>
            
            <Button
              onClick={testAudio}
              variant="outline"
              size="sm"
              disabled={!isAudioEnabled}
            >
              <Play className="h-4 w-4" />
            </Button>
            
            <Button
              onClick={stopSpeech}
              variant="outline"
              size="sm"
            >
              <Pause className="h-4 w-4" />
            </Button>
          </div>

          {/* Last Command */}
          {currentCommand && (
            <div className="text-xs text-muted-foreground">
              <div className="p-2 bg-gray-50 rounded text-center">
                "{currentCommand}"
              </div>
            </div>
          )}

          {/* Available Commands */}
          <div className="text-xs text-muted-foreground">
            <details>
              <summary className="cursor-pointer hover:text-foreground">Available Commands</summary>
              <div className="mt-2 space-y-1 pl-2">
                <div>• "Start emergency"</div>
                <div>• "Call ambulance"</div>
                <div>• "Hospital list"</div>
                <div>• "Cancel"</div>
                <div>• "Help"</div>
                <div>• "Status"</div>
              </div>
            </details>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}