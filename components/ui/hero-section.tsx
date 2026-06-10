"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HeroBackground } from "@/components/marketing/hero-background"
import { MonoLabel } from "@/components/ui/mono-label"

export interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  badge: string
  title: React.ReactNode
  animatedTexts: string[]
  subtitle: string
  ctaButtonText: string
  socialProofText: string
  avatars: { src: string; alt: string; fallback: string }[]
  onCtaClick?: () => void
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ className, badge, title, animatedTexts, subtitle, ctaButtonText, socialProofText, avatars, onCtaClick, ...props }, ref) => {
    const [textIndex, setTextIndex] = React.useState(0)
    const [displayText, setDisplayText] = React.useState("")
    const [isDeleting, setIsDeleting] = React.useState(false)

    React.useEffect(() => {
      const fullText = animatedTexts[textIndex]

      const handleTyping = () => {
        if (isDeleting) {
          setDisplayText((prev) => prev.substring(0, prev.length - 1))
        } else {
          setDisplayText((prev) => fullText.substring(0, prev.length + 1))
        }
      }

      const typingSpeed = isDeleting ? 60 : 120
      const typeInterval = setInterval(handleTyping, typingSpeed)

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 2200)
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false)
        setTextIndex((prev) => (prev + 1) % animatedTexts.length)
      }

      return () => clearInterval(typeInterval)
    }, [displayText, isDeleting, textIndex, animatedTexts])

    return (
      <section
        ref={ref}
        className={cn(
          "hero-section relative overflow-hidden",
          className,
        )}
        {...props}
      >
        <HeroBackground />
        <div className="container-page relative pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <MonoLabel tone="muted" className="mb-6">
              {badge}
            </MonoLabel>

            <h1 className="type-display-xl text-balance text-[clamp(36px,5.6vw,72px)] leading-[1.04] tracking-[-0.035em] text-ink mb-4">
              {title}{" "}
              <span className="text-coral">
                {displayText}
                <span className="animate-pulse opacity-70">|</span>
              </span>
            </h1>

            <p className="type-body-md text-body-muted max-w-2xl mt-6">
              {subtitle}
            </p>

            <div className="mt-10 flex flex-col items-center gap-6">
              <Button size="lg" onClick={onCtaClick}>
                {ctaButtonText}
              </Button>

              <div className="flex items-center justify-center gap-3">
                <div className="flex -space-x-2">
                  {avatars.map((avatar, i) => (
                    <Avatar key={i} className="w-8 h-8 border-2 border-page">
                      <AvatarImage src={avatar.src} alt={avatar.alt} />
                      <AvatarFallback className="bg-soft-stone text-[10px] text-ink">
                        {avatar.fallback}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <p className="type-caption text-slate">{socialProofText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  },
)

HeroSection.displayName = "HeroSection"

export { HeroSection }
