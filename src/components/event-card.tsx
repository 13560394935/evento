"use client";

import { EventoEvent } from "@prisma/client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

type EventCardProps = {
  event: EventoEvent;
};

const MontionLink = motion(Link);

export default function EventCard({ event }: EventCardProps) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.5 1"],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <MontionLink
      ref={ref}
      className="flex-1 basis-80 h-[380px]  max-w-[500px]"
      href={`/event/${event.slug}`}
      style={{
        // @ts-ignore
        scale: scaleProgress,
        // @ts-ignore
        opacity: opacityProgress,
      }}
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
    >
      <section className="relative flex flex-col w-full h-full bg-white/[3%] rounded-xl overflow-hidden hover:scale-105 active:scale-[1.02] transition">
        <Image
          src={event.imageUrl}
          alt={event.name}
          width={500}
          height={280}
          className="h-[60%] object-cover"
          quality={80}
        ></Image>
        <div className="flex-1 flex flex-col items-center justify-center">
          <h2 className="text-2xl">{event.name}</h2>
          <p className="italic text-white/75 mb-4">By {event.organizerName}</p>
          <p className="text-sm text-white/50">{event.location}</p>
        </div>

        <section className="absolute text-center left-[12px] top-[12px] h-[45px] w-[35px] bg-black/30 rounded-md ">
          <p className="text-xl font-bold -mb-[5px]">
            {new Date(event.date).getDate().toString().padStart(2, "0")}
          </p>
          <p className="text-xs uppercase text-accent">
            {new Date(event.date).toLocaleDateString("en-US", {
              month: "short",
            })}
          </p>
        </section>
      </section>
    </MontionLink>
  );
}
