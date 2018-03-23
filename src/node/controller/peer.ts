/**
 * Created by enixjin on 3/23/18.
 */
import {Controller, Get} from "@jinyexin/core";

@Controller("")
export class PeerController {

    @Get({url: "/blocks", auth: false})
    async blocks() {
        return global.blockchain.chain;
    }

}