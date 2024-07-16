export function NotesCard({ title, children }: { title?: string; children?: React.ReactNode }) {
  return (
    <div className="h-64 w-48 rounded-3xl border bg-[#fced99] p-4 font-sans text-zinc-950 shadow-sm">
      <div className="text-lg font-bold tracking-wide">{title}</div>
      <div className="mt-3 flex flex-col gap-3 text-sm">{children}</div>
    </div>
  );
}

export default function Notes() {
  return (
    <NotesCard title="About John">
      <div>Has worked with ABC for last 10 years</div>
      <div>Developed over 2 dozens of web apps</div>
      <div>His latest work is live on stores</div>
      <div>A cool guy</div>
    </NotesCard>
  );
}
