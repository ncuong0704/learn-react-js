import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import "./style.scss";
ListSong.propTypes = {
  albumList: PropTypes.array,
};

function ListSong({ albumList = [] }) {
  return (
    <Box component="ul" className="list-song">
      {albumList.map((album) => (
        <li key={album.id} className="list-song__item">
          <a href={album.link} className="list-song__link">
            <img src={album.image} alt={album.title} className="list-song__image"/>
            <div className="list-song__title">{album.title}</div>
            <div className="list-song__singer">{album.singer}</div>
          </a>
        </li>
      ))}
    </Box>
  );
}

export default ListSong;
