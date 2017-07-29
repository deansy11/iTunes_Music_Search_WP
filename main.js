/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play

let baseUrl = "https://itunes.apple.com/search?term="
const artistResults = document.querySelector(".results");
let inputBar = document.querySelector(".music-input");
let button = document.querySelector("button");

button.addEventListener("click", function(e) {
  let userInput = baseUrl + inputBar.value;
  e.preventDefault();

  fetch(userInput)
    .then(function(response) {
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
            <li>
            <img src="${items.artworkUrl100}" alt="image_not_shown">
              <span class="song-title"><a href="${items.trackViewUrl}" class="songUrl">${items.trackName}</span>
              <h4><a href="${items.artistViewUrl}">${items.artistName}<h4>
            </li>
            </ul>
            `
            templateContainer += template;
          }
          artistResults.innerHTML = templateContainer;
          inputBar.value = "";

          let songClick = document.querySelector(".song-title");
          let newTrack = document.querySelector(".music-player");
          let trackUrl = document.querySelector(".songUrl");
          let playTrack = newTrack.src;

          // added event listener to try to dynamically adjust the src content of audio file
          songClick.addEventListener("click", function(e) {
            e.preventDefault();
            console.log("Is this working?");
            let elm = e.target;
            let source = document.querySelector(".music-player");
            source.src = trackUrl;

            console.log(trackUrl);
        });

        });
      });
    });

  });
