'use client';

import { ExternalLink } from 'lucide-react';
import type { GuidelinesContent } from '@/types/guidelines';
import { GuidelinesTableCell } from './GuidelinesTableCell';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

      {/* Desktop: 3-column grid */}
      <div className="hidden md:grid md:grid-cols-3 md:gap-6">
        <Column title="Feature Support">
          <GuidelinesTableCell blocks={featureSupport} emptyMessage="No feature details available." />
        </Column>
        <Column title="Regulatory Requirements">
          <GuidelinesTableCell blocks={regulatoryRequirements} emptyMessage="No regulatory data found." />
        </Column>
        <Column title="Best Practices">
          <GuidelinesTableCell blocks={bestPractices} emptyMessage="No best practices documented." />
        </Column>
      </div>

      {/* Mobile: tabbed view */}
      <div className="md:hidden">
        <Tabs defaultValue="features">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="features" className="text-xs">Features</TabsTrigger>
            <TabsTrigger value="regulatory" className="text-xs">Regulatory</TabsTrigger>
            <TabsTrigger value="practices" className="text-xs">Practices</TabsTrigger>
          </TabsList>
          <TabsContent value="features" className="mt-4">
            <GuidelinesTableCell blocks={featureSupport} emptyMessage="No feature details available." />
          </TabsContent>
          <TabsContent value="regulatory" className="mt-4">
            <GuidelinesTableCell blocks={regulatoryRequirements} emptyMessage="No regulatory data found." />
          </TabsContent>
          <TabsContent value="practices" className="mt-4">
            <GuidelinesTableCell blocks={bestPractices} emptyMessage="No best practices documented." />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border rounded-lg p-4">
      <h4 className="text-sm font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-3">
        {title}
      </h4>
      {children}
    </div>
  );
}
