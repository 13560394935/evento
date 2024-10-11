import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type paginationControlsProp = {
  previousPath: string;
  nextPath: string;
};

const btnStyles =
  "text-white flex items-center gap-x-2 px-5 py-3 bg-white/5 rounded-md opacity-75  hover:opacity-100 transition text-sm";

export default function paginationControls({
  previousPath,
  nextPath,
}: paginationControlsProp) {
  return (
    <section className="flex justify-between w-full">
      {previousPath ? (
        <Link href={previousPath} className={btnStyles}>
          Previous
          <ArrowLeftIcon />
        </Link>
      ) : (
        <div />
      )}
      {nextPath ? (
        <Link href={nextPath} className={btnStyles}>
          Next
          <ArrowRightIcon />
        </Link>
      ) : (
        <div />
      )}
    </section>
  );
}
