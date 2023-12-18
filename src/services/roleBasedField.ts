function roleBasedField(role: string, neededFieldFor: string[]) {
  return neededFieldFor.includes(role);
}

export default roleBasedField;
