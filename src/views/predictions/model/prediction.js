// Actual prediction which is being stored into database
export default class Prediction {
  date = new Date();
  final_odds = 1;
  selected_events = [];
  stake = 0;
  status = ['PENDING']; // TODO const + no array
  user_id = 0;
  categories = [];

  constructor(prediction) {
    for (let field in prediction) {
      if (prediction.hasOwnProperty(field)) {
        this[field] = prediction[field];
      }
    }
  }

  get result() {
    return this.status[0] === 'WON'
  }

  set result(result) {
    this.status[0] = result === true ? 'WON' : (result === false ? 'LOST' : 'PENDING')
  }
}
