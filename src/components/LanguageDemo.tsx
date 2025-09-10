import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { UpdatesModal } from './UpdatesModal';
import { BugReportModal } from './BugReportModal';
import { LanguageSelector } from './LanguageSelector';
import { 
  Sparkles, 
  Bug, 
  Globe,
  Activity,
  Bell,
  MessageSquare
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useActivity } from '../contexts/ActivityContext';

export function LanguageDemo() {
  const { t, language } = useLanguage();
  const { hasUnreadUpdates } = useActivity();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Globe className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold">{t('lifepath')}</h1>
        </div>
        <p className="text-muted-foreground">
          {t('hero.subtitle')}
        </p>
      </div>

      {/* Language Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Language Selection
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <span>Current Language:</span>
          <Badge variant="secondary" className="capitalize">{language}</Badge>
          <LanguageSelector />
        </CardContent>
      </Card>

      {/* Translated Content */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.welcome')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full gap-2">
              <Activity className="h-4 w-4" />
              {t('dashboard.start_emergency')}
            </Button>
            
            <div className="space-y-2">
              <h4 className="font-medium">Navigation:</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{t('nav.dashboard')}</Badge>
                <Badge variant="outline">{t('nav.history')}</Badge>
                <Badge variant="outline">{t('nav.profile')}</Badge>
                <Badge variant="outline">{t('nav.emergency')}</Badge>
                <Badge variant="outline">{t('nav.traffic')}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity Tracking Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Updates Modal */}
            <UpdatesModal>
              <Button variant="outline" className="w-full gap-2">
                <Sparkles className="h-4 w-4" />
                {t('updates.title')}
                {hasUnreadUpdates && (
                  <Badge variant="destructive" className="ml-auto">New</Badge>
                )}
              </Button>
            </UpdatesModal>

            {/* Bug Report Modal */}
            <BugReportModal>
              <Button variant="outline" className="w-full gap-2">
                <Bug className="h-4 w-4" />
                {t('activity.report_bug')}
              </Button>
            </BugReportModal>

            <div className="text-sm text-muted-foreground">
              <p>✅ Automatic error reporting</p>
              <p>✅ User feedback collection</p>
              <p>✅ Update notifications</p>
              <p>✅ Multi-language support</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Key Features in Current Language</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900">{t('features.ai_recommendations')}</h4>
                <p className="text-sm text-blue-700">{t('features.ai_recommendations.desc')}</p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900">{t('features.golden_hour')}</h4>
                <p className="text-sm text-green-700">{t('features.golden_hour.desc')}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900">{t('features.traffic_control')}</h4>
                <p className="text-sm text-purple-700">{t('features.traffic_control.desc')}</p>
              </div>
              
              <div className="p-3 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-orange-900">{t('features.realtime')}</h4>
                <p className="text-sm text-orange-700">{t('features.realtime.desc')}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" className="gap-2">
          <Activity className="h-5 w-5" />
          {t('cta.signin')}
        </Button>
        <Button size="lg" variant="outline" className="gap-2">
          <MessageSquare className="h-5 w-5" />
          {t('cta.demo')}
        </Button>
      </div>
    </div>
  );
}