class SessionStorageValues {
  static get() {
    const token = sessionStorage.getItem('$token');
    const deliveredByEmail = sessionStorage.getItem('$email');
    const deliveredByName = sessionStorage.getItem('$username');
    const id = sessionStorage.getItem('$id');
    const isDate = sessionStorage.getItem('$date');
    const image = sessionStorage.getItem('$image');
    const latitude = sessionStorage.getItem('$latitude');
    const longitude = sessionStorage.getItem('$longitude');
    const someoneAtHome = sessionStorage.getItem('$someoneAtHome');

    if (!token || !deliveredByEmail || !deliveredByName || !id) {
      return {
        error: true,
        data: {
          token: '',
          deliveredByEmail: '',
          deliveredByName: '',
          id: '',
          isDate: '',
          image,
          latitude,
          longitude,
          someoneAtHome,
        },
      };
    }

    return {
      error: false,
      data: {
        token,
        deliveredByEmail,
        deliveredByName,
        id,
        isDate,
        image,
        latitude,
        longitude,
        someoneAtHome,
      },
    };
  }

  static redirect() {
    window.location.href = '/';
  }
}

export { SessionStorageValues };
