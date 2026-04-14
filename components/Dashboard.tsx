'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FileSpreadsheet, Loader2, AlertCircle, Info } from 'lucide-react';
import type { ParsedWorkbook, Channel, CountryData } from '@/types/spreadsheet';
import type { GuidelinesApiResponse } from '@/types/guidelines';
import { getAlphaSenderSupport } from '@/data/alphanumericSenderIdSupport';
import { FileUploader } from './FileUploader';
import { CountryChannelSelector } from './CountryChannelSelector';
import { NumberTypeSelector } from './NumberTypeSelector';
import { RegulatoryLinkBanner } from './RegulatoryLinkBanner';
import { GuidelinesTable } from './GuidelinesTable';
import { AlphaSenderBadge } from './AlphaSenderBadge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [workbook, setWorkbook] = useState<ParsedWorkbook | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(
    searchParams.get('country'),
  );
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(
    (searchParams.get('channel') as Channel) ?? null,
  );
  const [selectedNumberType, setSelectedNumberType] = useState<string | null>(null);
  const [guidelines, setGuidelines] = useState<GuidelinesApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const guidelinesCache = useRef(new Map<string, GuidelinesApiResponse>());

  // Derived state
  const countries = useMemo(
    () => (workbook ? Object.values(workbook.byCountry) : []),
    [workbook],
  );

  const countryData: CountryData | undefined = useMemo(
    () => (selectedCountry && workbook ? workbook.byCountry[selectedCountry] : undefined),
    [selectedCountry, workbook],
  );

  const alphaSenderEntry = useMemo(
    () =>
      selectedCountry && selectedNumberType === 'Alphanumeric Sender ID'
        ? getAlphaSenderSupport(selectedCountry)
        : undefined,
    [selectedCountry, selectedNumberType],
  );

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCountry) params.set('country', selectedCountry);
    if (selectedChannel) params.set('channel', selectedChannel);
    const newUrl = params.toString() ? `?${params.toString()}` : '/';
    router.replace(newUrl, { scroll: false });
  }, [selectedCountry, selectedChannel, router]);

  // Fetch guidelines when country + channel changes
  useEffect(() => {
    if (!selectedCountry || !selectedChannel) {
      setGuidelines(null);
      return;
    }

    const key = `${selectedCountry}:${selectedChannel}`;
    const cached = guidelinesCache.current.get(key);
    if (cached) {
      setGuidelines(cached);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`/api/guidelines?country=${selectedCountry}&channel=${selectedChannel}`)
      .then((res) => res.json())
      .then((response: GuidelinesApiResponse) => {
        guidelinesCache.current.set(key, response);
        setGuidelines(response);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [selectedCountry, selectedChannel]);

  const handleCountryChange = useCallback((isoCode: string) => {
    setSelectedCountry(isoCode);
    setSelectedChannel(null);
    setSelectedNumberType(null);
    setGuidelines(null);
  }, []);

  const handleChannelChange = useCallback((channel: Channel) => {
    setSelectedChannel(channel);
    setSelectedNumberType(null);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <FileSpreadsheet className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Twilio Regulatory Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Upload your Weather Report to explore number availability, regulatory requirements,
            and best practices by country.
          </p>
        </div>
      </div>

      {/* Step 1: Upload */}
      {!workbook ? (
        <FileUploader onParsed={setWorkbook} />
      ) : (
        <>
          {/* Upload summary */}
          <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3">
            <div className="flex items-center gap-2 text-green-700 text-sm">
              <FileSpreadsheet className="h-4 w-4" />
              <span>
                <strong>{workbook.countryCount}</strong> countries loaded
              </span>
              {workbook.warnings.length > 0 && (
                <span className="text-yellow-600 ml-2">
                  ({workbook.warnings.length} warnings)
                </span>
              )}
            </div>
            <button
              className="text-xs text-gray-500 hover:text-gray-700 underline"
              onClick={() => {
                setWorkbook(null);
                setSelectedCountry(null);
                setSelectedChannel(null);
                setSelectedNumberType(null);
                setGuidelines(null);
              }}
            >
              Upload different file
            </button>
          </div>

          {/* Step 2: Country & Channel */}
          <CountryChannelSelector
            countries={countries}
            selectedCountry={selectedCountry}
            selectedChannel={selectedChannel}
            onCountryChange={handleCountryChange}
            onChannelChange={handleChannelChange}
          />

          {/* Regulatory link banner (from spreadsheet Column J — instant) */}
          {countryData?.regulatoryUrl && countryData.regulatoryUrl !== 'N/A' && (
            <RegulatoryLinkBanner
              url={countryData.regulatoryUrl}
              countryName={countryData.countryName}
            />
          )}

          {/* Step 3: Number types */}
          {countryData && selectedChannel && (
            <NumberTypeSelector
              countryData={countryData}
              channel={selectedChannel}
              selectedType={selectedNumberType}
              onSelect={setSelectedNumberType}
            />
          )}

          {/* AlphaNumeric Sender ID badge */}
          {alphaSenderEntry && <AlphaSenderBadge entry={alphaSenderEntry} />}

          {/* Loading state */}
          {loading && (
            <div className="flex items-center gap-3 text-blue-600 py-4">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm">Fetching guidelines...</span>
            </div>
          )}

          {/* Error state */}
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-800">Error fetching guidelines</AlertTitle>
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}

          {/* Not found state */}
          {guidelines?.data?.notFound && (
            <Alert className="border-amber-200 bg-amber-50">
              <Info className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-800">
                No dedicated guidelines page found
              </AlertTitle>
              <AlertDescription className="text-amber-700">
                Twilio does not publish a specific {selectedChannel?.toUpperCase()} guidelines page
                for this country.
                {countryData?.regulatoryUrl && countryData.regulatoryUrl !== 'N/A' && (
                  <span>
                    {' '}Check the{' '}
                    <a
                      href={countryData.regulatoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-medium"
                    >
                      regulatory page
                    </a>{' '}
                    for available information.
                  </span>
                )}
              </AlertDescription>
            </Alert>
          )}

          {/* Step 4: Results */}
          {guidelines?.data && !guidelines.data.notFound && (
            <GuidelinesTable guidelines={guidelines.data} />
          )}
        </>
      )}
    </div>
  );
}
