"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

interface AccordionItemData {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItemData[];
}

export function Accordion({ items }: AccordionProps) {
  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      className="divide-y divide-border rounded-[var(--radius-lg)] border border-border"
    >
      {items.map((item, index) => (
        <AccordionPrimitive.Item
          key={item.question}
          value={`item-${index}`}
          className="px-5 first:rounded-t-[var(--radius-lg)] last:rounded-b-[var(--radius-lg)]"
        >
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger className="group flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left text-base font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset">
              <span>{item.question}</span>
              <ChevronDown
                className="shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180 motion-reduce:transition-none"
                size={20}
                aria-hidden="true"
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down motion-reduce:animate-none">
            <div className="pb-5 pr-8">{item.answer}</div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
