'use client';

import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { CountryData, Channel } from '@/types/spreadsheet';

interface NumberTypeSelectorProps {
  countryData: CountryData;
  channel: Channel;
  selectedType: string | null;
  onSelect: (type: string) => void;
}

interface TypeOption {
  type: string;
  capabilities: string[];
  status: string;
  source: string; // which tab it came from
}

export function NumberTypeSelector({
  countryData,
  channel,
  selectedType,
  onSelect,
}: NumberTypeSelectorProps) {
  const typeOptions = useMemo(() => {
    const optionMap = new Map<string, TypeOption>();

    if (channel === 'porting') {
      for (const row of countryData.porting) {
        const key = row.type;
        const existing = optionMap.get(key);
        if (existing) {
          if (!existing.capabilities.includes(row.capability)) {
            existing.capabilities.push(row.capability);
          }
        } else {
          optionMap.set(key, {
            type: row.type,
            capabilities: [row.capability],
            status: row.status,
            source: 'Porting',
          });
        }
      }
    } else {
      // SMS or Voice — pull from PN Types
      for (const row of countryData.pnTypes) {
        const cap = row.capability.toLowerCase();
        const matchesSms = channel === 'sms' && (cap.includes('sms') || cap.includes('mms'));
        const matchesVoice = channel === 'voice' && cap.includes('voice');

        if (matchesSms || matchesVoice) {
          const key = row.type;
          const existing = optionMap.get(key);
          if (existing) {
            if (!existing.capabilities.includes(row.capability)) {
              existing.capabilities.push(row.capability);
            }
          } else {
            optionMap.set(key, {
              type: row.type,
              capabilities: [row.capability],
              status: row.status,
              source: 'PN Types',
            });
          }
        }
      }

      // For SMS: also add Short Code and SenderID types
      if (channel === 'sms') {
        for (const row of countryData.shortCodes) {
          if (!optionMap.has('Short Code') && row.currentStatus.toLowerCase() !== 'not available') {
            optionMap.set('Short Code', {
              type: 'Short Code',
              capabilities: [row.capability],
              status: row.currentStatus,
              source: 'Short Code',
            });
          }
        }

        for (const row of countryData.senderIds) {
          if (!optionMap.has('Alphanumeric Sender ID')) {
            optionMap.set('Alphanumeric Sender ID', {
              type: 'Alphanumeric Sender ID',
              capabilities: [row.capability],
              status: row.currentStatus,
              source: 'SenderID',
            });
          }
        }
      }
    }

    return [...optionMap.values()];
  }, [countryData, channel]);

  if (typeOptions.length === 0) {
    return (
      <p className="text-sm text-gray-500 italic">
        No number types available for this country/channel combination.
      </p>
    );
  }

  return (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-2 block">Number Type</label>
      <div className="flex flex-wrap gap-2">
        {typeOptions.map((opt) => (
          <button
            key={opt.type}
            onClick={() => onSelect(opt.type)}
            className={cn(
              'flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors',
              selectedType === opt.type
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700',
            )}
          >
            <span className="font-medium">{opt.type}</span>
            <Badge variant="secondary" className="text-xs">
              {opt.capabilities.join(', ')}
            </Badge>
            <StatusBadge status={opt.status} />
          </button>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (!status) return null;

  const lower = status.toLowerCase();
  let color = 'bg-gray-100 text-gray-600';

  if (lower === 'ga') color = 'bg-green-100 text-green-700';
  else if (lower === 'beta') color = 'bg-yellow-100 text-yellow-700';
  else if (lower.includes('paused')) color = 'bg-red-100 text-red-700';
  else if (lower.includes('private')) color = 'bg-purple-100 text-purple-700';
  else if (lower.includes('unavailable') || lower.includes('not available'))
    color = 'bg-gray-100 text-gray-500';

  return <span className={`text-xs px-1.5 py-0.5 rounded-full ${color}`}>{status}</span>;
}
