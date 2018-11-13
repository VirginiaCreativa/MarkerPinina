import Loadable from 'react-loadable';
import Spinner from '../components/common/spinner/Spinner';

export const Dashboard = Loadable({
  loader: () => import('../pages/Dashboard/Dashboard'),
  loading: Spinner,
});

export const Palabras = Loadable({
  loader: () => import('../pages/Palabras'),
  loading: Spinner,
});

export const Notebook = Loadable({
  loader: () => import('../pages/Notebook'),
  loading: Spinner,
});

export const Proyectos = Loadable({
  loader: () => import('../pages/Proyectos'),
  loading: Spinner,
});

export const NotFound = Loadable({
  loader: () => import('../pages/NotFound'),
  loading: Spinner,
});
