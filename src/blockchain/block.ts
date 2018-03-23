/**
 * Created by enixjin on 3/15/18.
 */
import {Transaction} from "./transaction";

const crypto = require('crypto');

export class Block {
    hash = "";

    constructor(public data: Transaction[], public timestamp: Date = new Date(), public previousHash = "", public nonce = 0, public index = 0) {
        this.hash = this.calculateHash();
    }

    getString(): string {
        return this.index + this.timestamp.toString() + JSON.stringify(this.data) + this.previousHash + this.nonce;
    }

    calculateHash(): string {
        return crypto.createHash("sha256").update(this.getString()).digest("hex");
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) != Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log(`block mined:${this.hash}`);
    }

}