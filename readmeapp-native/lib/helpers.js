import distanceInWordsStrict from "date-fns/distance_in_words_strict";

export const ago = createdAt =>
  distanceInWordsStrict(createdAt, new Date())
    .replace(/ seconds?/i, "s")
    .replace(/ minutes?/i, "m")
    .replace(/ hours?/i, "h");
