'use client';

import { AlertCircle, Check, X, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { AlphaSenderEntry } from '@/data/alphanumericSenderIdSupport';
import { alphaSenderStatusLabel, alphaSenderStatusColor } from '@/data/alphanumericSenderIdSupport';

interface AlphaSenderBadgeProps {
  entry: AlphaSenderEntry;
}

const COLOR_CLASSES = {
  green: 'border-green-200 bg-green-50 text-green-800',
  yellow: 'border-yellow-200 bg-yellow-50 text-yellow-800',
  orange: 'border-orange-200 bg-orange-50 text-orange-800',
  red: 'border-red-200 bg-red-50 text-red-800',
  gray: 'border-gray-200 bg-gray-50 text-gray-600',
};

const ICONS = {
  green: <Check className="h-4 w-4 text-green-600" />,
  yellow: <Info className="h-4 w-4 text-yellow-600" />,
  orange: <AlertCircle className="h-4 w-4 text-orange-600" />,
  red: <X className="h-4 w-4 text-red-600" />,
  gray: <AlertCircle className="h-4 w-4 text-gray-500" />,
};

export function AlphaSenderBadge({ entry }: AlphaSenderBadgeProps) {
  const color = alphaSenderStatusColor(entry.status, entry.registrationPaused);
  const label = alphaSenderStatusLabel(entry.status);

  return (
    <Alert className={COLOR_CLASSES[color]}>
      {ICONS[color]}
      <AlertTitle>
        AlphaNumeric Sender ID: {label}
        {entry.registrationPaused && (
          <span className="ml-2 text-xs font-normal bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
            PAUSED
          </span>
        )}
      </AlertTitle>
      <AlertDescription className="space-y-1">
        {entry.registrationFee && (
          <p className="text-sm">
            <span className="font-medium">Registration fee:</span> {entry.registrationFee}
          </p>
        )}
        {entry.notes && <p className="text-sm">{entry.notes}</p>}
        <p className="text-xs opacity-70 mt-2">
          Source:{' '}
          <a
            href="https://help.twilio.com/articles/223133767-International-support-for-Alphanumeric-Sender-ID"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Twilio Help Center - AlphaNumeric Sender ID
          </a>
        </p>
      </AlertDescription>
    </Alert>
  );
}
