import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { 
  Sparkles, 
  Calendar, 
  ChevronRight,
  Bug,
  Zap,
  Shield,
  Star
} from 'lucide-react';
import { useActivity } from '../contexts/ActivityContext';
import { useLanguage } from '../contexts/LanguageContext';

interface UpdatesModalProps {
  children: React.ReactNode;
}

export function UpdatesModal({ children }: UpdatesModalProps) {
  const [open, setOpen] = useState(false);
  const { updateLogs, markUpdateAsRead, hasUnreadUpdates } = useActivity();
  const { t } = useLanguage();

  const handleOpen = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      // Mark recent updates as read when modal opens
      updateLogs.slice(0, 3).forEach(update => {
        markUpdateAsRead(update.id);
      });
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'feature':
        return <Star className="h-4 w-4 text-blue-600" />;
      case 'bugfix':
        return <Bug className="h-4 w-4 text-green-600" />;
      case 'improvement':
        return <Zap className="h-4 w-4 text-orange-600" />;
      case 'security':
        return <Shield className="h-4 w-4 text-purple-600" />;
      default:
        return <Sparkles className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'feature':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
      case 'bugfix':
        return 'bg-green-100 text-green-700 hover:bg-green-200';
      case 'improvement':
        return 'bg-orange-100 text-orange-700 hover:bg-orange-200';
      case 'security':
        return 'bg-purple-100 text-purple-700 hover:bg-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <div className="relative">
          {children}
          {hasUnreadUpdates && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            {t('updates.title')}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-4">
            {updateLogs.map((update, index) => (
              <Card key={update.id} className={`transition-all duration-300 hover:shadow-md ${
                index < 3 ? 'border-primary/20 bg-primary/5' : ''
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 text-2xl mt-1">
                      {update.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {update.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{update.date.toLocaleDateString()}</span>
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${getTypeBadgeColor(update.type)}`}
                            >
                              {getTypeIcon(update.type)}
                              <span className="ml-1 capitalize">{update.type}</span>
                            </Badge>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          v{update.version}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {update.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
        
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {updateLogs.length} total updates
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            {t('updates.view_all')}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}