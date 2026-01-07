export default function Loading() {
  return (
    <main className="min-h-screen bg-background font-sans pt-16">
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-16 animate-pulse">

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-4 w-32 bg-muted/50 rounded-full" />
            <div className="h-12 w-3/4 bg-muted/50 rounded-xl" />
            <div className="h-4 w-full max-w-lg bg-muted/30 rounded-lg" />
            <div className="h-4 w-2/3 max-w-md bg-muted/30 rounded-lg" />
          </div>

          <div className="flex gap-3 pt-2">
            <div className="h-10 w-32 bg-muted/50 rounded-xl" />
            <div className="h-10 w-10 bg-muted/50 rounded-xl" />
            <div className="h-10 w-10 bg-muted/50 rounded-xl" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 p-5 border border-border/50 rounded-xl bg-card/50">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`flex flex-col items-center gap-2 ${i !== 1 ? 'border-l border-border/50' : ''}`}>
              <div className="h-8 w-12 bg-muted/50 rounded-lg" />
              <div className="h-3 w-16 bg-muted/30 rounded-full" />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="h-6 w-40 bg-muted/50 rounded-lg" />
          <div className="grid md:grid-cols-2 gap-4">
            <div className="h-64 bg-muted/20 border border-border/50 rounded-xl" />
            <div className="h-64 bg-muted/20 border border-border/50 rounded-xl" />
          </div>
        </div>

        <div className="space-y-4">
           <div className="h-6 w-32 bg-muted/50 rounded-lg" />
           <div className="flex gap-2 flex-wrap">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-8 w-20 bg-muted/30 rounded-full border border-border/30" />
              ))}
           </div>
        </div>

        <div className="space-y-4">
          <div className="h-6 w-32 bg-muted/50 rounded-lg" />
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-card/50 border border-border/50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between">
                  <div className="h-5 w-1/3 bg-muted/50 rounded-lg" />
                  <div className="h-5 w-5 bg-muted/30 rounded-full" />
                </div>
                <div className="h-3 w-full bg-muted/30 rounded" />
                <div className="h-3 w-2/3 bg-muted/30 rounded" />
                <div className="flex gap-2 pt-2">
                   <div className="h-4 w-12 bg-muted/20 rounded-full" />
                   <div className="h-4 w-12 bg-muted/20 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}