import localForage from 'localforage';

export const PREVIEW_INVERT_CHANGE_FAIL = 'PREVIEW_INVERT_CHANGE_FAIL';
export const PREVIEW_INVERT_CHANGE_REQUEST = 'PREVIEW_INVERT_CHANGE_REQUEST';
export const PREVIEW_INVERT_CHANGE_SUCCESS = 'PREVIEW_INVERT_CHANGE_SUCCESS';
export const PREVIEW_INVERT_FETCH_FAIL = 'PREVIEW_INVERT_FETCH_FAIL';
export const PREVIEW_INVERT_FETCH_REQUEST = 'PREVIEW_INVERT_FETCH_REQUEST';
export const PREVIEW_INVERT_FETCH_SUCCESS = 'PREVIEW_INVERT_FETCH_SUCCESS';

export const changePreviewInvert = () => (dispatch, getState) => {
  const { preview } = getState();
  const newInvert = !preview.invert;
  dispatch({
    type: PREVIEW_INVERT_CHANGE_REQUEST,
  });
  localForage.setItem('preview.invert', newInvert)
    .then(() => {
      dispatch({
        invert: newInvert,
        type: PREVIEW_INVERT_CHANGE_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        error,
        type: PREVIEW_INVERT_CHANGE_FAIL,
      });
    });
};

export const fetchPreviewInvert = () => (dispatch) => {
  dispatch({
    type: PREVIEW_INVERT_FETCH_REQUEST,
  });
  localForage.getItem('preview.invert')
    .then((invert) => {
      dispatch({
        invert,
        type: PREVIEW_INVERT_FETCH_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        error,
        type: PREVIEW_INVERT_FETCH_FAIL,
      });
    });
};