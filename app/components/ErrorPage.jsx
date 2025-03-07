import Link from "next/link";

import LargeButton from "./Buttons";

export default function ErrorPage() {
  return (
    <div className="flex flex-col gap-[48px] bg-gray-900 sm:p-4 md:max-w-[768px] md:p-8">
      <div className="flex flex-col gap-3">
        <div className="text-600 text-lg">404 error</div>
        <div className="md:text-[52px] sm:text-[36px] text-gray-25 font-bold leading-none">
          We can't find that page
        </div>
        <p className="text-gray-600 text-xl">
          Sorry the page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      <div className="sm:flex-col md:flex-row gap-3 flex">
        {/* <BackToListButton text='Go Back' /> */}
        <Link href="/">
          <LargeButton text="Go Home" />
        </Link>
      </div>
    </div>
  );
}
