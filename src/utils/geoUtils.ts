export const getCurrentLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject("Geolocation is not supported by this browser.");
        }

        navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
        });
    });
};

export const isWithinRadius = (
    userCoords: { lat: number; lng: number },
    targetCoords: { lat: number; lng: number },
    radiusInKm: number
): boolean => {
    const toRadians = (deg: number) => (deg * Math.PI) / 180;
    const earthRadiusKm = 6371;

    const dLat = toRadians(targetCoords.lat - userCoords.lat);
    const dLng = toRadians(targetCoords.lng - userCoords.lng);

    const lat1 = toRadians(userCoords.lat);
    const lat2 = toRadians(targetCoords.lat);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadiusKm * c <= radiusInKm;
};
