
export const icons = (name) => {
  return new URL(`../assets/icons/${name}`, import.meta.url).href
}

export const images = (name) => {
  return new URL(`../assets/images/${name}`, import.meta.url).href
}
