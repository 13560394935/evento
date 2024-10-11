import EventItem from "@/components/event-item";
import { getEvent } from "@/lib/server-utils";
import { Metadata } from "next";

type EventPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const slug = params.slug;

  const event = await getEvent(slug);

  return {
    title: event?.name,
  };
}

export async function generateStaticParams() {
  return [
    {
      slug: "comedy-extravaganza",
    },
    {
      slug: "dj-practice-session",
    },
  ];
}

export default async function EventPage({ params }: EventPageProps) {
  const slug = params.slug;
  // const response = await fetch(
  //   `https://bytegrad.com/course-assets/projects/evento/api/events/${slug}`
  // );

  // const event: EventoEvent = await response.json();

  const event = await getEvent(slug);

  // console.log("event", event);

  return <EventItem eventItem={event} />;
}
