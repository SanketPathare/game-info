import Hero from "@/components/Hero";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Hero />
    </Suspense>
  );
}

function LoadingFallback() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="bg-neutral-800 h-8 w-40 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-neutral-900 rounded-lg p-4 h-24 animate-pulse"
            ></div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="bg-neutral-800 h-8 w-40 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-neutral-900 rounded-lg p-4 h-72 animate-pulse"
            >
              <div className="bg-neutral-800 h-40 rounded-md mb-4"></div>
              <div className="bg-neutral-800 h-6 rounded w-3/4 mb-2"></div>
              <div className="bg-neutral-800 h-4 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
