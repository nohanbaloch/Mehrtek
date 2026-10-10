"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { contactSchema, type ContactInput } from "@/lib/schema";
import { cn } from "@/lib/cn";

interface ContactFormProps {
  label: string;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  service?: string;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? <p id={id} className="mt-1 text-sm text-danger">{message}</p> : null;
}

export function ContactForm({ label, className, variant = "primary", service = "Not sure yet" }: ContactFormProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { service },
  });

  async function onSubmit(values: ContactInput) {
    setStatus("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      const body = (await response.json()) as { message?: string };
      if (!response.ok) {
        setStatus(body.message ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus(body.message ?? "Thanks for reaching out.");
      reset();
    } catch {
      setStatus("Unable to send your message right now.");
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className={cn("inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background", variant === "primary" && "bg-primary text-primary-foreground hover:bg-primary/90", variant === "secondary" && "border border-border bg-background text-foreground hover:bg-muted", variant === "ghost" && "text-foreground hover:bg-muted", className)}>
        {label}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-foreground/50 data-[state=closed]:animate-dialog-out data-[state=open]:animate-dialog-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[71] max-h-[90dvh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[var(--radius-lg)] border border-border bg-background p-6 shadow-medium focus:outline-none sm:p-8">
          <Dialog.Title className="text-2xl font-semibold tracking-tight">Let&apos;s talk</Dialog.Title>
          <Dialog.Description className="mt-2 text-muted-foreground">Tell us a little about your goals and we&apos;ll be in touch.</Dialog.Description>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <label htmlFor="contact-service" className="font-medium">What can we help with?</label>
              <select id="contact-service" aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? "contact-service-error" : undefined} {...register("service")} className="mt-1 min-h-11 w-full rounded-md border border-border bg-background px-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option value="">Choose a service</option>
                <option value="Conversion websites">Conversion websites</option>
                <option value="Lead capture automation">Lead capture automation</option>
                <option value="Content systems">Content systems</option>
                <option value="Paid campaign setup">Paid campaign setup</option>
                <option value="Reporting dashboards">Reporting dashboards</option>
                <option value="Operations automation">Operations automation</option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
              <FieldError id="contact-service-error" message={errors.service?.message} />
            </div>
            <div>
              <label htmlFor="contact-name" className="font-medium">Name</label>
              <input id="contact-name" type="text" autoComplete="name" enterKeyHint="next" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} {...register("name")} className="mt-1 min-h-11 w-full rounded-md border border-border bg-background px-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
              <FieldError id="contact-name-error" message={errors.name?.message} />
            </div>
            <div>
              <label htmlFor="contact-email" className="font-medium">Email</label>
              <input id="contact-email" type="email" inputMode="email" autoComplete="email" enterKeyHint="next" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} {...register("email")} className="mt-1 min-h-11 w-full rounded-md border border-border bg-background px-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
              <FieldError id="contact-email-error" message={errors.email?.message} />
            </div>
            <div>
              <label htmlFor="contact-message" className="font-medium">Message <span className="text-muted-foreground">(optional)</span></label>
              <textarea id="contact-message" rows={4} enterKeyHint="send" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} {...register("message")} className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
              <FieldError id="contact-message-error" message={errors.message?.message} />
            </div>
            <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" {...register("honeypot")} />
            <p aria-live="polite" className={status.includes("Thanks") ? "text-sm text-success" : "text-sm text-danger"}>{status}</p>
            <button type="submit" disabled={isSubmitting} className="min-h-11 w-full rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? "Sending..." : "Send message"}
            </button>
          </form>
          <Dialog.Close className="absolute right-4 top-4 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Close contact form">
            <X size={20} aria-hidden="true" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
