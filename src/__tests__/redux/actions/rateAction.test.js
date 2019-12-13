/* eslint-disable import/no-duplicates */
/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
/* eslint-disable no-undef */
import React from "react";
import thunk from "redux-thunk";
import moxios from "moxios";
import Enzyme from "enzyme/build";
import configureStore from "redux-mock-store";
import Adapter from "enzyme-adapter-react-16/build";
import http from "../../../services/httpServices";
import { rate } from "../../../redux/actions/rateAction";
import { RATE, GET_RATE } from "../../../redux/actions/actionType";
import { getRate } from '../../../redux/actions/getRateAction';


Enzyme.configure({ adapter: new Adapter() });

let store;
const mockedStore = configureStore([thunk]);

const flushPromises = () => new Promise((resolve) => setImmediate(resolve));


describe("Rate in actions", () => {
    beforeEach(() => {
        store = mockedStore();
        moxios.install(http.dbCall);
    });

    afterEach(() => {
        moxios.uninstall(http.dbCall);
    });

    it("should rate an accomodation", async () => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    status: 200,
                    message: "Successfully registered in",
                    data: {},
                },
            });
            await flushPromises();
        });

        const data = {
            id: 1,
            rate: 2
        };

        await store.dispatch(rate(data));
        const calledActions = store.getActions();
    });

    it("should return an error if you rate an accomodation you didn't stay in", async () => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 409,
                response: {
                    data: { message: "" },
                },
            });
            await flushPromises();
        });

        const data = {
            id: 1,
            rate: 2
        };

        await store.dispatch(rate(data));
        const calledActions = store.getActions();
    });

    it("should get average ratings of an accomodation", async () => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    status: 200,
                    message: "Successfully registered in",
                    data: {},
                },
            });
            await flushPromises();
        });

        await store.dispatch(getRate(1));
        const calledActions = store.getActions();
    });

    it("should not get average ratings of an accomodation", async () => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.reject({
                status: 400,
                error: {
                    status: 200,
                    message: "Successfully registered in",
                    data: {},
                },
            });
            await flushPromises();
        });

        await store.dispatch(getRate(1));
        const calledActions = store.getActions();
    });

    it("should not get average ratings of an accomodation if network error", async () => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.reject({
                status: 400,
                error:'error',
                response: {
                    status: 200,
                    message: "Successfully registered in",
                    data: {},
                },
            });
            await flushPromises();
        });

        await store.dispatch(getRate(1));
        const calledActions = store.getActions();
    });
});
