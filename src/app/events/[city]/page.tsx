import H1 from "@/components/h1";
import EventsList from "@/components/events-list";
import { Suspense } from "react";
import LoadingCard from "../../../components/loading-card";
import { capitalize } from "@/lib/utils";
import { z } from "zod";

type propType = {
  params: {
    city: string;
  };
};

type EventsPageProp = propType & {
  searchParams: { [key: string]: string | string[] | undefined };
};

export function generateMetadata({ params }: propType) {
  const city = params.city;

  const capitalizedCity = capitalize(city);
  return {
    title: city === "all" ? "All Events" : `Events in ${capitalizedCity}`,
  };
}

const pageNumberSchema = z.coerce.number().int().positive().optional();

export default async function EventPage({
  params,
  searchParams,
}: EventsPageProp) {
  const city = params.city;
  // const page = searchParams.page || 1;
  const parsedPage = pageNumberSchema.safeParse(searchParams.page);
  if (!parsedPage.success) {
    throw new Error("Invalid page number");
  }

  const capitalizedCity = capitalize(city);

  // console.log("events", events);

  return (
    <main className="flex flex-col items-center py-24 px-[20px] min-h-[110vh]">
      <H1 className="mb-28">
        {city === "all" ? "All Events" : `Events in ${capitalizedCity}`}
      </H1>

      <Suspense key={city + parsedPage.data} fallback={<LoadingCard />}>
        <EventsList city={city} page={parsedPage.data}></EventsList>
      </Suspense>
    </main>
  );
}
