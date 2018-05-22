// if requiring in every file actually overincluding package and making size bigger? Maybe need to import once at global level?
const moment = require('moment')
import Prediction from '../model/prediction';

// Wrapper for prediction in order to use on frontend
export default class BetSlip extends Prediction {
    isValid() {
        // update valid here 
        // Check if all bets in betslip are finished already and reporter can set a result
        let store_result = true;
        this.selected_events.forEach((event) => {
          if (moment(event.date).isAfter()) { // is bet finished. TODO check for cheats here
            store_result = false;
          }
        });

        return store_result;
    }

    constructor(prediction = []) {
        super(prediction);

        for (let field in prediction) {
            if (prediction.hasOwnProperty(field)) {
                this[field] = prediction[field];
            }
        }
    }

    selectEvents(selected_events) {
        this.selected_events = selected_events;
        this.update();
    }

    update() {
        // update betslip, recount everything
        this.final_odds = 1;
        this.selected_events.forEach(bet => {
            this.final_odds *= bet.selected_odds
        });
        this.final_odds = this.final_odds.toFixed(2);
        this.profit = (this.final_odds * this.bet_amount - this.bet_amount).toFixed(2);

        let latest_date;
        this.selected_events.forEach((bet) => {
            if (!latest_date || bet.date > latest_date) { // is bet finished. TODO check for cheats here
                latest_date = bet.date;
            }
        });

        this.date = latest_date;
        console.log('latest date: ' + latest_date);
    }
   
    getData() {
        // TODO: set date of prediction to a date of last event in betslip
        let data = {
            date: this.date / 1000,
            final_odds: this.final_odds,
            selected_events: this.selected_events,
            stake: this.bet_amount,
            status: this.isValid() ? (this.result === 'true' ? 'WON' : 'LOST') : 'PENDING',
            user_id: this.user_id,
            categories: this.categories
        }

        console.log('getData from betslip');
        return data;
    }
}
