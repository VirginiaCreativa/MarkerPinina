import Loadable from 'react-loadable';
import Spinner from '../components/common/spinner/Spinner';

export const Home = Loadable({
  loader: () => import('../pages/Home/Home'),
  loading: Spinner,
});

export const Significados = Loadable({
  loader: () => import('../pages/Sigfinicados'),
  loading: Spinner,
});

export const NotasCornell = Loadable({
  loader: () => import('../pages/Notascornell'),
  loading: Spinner,
});

export const Traduccion = Loadable({
  loader: () => import('../pages/Traduccion'),
  loading: Spinner,
});

export const Foros = Loadable({
  loader: () => import('../pages/Foros'),
  loading: Spinner,
});

export const NotFound = Loadable({
  loader: () => import('../pages/NotFound'),
  loading: Spinner,
});
