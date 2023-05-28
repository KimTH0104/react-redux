/* @flow */

import { handleActions, createAction } from 'redux-actions';
import { pender } from 'redux-pender';
import * as faqApi from '../libs/api/faq';

const GET_LIST = 'get/faq/list';
const GET_QUERY_LIST = 'get/faq/queryList';

export const getList = createAction(GET_LIST, faqApi.getList);
export const getQueryList = createAction(GET_QUERY_LIST, faqApi.getQueryFaqList)

const initialState =  {
    faqList: [],
}

export default handleActions({
    ...pender({
        type: GET_LIST,
        onSuccess: (state, action) => {
            // API response call 성공
            const data = action.payload.data.data
            const faqList = data.filter ( (CurrentValue) => {
                return CurrentValue.displayable
            })
            return {
                faqList : faqList
            }
        },
    }),
    ...pender({
        type: GET_QUERY_LIST,
        onSuccess: (state, action) => {
            const data = action.payload.data.data
            const faqList = data.filter ( (CurrentValue) => {
                return CurrentValue.displayable
            })
            return {
                faqList : faqList
            }
        },
    }),
}, initialState)

