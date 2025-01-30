import axios from 'axios';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

/**
 * Creates a unique device ID based on the collected data.
 * @param collectedData - The collected device and browser information.
 * @returns A unique device ID (SHA-256 hash of the collected data).
 */


export const createDeviceId = async (): Promise<string> => {
  try {
    const fp = await FingerprintJS.load();

    const result = await fp.get();

    
    return result.visitorId
  } catch (error) {
    console.error('Error generating device ID:', error);
    throw new Error('Failed to generate device ID');
  }
};

// Helper function to fetch IP address
export const getIpAddress = async (): Promise<string> => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
  } catch (error) {
    console.error('Error fetching IP address:', error);
    return 'Unknown IP';
  }
};


export const getGeolocation = async (): Promise<GeolocationCoordinates> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position.coords);
      },
      (error) => {
        reject(error);
      }
    );
  });
};
