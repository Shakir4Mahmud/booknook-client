"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const slides = [
  {
    eyebrow: "Welcome to BookNook",
    title: "Your Next Read Is One Click Away",
    text: "Explore a growing shelf of books shared by readers like you. Find a story that fits your mood tonight.",
    colors: ["#f6b756", "#6d5dfc", "#1fb5b0"],
  },
  {
    eyebrow: "Share the Joy",
    title: "Share a Book, Spark a Story",
    text: "Got a book you loved? Add it to BookNook in a minute and let other readers discover it.",
    colors: ["#e0607e", "#f6b756", "#6d5dfc"],
  },
  {
    eyebrow: "Easy Borrowing",
    title: "Borrow Today, Return in Days",
    text: "Pick a book, choose how long you need it and read at your own pace. Returning takes one click.",
    colors: ["#1fb5b0", "#e0607e", "#f6b756"],
  },
  {
    eyebrow: "Always With You",
    title: "A Library That Fits in Your Pocket",
    text: "Track every book you borrowed, see when it is due and keep your own shelf in one cozy place.",
    colors: ["#6d5dfc", "#1fb5b0", "#e0607e"],
  },
];


const subscribe = () => () => {};
const getClientValue = () => true;
const getServerValue = () => false;

function BookStackArt({ colors }) {
  return (
    <svg viewBox="0 0 260 260" className="h-full w-full" aria-hidden="true">
      <circle cx="130" cy="130" r="108" fill={colors[0]} opacity="0.16" />
      <circle cx="130" cy="130" r="78" fill={colors[1]} opacity="0.12" />

      <g transform="rotate(-10 150 80)">
        <rect x="128" y="26" width="36" height="84" rx="6" fill={colors[1]} />
        <rect x="128" y="26" width="10" height="84" rx="4" fill="#fff" opacity="0.22" />
        <rect x="140" y="44" width="16" height="3" rx="1.5" fill="#fff" opacity="0.6" />
        <rect x="140" y="52" width="12" height="3" rx="1.5" fill="#fff" opacity="0.4" />
      </g>

      <rect x="56" y="104" width="150" height="32" rx="7" fill={colors[2]} />
      <rect x="56" y="104" width="150" height="9" rx="4" fill="#fff" opacity="0.26" />
      <rect x="150" y="116" width="42" height="3" rx="1.5" fill="#fff" opacity="0.55" />

      <rect x="36" y="142" width="170" height="32" rx="7" fill={colors[0]} />
      <rect x="36" y="142" width="170" height="9" rx="4" fill="#fff" opacity="0.26" />
      <rect x="62" y="154" width="54" height="3" rx="1.5" fill="#fff" opacity="0.55" />

      <rect x="48" y="180" width="164" height="32" rx="7" fill={colors[1]} />
      <rect x="48" y="180" width="164" height="9" rx="4" fill="#fff" opacity="0.26" />
      <rect x="140" y="192" width="48" height="3" rx="1.5" fill="#fff" opacity="0.55" />

      <path
        d="M214 40a15 15 0 1 0 16 20 12 12 0 0 1-16-20Z"
        fill="#f6c778"
      />
      <circle cx="40" cy="70" r="3" fill="#fff" opacity="0.8" />
      <circle cx="78" cy="44" r="2" fill="#fff" opacity="0.6" />
      <circle cx="226" cy="108" r="2.5" fill="#fff" opacity="0.7" />
    </svg>
  );
}

export default function HeroSlider() {
  const mounted = useSyncExternalStore(
    subscribe,
    getClientValue,
    getServerValue
  );

  return (
    <section className="mx-auto max-w-6xl px-4 pb-4 pt-6 sm:pt-10">
      {!mounted ? (
        <div className="pb-12">
          <div className="glass min-h-[520px] rounded-[1.5rem] md:min-h-[440px] md:rounded-[2rem]" />
        </div>
      ) : (
        <Swiper
          className="hero-swiper pb-12"
          modules={[A11y, Autoplay, EffectFade, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop
          speed={900}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.title}>
              <div className="glass grid min-h-[520px] items-center gap-6 rounded-[1.5rem] p-6 sm:p-10 md:min-h-[440px] md:grid-cols-2 md:gap-8 md:rounded-[2rem] md:p-12">
                <div className="text-center md:text-left">
                  <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary sm:text-sm">
                    {slide.eyebrow}
                  </p>
                  <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                    {slide.title}
                  </h2>
                  <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base md:mx-0 md:text-lg">
                    {slide.text}
                  </p>
                  <Link
                    href="/books"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "btn-gloss mt-6 rounded-full px-8 md:mt-8"
                    )}
                  >
                    Browse Books
                  </Link>
                </div>

                <div className="mx-auto h-40 w-40 sm:h-56 sm:w-56 md:h-72 md:w-72 lg:h-80 lg:w-80">
                  <BookStackArt colors={slide.colors} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}