import { GetServerSideProps } from 'next';
import { PrivateComponent } from '../components/PrivateComponent';
import { Home } from '../templates/Home';

export default function Index() {
  return (
    <PrivateComponent>
      <Home />;
    </PrivateComponent>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
