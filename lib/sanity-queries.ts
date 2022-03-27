// Remove examples

export const exampleQuery = `*\[_type == "exampleType"\] | order(order asc) {
    title,
    desc,
    "imageUrl": image.asset->url,
}`;

export const exampleQueryForSliceOfItems = `*\[_type == "exampleType"\] | order(order asc) {
    title,
    desc,
    "imageUrl": image.asset->url,
}[0...8]`;

export const exampleQueryIfManuallySetSliceIndexes = (
  startIndex: number
) => `*\[_type == "exampleType"\] | order(order asc) {
    title,
    desc,
    "imageUrl": image.asset->url,
}[${startIndex}...${startIndex + 4}]`;

export const exampleQueryForSlugs = `*\[_type == "exampleType"\] | order(order asc) {
    "slug": slug.current,
}`;

export const exampleForSelectItemByQuery = `*\[_type == "collection"\ && slug.current == $slug\] | order(order asc) {
    title,
    desc,
    "imageUrl": image.asset->url,
    "slug": slug.current,
}[0]`;
