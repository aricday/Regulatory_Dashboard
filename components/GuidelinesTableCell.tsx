'use client';

import type { ContentBlock } from '@/types/guidelines';

interface GuidelinesTableCellProps {
  blocks: ContentBlock[];
  emptyMessage?: string;
}

export function GuidelinesTableCell({ blocks, emptyMessage }: GuidelinesTableCellProps) {
  if (blocks.length === 0) {
    return (
      <p className="text-sm text-gray-400 italic">
        {emptyMessage ?? 'No data available.'}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {blocks.map((block, i) => (
        <div key={i}>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
            {block.heading}
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
                  <span className="text-gray-600">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
