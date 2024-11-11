// src/components/PlayerControls.js
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton, Slider } from '@mui/material';
import { SkipPrevious, PlayArrow, Pause, SkipNext } from '@mui/icons-material';
import Repeat from '../assets/Repeat.png';
import Random from '../assets/Random.png';
import { Howl } from 'howler';

const PlayerControls = ({ currentSong, songs, onPlaySong, isPlaying, setIsPlaying }) => {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const soundRef = useRef(null);

  // Initialize the Howl instance for the current song
  useEffect(() => {
    if (currentSong.url) {
      // Dispose of the previous Howl instance
      if (soundRef.current) {
        soundRef.current.unload();
      }
      console.log('Current', currentSong.url)
      // Create a new Howl instance for the current song
      soundRef.current = new Howl({
        src: [currentSong.url],
        html5: true,
        onplay: () => {
          setIsPlaying(true);
          setDuration(soundRef.current.duration());
        },
        onend: () => setIsPlaying(false),
        onseek: () => setProgress(soundRef.current.seek()),
      });
    }
    return ()=>setProgress(0)
  }, [currentSong, setIsPlaying]);

  // Handle play/pause toggle
  const handlePlayPause = () => {
    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Update the progress periodically
  useEffect(() => {
    let interval;
    if (isPlaying && soundRef.current) {
      interval = setInterval(() => {
        setProgress(soundRef.current.seek());
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Handle seeking
  const handleSeek = (event, newValue) => {
    setProgress(newValue);
    if (soundRef.current) {
      soundRef.current.seek(newValue);
    }
  };

  // Handle next and previous (assuming you have `songs` array passed as props)
  const handleNext = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const nextSong = songs[(currentIndex + 1) % songs.length];
    onPlaySong(nextSong);
  };

  const handlePrevious = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const prevSong = songs[(currentIndex - 1 + songs.length) % songs.length];
    onPlaySong(prevSong);
  };

  return (
    <>
      {currentSong.id && (
        <div className="bottom-0 right-0 p-5 w-[270px] bg-gradient-to-b from-[#2c0001] to-[#0A0A0A] h-screen flex items-end">
          <Card
            className="w-full text-white rounded-lg shadow-lg md:flex-row"
            sx={{
              backgroundColor: '#6a0001',
              color: 'white',
              borderRadius: '15px',
            }}
          >
            {/* Now Playing Info and Controls */}
            <CardContent className="p-4 text-center">
              <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>
                Now Playing
              </Typography>
              {/* Song Cover Image */}
              <CardMedia
                component="img"
                height="140"
                image={currentSong.coverImage}
                alt={currentSong.title}
                className="rounded-t-lg"
              />
              <p style={{ fontSize: '16px', fontWeight: '700', marginTop: '15px' }}>
                {currentSong.title}
              </p>
              <p style={{ fontSize: '10px', fontWeight: '100', marginTop: '5px' }}>
                {currentSong.author}
              </p>

              {/* Seek Slider */}
              <Slider
                size="small"
                value={progress}
                max={duration}
                onChange={handleSeek}
                aria-label="Seek"
                sx={{ color: 'white' }}
              />

              {/* Playback Controls */}
              <div className="flex justify-center mt-3">
                <IconButton onClick={handlePrevious} sx={{ color: 'white' }}>
                  <img src={Repeat} alt='repeat' />
                </IconButton>
                <IconButton onClick={handlePrevious} sx={{ color: 'white' }}>
                  <SkipPrevious />
                </IconButton>
                <IconButton onClick={handlePlayPause} sx={{ color: 'white' }}>
                  {isPlaying ? <Pause /> : <PlayArrow />}
                </IconButton>
                <IconButton onClick={handleNext} sx={{ color: 'white' }}>
                  <SkipNext />
                </IconButton>
                <IconButton onClick={handleNext} sx={{ color: 'white' }}>
                  <img src={Random} alt='repeat' />
                </IconButton>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default PlayerControls;
