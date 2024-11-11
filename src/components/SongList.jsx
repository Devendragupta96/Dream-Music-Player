// src/components/SongList.js
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Playing from '../assets/Playing.png';

const SongList = React.memo(({ songs, onPlaySong, reorderSongs, currentSong }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    reorderSongs(result.source.index, result.destination.index);
  };

  return (
    <>
      <div className="flex justify-between items-center px-4 md:px-8 mt-4 text-white">
        <h1 className="font-bold text-sm md:text-lg">Popular</h1>
        <p className="text-xs md:text-sm">See All</p>
      </div>

      <div className="mt-3 mb-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="songList">
            {(provided) => (
              <table
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="w-full text-left text-white text-sm md:text-base"
              >
                <thead>
                  <tr className="text-left border-b border-gray-700">
                    <th className="px-2 md:px-4 py-2">#</th>
                    <th className="px-2 md:px-4 py-2">Title</th>
                    <th className="px-2 md:px-4 py-2">Playing</th>
                    <th className="px-2 md:px-4 py-2">Time</th>
                    <th className="hidden md:table-cell px-2 md:px-4 py-2">Album</th>
                  </tr>
                </thead>
                <tbody>
                  {songs.map((track, index) => {
                    const draggableId = track.id.toString();

                    return (
                      <Draggable key={draggableId} draggableId={draggableId} index={index}>
                        {(provided, snapshot) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => onPlaySong(track)}
                            className={`cursor-pointer ${
                              track?.id === currentSong?.id ? 'bg-custom-red border-l-8 border-red-700 bg-red-950' : 'bg-transparent'
                            }`}
                          >
                            <td className="px-2 md:px-4 py-2">{track?.id === currentSong?.id?<img src={Playing} alt='playing' style={{height:'20px'}}/>:index + 1}</td>
                            <td className="px-2 md:px-4 py-2">{track.title}</td>
                            <td className="px-2 md:px-4 py-2">{track.playing}</td>
                            <td className="px-2 md:px-4 py-2">{track.time}</td>
                            <td className="hidden md:table-cell px-2 md:px-4 py-2">{track.album}</td>
                          </tr>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </tbody>
              </table>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
});

export default SongList;
