'use client';

import { ExternalLink } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface RegulatoryLinkBannerProps {
  url: string;
  countryName: string;
}

export function RegulatoryLinkBanner({ url, countryName }: RegulatoryLinkBannerProps) {
  return (
    <Alert className="border-blue-200 bg-blue-50">
      <ExternalLink className="h-4 w-4 text-blue-600" />
      <AlertTitle className="text-blue-800">Direct Regulatory Reference</AlertTitle>
      <AlertDescription className="text-blue-700">
        Twilio&apos;s official regulatory page for {countryName}:{' '}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline hover:text-blue-900"
        >
          {url}
        </a>
      </AlertDescription>
    </Alert>
  );
}
