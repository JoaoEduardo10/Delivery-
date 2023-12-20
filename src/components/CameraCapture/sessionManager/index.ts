export interface LatitudeAndLongitudeProps {
  latitude: number;
  longitude: number;
}

export interface SessaoManagerProps {
  setSessionData: {
    image: string;
    latitudeAndLongitude: LatitudeAndLongitudeProps;
  };
}

class SessionManager {
  static setSessionData({
    image,
    latitudeAndLongitude,
  }: SessaoManagerProps['setSessionData']) {
    if (
      image &&
      latitudeAndLongitude.latitude !== 0 &&
      latitudeAndLongitude.longitude !== 0
    ) {
      this.setSessionItem('$image', image);
      this.setSessionItem(
        '$latitude',
        latitudeAndLongitude.latitude.toString(),
      );
      this.setSessionItem(
        '$longitude',
        latitudeAndLongitude.longitude.toString(),
      );

      return { success: true };
    }

    return { success: false };
  }

  static setSessionItem(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }
}

export { SessionManager };
