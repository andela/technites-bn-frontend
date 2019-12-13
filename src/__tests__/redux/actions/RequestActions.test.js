/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import thunk from "redux-thunk";
import moxios from "moxios";
import configureStore from "redux-mock-store";
import http from "../../../services/httpServices";
import {

  GET_REQUESTS,
  GET_ERRORS,
  GET_ALL_REQUESTS,
  REQUEST_ACTION,
  TRIPS_STATS,
  GET_PENDING_REQUESTS,
  GET_PAST_REQUESTS,
  MOST_VISITED,
} from "../../../redux/actions/actionType";
import {
  getUserRequests,
  getMyUsersRequests,
  approveReject,
  mostTravelled,
  tripsStatsAction,
} from "../../../redux/actions/RequestActions";
import successresponse from "../../../__mocks__/__get_user_request_success__.json";
import errorreponse from "../../../__mocks__/__get_user_request_failure__.json";
import { token, request as testRequest } from "../../../__mocks__/fixtures";

const mockedStore = configureStore([thunk]);
const flushPromises = () => new Promise((resolve) => setImmediate(resolve));
let store;

describe("Get User Requests actions", () => {
  beforeEach(() => {
    store = mockedStore();
    moxios.install(http.dbCall);
    Storage.prototype.getItem = jest.fn(() => token);
  });

  afterEach(() => {
    moxios.uninstall(http.dbCall);
  });

  it("should retrieve users requests", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(successresponse);
      await flushPromises();
    });
    await store.dispatch(getUserRequests());
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(GET_REQUESTS);
  });
  it("should retrieve users Pending requests", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(successresponse);
      await flushPromises();
    });
    await store.dispatch(getUserRequests("Pending"));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(GET_PENDING_REQUESTS);
  });
  it("should retrieve users Past requests", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(successresponse);
      await flushPromises();
    });
    await store.dispatch(getUserRequests("Past"));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(GET_PAST_REQUESTS);
  });
  it("should return a failure message when User doesn't have any request", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(errorreponse);
      await flushPromises();
    });
    await store.dispatch(getUserRequests());
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(GET_ERRORS);
  });
  it("it should cover all errors possible", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.reject({
        message: "error",
      });
      await flushPromises();
    });
    await store.dispatch(getUserRequests());
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(GET_ERRORS);
  });
});

describe("Get All Requests by Admin actions", () => {
  beforeEach(() => {
    store = mockedStore();
    moxios.install(http.dbCall);
    Storage.prototype.getItem = jest.fn(() => token);
  });

  afterEach(() => {
    moxios.uninstall(http.dbCall);
  });

  it("should retrieve all users requests to travel admin", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(successresponse);
      await flushPromises();
    });
    await store.dispatch(getMyUsersRequests());
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(GET_ALL_REQUESTS);
  });
  it("should retrieve all Pending users requests to travel admin", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(successresponse);
      await flushPromises();
    });
    await store.dispatch(getMyUsersRequests("Pending"));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(GET_PENDING_REQUESTS);
  });
  it("should retrieve all Past users requests to travel admin", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(successresponse);
      await flushPromises();
    });
    await store.dispatch(getMyUsersRequests("Past"));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(GET_PAST_REQUESTS);
  });
  it("should return a failure message when there are no requests", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(errorreponse);
      await flushPromises();
    });
    await store.dispatch(getMyUsersRequests());
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(GET_ERRORS);
  });
  it("it should cover all errors possible", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.reject({
        message: "error",
      });
      await flushPromises();
    });
    await store.dispatch(getMyUsersRequests());
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(GET_ERRORS);
  });
});

describe("Approve/Reject Action", () => {
  describe("and `REQUEST_ACTION` dispatched with success", () => {
    beforeEach(() => {
      store = mockedStore();
      moxios.install(http.dbCall);
      Storage.prototype.getItem = jest.fn(() => token);
    });

    afterEach(() => {
      moxios.uninstall(http.dbCall);
    });

    test("should dispatch the action", async () => {
      moxios.wait(async () => {
        const requestAction = moxios.requests.mostRecent();
        requestAction.respondWith({ status: 200 });
        await flushPromises();
      });
      await store.dispatch(
        approveReject({
          testRequest,
          action: "test_actio",
          status: "test_status",
        }),
      );
      const calledActions = store.getActions();
      expect(calledActions[0].type).toEqual(REQUEST_ACTION);
    });
  });
});

describe("Most visited and trips stats Actions", () => {
  beforeEach(() => {
    store = mockedStore();
    moxios.install(http.dbCall);
  });
  afterEach(() => {
    moxios.uninstall(http.dbCall);
  });
  it("dispached MOST_VISITED action on success", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 200,
          message: "",
        },
      });
      await flushPromises();
    });
    await store.dispatch(mostTravelled());
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(MOST_VISITED);
  });

  it("dispached MOST_VISITED action on failure", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: {
          data: {
            error: "error",
          },
        },
        message: "error",
      });
      await flushPromises();
    });
    await store.dispatch(mostTravelled());
    const calledActions = store.getActions();
    expect(calledActions.length).toEqual(1);
  });

  it("dispached MOST_VISITED action on failure", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: {
          data: {
            errors: [],
          },
        },
        message: "error",
      });
      await flushPromises();
    });
    await store.dispatch(mostTravelled());
    const calledActions = store.getActions();
    expect(calledActions.length).toEqual(1);
  });

  it("dispached TRIPS_STATS action on success", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 200,
          trips: [],
          totalTrips: 0,
        },
      });
      await flushPromises();
    });
    await store.dispatch(tripsStatsAction());
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(TRIPS_STATS);
  });

  it("dispached TRIPS_STATS action on failure", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: {
          data: {
            error: "error",
          },
        },
        message: "error",
      });
      await flushPromises();
    });
    await store.dispatch(tripsStatsAction());
    const calledActions = store.getActions();
    expect(calledActions.length).toEqual(0);
  });

  it("dispached TRIPS_STATS action on failure errors", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 422,
        response: {
          data: {
            error: "error",
          },
        },
        message: "error",
      });
      await flushPromises();
    });
    await store.dispatch(tripsStatsAction(1, "e", 3, 4));
    const calledActions = store.getActions();
    expect(calledActions.length).toEqual(0);
  });

});
