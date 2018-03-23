/**
 * Created by enixjin on 1/12/17.
 */
import {Blockchain} from "../blockchain/blockchain";

declare module NodeJS {
    interface Global {
        config: any;
        dependencyInjectionContainer: Map<string, any>;
        blockchain: Blockchain;
    }
}