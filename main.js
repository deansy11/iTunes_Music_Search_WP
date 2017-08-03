let baseUrl = "https://itunes.apple.com/search?term=";
const artistResults = document.querySelector(".results");
let inputBar = document.querySelector(".music-input");
let button = document.querySelector("button");

button.addEventListener("click", function(e) {
  let userInput = baseUrl + inputBar.value;
  e.preventDefault();

  fetch(userInput).then(function(response) {
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    response.json().then(function(data) {
      let templateContainer = "";
      console.log(data);
      data.results.forEach(function(items) {
        if (items.kind === "song") {
          let template = `
            <ul>
            <li id="${items.trackId}">
            <img src="${items.artworkUrl100}" alt="image_not_shown">
              <span class="song-title"><a href="${items.previewUrl}" class="songUrl">${items.trackName}</span>
              <h4><a href="${items.artistViewUrl}">${items.artistName}<h4>
            </li>
            </ul>
            `;
          templateContainer += template;
        }
        artistResults.innerHTML = templateContainer;
        inputBar.value = "";

        let songClick = document.querySelector(".song-title");
        let newTrack = document.querySelector(".music-player");
      

        // added event listener to try to dynamically adjust the src content of audio file
        songClick.addEventListener("click", function(e) {
          e.preventDefault();
          newTrack.src = items.previewUrl;
        });
      });
    });
  });
});
