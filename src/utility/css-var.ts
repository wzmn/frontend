export default function cssVar(name: string, value?: string) {
  if (name[0] != "-") name = "--" + name; //allow passing with or without --
  if (value) document.documentElement.style.setProperty(name, value);
  return getComputedStyle(document.documentElement).getPropertyValue(name);
}
