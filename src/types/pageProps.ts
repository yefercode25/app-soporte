export interface PageProps<T = undefined> {
  params: { id: string };
  searchParams?: T;
}