/* eslint-disable no-debugger */
import * as types from '../actions/actionType';
import history from '../../services/history';
import {
  getAllAccommodations,
  getAnAccommodation,
  setLikeUnLikeAccommodation,
  postAccommodation,
  postRoom,
  getLocations,
  getHostAccommodations
} from '../../services/accommodationServices';
import { toast } from 'react-toastify';

export const getAllLocations = () => async dispatch => {
  try {
    const locations = await getLocations();
    dispatch({
      type: types.GET_LOCATIONS,
      payload: locations.data
    });
  } catch (error) {
  }
};

export const getAccommodations = () => async dispatch => {
  try {
    const accommodations = await getAllAccommodations();
    dispatch({
      type: types.GET_ACCOMODATIONS,
      payload: accommodations.data
    });
  } catch (error) {
  }
};

export const getMyAccommodations = () => async dispatch => {
  try {
    const accommodations = await getHostAccommodations();
    dispatch({
      type: types.GET_HOST_ACCOMODATIONS,
      payload: accommodations.data
    });
  } catch (error) {
  }
};

export const getAccommodation = id => async dispatch => {
  try {
    const accommodation = await getAnAccommodation(id);
    dispatch({
      type: types.GET_ACCOMODATION,
      payload: accommodation.data
    });
  } catch (error) {
  }
};

export const LikeUnLikeAccommodation = id => async dispatch => {
  const accommodation = await setLikeUnLikeAccommodation(id);
  if (accommodation.response) {
    return dispatch({
      type: types.LIKE_UNLIKE_ACCOMMODATION,
      payload: { data: accommodation.response, status: 'like_success' }
    });
  }
  return dispatch({
    type: types.LIKE_UNLIKE_ACCOMMODATION,
    payload: { data: accommodation.error, status: 'like_error' }
  });
};
export const createAccommodation = data => async dispatch => {
  await dispatch({
    type: types.LOADING,
    payload: true
  });
  const accommodation = await postAccommodation(data);
  
  if (!accommodation.error) {
    await dispatch({
      type: types.CREATE_ACCOMMODATION,
      payload: accommodation.data
    });
    window.location.href = `/accommodations/${accommodation.data.id}`;
    toast.success('Accommodation created');
    return;
  }
  toast.error(accommodation.error);
};

export const createRoom = data => async dispatch => {
  await dispatch({
    type: types.LOADING,
    payload: true
  });
  const room = await postRoom(data);
  if (!room.error) {
    await dispatch({
      type: types.CREATE_ROOM,
      payload: room.data
    });
    window.location.href = `/accommodations/${room.data.data.accommodation_id}`;
    toast.success('Room Created');
    return;
  }
  toast.error(room.error);
};
