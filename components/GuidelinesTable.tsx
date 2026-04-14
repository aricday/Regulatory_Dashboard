'use client';

import { ExternalLink } from 'lucide-react';
import type { GuidelinesContent } from '@/types/guidelines';
import { GuidelinesTableCell } from './GuidelinesTableCell';

interface GuidelinesTableProps {
  guidelines: GuidelinesContent;
}

export function GuidelinesTable({ guidelines }: GuidelinesTableProps) {
  const { featureSupport, regulatoryRequirements, bestPractices, sourceUrl } = guidelines;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-gray-800">Guidelines Details</h3>
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          View source page <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      <div className="space-y-4">
        <Section title="Feature Support">
          <GuidelinesTableCell blocks={featureSupport} emptyMessage="No feature details available." />
        </Section>
        <Section title="Regulatory Requirements">
          <GuidelinesTableCell blocks={regulatoryRequirements} emptyMessage="No regulatory data found." />
        </Section>
        <Section title="Best Practices">
          <GuidelinesTableCell blocks={bestPractices} emptyMessage="No best practices documented." />
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border rounded-lg p-4">
      <h4 className="text-sm font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-3">
        {title}
      </h4>
      {children}
    </div>
  );
}
