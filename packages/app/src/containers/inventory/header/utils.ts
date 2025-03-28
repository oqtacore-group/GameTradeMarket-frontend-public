export const getAvatarSize = (isMobile?: boolean, isTablet?: boolean) => {
  if (isMobile) {
    return 104;
  }
  if (isTablet) {
    return 104;
  }
  return 140;
};
