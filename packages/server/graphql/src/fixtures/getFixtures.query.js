import { fetchFixtures } from '@kammy-ui/fetch-sky-sports';

const getFixtures = () => (
  Promise.all([
    (fetchFixtures.default || fetchFixtures)(),
  ]).then((fixtures) => (
    fixtures[0].data
  ))
);

export default getFixtures;
