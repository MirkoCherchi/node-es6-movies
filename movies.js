const collection = require("./data");

class Movie {
  constructor(title, year, genre, rating, type) {
    this.title = title;
    this.year = year;
    this.genre = genre;
    this.rating = rating;
    this.type = type;
  }
  toString() {
    return `${this.title} è un film di genere ${this.genre}. E' stato rilasciato nel ${this.year} ed ha un voto medio di ${this.rating}. `;
  }
}

class TvSeries extends Movie {
  constructor(title, year, genre, rating, seasons) {
    super(title, year, genre, rating, "tv");
    this.seasons = seasons;
  }

  toString() {
    return `${this.title} è una serie tv di genere ${this.genre}. La prima stagione è stata rilasciata nel ${this.year} ed in totale sono state prodotte ${this.seasons} stagioni. Ha un voto medio di ${this.rating}.`;
  }
}

const collectionIstances = collection.map((media) => {
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

collectionIstances.forEach((instance) => {
  console.log(instance.toString());
});

function avarageRating(avarageArray, genre) {
  const filterMedia = avarageArray.filter((media) => media.genre === genre);
  const totalRating = filterMedia.reduce((sum, media) => sum + media.rating, 0);
  const totalAverage = totalRating / filterMedia.length;
  return totalAverage.toFixed(2);
}

console.log(
  `Media dei voti per il genere crime: ${avarageRating(
    collectionIstances,
    "Crime"
  )}`
);

function genresUnique(averageArray) {
  return averageArray.reduce((uniqueGenres, media) => {
    if (!uniqueGenres.includes(media.genre)) {
      uniqueGenres.push(media.genre);
    }
    return uniqueGenres;
  }, []);
}
console.log(genresUnique(collectionIstances));

function filterGenre(avarageArray, genre) {
  return avarageArray
    .filter((media) => media.genre === genre)
    .map((media) => media.toString());
}
console.log(
  `Film di genere Crime:\n${filterGenre(collectionIstances, "Crime").join(
    "\n"
  )}`
);
