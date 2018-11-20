import React from 'react';
import classes from './NotacornellaItem.scss';
import Date from '../../../common/date/Date';

const NotebookItem = ({ title, content, date, images, categorias }) => {
  const shortContent = content.slice(0, 100) + '...';
  return (
    <>
      <div className={classes.NotebookItem}>
        <div className={classes.ImageBanner}>
          <img src={images} alt={title} className="img-fluid" />
        </div>
        <div className={classes.Wrapper}>
          <h4>{title}</h4>
          <p>{shortContent}</p>
          <hr />
          <div className="row">
            <div className="col">
              <Date date={date} />
            </div>
            <div className="col">
              <div className={classes.Categoria}>
                <p>{categorias}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotebookItem;
