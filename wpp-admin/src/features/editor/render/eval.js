export const evalBorder = (itemProps) => {
  const { hasBorder, borderThickness, borderColor } = itemProps;
  if (!hasBorder) {
    return '';
  }
  return `${borderThickness}px solid ${borderColor}`;
};

export const evalTextDecoration = ({ isUnderlined }) => {
  if (isUnderlined) return 'underline';
  return 'none';
};

export const hideLink = (template) => !template.productBoxID;
