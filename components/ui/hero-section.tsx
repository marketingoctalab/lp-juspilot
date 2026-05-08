"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
          "relative flex flex-col items-center justify-center text-center px-4 pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden",
          className
        )}
        {...props}
      >
        {/* Subtle radial glow behind text */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(217,119,87,0.10) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-4xl w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-8 text-xs md:text-sm text-[#A7ABB3] backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97757] animate-pulse" />
            {badge}
          </div>

          {/* Heading */}
          <h1 className="font-serif font-light text-[38px] leading-[1.1] sm:text-[54px] md:text-[72px] lg:text-[86px] md:leading-[1.05] mb-4 text-balance text-[#F2F3F5]">
            {title}
            <span className="relative mt-3 block w-fit mx-auto">
              {/* dashed border */}
              <span className="absolute inset-0 -z-10 -m-2 pointer-events-none">
                <span className="absolute inset-0 border border-dashed border-[#D97757]/50 rounded-2xl" />
              </span>
              <span className="text-[#D97757] min-h-[1.2em] inline-block px-2">
                {displayText}
                <span className="animate-pulse opacity-70">|</span>
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-8 text-base md:text-lg leading-relaxed text-[#A7ABB3] max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* CTA + social proof */}
        <div className="mt-12 flex flex-col items-center gap-6">
          <Button
            size="lg"
            className="px-10 py-6 text-base rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-white"
            onClick={onCtaClick}
          >
            {ctaButtonText}
          </Button>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-3">
            <div className="flex -space-x-3">
              {avatars.map((avatar, i) => (
                <Avatar key={i} className="w-8 h-8 border-2 border-[#0B0C0F]">
                  <AvatarImage src={avatar.src} alt={avatar.alt} />
                  <AvatarFallback className="bg-white/10 text-[10px] text-white">
                    {avatar.fallback}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <p className="text-sm text-[#A7ABB3]">{socialProofText}</p>
          </div>
        </div>
      </section>
    )
  }
)

HeroSection.displayName = "HeroSection"

export { HeroSection }
