'use client'
import { Color, FontVariant, Radius, ScreenSize } from '@/app/theme'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Section } from './Styles'
import { HOMEPAGE_PHOTOS } from '@/data/groupPhotos'
import { withBasePath } from '@/lib/basePath'

const AUTO_SLIDE_INTERVAL_MS = 5000

const HeroSectionWrapper = styled(Section)`
  padding: 48px 96px;

  @media (max-width: ${ScreenSize.md}) {
    padding: 32px 24px;
  }
`

const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;

  @media (max-width: ${ScreenSize.lg}) {
    flex-direction: column;
    gap: 32px;
  }
`

const HeroTextArea = styled.div`
  flex: 1 1 44%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: ${ScreenSize.lg}) {
    flex: none;
    width: 100%;
    align-items: center;
  }
`

const HeroTitle = styled.h1`
  font-family: var(--font-display), sans-serif;
  font-size: clamp(32px, 4.5vw, 52px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.5px;
  margin-bottom: 24px;
  text-align: left;
  color: ${Color.gray900};

  @media (max-width: ${ScreenSize.lg}) {
    align-self: center;
    text-align: center;
  }
`

const HeroTitleAccent = styled.span`
  display: block;
  background: linear-gradient(90deg, ${Color.blue900}, ${Color.blue500});
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: ${Color.blue900};
`

const HeroTitleLead = styled.span`
  display: block;
  font-size: 0.5em;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${Color.gray700};
  margin-bottom: 8px;
`

const HeroMessage = styled.p`
  ${FontVariant.body_md}
  color: ${Color.gray700};
  text-align: left;
  max-width: 100%;
  margin-bottom: 16px;
  strong {
    font-weight: 700;
  }
  &:last-of-type {
    margin-bottom: 0;
  }
  @media (max-width: ${ScreenSize.lg}) {
    text-align: center;
  }
`

const ContactLink = styled.a`
  color: ${Color.blue900};
  font-weight: 700;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const HeroImageContainer = styled.div`
  flex: 1 1 56%;
  min-width: 0;

  @media (max-width: ${ScreenSize.lg}) {
    flex: none;
    width: 100%;
  }
`

const CarouselViewport = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: ${Radius.md};
  background: ${Color.gray100};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`

const CarouselTrack = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const CarouselSlide = styled.div`
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`

const SlideLink = styled(Link)`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
`

const CarouselNavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.88);
  color: ${Color.gray900};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: ${Color.white};
    color: ${Color.blue900};
    transform: translateY(-50%) scale(1.06);
  }

  @media (max-width: ${ScreenSize.sm}) {
    width: 32px;
    height: 32px;
  }
`

const PrevButton = styled(CarouselNavButton)`
  left: 12px;
`

const NextButton = styled(CarouselNavButton)`
  right: 12px;
`

const CarouselDots = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
`

const CarouselDot = styled.button`
  width: 10px;
  height: 10px;
  padding: 0;
  border-radius: 999px;
  border: none;
  background-color: ${Color.gray300};
  cursor: pointer;
  transition:
    width 0.25s ease,
    background-color 0.25s ease;

  &:hover {
    background-color: ${Color.blue500};
  }

  &[aria-current='true'] {
    width: 24px;
    background-color: ${Color.blue900};
  }
`

export const HeroSection = () => {
  const photos = HOMEPAGE_PHOTOS
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const activeIndex = photos.length > 0 ? currentIndex % photos.length : 0

  useEffect(() => {
    if (photos.length <= 1 || isPaused) return

    const timer = window.setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % photos.length)
    }, AUTO_SLIDE_INTERVAL_MS)

    return () => window.clearTimeout(timer)
  }, [activeIndex, isPaused, photos.length])

  const goToPrev = () => {
    setCurrentIndex(prev => (prev - 1 + photos.length) % photos.length)
  }

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % photos.length)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (photos.length <= 1) return
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      goToPrev()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      goToNext()
    }
  }

  return (
    <HeroSectionWrapper id="hero-section">
      <HeroContainer>
        <HeroTextArea id="hero-text-area">
          <HeroTitle>
            <HeroTitleLead>Welcome to</HeroTitleLead>
            <HeroTitleAccent>CORSA Lab</HeroTitleAccent>
          </HeroTitle>
          <HeroMessage>
            We are a group of passionate researchers at UC Irvine, working on exciting research projects related to{' '}
            <strong>“CORSA”</strong>: <strong>C</strong>ompiler <strong>O</strong>ptimizations, <strong>R</strong>
            econfigurable and <strong>S</strong>calable <strong>A</strong>rchitectures.{' '}
            <ContactLink href="#about-corsa-section">Click here</ContactLink> to learn more about the name “CORSA”.
          </HeroMessage>
          <HeroMessage>
            We focus on the development of highly efficient and highly composable hardware acceleration systems. Our
            core areas of expertise encompass the cutting-edge domain-specific hardware accelerator architectures,
            programming languages and compilers tailored for hardware accelerators, next-generation heterogeneous
            computer systems, as well as efficient hardware-friendly machine learning algorithms and systems.
          </HeroMessage>
        </HeroTextArea>
        {photos.length > 0 && (
          <HeroImageContainer
            id="hero-image-container"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            onKeyDown={handleKeyDown}
          >
            <CarouselViewport>
              <CarouselTrack style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                {photos.map((photo, index) => {
                  const imageSrc = withBasePath(`/images/group/${photo.filename}`)
                  return (
                    <CarouselSlide key={photo.filename}>
                      <SlideLink href="/gallery" tabIndex={index === activeIndex ? 0 : -1}>
                        <Image
                          id={index === 0 ? 'hero-image' : undefined}
                          src={imageSrc}
                          alt={`CORSA Lab group picture (${photo.description})`}
                          width={photo.width ?? 1600}
                          height={photo.height ?? 900}
                          priority={index === 0}
                          sizes="(max-width: 992px) 100vw, 56vw"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: photo.objectPosition ?? 'center center',
                            display: 'block',
                          }}
                        />
                      </SlideLink>
                    </CarouselSlide>
                  )
                })}
              </CarouselTrack>
              {photos.length > 1 && (
                <>
                  <PrevButton type="button" onClick={goToPrev} aria-label="Previous photo">
                    <FaChevronLeft size={16} />
                  </PrevButton>
                  <NextButton type="button" onClick={goToNext} aria-label="Next photo">
                    <FaChevronRight size={16} />
                  </NextButton>
                </>
              )}
            </CarouselViewport>
            {photos.length > 1 && (
              <CarouselDots aria-label="Homepage photo navigation">
                {photos.map((photo, index) => (
                  <CarouselDot
                    key={photo.filename}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Show photo ${index + 1}: ${photo.description}`}
                    aria-current={index === activeIndex ? 'true' : undefined}
                  />
                ))}
              </CarouselDots>
            )}
          </HeroImageContainer>
        )}
      </HeroContainer>
    </HeroSectionWrapper>
  )
}
