import React from "react";

import {postInfo} from "../components/util/APICall";

const data = {
    username:'john',
    country: 'australia',
    taxIdentifier: '1234567890'
}
describe("Server Fetch", () => {
    it("calls Fetch Method", async () => {

     const res = await postInfo(data);

     expect(res).toEqual('success')

    });



});
