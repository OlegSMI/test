/**
 * @returns value of 1rem in pixels;
 */
export const getBaseFontSize = () => {
  const element = document.createElement("div");
  element.style.width = "1rem";
  element.style.display = "none";
  document.body.append(element);

  const widthMatch = window
    .getComputedStyle(element)
    .getPropertyValue("width")
    .match(/\d+/);

  element.remove();

  if (!widthMatch || widthMatch.length < 1) {
    return 16;
  }

  const result = Number(widthMatch[0]);
  return !isNaN(result) ? result : 16;
};
