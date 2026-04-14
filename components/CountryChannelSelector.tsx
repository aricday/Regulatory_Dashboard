'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Check, ChevronsUpDown, Globe, Phone, MessageSquare, ArrowRightLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import type { CountryData, Channel } from '@/types/spreadsheet';

interface CountryChannelSelectorProps {
  countries: CountryData[];
  selectedCountry: string | null;
  selectedChannel: Channel | null;
  onCountryChange: (isoCode: string) => void;
  onChannelChange: (channel: Channel) => void;
}

const CHANNELS: { id: Channel; label: string; icon: React.ReactNode }[] = [
  { id: 'sms', label: 'SMS', icon: <MessageSquare className="h-4 w-4" /> },
  { id: 'voice', label: 'Voice', icon: <Phone className="h-4 w-4" /> },
  { id: 'porting', label: 'Porting', icon: <ArrowRightLeft className="h-4 w-4" /> },
];

export function CountryChannelSelector({
  countries,
  selectedCountry,
  selectedChannel,
  onCountryChange,
  onChannelChange,
}: CountryChannelSelectorProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const sortedCountries = useMemo(
    () => [...countries].sort((a, b) => a.countryName.localeCompare(b.countryName)),
    [countries],
  );

  const selectedCountryData = useMemo(
    () => sortedCountries.find((c) => c.isoCode === selectedCountry),
    [sortedCountries, selectedCountry],
  );

  const availableChannels = useMemo(() => {
    if (!selectedCountryData) return new Set<Channel>();
    const channels = new Set<Channel>();

    for (const pn of selectedCountryData.pnTypes) {
      const cap = pn.capability.toLowerCase();
      if (cap.includes('sms') || cap.includes('mms')) channels.add('sms');
      if (cap.includes('voice')) channels.add('voice');
    }
    if (selectedCountryData.porting.length > 0) channels.add('porting');
    if (selectedCountryData.senderIds.length > 0) channels.add('sms');

    return channels;
  }, [selectedCountryData]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="space-y-4">
      {/* Country selector */}
      <div ref={containerRef} className="relative">
        <label className="text-sm font-medium text-gray-700 mb-1 block">Country</label>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm hover:border-gray-400 transition-colors"
        >
          {selectedCountryData ? (
            <span className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-400" />
              {selectedCountryData.countryName}
              <span className="text-xs text-gray-400">
                ({selectedCountryData.isoCode.toUpperCase()})
              </span>
            </span>
          ) : (
            <span className="text-gray-400 flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Select a country...
            </span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>

        {open && (
          <div className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
            <Command>
              <CommandInput placeholder="Search countries..." />
              <CommandList className="max-h-60">
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup>
                  {sortedCountries.map((country) => (
                    <CommandItem
                      key={country.isoCode}
                      value={country.countryName}
                      onSelect={() => {
                        onCountryChange(country.isoCode);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          selectedCountry === country.isoCode ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      {country.countryName}
                      <span className="text-xs text-gray-400 ml-auto">
                        {country.isoCode.toUpperCase()}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        )}
      </div>

      {/* Channel selector */}
      {selectedCountry && (
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Channel</label>
          <div className="flex gap-2">
            {CHANNELS.map((ch) => {
              const hasData = availableChannels.has(ch.id);
              return (
                <Button
                  key={ch.id}
                  variant={selectedChannel === ch.id ? 'default' : 'outline'}
                  size="sm"
                  disabled={!hasData}
                  onClick={() => onChannelChange(ch.id)}
                  className={cn(
                    'flex items-center gap-2',
                    !hasData && 'opacity-40 cursor-not-allowed',
                  )}
                >
                  {ch.icon}
                  {ch.label}
                  {!hasData && <span className="text-xs">(N/A)</span>}
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
