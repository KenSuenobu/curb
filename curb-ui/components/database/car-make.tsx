import axios from 'axios';

export interface ICarMake {
  id?: number;
  name: string;
}

export interface ICarMakesProperties {
  setter: (data: ICarMake[]) => void;
}

export type ICarMakeCallback = (payload: ICarMake[]) => void;

export const StandardEquipmentList = [
  'Adaptive Cruise Control',
  'Alloy Wheels',
  'Ambient Lighting',
  'Android Auto',
  'Apple CarPlay',
  'Automatic Tailgate',
  'AUX Input',
  'Backup Camera',
  'Bike Rack',
  'Blind Spot Monitoring',
  'Bluetooth',
  'Collision Mitigation Breaking',
  'Complimentary Charging Subscription',
  'Convertible Top',
  'Cooled Seats',
  'Custom Audio',
  'DC Fast Charger',
  'Digital Center Console',
  'Digital Dashboard',
  'Electronic Parking Brake',
  'Full LED Headlights',
  'Heads-Up Display',
  'Heated Seats',
  'Infinity Glass',
  'Keyless Entry',
  'Kick-Activated Tailgate',
  'Lane Keep Assist',
  'Leather Seats',
  'Mobile Hotspot',
  'Moonroof',
  'Multi-Angle Camera',
  'Navigation',
  'Push-Button Start',
  'Rear Air Vents',
  'Remote Control Mobile App',
  'Road Departure Mitigation',
  'Roof Rails',
  'Selectable Drive Modes',
  'Sirius/XM Satellite Radio',
  'SOS Emergency Services',
  'Standard Audio',
  'Sunroof',
  'Traffic Sign Recognition',
  'Turn Signal Cameras',
  'Turo Go Compatible',
  'USB Charger',
  'USB Input',
  'USB-A',
  'USB-C',
  'Wireless Charger',
]

export const ListCarMakes = (callback: ICarMakeCallback) => {
  axios.get('/app/car-make/list')
    .then((x) => {
      callback(x.data);
    });
};
