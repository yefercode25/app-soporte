export interface PageProps<T = undefined> {
  params: { id: string };
  searchParams?: T;
}

export interface ErrorPageProps {
  error: Error;
  reset: () => void;
}