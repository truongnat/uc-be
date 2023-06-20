const allSocials = {
  facebook: 'facebook',
  tiktok: 'tiktok',
  zalo: 'zalo',
  youtube: 'youtube',
  unknown: 'unknown',
};

const socials = Object.keys(allSocials);
const socialRights = new Map(Object.entries(allSocials));

module.exports = {
  socials,
  socialRights,
};
