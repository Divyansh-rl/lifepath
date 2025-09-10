import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { 
  Bug, 
  MessageSquare, 
  AlertTriangle,
  CheckCircle,
  Send,
  Camera,
  Info
} from 'lucide-react';
import { useActivity } from '../contexts/ActivityContext';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner@2.0.3';

interface BugReportModalProps {
  children: React.ReactNode;
}

export function BugReportModal({ children }: BugReportModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reportType, setReportType] = useState<'bug' | 'feedback'>('bug');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    feedbackType: 'suggestion' as 'suggestion' | 'complaint' | 'compliment',
    steps: ''
  });

  const { reportIssue, sendFeedback } = useActivity();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      if (reportType === 'bug') {
        await reportIssue({
          type: 'bug',
          title: formData.title,
          description: `${formData.description}\n\nSteps to reproduce:\n${formData.steps}`,
          severity: formData.severity,
          status: 'pending'
        });
        toast.success('Bug report submitted successfully! Our team will investigate.');
      } else {
        await sendFeedback({
          title: formData.title,
          description: formData.description,
          type: formData.feedbackType
        });
        toast.success('Feedback submitted successfully! Thank you for helping us improve.');
      }

      // Reset form
      setFormData({
        title: '',
        description: '',
        severity: 'medium',
        feedbackType: 'suggestion',
        steps: ''
      });
      setOpen(false);
    } catch (error) {
      toast.error('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {reportType === 'bug' ? (
              <Bug className="h-5 w-5 text-red-600" />
            ) : (
              <MessageSquare className="h-5 w-5 text-blue-600" />
            )}
            {reportType === 'bug' ? t('activity.report_bug') : t('activity.feedback')}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Report Type Selection */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant={reportType === 'bug' ? 'default' : 'outline'}
              onClick={() => setReportType('bug')}
              className="gap-2"
            >
              <Bug className="h-4 w-4" />
              Report Bug
            </Button>
            <Button
              type="button"
              variant={reportType === 'feedback' ? 'default' : 'outline'}
              onClick={() => setReportType('feedback')}
              className="gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Send Feedback
            </Button>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              {reportType === 'bug' ? 'Bug Title' : 'Feedback Title'} *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder={reportType === 'bug' 
                ? 'Brief description of the issue...' 
                : 'What would you like to tell us?'
              }
              required
            />
          </div>

          {/* Severity for bugs or Feedback type */}
          {reportType === 'bug' ? (
            <div className="space-y-2">
              <Label htmlFor="severity">Severity Level</Label>
              <Select 
                value={formData.severity} 
                onValueChange={(value) => setFormData(prev => ({ 
                  ...prev, 
                  severity: value as typeof formData.severity 
                }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Low - Minor issue
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      Medium - Affects functionality
                    </div>
                  </SelectItem>
                  <SelectItem value="high">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      High - Significant impact
                    </div>
                  </SelectItem>
                  <SelectItem value="critical">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Critical - App unusable
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="feedbackType">Feedback Type</Label>
              <Select 
                value={formData.feedbackType} 
                onValueChange={(value) => setFormData(prev => ({ 
                  ...prev, 
                  feedbackType: value as typeof formData.feedbackType 
                }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="suggestion">💡 Suggestion</SelectItem>
                  <SelectItem value="complaint">😕 Complaint</SelectItem>
                  <SelectItem value="compliment">👍 Compliment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              {reportType === 'bug' ? 'Bug Description' : 'Details'} *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder={reportType === 'bug' 
                ? 'Describe what happened, what you expected, and any error messages...' 
                : 'Tell us more about your experience or suggestion...'
              }
              rows={4}
              required
            />
          </div>

          {/* Steps to reproduce (only for bugs) */}
          {reportType === 'bug' && (
            <div className="space-y-2">
              <Label htmlFor="steps">Steps to Reproduce</Label>
              <Textarea
                id="steps"
                value={formData.steps}
                onChange={(e) => setFormData(prev => ({ ...prev, steps: e.target.value }))}
                placeholder="1. Go to...&#10;2. Click on...&#10;3. See error..."
                rows={3}
              />
            </div>
          )}

          {/* Info card */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3">
              <div className="flex gap-2 text-sm">
                <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-blue-700">
                  <p className="font-medium mb-1">
                    {reportType === 'bug' ? 'Automatic Data Collection' : 'Privacy Notice'}
                  </p>
                  <p className="text-xs">
                    {reportType === 'bug' 
                      ? 'We automatically collect device info, app version, and browser details to help fix the issue faster.'
                      : 'Your feedback helps us improve LifePath. No personal medical data is included in reports.'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit buttons */}
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1 gap-2">
              {loading ? (
                <>Loading...</>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  {reportType === 'bug' ? 'Submit Bug Report' : 'Send Feedback'}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}