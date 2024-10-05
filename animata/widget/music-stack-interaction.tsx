import React, { useState } from "react";
import { Layers, LayoutGrid } from "lucide-react";

const carouselStyles = {
  perspective: "1000px",
  overflow: "hidden",
};

const carouselInnerStyles = {
  display: "flex",
  transformStyle: "preserve-3d" as React.CSSProperties["transformStyle"],
  transition: "transform 1s",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
};

const carouselItemStyles = {
  minWidth: "200px",
  marginLeft: "-180px",
  transform: "rotateY(15deg) translateZ(300px) translateX(-50px)",
  backfaceVisibility: "hidden" as React.CSSProperties["backfaceVisibility"],
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.5s, box-shadow 0.5s",
};

const carouselItemFirstChildStyles = {
  minWidth: "200px",
  marginLeft: "0",
  transform: "rotateY(0deg) translateZ(300px) translateX(0)",
  backfaceVisibility: "hidden" as React.CSSProperties["backfaceVisibility"],
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.5s, box-shadow 0.5s",
};

const carouselBackgroundStyles = {
  position: "absolute" as React.CSSProperties["position"],
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundSize: "cover" as React.CSSProperties["backgroundSize"],
  backgroundPosition: "center" as React.CSSProperties["backgroundPosition"],
  opacity: 0.8,
};

interface albumsProps {
  /*
   * Array of album objects
   */
  albums: {
    id: number;
    title: string;
    artist: string;
    cover: string;
  }[];
  /*
   * URL of the album cover
   */
  albumCover: string;
}

export default function MusicStackInteraction({ albums, albumCover }: albumsProps) {
  const [isGridView, setIsGridView] = useState(true);

  const handleToggleView = () => {
    setIsGridView(!isGridView);
  };

  return (
    <div className="relative mx-auto h-[33rem] w-80 rounded bg-gray-900 p-2 text-white">
      {isGridView ? (
        // grid view of albums
        <div className="mb-4 grid grid-cols-2 gap-6 transition-all">
          {albums.map((album) => (
            <div key={album.id} className="relative shadow-lg">
              <img
                src={album.cover + "?w=200&h=200"}
                alt={album.title}
                className="h-auto rounded-xl shadow-md"
              />
              <div className="absolute bottom-0 left-0 mx-2 bg-opacity-50 bg-gradient-to-b from-transparent to-gray-800 py-1 text-white">
                <h3 className="text-lg font-semibold">{album.title}</h3>
                <p className="text-sm">{album.artist}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // stack view of albums
        <div
          className="transition-all duration-500"
          style={{ ...carouselBackgroundStyles, backgroundImage: `url(${albumCover})` }}
        >
          <div className="mt-16 h-96 w-full transition-all duration-500" style={carouselStyles}>
            <div className="transition-all duration-500" style={carouselInnerStyles}>
              {albums.map((album, index) => (
                <div
                  key={album.id}
                  style={index === 0 ? carouselItemFirstChildStyles : carouselItemStyles}
                >
                  <img
                    src={album.cover + "?w=200&h=200"}
                    alt={album.title}
                    className="h-auto rounded-xl shadow-md"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-opacity-50 bg-gradient-to-b from-transparent to-gray-800 px-4 py-2 text-white">
                    <h3 className="text-lg font-semibold">{album.title}</h3>
                    <p className="text-sm">{album.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* slider toggle button */}
      {/* <div className="relative"> */}
      <div className="fixed bottom-4 left-0 right-0 mx-8 mb-4 flex w-auto items-center justify-center rounded-xl bg-gray-800 p-4 text-white shadow-2xl transition-all duration-1000">
        <div className="flex w-32 items-center space-x-2 rounded-full bg-gray-900 p-2">
          <div
            className={`flex h-8 w-16 cursor-pointer items-center justify-center rounded-full ${isGridView ? "bg-gray-700" : ""}`}
            onClick={handleToggleView}
          >
            <LayoutGrid />
          </div>
          <div
            className={`flex h-8 w-16 cursor-pointer items-center justify-center rounded-full ${!isGridView ? "bg-gray-700" : ""}`}
            onClick={handleToggleView}
          >
            <Layers />
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
