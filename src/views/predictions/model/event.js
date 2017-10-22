export default class Event {
  constructor(_event) {
    if (_event !== undefined) {
      this.date = _event.date;
      this.game = _event.game;
      this.game_league = _event.game_league;
      this.odds_1 = _event.odds_1;
      this.odds_2 = _event.odds_2;
      this.odds_draw = _event.odds_draw;
      this.source = _event.source;
      this.team_A = _event.team_A;
      this.team_B = _event.team_B;
      this.user_id = _event.user_id;
      this.verified = _event.verified;
      this.selected_odds = _event.selected_odds;
    } else {
      // default
      this.date = undefined;
      this.game = "";
      this.game_league = "";
      this.odds_1 = 1;
      this.odds_2 = 1;
      this.odds_draw = 1;
      this.source = [''];
      this.team_A = {
        name: '',
        flag: '',
        ex: ''
      };
      this.team_B = {
        name: '',
        flag: '',
        ex: ''
      };
      this.user_id = 0;
      this.verified = false;
      this.selected_odds = 0;
      this.selected_event = undefined;
    }
  }

  get percent_odds_1() {
    const odds_1 = Math.floor(1 / this.odds_1 * 100); // 90
    const odds_2 = Math.floor(1 / this.odds_2 * 100); // 22
    const total_odds = odds_1 + odds_2;
    const single_percent = total_odds / 100;
    return Math.floor(odds_1 / single_percent);
  }

  get percent_odds_2() {
    const odds_1 = Math.floor(1 / this.odds_1 * 100); // 90
    const odds_2 = Math.floor(1 / this.odds_2 * 100); // 22
    const total_odds = odds_1 + odds_2;
    const single_percent = total_odds / 100;
    return Math.ceil(odds_2 / single_percent);
  }
}
