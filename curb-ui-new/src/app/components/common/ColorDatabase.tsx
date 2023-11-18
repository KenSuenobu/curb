const ColorDatabase = [
  { label: 'Gray', color: '#888', },
  { label: 'White', color: '#fff', },
  { label: 'Black', color: '#000', },
  { label: 'Red', color: '#f00', },
  { label: 'Blue', color: '#00f', },
  { label: 'Green', color: '#0f0', },
  { label: 'Yellow', color: '#ff0', },
  { label: 'Silver', color: '#bbb', },
  { label: 'Beige', color: '#C8AD7F', },
  { label: 'Brown', color: '#9E6847', },
  { label: 'Gold', color: '#F5BD02', },
  { label: 'Burgundy', color: '#800020', },
  { label: 'Purple', color: '#690FAD', },
];

export const SELECTED_COLOR = '#ccf';

export const colorForLabel = (color: string) => {
  const colorEntry: any = ColorDatabase.filter((x) => x.label === color);

  if (colorEntry.length > 0) {
    return colorEntry[0].color;
  }

  return '#fff';
}

export default ColorDatabase;
