import FingerprintJS from "@fingerprintjs/fingerprintjs";

export const isSmartphone = (): boolean => {
    const userAgent = navigator.userAgent;
    return /android|iphone|ipad|ipod/i.test(userAgent.toLowerCase());
};

export const getDeviceIdentifier = async (): Promise<string> => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId;
};

export const hasSubmittedToday = async (deviceId: string): Promise<boolean> => {
    return false;
};
