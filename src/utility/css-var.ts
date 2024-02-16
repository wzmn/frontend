export default function cssVar(name: string, value?: string) {
  if (name[0] != "-") name = "--" + name; //allow passing with or without --
  if (value) document.documentElement.style.setProperty(name, value);
  const variable =
    typeof window !== "undefined"
      ? window.getComputedStyle(document.documentElement).getPropertyValue(name)
      : "";
  return variable;
}
