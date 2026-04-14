'use client';

import { useCallback, useState } from 'react';
import { read, type WorkBook } from 'xlsx';
import { Upload, FileSpreadsheet, AlertCircle } from 'lucide-react';
import { parseWorkbook } from '@/lib/parser/parseWorkbook';
import type { ParsedWorkbook } from '@/types/spreadsheet';

interface FileUploaderProps {
  onParsed: (workbook: ParsedWorkbook) => void;
}

export function FileUploader({ onParsed }: FileUploaderProps) {
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [parsing, setParsing] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      setError(null);
      setFileName(file.name);
      setParsing(true);

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          if (!data) throw new Error('Failed to read file');
          const wb: WorkBook = read(data, { type: 'array' });
          const parsed = parseWorkbook(wb);

          if (parsed.countryCount === 0) {
            setError('No countries found. Make sure you uploaded a valid Twilio Weather Report spreadsheet.');
            setParsing(false);
            return;
          }

          if (parsed.warnings.length > 0) {
            console.warn('Parse warnings:', parsed.warnings);
          }

          onParsed(parsed);
        } catch (err) {
          setError(`Failed to parse spreadsheet: ${err instanceof Error ? err.message : String(err)}`);
        } finally {
          setParsing(false);
        }
      };
      reader.onerror = () => {
        setError('Failed to read file');
        setParsing(false);
      };
      reader.readAsArrayBuffer(file);
    },
    [onParsed],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
        dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
    >
      {parsing ? (
        <div className="flex flex-col items-center gap-3">
          <FileSpreadsheet className="h-10 w-10 text-blue-500 animate-pulse" />
          <p className="text-sm text-gray-600">Parsing {fileName}...</p>
        </div>
      ) : (
        <label className="flex flex-col items-center gap-3 cursor-pointer">
          <Upload className="h-10 w-10 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-700">
              Drop your Weather Report spreadsheet here
            </p>
            <p className="text-xs text-gray-500 mt-1">or click to browse (.xlsx)</p>
          </div>
          <input
            type="file"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={handleChange}
          />
        </label>
      )}

      {error && (
        <div className="mt-4 flex items-start gap-2 text-red-600 text-sm text-left bg-red-50 p-3 rounded-lg">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
