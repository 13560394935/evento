import "server-only";
import prisma from "./db";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";
import { capitalize } from "./utils";

export const getEvents = unstable_cache(async (city: string, page = 1) => {
  // let events: EventoEvent[] = [];

  // try {
  //   let response = await fetch(
  //     `https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`,
  //     {
  //       next: {
  //         revalidate: 10,
  //       },
  //     }
  //   );

  //   console.log("response", response);
  //   events = await response.json();
  // } catch (e) {
  //   console.error(e);
  //   events = [];
  // }

  const events = await prisma.eventoEvent.findMany({
    where: {
      city: city === "all" ? undefined : capitalize(city),
    },
    orderBy: {
      date: "desc",
    },
    take: 6,
    skip: (page - 1) * 6,
  });

  let totalCount;

  if (city === "all") {
    totalCount = await prisma.eventoEvent.count();
  } else {
    totalCount = await prisma.eventoEvent.count({
      where: {
        city: city === "all" ? undefined : capitalize(city),
      },
    });
  }

  return { events, totalCount };
});

export const getEvent = unstable_cache(async (slug: string) => {
  // const response = await fetch(
  //   `https://bytegrad.com/course-assets/projects/evento/api/events/${slug}`
  // );

  // const event: EventoEvent = await response.json();

  const event = await prisma.eventoEvent.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!event) {
    return notFound();
  }

  console.log("event", event);
  return event;
});
