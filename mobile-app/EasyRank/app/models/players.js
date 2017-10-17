import {toLower} from 'lodash';

export const playerAvatars = {
  "simon": require('../assets/images/avatars/simon.png'),
  "red": require('../assets/images/avatars/red.png'),
  "clobbe": require('../assets/images/avatars/clobbe.png'),
  "fredrik": require('../assets/images/avatars/fredrik.png'),
  "linus": require('../assets/images/avatars/linus.png'),
  "stoffe": require('../assets/images/avatars/stoffe.png'),
  "joakim": require('../assets/images/avatars/joakim.png')
};

export const playerNameToAvatarImageSource = (playerName) => {
  return playerAvatars[toLower(playerName)] || require('../assets/images/avatars/person.png');
};