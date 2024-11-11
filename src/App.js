// src/App.js
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ArtistInfo from './components/ArtistInfo';
import SongList from './components/SongList';
import PlayerControls from './components/PlayerControls';
import Mj from './assets/Mj.png';
import BillieJean from './assets/Michael_Jackson_-_Billie_Jean.mp3'
import BeatIt from './assets/Michael_Jackson_-_Beat_It.mp3'
import SmoothCrim from './assets/Michael_Jackson_-_Smooth_Criminal.mp3'
import DontMJ from './assets/DontMJ.mp3'
import RWYMj from './assets/RWYMj.mp3'

const App = () => {
  const [songs, setSongs] = useState([
    { id: 1, title: 'Billie Jean', author:'Michael Jackson', album: "Thriller 25 Super...", playing:'345,534,344', time: '4:53', url: BillieJean, coverImage: Mj},
    { id: 2, title: 'Beat It', author:'Michael Jackson', album: "Thriller 25 Super...", playing:'335,425,644', time: '4:18', url: BeatIt, coverImage: Mj },
    { id: 3, title: 'Smooth Criminal', author:'Michael Jackson',album: "Bad 25th Ann...", playing:'866,564,656', time: '4:17', url: SmoothCrim, coverImage: Mj },
    { id: 4, title: "Don't Stop 'Til You Get Enough", author:'Michael Jackson', album: "Off The Wall", playing:'435,454,533', time: '6:05', url: DontMJ, coverImage: Mj },
    { id: 5, title: 'Rock With You', author:'Michael Jackson',album: "Off The Wall", playing:'7,866,566,744', time: '3:40', url: RWYMj, coverImage: Mj },
  ])
  const [currentSong, setCurrentSong] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const reorderSongs = (startIndex, endIndex) => {
    const result = Array.from(songs);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setSongs(result);
  };

  const onPlaySong = (song) => {
    setCurrentSong(song)
    setIsPlaying(false)
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-[#4C0000] to-[#0A0A0A]">
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        className={`lg:block ${isSidebarOpen ? 'block' : 'hidden'} lg:static absolute z-50`} 
      />
      <div className="flex-1">
        <Header isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <ArtistInfo />
        <SongList songs={songs} onPlaySong={onPlaySong} reorderSongs={reorderSongs} currentSong={currentSong} />
      </div>
      <PlayerControls currentSong={currentSong} songs={songs} onPlaySong={onPlaySong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
    </div>
  );
};

export default App;