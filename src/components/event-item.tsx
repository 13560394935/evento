import { EventoEvent } from "@prisma/client";
import Image from "next/image";
import H1 from "./h1";

export default function EventItem({ eventItem }: { eventItem: EventoEvent }) {
  console.log("EventItem", eventItem);

  return (
    <main>
      <section className="relative overflow-hidden flex justify-center items-center py-14 md:py-20">
        <Image
          src={eventItem.imageUrl}
          className="object-cover z-0 blur-3xl"
          alt="Event background image"
          fill
          quality={50}
          sizes="(max-width: 1280) 100vw, 1280px"
          priority
        ></Image>

        <div className="z-1 flex flex-col gap-6 lg:gap-16 lg:flex-row relative">
          <Image
            src={eventItem.imageUrl}
            alt={eventItem.name}
            width={300}
            height={210}
            className="rounded-xl border-2 border-white/50 object-cover"
            quality={80}
          ></Image>

          <div className="flex flex-col ">
            <p className="text-md text-white/75">
              {new Date(eventItem.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>

            <H1 className="mb-2 mt-1 whitespace-nowrap lg:text-5xl">
              {eventItem.name}
            </H1>
            <p className="whitespace-nowrap text-xl text-white/75">
              Organaized by
              <span className="italic">{eventItem.organizerName}</span>
            </p>

            <button className="bg-white/20 text-lg capitalize border-white/10 border-2 sm:w-full py-2 bg-blur mt-5 lg:mt-auto state-effects transition">
              get tickets
            </button>
          </div>
        </div>
      </section>
      <div className="min-h-[75vh] text-center px-5 py-16">
        <Section>
          <SectionHeading>About this event</SectionHeading>
          <SectionContent>{eventItem.description}</SectionContent>
        </Section>

        <section className="text-center px-5 py-16">
          <SectionHeading>Location</SectionHeading>
          <SectionContent>{eventItem.location}</SectionContent>
        </section>
      </div>
    </main>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className="mb-12">{children}</section>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl mb-8">{children}</h2>;
}

function SectionContent({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-4xl mx-auto text-lg leading-8 text-white/75">
      {children}
    </p>
  );
}
