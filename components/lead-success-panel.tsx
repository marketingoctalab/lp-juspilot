"use client"

import { MessageCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getTrialUrl } from "@/lib/app-url"
import { trackOutboundClick } from "@/lib/analytics"
import { JUSPILOT_WHATSAPP_DEMO_URL } from "@/lib/whatsapp"

interface LeadSuccessPanelProps {
  title: string
  body: string
  demoLabel: string
  loginLabel: string
  closeLabel?: string
  onClose?: () => void
  compact?: boolean
}

export function LeadSuccessPanel({
  title,
  body,
  demoLabel,
  loginLabel,
  closeLabel,
  onClose,
  compact = false,
}: LeadSuccessPanelProps) {
  const trialUrl = getTrialUrl()

  return (
    <div className={compact ? "py-8 text-center" : "py-12 text-center"}>
      <div
        className={
          compact
            ? "w-12 h-12 rounded-full bg-pale-green border border-hairline flex items-center justify-center mx-auto mb-4"
            : "w-14 h-14 rounded-full bg-pale-green border border-hairline flex items-center justify-center mx-auto mb-6"
        }
      >
        <svg
          className={compact ? "w-6 h-6 text-success" : "w-7 h-7 text-success"}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h3 className={compact ? "type-title-md text-ink mb-2" : "type-title-lg text-ink mb-3"}>
        {title}
      </h3>
      <p
        className={
          compact
            ? "type-body-sm text-body-muted max-w-sm mx-auto mb-6"
            : "type-body-sm text-body-muted max-w-md mx-auto mb-8"
        }
      >
        {body}
      </p>

      <div className="flex flex-col gap-3 max-w-sm mx-auto">
        <Button size="lg" className="w-full min-h-[48px] gap-2" asChild>
          <a
            href={JUSPILOT_WHATSAPP_DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackOutboundClick({
                link_url: JUSPILOT_WHATSAPP_DEMO_URL,
                link_text: demoLabel,
                link_location: "form_success_whatsapp",
              })
            }
          >
            <MessageCircle className="w-4 h-4" />
            {demoLabel}
          </a>
        </Button>

        <Button size="lg" variant="secondary" className="w-full min-h-[48px] gap-2" asChild>
          <a
            href={trialUrl}
            onClick={() =>
              trackOutboundClick({
                link_url: trialUrl,
                link_text: loginLabel,
                link_location: "form_success_login",
              })
            }
          >
            {loginLabel}
            <ArrowRight className="w-4 h-4" />
          </a>
        </Button>
      </div>

      {closeLabel && onClose ? (
        <button
          type="button"
          onClick={onClose}
          className="mt-6 type-caption text-slate underline underline-offset-4 hover:text-ink transition-colors"
        >
          {closeLabel}
        </button>
      ) : null}
    </div>
  )
}
