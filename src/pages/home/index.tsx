import React from "react";
import {
  Button,
  Card,
  Icon,
  IconSize,
  InputGroup,
  Navbar,
} from "@blueprintjs/core";
import "./Home.scss";

const artistsDefaultData = [
  {
    id: 1,
    name: "James Arthur",
    imgUrl: "https://i.scdn.co/image/ab6761610000e5eb6867a4ce52401bd378bb5179",
  },
  {
    id: 2,
    name: "Billie Eilish",
    imgUrl: "https://i.scdn.co/image/ab6761610000e5ebd8b9980db67272cb4d2c3daf",
  },
  {
    id: 3,
    name: "Tom Odell",
    imgUrl: "https://i.scdn.co/image/ab6761610000e5eb7e75420ae58cf25941cb2cd4",
  },
  {
    id: 4,
    name: "Lorde",
    imgUrl: "https://i.scdn.co/image/ab6761610000e5ebc4902f080d3620b3e6da80c3",
  },
];

const songsDefaultData = [
  {
    id: 5,
    name: "Impossible",
    artistName: "James Arthur",
  },
  {
    id: 6,
    name: "Another Love",
    artistName: "Tom Odell",
  },
  {
    id: 7,
    name: "Royals",
    artistName: "Lorde",
  },
  {
    id: 8,
    name: "No Time To Die",
    artistName: "Billie Eilish",
  },
];

export const Home = () => {
  const searchButton = (
    <Button className="search-btn" minimal={false}>
      <Icon icon="search" color="white" size={IconSize.LARGE} />
    </Button>
  );

  return (
    <div className="home">
      <Navbar className="navbar">
        {/* <Navbar.Heading className="heading">Spotify Catalog</Navbar.Heading> */}
        <Navbar.Group className="group">
          <Button className="btn" text="Home" />
          <Button className="btn" text="Account" />
        </Navbar.Group>
      </Navbar>
      <main className="main">
        <InputGroup
          className="search-input"
          rightElement={searchButton}
          placeholder="Enter name of song, artist or album"
        />
        <div className="artists">
          <h2 className="title">Artists</h2>
          <div className="section">
            {artistsDefaultData.map((artist) => {
              return (
                <Card className="artist" key={artist.id}>
                  <img
                    src={artist.imgUrl}
                    width="130"
                    height="130"
                    className="img"
                  />
                  <h5 className="name">{artist.name}</h5>
                </Card>
              );
            })}
          </div>
        </div>
        <div className="songs">
          <h2 className="title">Popular Songs</h2>
          <div className="section">
            {songsDefaultData.map((song) => {
              return (
                <Card className="song" key={song.id}>
                  <div className="info">
                    <h5 className="name">{song.name}</h5>
                    <p className="artist-name">{song.artistName}</p>
                  </div>
                  <Button className="btn">
                    <Icon
                      icon="chevron-down"
                      color="white"
                      size={IconSize.LARGE}
                    />
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};
