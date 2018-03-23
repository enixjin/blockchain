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

    private genesisBlock: Block = new Block([], new Date(), "0");

    constructor(private difficulty: number) {
        this.chain = [this.genesisBlock];
    }

    getLatest(): Block {
        return this.chain[this.chain.length - 1];
    }

    addTransaction(transaction: Transaction): void {
        console.log(`adding transaction:${transaction.from} give ${transaction.to} ${transaction.amount}`);
        this.pendingTransactions.push(transaction);
    }

    replaceChain(newChain: Block[]): boolean {
        if (this.isValid(newChain) && newChain.length > this.chain.length) {
            console.log("Replacing current blockchain with new blockchain");
            return true;
        }
        return false;
    }

    mine(rewardAddress: string) {
        console.log(`address:${rewardAddress} is start mining...`);
        const transactions = this.pendingTransactions.splice(0, 4);
        let block = new Block([
            ...transactions,
            new Transaction("System", rewardAddress, this.miningReward * transactions.length)
        ]);
        block.previousHash = this.getLatest().hash;
        block.mineBlock(this.difficulty);
        block.index = this.getLatest().index + 1;
        console.log(`address:${rewardAddress} get ${this.miningReward * transactions.length} for mining!`);
        this.chain.push(block);
    }

    isValid(chain: Block[]): boolean {
        if (JSON.stringify(chain[0]) !== JSON.stringify(chain[0])) {
            return false;
        }
        for (let i = 1; i < chain.length; i++) {
            const current = chain[i];
            const previous = chain[i - 1];
            if ((current.hash !== current.calculateHash())
                || (current.previousHash !== previous.hash)
                || current.hash.substring(0, this.difficulty) != Array(this.difficulty + 1).join("0")) {
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