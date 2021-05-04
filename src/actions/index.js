import { 
  CREATE_PRODUCER,
  UPDATE_PRODUCER,
  DELETE_PRODUCER,
  RETRIEVE_PRODUCER
 } from "./types";

import ProducerService from '../services/producer.service';

export const retrieveProducers = () => async (dispatch) => {

  try {
    const response = await ProducerService.getAll();
    dispatch({
      type: RETRIEVE_PRODUCER,
      payload: response.data,
    });
  } catch(err) {
    console.log(err)
  }

}

export const retrieveProducer = (id) => async (dispatch) => {
  try{
    const response = await ProducerService.get(id);
    dispatch({
      type: RETRIEVE_PRODUCER,
      payload: response.data
    })
  } catch(err) {
    console.log(err)
  }
}

export const retrieveGroupedProducer = (column) => async (dispatch) => {
  try{
    const response = await ProducerService.getGroupedBy(column);
    dispatch({
      type: RETRIEVE_PRODUCER,
      payload: response.data
    })
  } catch(err) {
    console.log(err)
  }
}

export const createProducer = (producer) => async (dispatch) => {
  
  try {
    const response = await ProducerService.create(producer);
    dispatch({
      type: CREATE_PRODUCER,
      payload: response.data,
    });
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }

}

export const updateProducer = (id, producer) => async (dispatch) => {
  
  try {
    const response = await ProducerService.update(id, producer);
    dispatch({
      type: UPDATE_PRODUCER,
      payload: response.data,
    });
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }

}

export const deleteProducer = (id) => async (dispatch) => {
  try {
    const response = await ProducerService.remove(id);
    dispatch({
      type: DELETE_PRODUCER,
      payload: response.data,
    })
  } catch(err) {
    console.log(err)
  }
}

