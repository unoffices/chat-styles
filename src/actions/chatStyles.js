import localForage from 'localforage';
import chatStylesSelector from '../selectors/chatStylesSelector';
import { hex2rgb } from '../utils/colors';

const defaultChatStyles = {
  authorNameSize: 18,
  authorNameColor: hex2rgb('#ffffff'),
  avatarSize: 20,
  memberAuthorNameColor: hex2rgb('#107516'),
  messageColor: hex2rgb('#ffffff'),
  messageSize: 18,
  moderatorAuthorNameColor: hex2rgb('#5e84f1'),
  outlineColor: hex2rgb('#000000'),
  outlineSize: 2,
  ownerAuthorNameColor: hex2rgb('#ffd600'),
  showAuthorName: true,
  showAvatar: true,
  showBadge: true,
  showMemberBadge: true,
  showModeratorBadge: true,
  showNewMemberBackground: true,
  showOutline: true,
  showSuperChatBackground: true,
  showTimestamp: false,
  timestampColor: hex2rgb('#999999'),
  timestampSize: 16,
};

export const CHAT_STYLES_FETCH_FAIL = 'CHAT_STYLES_FETCH_FAIL';
export const CHAT_STYLES_FETCH_REQUEST = 'CHAT_STYLES_FETCH_REQUEST';
export const CHAT_STYLES_FETCH_SUCCESS = 'CHAT_STYLES_FETCH_SUCCESS';
export const CHAT_STYLES_SAVE_FAIL = 'CHAT_STYLE_SAVE_FAIL';
export const CHAT_STYLES_SAVE_REQUEST = 'CHAT_STYLE_SAVE_REQUEST';
export const CHAT_STYLES_SAVE_SUCCESS = 'CHAT_STYLE_SAVE_SUCCESS';

export const fetchChatStylesFail = error => ({
  error,
  type: CHAT_STYLES_FETCH_FAIL,
});

export const fetchChatStylesRequest = () => ({
  type: CHAT_STYLES_FETCH_REQUEST,
});

export const fetchChatStylesSuccess = chatStyles => ({
  chatStyles,
  type: CHAT_STYLES_FETCH_SUCCESS,
});

export const fetchChatStyles = () => (dispatch) => {
  dispatch(fetchChatStylesRequest());

  localForage.getItem('chatStyles')
    .then(chatStyles => dispatch(fetchChatStylesSuccess({ ...defaultChatStyles, ...chatStyles })))
    .catch(error => dispatch(fetchChatStylesFail(error)));
};

export const saveChatStylesFail = error => ({
  error,
  type: CHAT_STYLES_SAVE_FAIL,
});

export const saveChatStylesRequest = () => ({
  type: CHAT_STYLES_SAVE_REQUEST,
});

export const saveChatStylesSuccess = chatStyles => ({
  chatStyles,
  type: CHAT_STYLES_SAVE_SUCCESS,
});

export const saveChatStyles = () => (dispatch, getState) => {
  dispatch(saveChatStylesRequest());

  const chatStyles = chatStylesSelector(getState(), ...Object.keys(defaultChatStyles));

  localForage.setItem('chatStyles', chatStyles)
    .then(() => dispatch(saveChatStylesSuccess(chatStyles)))
    .catch(error => dispatch(saveChatStylesFail(error)));
};