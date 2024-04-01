'use client'

import './play.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useRef, useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

const Play: React.FC = () => {
  const image1 = useRef<HTMLDivElement>(null)
  const image3 = useRef<HTMLDivElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    // image 1
    if (image1.current) {
      gsap.fromTo(
        image1.current,
        { y: 100 },
        { y: -130, scrollTrigger: { trigger: image1.current, scrub: true } }
      )
    }

    // image 3
    if (image3.current) {
      gsap.fromTo(
        image3.current,
        { y: -50 },
        { y: 100, scrollTrigger: { trigger: image3.current, scrub: true } }
      )
    }

    // heading scroll trigger opening
    if (heading.current) {
      const currentHeading = heading.current
      gsap.fromTo(
        currentHeading,
        {
          rotation: 6,
          opacity: 0,
          y: () => currentHeading.clientHeight * 0.5
        },
        {
          rotation: 0,
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power4.easeOut',
          scrollTrigger: { trigger: heading.current, start: 'center bottom' }
        }
      )
    }
  }, [])

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // play video
    const target = event.currentTarget
    const video = target.querySelector('.video') as HTMLVideoElement
    const playPromise = video.play()
    if (video) {
      playPromise
    }

    // animation
    const text = target.querySelector('.text-wrapper > p > span') as HTMLSpanElement
    if (text) {
      gsap.killTweensOf(text)
      gsap.fromTo(
        text,
        { rotation: 10, opacity: 0, y: () => text.clientHeight * 0.5 },
        { rotation: 0, y: 0, opacity: 1, duration: 0.7, ease: 'power4.easeOut' }
      )
    }
  }

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // pause video
    const target = event.currentTarget
    const video = target.querySelector('.video') as HTMLVideoElement
    if (video) video.pause()

    // animation
    const text = target.querySelector('.text-wrapper > p > span') as HTMLSpanElement
    if (text) {
      gsap.killTweensOf(text)
      gsap.fromTo(
        text,
        { rotation: 0, opacity: 1, y: 0 },
        {
          rotation: -10,
          y: -text.clientHeight,
          opacity: 0,
          duration: 0.5,
          ease: 'power4.easeOut'
        }
      )
    }
  }

  return (
    <section
      className='flex flex-col w-full content-width overflow-auto max-w-full  pt-24'
      id='work-section'
    >
      <div className='overflow-hidden flex w-full flex-col ml-12'>
        <h1
          className='text-5xl text-slate-600 font-bold my-12'
          ref={heading}
        >
          Create
          <span className='text-red-900 dark:text-orange-400'> A </span>
          <span className='dark:text-red-900 text-green-700'>Space</span>
        </h1>
      </div>
      <div className='row'>
        <div
          id='block-0'
          className='block px-3'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            src='/work/greenyellow.jpeg'
            height={800}
            width={800}
            alt='Ottografie'
            loading='lazy'
          />
          <video
            playsInline={true}
            loop={true}
            muted={true}
            disablePictureInPicture={false}
            className='video'
            preload='none'
          >
            <source
              src='https://a.storyblok.com/f/133769/x/4d7b412c76/hover-ali.mp4'
              type='video/mp4'
            />
          </video>
          <div className='overflow-hidden flex w-full flex-col ml-12'>
            {/* <h1
              className='text-5xl text-slate-600 font-bold my-12'
              ref={heading}
            >
              Press <span className='text-red-900'>Play</span>
            </h1> */}
          </div>
          <div className='text-wrapper'>
            <p>
              <span>
                <strong>Ali Ali - </strong>
              </span>
              <span>Unique director&apos;s portfolio</span>
            </p>
          </div>
        </div>
        <div
          className='column'
          id='work-right-section'
        >
          <div className='row'>
            <svg
              viewBox='0 0 12 12'
              fill='#0D0E13'
              xmlns='http://www.w3.org/2000/svg'
              className='icon'
              data-v-669b4a84=''
            >
              <path d='M7.41908 4.56679L6.13722 0L4.85418 4.92566L0 6L4.85418 7.25435L6.13722 12L7.3276 7.25435L12 6L7.41908 4.56679Z'></path>
            </svg>
            <span className='text-emerald-600'>Featured Products</span>
          </div>
          <p className='text-stone-500 font-space text-sm'>
            Highlights of cases that we
            <br />
            passionately built with forward-
            <br />
            thinking clients and friends over
            <br />
            the years.
          </p>
          <div
            id='block-1'
            className='block p-3'
            ref={image1}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              alt='image play'
              src='/work/black.jpeg'
              height='3113'
              width='1000'
            />

            <video
              playsInline={true}
              loop={true}
              muted={true}
              disablePictureInPicture={false}
              className='video'
              preload='none'
            >
              <source
                src='https://a.storyblok.com/f/133769/x/a02005ba43/hover-otto.mp4'
                type='video/mp4'
              />
            </video>
            <div className='text-wrapper'>
              <p>
                <span>
                  <strong>Ottografie - </strong>
                </span>
                <span>Immersive photography portfolio</span>
              </p>
            </div>
            <div className='overflow-hidden flex w-full flex-col ml-12'>
              <h1
                className='text-5xl text-slate-600 font-bold my-12'
                ref={heading}
              >
                Press <span className='text-red-900'>Play</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div
          id='block-3'
          className='block'
          ref={image3}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            src='/work/blue.jpeg'
            alt='play image'
            height={600}
            width={300}
          />
          <video
            playsInline={true}
            loop={true}
            muted={true}
            disablePictureInPicture={false}
            className='video'
            preload='none'
          >
            <source
              src='https://a.storyblok.com/f/133769/x/6c4b3b49c3/featured-work-aebele.mp4'
              type='video/mp4'
            />
          </video>
          <div className='text-wrapper'>
            <p>
              <span>
                <strong>Aebele Interiors - </strong>
              </span>
              <span>Luxurious design experience</span>
            </p>
          </div>
        </div>
        <div
          id='block-2'
          className='block'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            alt='work pic'
            src='/work/grey.jpeg'
            height='600'
            width='300'
          />
          <video
            playsInline={true}
            loop={true}
            muted={true}
            disablePictureInPicture={false}
            className='video'
            preload='none'
          >
            <source
              src='https://a.storyblok.com/f/133769/x/a183dd6f78/hover-rino.mp4'
              type='video/mp4'
            />
          </video>
          <div className='text-wrapper'>
            <p>
              <span>
                <strong>{'Rino & Pelle - '}</strong>
              </span>
              <span>Unique atmospheric&apos;s point of view</span>
            </p>
          </div>
          <div className='row'>
            <p className='text-black'> And Professional</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Play
