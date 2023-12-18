import { PrimaryAddressFieldsT } from "type/global";

export function fillInPrimaryAddress(
  address_components: google.maps.GeocoderResult["address_components"]
): PrimaryAddressFieldsT {
  const fileds = {
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
  };
  for (const component of address_components) {
    // @ts-ignore remove once typings fixed
    const componentType = component.types[0];

    switch (componentType) {
      //building name
      case "premise": {
        fileds.building_number = component.long_name;
        break;
      }
      //level_number
      case "subpremise": {
        fileds.level_number = component.long_name;
        break;
      }
      //street number
      case "street_number": {
        fileds.street_number = component.long_name;
        break;
      }
      //street name
      case "route": {
        fileds.street_name = component.long_name;
        break;
      }
      //suffix
      case "postal_code_suffix": {
        fileds.suffix = component.long_name;
        break;
      }
      //state
      case "administrative_area_level_1": {
        fileds.state = component.short_name;
        break;
      }
      //pincode
      case "postal_code": {
        fileds.pincode = component.long_name;
        break;
      }
      case "administrative_area_level_2": {
        fileds.lga = component.long_name;
        break;
      }
      //suburb
      case "locality": {
        fileds.suburb = component.long_name;
        break;
      }
    }
  }

  return fileds;
}
