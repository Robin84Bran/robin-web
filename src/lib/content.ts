export function sortCollectionByOrder<T extends { data: { order: number } }>(items: T[]) {
  return [...items].sort((left, right) => left.data.order - right.data.order);
}

export function featuredOnly<T extends { data: { featured?: boolean } }>(items: T[]) {
  return items.filter((item) => item.data.featured);
}
