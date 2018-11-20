import React from 'react';
import Carousel from 'nuka-carousel';
import classes from './GramaticaItem.scss';
import { CURRENT_MESES } from '../../../../config/date';

const GramaticaItem = ({ title, date, images }) => (
  <>
    <div className={classes.GramaticaItem}>
      <div className={classes.Slider}>
        <Carousel>
          {images.map(image => (
            <img key={image} className="img-fluid" alt={title} src={image} />
          ))}
        </Carousel>
      </div>
      <div className={classes.Wrapper}>
        <h4>{title || `Implicar`}</h4>
        <p className={classes.DateStyle}>
          <i className="bx bx-calendar" />
          {CURRENT_MESES || date}
        </p>
      </div>
    </div>
  </>
);

export default GramaticaItem;
