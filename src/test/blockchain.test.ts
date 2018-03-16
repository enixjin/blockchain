import * as assert from "assert";
/**
 * Created by enixjin on 3/15/18.
 */
import {Blockchain} from "../blockchain/blockchain";
import {Transaction} from "../blockchain/transaction";


let enixCoin: Blockchain;
let difficulty = 5;

describe("enixCoin test", function () {
    before(function () {
        enixCoin = new Blockchain(difficulty);
    });
    describe('main test', function () {
        this.timeout(500000);

        it("correctly initialed", () => {
            assert.equal(enixCoin.isValid(),true);
        });

        it("should have correct balance after transaction and mining reward", () => {
            enixCoin.addTransaction(new Transaction("System", "enixjin", 100));
            enixCoin.addTransaction(new Transaction("enixjin", "other", 50));

            enixCoin.mine("enixjin");
            assert.equal(enixCoin.getBalance("enixjin"), 70);
        });
    });
});

// console.log("====testing chain====");
// console.log(enixCoin.isValid());
// console.log(enixCoin.chain);

// console.log("====manipulate chain====");
// enixCoin.chain[1].data = "manipulate";
// console.log(enixCoin.isValid());