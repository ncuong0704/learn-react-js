import { THUMNAIL_PLACEHOLDER } from "constants";
import { STATIC_HOST } from "constants";

export function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
}

export const changeNumToPrice = (value) => {
  if (value) {
    const valueString = value.toString();
    const count = Math.ceil(valueString.length / 3) - 1;
    const array = valueString.split("");
    var a = 0;
    var b = 0;
    for (var i = 0; i < count; i++) {
      b++;
      a = -3 * b - i;
      array.splice(a, 0, ".");
    }
    return array.join("");
  }
};

export const getThumbnail = (thumbnail) => {
  if (thumbnail) {
    return `${STATIC_HOST}${thumbnail.url}`;
  } else {
    return THUMNAIL_PLACEHOLDER;
  }
};
