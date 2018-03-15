/**
 * Created by enixjin on 3/15/18.
 */

export class Transaction {

    constructor(public from: string, public to: string, public amount: number) {

    }

    toString() {
        return this.from + this.to + this.amount;
    }

}