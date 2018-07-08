/* eslint-env jest */
import mockingoose from 'mockingoose';
import mongoose from 'mongoose';

const playerSchema = require('./player.schema');
const upsert = require('./player.upsert');

describe('upsert()', () => {
  let saveSpy;
  let findSpy;

  beforeEach(() => {
    saveSpy = jest.spyOn(playerSchema.prototype, 'save');
    findSpy = jest.spyOn(playerSchema, 'findByIdAndUpdate').mockReturnValue({ exec: jest.fn() });
  });

  afterEach(() => {
    mockingoose.Player.reset();
    saveSpy.mockReset();
    findSpy.mockReset();
  });

  it('returns a player object', () => {
    const player = {
      _id: mongoose.Types.ObjectId('507f191e810c19729de860ea'),
      code: 1,
    };
    const players = [player];
    mockingoose.Player.toReturn(player, 'save');
    mockingoose.Player.toReturn([], 'aggregate');
    return upsert(players).then((response) => {
      expect(response[0]).toHaveProperty('_id', player._id);
      expect(response[0]).toHaveProperty('code', player.code);
      expect(response[0]).toHaveProperty('dateCreated');
      expect(response[0]).toHaveProperty('fixtures');
      expect(response[0]).toHaveProperty('isHidden', false);
      expect(response[0]).toHaveProperty('new', false);
    });
  });

  it('inserts players that DO NOT already exist', () => {
    const player = {
      _id: mongoose.Types.ObjectId('507f191e810c19729de860ea'),
      code: 1,
    };
    const players = [player];
    mockingoose.Player.toReturn(player, 'save');
    mockingoose.Player.toReturn([], 'aggregate');
    return upsert(players).then(() => {
      expect(playerSchema.prototype.save).toHaveBeenCalled();
      expect(playerSchema.findByIdAndUpdate).not.toHaveBeenCalled();
    });
  });

  it('updates players that DO already exist', () => {
    const player = {
      _id: mongoose.Types.ObjectId('507f191e810c19729de860ea'),
      dateCreated: Date.now(),
      isHidden: false,
      new: false,
      fixtures: [{ stats: [] }],
      code: 2,
    };
    const players = [player];
    mockingoose.Player.toReturn(players, 'aggregate');
    return upsert(players).then(() => {
      expect(playerSchema.prototype.save).not.toHaveBeenCalled();
      expect(playerSchema.findByIdAndUpdate).toHaveBeenCalledWith(player._id, {
        ...player,
        pos: undefined,
      });
    });
  });

  it('DOES update fixture stats of players that exist, where the update would NOT be zero', () => {
    const player1 = {
      _id: mongoose.Types.ObjectId('217f191e810c19729de860ea'),
      dateCreated: Date.now(),
      isHidden: false,
      new: false,
      fixtures: [{ stats: [1, 2, 3, 4] }],
      code: 21,
    };
    const player2 = {
      _id: mongoose.Types.ObjectId('227f191e810c19729de860ea'),
      dateCreated: Date.now(),
      isHidden: false,
      new: false,
      fixtures: [{ stats: [1, 2, 3, 4] }],
      code: 22,
    };
    const dbPlayer1 = {
      ...player1,
      fixtures: [{ stats: [0, 0, 0, 0] }],
    };
    const dbPlayer2 = {
      ...player2,
      fixtures: [{ stats: [0, 0, 0, 0] }],
    };
    const players = [player1, player2];
    mockingoose.Player.toReturn([dbPlayer1, dbPlayer2], 'aggregate');
    return upsert(players).then(() => {
      expect(playerSchema.prototype.save).not.toHaveBeenCalled();
      expect(playerSchema.findByIdAndUpdate).toHaveBeenCalledWith(player1._id, {
        ...player1,
        pos: undefined,
      });
      expect(playerSchema.findByIdAndUpdate).toHaveBeenCalledWith(player2._id, {
        ...player2,
        pos: undefined,
      });
    });
  });

  it('does NOT update fixture stats of players that exist, where the update WOULD be zero', () => {
    const player1 = {
      _id: mongoose.Types.ObjectId('217f191e810c19729de860ea'),
      dateCreated: Date.now(),
      isHidden: false,
      new: false,
      fixtures: [{ stats: [0, 0, 0, 0] }],
      code: 21,
    };
    const player2 = {
      _id: mongoose.Types.ObjectId('227f191e810c19729de860ea'),
      dateCreated: Date.now(),
      isHidden: false,
      new: false,
      fixtures: [{ stats: [0, 0, 0, 0] }],
      code: 22,
    };
    const dbPlayer1 = {
      ...player1,
      fixtures: [{ stats: [1, 2, 3, 4] }],
    };
    const dbPlayer2 = {
      ...player2,
      fixtures: [{ stats: [5, 5, 5, 5] }],
    };
    const players = [player1, player2];
    mockingoose.Player.toReturn([dbPlayer1, dbPlayer2], 'aggregate');
    return upsert(players).then(() => {
      expect(playerSchema.prototype.save).not.toHaveBeenCalled();
      expect(playerSchema.findByIdAndUpdate).toHaveBeenCalledWith(player1._id, {
        ...dbPlayer1,
        pos: undefined,
      });
      expect(playerSchema.findByIdAndUpdate).toHaveBeenCalledWith(player2._id, {
        ...dbPlayer2,
        pos: undefined,
      });
    });
  });

  it('marks players with code starting with 1 as GK', () => {
    const player = {
      _id: mongoose.Types.ObjectId('507f191e810c19729de860ea'),
      dateCreated: Date.now(),
      isHidden: false,
      new: false,
      fixtures: [{ stats: [] }],
      code: 1,
    };
    const players = [player];
    mockingoose.Player.toReturn(players, 'aggregate');
    return upsert(players).then(() => {
      expect(playerSchema.prototype.save).not.toHaveBeenCalled();
      expect(playerSchema.findByIdAndUpdate).toHaveBeenCalledWith(player._id, {
        ...player,
        pos: 'GK',
      });
    });
  });

  it('marks players as new if there is an update when players does NOT already exist in the db', () => {
    const player1 = {
      _id: mongoose.Types.ObjectId('217f191e810c19729de860ea'),
      dateCreated: Date.now(),
      isHidden: false,
      new: false,
      fixtures: [{ stats: [0, 0, 0, 0] }],
      code: 21,
    };
    const player2 = {
      _id: mongoose.Types.ObjectId('227f191e810c19729de860ea'),
      dateCreated: Date.now(),
      isHidden: false,
      new: false,
      fixtures: [{ stats: [0, 0, 0, 0] }],
      code: 22,
    };
    const dbPlayer1 = {
      ...player1,
      code: 221,
      fixtures: [{ stats: [1, 2, 3, 4] }],
    };
    const dbPlayer2 = {
      ...player2,
      code: 222,
      fixtures: [{ stats: [5, 5, 5, 5] }],
    };
    const players = [player1, player2];
    mockingoose.Player.toReturn([dbPlayer1, dbPlayer2], 'aggregate');
    return upsert(players).then(() => {
      expect(playerSchema.prototype.save).toHaveBeenCalled();
      expect(playerSchema.findByIdAndUpdate).not.toHaveBeenCalled();
    });
  });

  it.skip('unmarks new players if there is an update when players DOES already exist in the db', () => {

  });
});
