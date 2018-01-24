// if requiring in every file actually overincluding package and making size bigger? Maybe need to import once at global level?
const moment = require('moment')

export default class BetSlip {
    data = [];
    bet_amount = 0;
    odds = 1;
    result = false;
    valid = true;
    user_id = 0;
    final_odds = 1;
    profit = 0;

    isValid() {
        // update valid here 
        // Check if all bets in betslip are finished already and reporter can set a result
        let store_result = true;
        this.betslipData.forEach(function(bet) {
          console.log(bet)
          if (moment(bet.date).isAfter()) { // is bet finished. TODO check for cheats here
            store_result = false;
          }
        });

        return store_result;
    }

    constructor(data = [], user_id = 0) {
        this.data = data;
        this.user_id = user_id;
        this.update();
    }

    update() {
        // update betslip, recount everything
        
        this.final_odds = 1;
        this.data.forEach(function(bet) {
            this.final_odds *= bet.selected_odds
        });

        this.profit = (this.final_odds * this.bet_amount - this.bet_amount).toFixed(2);
        return true;
    }
   
    data() {
        // TODO: set date of prediction to a date of last event in betslip

        let data = {
            date: Math.round(new Date() / 1000),
            final_odds: this.final_odds,
            selected_events: this.data,
            stake: this.bet_amount,
            status: this.isValid() ? (this.result === 'true' ? 'WON' : 'LOST') : 'PENDING',
            user_id: this.user_id
        }

        return data;
    }
}
