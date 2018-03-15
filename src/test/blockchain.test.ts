/**
 * Created by enixjin on 3/15/18.
 */
import {Blockchain} from "../blockchain/blockchain";
import {Transaction} from "../blockchain/transaction";

let enixCoin = new Blockchain(5);
console.log("System give 100 to enixjin");
enixCoin.addTransaction(new Transaction("System", "enixjin", 100));
console.log("enixjin give other 50");
enixCoin.addTransaction(new Transaction("enixjin", "other", 50));

console.log("enixjin start mining...");
enixCoin.mine("enixjin");
console.log(`balance of enixjin:${enixCoin.getBalance("enixjin")}`);

// console.log("====testing chain====");
// console.log(enixCoin.isValid());
// console.log(enixCoin.chain);

// console.log("====manipulate chain====");
// enixCoin.chain[1].data = "manipulate";
// console.log(enixCoin.isValid());