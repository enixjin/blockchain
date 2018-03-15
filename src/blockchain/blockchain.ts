/**
 * Created by enixjin on 3/15/18.
 */
import {Block} from "./block";
import {Transaction} from "./transaction";

export class Blockchain {
    private chain: Block[];
    pendingTransactions: Transaction[] = [];
    // reward for each transaction
    miningReward = 10;

    constructor(private difficulty: number) {
        this.chain = [this.initialBlock()];
    }

    private initialBlock(): Block {
        return new Block([], new Date(), "0");
    }

    getLatest(): Block {
        return this.chain[this.chain.length - 1];
    }

    addTransaction(transaction: Transaction): void {
        this.pendingTransactions.push(transaction);
    }

    mine(rewardAddress: string) {
        const transactions = this.pendingTransactions.splice(0, 4);
        let block = new Block([
            ...transactions,
            new Transaction("System", rewardAddress, this.miningReward * transactions.length)
        ]);
        block.mineBlock(this.difficulty);
        console.log(`${rewardAddress} get ${this.miningReward * transactions.length} for mining!`);
        this.chain.push(block);
    }

    isValid(): boolean {
        for (let i = 1; i < this.chain.length; i++) {
            const current = this.chain[i];
            const previous = this.chain[i - 1];
            if ((current.hash !== current.calculateHash()) || (current.previousHash !== previous.hash)) {
                return false;
            }
        }
        return true;
    }

    getBalance(address: string): number {
        let balance = 0;
        this.chain.forEach(block => {
            block.data.forEach(
                transaction => {
                    if (transaction.from === address) {
                        balance -= transaction.amount;
                    }
                    if (transaction.to === address) {
                        balance += transaction.amount;
                    }
                }
            )
        });
        return balance;
    }
}