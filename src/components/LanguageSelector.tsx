import React from 'react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Languages, Check } from 'lucide-react';
import { useLanguage, Language } from '../contexts/LanguageContext';

const languages: { code: Language; name: string; nativeName: string; flag: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
];

interface LanguageSelectorProps {
  variant?: 'default' | 'compact' | 'mobile';
}

export function LanguageSelector({ variant = 'default' }: LanguageSelectorProps) {
  const { language, setLanguage, t } = useLanguage();
  
  const currentLanguage = languages.find(lang => lang.code === language);

  if (variant === 'mobile') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="w-full justify-between h-10">
            <div className="flex items-center gap-2">
              <span className="text-lg">{currentLanguage?.flag}</span>
              <span>{currentLanguage?.nativeName}</span>
            </div>
            <Languages className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full min-w-[200px]">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className="flex items-center gap-3 cursor-pointer p-3"
            >
              <span className="text-lg">{lang.flag}</span>
              <div className="flex flex-col flex-1">
                <span className="font-medium">{lang.nativeName}</span>
                <span className="text-xs text-muted-foreground">{lang.name}</span>
              </div>
              {language === lang.code && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (variant === 'compact') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2">
            <span className="text-lg">{currentLanguage?.flag}</span>
            <span className="hidden sm:inline">{currentLanguage?.nativeName}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <span className="text-lg">{lang.flag}</span>
              <div className="flex flex-col">
                <span className="font-medium">{lang.nativeName}</span>
                <span className="text-xs text-muted-foreground">{lang.name}</span>
              </div>
              {language === lang.code && (
                <Check className="ml-auto h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Languages className="h-4 w-4" />
          <span className="hidden sm:inline">{t('common.language')}</span>
          <span className="text-lg">{currentLanguage?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className="flex items-center gap-3 p-3 cursor-pointer"
          >
            <span className="text-xl">{lang.flag}</span>
            <div className="flex flex-col">
              <span className="font-medium">{lang.nativeName}</span>
              <span className="text-sm text-muted-foreground">{lang.name}</span>
            </div>
            {language === lang.code && (
              <Check className="ml-auto h-5 w-5 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}