import { connect } from '@kammy-ui/database';

const getDraftCup = async () => {
  const { getDraftCup: getDraftCupDb } = await connect();
  const cup = await getDraftCupDb();
  return cup;
};

export default getDraftCup;
