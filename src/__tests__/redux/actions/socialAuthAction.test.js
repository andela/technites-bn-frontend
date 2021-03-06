import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { socialAuthAction } from "../../../redux/actions/socialAuthAction";
// import { loginPayload } from '../../fixtures'

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
const username = "Emabush";

const mockStore = configureStore([thunk]);
const store = mockStore();
describe(" Social Login Action ", () => {
  beforeEach(() => {
    store.clearActions();
  });

  it("should load the authenticated user", () =>
    store.dispatch(socialAuthAction({ token, username })).then(() => {
      expect(store.getActions().length).toBe(2);
    }));
});
