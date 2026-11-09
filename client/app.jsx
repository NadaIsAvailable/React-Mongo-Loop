const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const handleSong = async (e) => {
  e.preventDefault();

  const artist = e.target.querySelector('#songArtist').value;
  const title = e.target.querySelector('#songTitle').value;

  console.log('Form submitted:', artist, title);

  return false;
};

const SongForm = (props) => {
  return (
    <form id="songForm" onSubmit={(e) => handleSong(e)}>
      <label htmlFor="songArtist">Artist: </label>
      <input id="songArtist" type="text" name="artist" placeholder="Artist" />
      <label htmlFor="songTitle">Title: </label>
      <input id="songTitle" type="text" name="title" placeholder="Title" />
      <input type="submit" value="Add Song" />
    </form>
  );
};

const SongList = (props) => {
  const [songs, setSongs] = useState(props.songs);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const loadSongsFromServer = async () => {
      console.log('Loading songs');
      const response = await fetch('/getSongs');
      const data = await response.json();
      setSongs(data);
    };
    loadSongsFromServer();
  }, [reload]);

  if (songs.length === 0) {
    return (
      <div>
        <h3>No Songs Yet!</h3>
      </div>
    );
  }

  const songNodes = songs.map((song) => {
    return (
      <div key={song.title}>
        <h2>{song.artist} - <i>{song.title}</i></h2>
      </div>
    );
  });

  return (
    <div>
      <h1>My favorite songs!</h1>
      <button onClick={() => setReload(!reload)}>Reload songs</button>
      {songNodes}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <SongForm />
      <SongList songs={[]} />
    </div>
  );
};

const init = () => {
  const root = createRoot(document.getElementById('app'));
  root.render(<App />);
};

window.onload = init;
