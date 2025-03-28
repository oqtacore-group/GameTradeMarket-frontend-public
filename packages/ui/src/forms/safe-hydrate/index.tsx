export function SafeHydrate({ children }: any) {
  return (
    <div suppressHydrationWarning={true}>{typeof window === 'undefined' ? null : children}</div>
  );
}
