const ID_LOCALE = "id-ID";

export function formatEventDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString(ID_LOCALE, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatArticleDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString(ID_LOCALE, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatEventDateParts(dateString: string) {
  const date = new Date(dateString);
  return {
    day: date.toLocaleDateString(ID_LOCALE, { day: "2-digit" }),
    month: date.toLocaleDateString(ID_LOCALE, { month: "short" }),
  };
}
