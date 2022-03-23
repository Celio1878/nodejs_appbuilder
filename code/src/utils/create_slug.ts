import slugify from "slugify";

export function create_slug(str: string, charLimit = 45) {
  const sep = "-";

  let slug = slugify(str)
    .toLowerCase()
    .trim()
    .replace(/['".,\/#!$%\^&\*;:{}=\_`~()]/g, sep)
    .replace(/\s{2,}/g, " ")
    .replace("--", sep);

  if (slug.length <= charLimit) {
    return slug;
  }

  const parts = slug.split(sep);

  while (slug.length > charLimit) {
    parts.pop();
    slug = parts.join(sep);
  }

  return slug;
}
