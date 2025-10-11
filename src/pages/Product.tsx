import { useState, useEffect } from "react";
import Skeleton from "@/components/ui/Skeleton";

export default function ProductPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    // replace with your existing loader if present
    (async () => {
      // mock fetch
      await new Promise(r => setTimeout(r, 400));
      if (mounted) { setData({ title: "TRUTH Tee", image: "/images/truth-tee.jpg" }); setLoading(false); }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <main className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
      <section>
        {loading ? (
          <Skeleton className="h-[480px] w-full" />
        ) : (
          <img
            src={data.image}
            alt={data.title}
            loading="lazy"
            decoding="async"
            fetchpriority="low"
            className="w-full object-cover"
            width={960}
            height={960}
          />
        )}
      </section>
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold">{loading ? <Skeleton className="h-8 w-2/3" /> : data.title}</h1>
        <div className="space-y-2">
          {loading ? (
            <>
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/5" />
              <Skeleton className="h-10 w-40" />
            </>
          ) : (
            <>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">Grunge print. Heavyweight cotton.</p>
              <button className="px-4 py-2 border border-current">Add to Cart</button>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
