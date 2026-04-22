'use client';

import type { ContentBlock } from '@/types/guidelines';
import type { AlphaSenderStatus } from '@/data/alphanumericSenderIdSupport';

interface GuidelinesTableCellProps {
  blocks: ContentBlock[];
  emptyMessage?: string;
  alphaSenderStatus?: AlphaSenderStatus;
  highlightSupportStatus?: boolean;
}

function renderValue(value: string, highlight: boolean) {
  if (!highlight) return <span className="text-gray-600">{value}</span>;
  const lower = value.toLowerCase();
  if (lower.includes('not supported') || lower === 'no')
    return <><span className="text-gray-600">{value}</span>{' '}<span className="font-bold text-red-600">NOT SUPPORTED</span></>;
  if (lower.includes('supported') || lower === 'yes')
    return <><span className="text-gray-600">{value}</span>{' '}<span className="font-bold text-green-600">SUPPORTED</span></>;
  return <span className="text-gray-600">{value}</span>;
}

function resolveHeading(heading: string, alphaSenderStatus?: AlphaSenderStatus) {
  if (heading.toUpperCase() !== 'DYNAMIC') return { text: heading, registrationRequired: false };
  return {
    text: 'Alpha Numeric Support',
    registrationRequired: alphaSenderStatus === 'registration_required',
  };
}

export function GuidelinesTableCell({ blocks, emptyMessage, alphaSenderStatus, highlightSupportStatus }: GuidelinesTableCellProps) {
  if (blocks.length === 0) {
    return (
      <p className="text-sm text-gray-400 italic">
        {emptyMessage ?? 'No data available.'}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        const { text, registrationRequired } = resolveHeading(block.heading, alphaSenderStatus);
        return (
        <div key={i}>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
            {text}
            {registrationRequired && (
              <span className="font-bold text-red-600"> - Registration Required</span>
            )}
          </h4>
          <div className="space-y-1">
            {block.items.map((item, j) => (
              <div
                key={j}
                className="flex gap-2 py-1 border-b border-gray-100 text-sm last:border-0"
              >
                {item.isRestriction && (
                  <span className="text-red-500 shrink-0" title="Restriction">
                    &#x2717;
                  </span>
                )}
                {item.isBestPractice && (
                  <span className="text-green-500 shrink-0" title="Best Practice">
                    &#x2713;
                  </span>
                )}
                {!item.isRestriction && !item.isBestPractice && (
                  <span className="text-gray-300 shrink-0">&bull;</span>
                )}
                <div className="min-w-0">
                  {item.label && (
                    <span className="font-medium text-gray-700">{item.label}: </span>
                  )}
                  {renderValue(item.value, !!highlightSupportStatus)}
                </div>
              </div>
            ))}
          </div>
        </div>
        );
      })}
    </div>
  );
}
