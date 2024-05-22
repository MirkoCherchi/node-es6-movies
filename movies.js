const collection = require("./data");

class Movie {
  #title;
  #year;
  #genre;
  #rating;
  #type;

  constructor(title, year, genre, rating, type) {
    this.#title = title;
    this.#year = year;
    this.#genre = genre;
    this.#rating = rating;
    this.#type = type;
  }

  getTitle() {
    return this.#title;
  }

  setTitle(newTitle) {
    this.#title = newTitle;
  }

  getYear() {
    return this.#year;
  }

  setYear(newYear) {
    this.#year = newYear;
  }

  getGenre() {
    return this.#genre;
  }

  setGenre(newGenre) {
    this.#genre = newGenre;
  }

  getRating() {
    return this.#rating;
  }

  setRating(newRating) {
    this.#rating = newRating;
  }

  getType() {
    return this.#type;
  }

  setType(newType) {
    this.#type = newType;
  }

  toString() {
    return `${this.getTitle()} è un film di genere ${this.getGenre()}. È stato rilasciato nel ${this.getYear()} ed ha un voto medio di ${this.getRating()}.`;
  }
}

class TvSeries extends Movie {
  #seasons;

  constructor(title, year, genre, rating, seasons) {
    super(title, year, genre, rating, "tv");
    this.#seasons = seasons;
  }

  getSeasons() {
    return this.#seasons;
  }

  setSeasons(newSeasons) {
    this.#seasons = newSeasons;
  }

  toString() {
    return `${this.getTitle()} è una serie tv di genere ${this.getGenre()}. La prima stagione è stata rilasciata nel ${this.getYear()} ed in totale sono state prodotte ${this.getSeasons()} stagioni. Ha un voto medio di ${this.getRating()}.`;
  }
}

const collectionInstances = collection.map((media) => {
  if (media.type === "movie") {
    return new Movie(
      media.title,
      media.year,
      media.genre,
      media.rating,
      media.type
    );
  } else if (media.type === "tv") {
    return new TvSeries(
      media.title,
      media.year,
      media.genre,
      media.rating,
      media.seasons
    );
  }
});

collectionInstances.forEach((instance) => {
  console.log(instance.toString());
});

function averageRating(averageArray, genre) {
  const filterMedia = averageArray.filter(
    (media) => media.getGenre() === genre
  );
  const totalRating = filterMedia.reduce(
    (sum, media) => sum + media.getRating(),
    0
  );
  const totalAverage = totalRating / filterMedia.length;
  return totalAverage.toFixed(2);
}

console.log(
  `Media dei voti per il genere crime: ${averageRating(
    collectionInstances,
    "Crime"
  )}`
);

function genresUnique(averageArray) {
  return averageArray.reduce((uniqueGenres, media) => {
    if (!uniqueGenres.includes(media.getGenre())) {
      uniqueGenres.push(media.getGenre());
    }
    return uniqueGenres;
  }, []);
}
console.log(genresUnique(collectionInstances));

function filterGenre(averageArray, genre) {
  return averageArray
    .filter((media) => media.getGenre() === genre)
    .map((media) => media.toString());
}
console.log(
  `Film di genere Crime:\n${filterGenre(collectionInstances, "Crime").join(
    "\n"
  )}`
);
