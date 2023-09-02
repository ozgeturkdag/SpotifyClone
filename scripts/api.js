import { renderSongs } from "./ui.js";

// yapılan istekler için kullanılan ayarlar
const url =
  "https://shazam.p.rapidapi.com/charts/track?locale=tr-TR&listId=ip-country-chart-TR";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "5332c479c4msh4dc29c530a8fb43p19df6ejsnd1b202c1f5ab",
    "X-RapidAPI-Host": "shazam.p.rapidapi.com",
  },
};

// api'isteklerinin yönettiğimiz class
export class API {
  constructor() {
    this.songs = [];
  }

  // popüler müzikleri getirir
  async getPopular() {
    const res = await fetch(url, options);
    const data = await res.json();
    this.songs = data.tracks;

    // ekrana popüler müzikleri listeler
    renderSongs(this.songs);
  }

  // arama methodu
  async searchMusic(query) {
    const res = await fetch(
      `https://shazam.p.rapidapi.com/search?term=${query}&locale=tr-TR`,
      options
    );

    const data = await res.json();

    // veriyi istediğimiz hale çevirme
    // song.track yerine song'a erişince
    const newData = data.tracks.hits.map((song) => ({
      ...song.track,
    }));

    this.songs = newData;

    // aratılan şarkıları ekrana basma
    renderSongs(this.songs);
  }
}
