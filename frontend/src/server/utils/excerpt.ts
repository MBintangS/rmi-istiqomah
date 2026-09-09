const EXCERPT_LENGTH = 160;

export function generateExcerpt(content: string): string {
  const plain = content
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (plain.length <= EXCERPT_LENGTH) {
    return plain;
  }

  return `${plain.slice(0, EXCERPT_LENGTH).trimEnd()}…`;
}
