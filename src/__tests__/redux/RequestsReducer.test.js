import UserRequestsReducer from "../../redux/reducers/RequestsReducer";
import * as types from "../../redux/actions/actionType";
import initialState from "../../redux/store/initialState";
import { requests } from "../../__mocks__/fixtures";
import { GET_ALL_ACCOMODATIONS, GET_ALL_ROOMS } from "../../redux/actions/actionType";

describe("UserRequestsReducer unit tests", () => {
  it("should reduce user requests", () => {
    const state = UserRequestsReducer(
      { requestFound: false, requests: [] },
      {
        type: "GET_REQUESTS",
        payload: [
          {
            id: 8,
            user_id: 9,
            request_type: "OneWay",
            location_id: 3,
            departure_date: "2019-11-16",
            return_date: null,
            destinations: [
              {
                room_id: 2,
                check_in: "2019-11-18T15:16:38.447Z",
                check_out: "2019-12-27T15:16:38.447Z",
                destination_id: 4,
                accomodation_id: 1,
              },
            ],
            reason: "Visit Lagos",
            status: "Pending",
            createdAt: "2019-11-11T06:53:54.602Z",
            updatedAt: "2019-11-11T06:53:54.602Z",
          },
        ],
      },
    );
    expect(state).toEqual({
      requestFound: true,
      requests: [
        {
          id: 8,
          user_id: 9,
          request_type: "OneWay",
          location_id: 3,
          departure_date: "2019-11-16",
          return_date: null,
          destinations: [
            {
              room_id: 2,
              check_in: "2019-11-18T15:16:38.447Z",
              check_out: "2019-12-27T15:16:38.447Z",
              destination_id: 4,
              accomodation_id: 1,
            },
          ],
          reason: "Visit Lagos",
          status: "Pending",
          createdAt: "2019-11-11T06:53:54.602Z",
          updatedAt: "2019-11-11T06:53:54.602Z",
        },
      ],
    });
  });

  it("should reduce user accomodations", () => {
    const state = UserRequestsReducer(
      { requestFound: false, requests: [] },
      {
        type: GET_ALL_ACCOMODATIONS,
        payload: [
          {
            id: 8,
            user_id: 9,
            request_type: "OneWay",
            location_id: 3,
            departure_date: "2019-11-16",
            return_date: null,
            destinations: [
              {
                room_id: 2,
                check_in: "2019-11-18T15:16:38.447Z",
                check_out: "2019-12-27T15:16:38.447Z",
                destination_id: 4,
                accomodation_id: 1,
              },
            ],
            reason: "Visit Lagos",
            status: "Pending",
            createdAt: "2019-11-11T06:53:54.602Z",
            updatedAt: "2019-11-11T06:53:54.602Z",
          },
        ],
      },
    );
  });
  it("should reduce accomodations rooms", () => {
    const state = UserRequestsReducer(
      { requestFound: false, requests: [] },
      {
        type: GET_ALL_ROOMS,
        payload: [
          {
            id: 8,
            user_id: 9,
            request_type: "OneWay",
            location_id: 3,
            departure_date: "2019-11-16",
            return_date: null,
            destinations: [
              {
                room_id: 2,
                check_in: "2019-11-18T15:16:38.447Z",
                check_out: "2019-12-27T15:16:38.447Z",
                destination_id: 4,
                accomodation_id: 1,
              },
            ],
            reason: "Visit Lagos",
            status: "Pending",
            createdAt: "2019-11-11T06:53:54.602Z",
            updatedAt: "2019-11-11T06:53:54.602Z",
          },
        ],
      },
    );
  });
});

describe("Admin viewing all requests unit tests", () => {
  it("should reduce all requests", () => {
    const state = UserRequestsReducer(
      { requestFound: false, requests: [] },
      {
        type: "GET_ALL_REQUESTS",
        payload: [
          {
            id: 8,
            user_id: 9,
            request_type: "OneWay",
            location_id: 3,
            departure_date: "2019-11-16",
            return_date: null,
            destinations: [
              {
                room_id: 2,
                check_in: "2019-11-18T15:16:38.447Z",
                check_out: "2019-12-27T15:16:38.447Z",
                destination_id: 4,
                accomodation_id: 1,
              },
            ],
            reason: "Visit Lagos",
            status: "Pending",
            createdAt: "2019-11-11T06:53:54.602Z",
            updatedAt: "2019-11-11T06:53:54.602Z",
          },
          {
            id: 9,
            user_id: 9,
            request_type: "OneWay",
            location_id: 3,
            departure_date: "2019-11-16",
            return_date: null,
            destinations: [
              {
                room_id: 2,
                check_in: "2019-11-18T15:16:38.447Z",
                check_out: "2019-12-27T15:16:38.447Z",
                destination_id: 4,
                accomodation_id: 1,
              },
            ],
            reason: "Visit Lagos",
            status: "Pending",
            createdAt: "2019-11-11T06:53:54.602Z",
            updatedAt: "2019-11-11T06:53:54.602Z",
          },
        ],
      },
    );
    expect(state).toEqual({
      requestFound: true,
      requests: [
        {
          id: 8,
          user_id: 9,
          request_type: "OneWay",
          location_id: 3,
          departure_date: "2019-11-16",
          return_date: null,
          destinations: [
            {
              room_id: 2,
              check_in: "2019-11-18T15:16:38.447Z",
              check_out: "2019-12-27T15:16:38.447Z",
              destination_id: 4,
              accomodation_id: 1,
            },
          ],
          reason: "Visit Lagos",
          status: "Pending",
          createdAt: "2019-11-11T06:53:54.602Z",
          updatedAt: "2019-11-11T06:53:54.602Z",
        },
        {
          id: 9,
          user_id: 9,
          request_type: "OneWay",
          location_id: 3,
          departure_date: "2019-11-16",
          return_date: null,
          destinations: [
            {
              room_id: 2,
              check_in: "2019-11-18T15:16:38.447Z",
              check_out: "2019-12-27T15:16:38.447Z",
              destination_id: 4,
              accomodation_id: 1,
            },
          ],
          reason: "Visit Lagos",
          status: "Pending",
          createdAt: "2019-11-11T06:53:54.602Z",
          updatedAt: "2019-11-11T06:53:54.602Z",
        },
      ],
    });
  });
});

describe("Approve/Reject", () => {
  beforeEach(() => {
    initialState.requests = requests;
  });

  test("should update the status of an approved request to `Approved`", () => {
    const newState = UserRequestsReducer(
      initialState,
      { type: types.REQUEST_ACTION, response: { data: { id: 5 }, status: "Approved" } },
    );
    expect(newState.requests).toEqual(requests);
  });
});

describe("get most visited city and travel stats", () => {
  const state = { ...initialState, mostVisitedMsg: "message" };
  test("should update state on sucess of mostvisited", () => {
    const action = {
      type: types.MOST_VISITED,
      payload: "",
    };
    const response = UserRequestsReducer(state, action);
    expect(response.mostVisitedMsg).toEqual("");
  });

  test("should update state on sucess for trips stats", () => {
    const action = {
      type: types.TRIPS_STATS,
      trips: [],
      totalTrips: 0,
    };
    const response = UserRequestsReducer(state, action);
    expect(response.totalTrips).toEqual(0);
  });

  test("should return default", () => {
    const action = {
      type: "types.TRIPS_STATS",
    };
    const response = UserRequestsReducer(state, action);
    expect(response).toEqual(state);
  });
});
