import React from 'react';
import Carousel from 'nuka-carousel';
import classes from './SignificadoItem.scss';
import { CURRENT_MESES } from '../../../../config/date';

const SignificadoItem = ({ title, date, images }) => (
  <>
    <div className={classes.SignificadoItem}>
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

export default SignificadoItem;
