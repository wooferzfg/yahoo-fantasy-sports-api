import {
  mapGames,
  mapUserLeagues,
  mapUserTeams
} from "../helpers/userHelper.mjs";

class UserResource {
  constructor(yf) {
    this.yf = yf;
  }

  games(cb = () => {}) {
    return this.yf.api(
      this.yf.GET,
      `https://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games?format=json`)
      .then(data => {
        const user = data.fantasy_content.users[0].user[0];
        const games = mapGames(data.fantasy_content.users[0].user[1].games);

        user.games = games;
        cb(null, user);
        return user;
      })
      .catch(e => {
        cb(e);
        throw e;
      });
  }

  game_leagues(gameKeys, cb = () => {}) {
    // TODO: get stats from other users...
    if (!Array.isArray(gameKeys)) {
      gameKeys = [gameKeys];
    }

    return this.yf.api(
      this.yf.GET,
      `https://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games;game_keys=${gameKeys.join(
        ","
      )}/leagues?format=json`)
      .then(data => {
        const user = data.fantasy_content.users[0].user[0];
        const leagues = mapUserLeagues(
          data.fantasy_content.users[0].user[1].games
        );

        user.games = leagues;
        cb(null, user);
        return user;
      })
      .catch(e => { 
        cb(e);
        throw e;
      });
  }

  game_leagues_for_game_code(gameCodes, cb = () => {}) {
    // TODO: get stats from other users...
    if (!Array.isArray(gameCodes)) {
      gameCodes = [gameCodes];
    }

    return this.yf.api(
      this.yf.GET,
      `https://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games;game_codes=${gameCodes.join(
        ","
      )}/leagues?format=json`)
      .then(data => {
        const user = data.fantasy_content.users[0].user[0];
        const leagues = mapUserLeagues(
          data.fantasy_content.users[0].user[1].games
        );

        user.games = leagues;
        cb(null, user);
        return user;
      })
      .catch(e => { 
        cb(e);
        throw e;
      });
  }

  game_teams(gameKeys, cb = () => {}) {
    if (!Array.isArray(gameKeys)) {
      gameKeys = [gameKeys];
    }

    return this.yf.api(
      this.yf.GET,
      `https://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games;game_keys=${gameKeys.join(
        ","
      )}/teams?format=json`)
      .then(data => {
        const user = data.fantasy_content.users[0].user[0];
        const teams = mapUserTeams(data.fantasy_content.users[0].user[1].games);

        user.teams = teams;
        cb(null, user);
        return user;
      })
      .catch(e => {
        cb(e);
        throw e;
      });
  }
}

export default UserResource;
