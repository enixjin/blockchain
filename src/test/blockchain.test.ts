import * as assert from "assert";
/**
 * Created by enixjin on 3/15/18.
 */
import {Blockchain} from "../blockchain/blockchain";
import {Transaction} from "../blockchain/transaction";


let enixCoin: Blockchain;
let difficulty = 4;

describe("enixCoin test", function () {
    beforeEach(function () {
        enixCoin = new Blockchain(difficulty);
    });
    describe('main test', function () {
        this.timeout(500000);

        it("correctly initialed", () => {
            assert.equal(enixCoin.isValid(), true);
        });

        it("should be invalid if chain is manipulated", () => {

            enixCoin.mine("enixjin");
            enixCoin["chain"][1].data = [new Transaction("God", "enixjin", 10000)];

            assert.equal(enixCoin.isValid(), false);
        });

        it("should be invalid if hash is manipulated", () => {

            enixCoin.mine("enixjin");
            enixCoin["chain"][1].hash = "00001c3767f41ecf575c373eb85b3eb72ad99b39c5c55bbfab81936ee5a57390";

            assert.equal(enixCoin.isValid(), false);
        });

        it("should have correct balance after transaction and mining reward", () => {

            enixCoin.addTransaction(new Transaction("System", "enixjin", 100));
            enixCoin.addTransaction(new Transaction("enixjin", "other", 50));
            enixCoin.mine("enixjin");

            assert.equal(enixCoin.isValid(), true);
            assert.equal(enixCoin.getBalance("enixjin"), 70);
        });
    });
});