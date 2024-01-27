import { PrimaryAddressFieldsT } from "type/global";

export function fillInPrimaryAddress(
  address_components: google.maps.GeocoderResult["address_components"]
): PrimaryAddressFieldsT {
  const fields = {
    building_number: "",
    level_number: "",
    unit_type: "",
    unit_number: "",
    lot_number: "",
    street_number: "",
    street_name: "",
    street_type: "",
    suffix: "",
    suburb: "",
    state: "",
    pincode: "",
    lga: "",
    country: "",
  };
  for (const component of address_components) {
    // @ts-ignore remove once typings fixed
    const componentType = component.types[0];

    switch (componentType) {
      //building name
      case "premise": {
        fields.building_number = component.long_name;
        break;
      }
      //level_number
      case "subpremise": {
        fields.level_number = component.long_name;
        break;
      }
      //street number
      case "street_number": {
        fields.street_number = component.long_name;
        break;
      }
      //street name
      case "route": {
        fields.street_name = component.long_name
          .split(" ")
          .slice(0, -1)
          .join(" ");
        fields.street_type = component.long_name.split(" ").pop()!;
        break;
      }
      //suffix
      case "postal_code_suffix": {
        fields.suffix = component.long_name;
        break;
      }
      //state
      case "administrative_area_level_1": {
        fields.state = component.short_name;
        break;
      }
      //pincode
      case "postal_code": {
        fields.pincode = component.long_name;
        break;
      }
      case "administrative_area_level_2": {
        fields.lga = component.long_name;
        break;
      }
      //suburb
      case "locality": {
        fields.suburb = component.long_name;
        break;
      }

      case "country": {
        fields.country = component.long_name;
        break;
      }
    }
  }

  return fields;
}
