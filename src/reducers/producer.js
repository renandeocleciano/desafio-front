import {
  CREATE_PRODUCER,
  UPDATE_PRODUCER,
  DELETE_PRODUCER,
  RETRIEVE_PRODUCER
} from '../actions/types';

const initialState = [];

function producerReducer(producers = initialState, action) {

  const { type, payload } = action;

  switch (type) {
    case RETRIEVE_PRODUCER: return payload;
    case CREATE_PRODUCER: return [...producers, payload];
    case DELETE_PRODUCER: 
      return producers.filter(({ id }) => id !== payload.id);
    case UPDATE_PRODUCER:
      return producers.map((p) => {
        if (p.id === payload.id) {
          return { ...p, ...payload }
        } else { return p }
      });
    default: return producers;
  }

};

export default producerReducer;
