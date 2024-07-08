export default function PreviewContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="preview-light dark:preview-dark flex min-h-40 w-full items-center justify-center">
      {children}
    </div>
  );
}
