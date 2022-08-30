import React from "react";
import PropTypes from "prop-types";

const YoutubeEmbed = ({ embedId, widthSize, heightSize }) => (
  <div style={{paddingTop: 13, paddingBottom: 13}}>
    <iframe
      width={widthSize}
      height={heightSize}
      src={`https://www.youtube.com/embed/${embedId}?rel=0`}
      frameBorder="1"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;
