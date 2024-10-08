/**
 * A range of text using offsets
 */
export interface TextRange {
  /** The start offset in the text */
  start: number;

  /** The end offset in the text */
  end: number;
}

/**
 * Returns the current element value
 * @param text The json text to retrieve the range from
 * @param cursor The cursor offset
 * @returns
 */
export function getCurrentElement(text: string, cursor: number): TextRange | undefined {
  let startIndex = -1;
  let inString = false;

  for (let index = cursor; index > -1; index--) {
    const c = text.charAt(index);

    if (c === '"') {
      if (text.charAt(index - 1) === "\\") {
        continue;
      }

      inString = true;
      startIndex = index + 1;
      break;
    } else if (c === "," || c === ":") {
      startIndex = index + 1;
      break;
    }
  }

  if (startIndex < 0) {
    return undefined;
  }

  let endIndex = -1;

  for (let index = startIndex; index < text.length; index++) {
    const c = text.charAt(index);

    if (c === '"') {
      if (text.charAt(index - 1) === "\\") {
        continue;
      }

      endIndex = index;
      break;
    } else if (inString == false && (c === "," || c === ":")) {
      endIndex = index;
      break;
    }
  }

  if (endIndex < 0) {
    return undefined;
  }

  return { start: startIndex, end: endIndex };
}

/**
 *
 * @param text
 * @param cursor
 * @returns
 */
export function getCurrentString(text: string, cursor: number): TextRange | undefined {
  let startIndex = -1;

  for (let index = cursor - 1; index > -1; index--) {
    const c = text.charAt(index);
    if (c === '"') {
      if (text.charAt(index - 1) === "\\") {
        continue;
      }

      startIndex = index + 1;
      break;
    }
  }

  if (startIndex < 0) {
    return undefined;
  }

  let endIndex = -1;

  for (let index = startIndex; index < text.length; index++) {
    const c = text.charAt(index);
    if (c === '"') {
      if (text.charAt(index - 1) === "\\") {
        continue;
      }

      endIndex = index;
      break;
    }
  }

  if (endIndex < 0) {
    return undefined;
  }

  return { start: startIndex, end: endIndex };
}

/**
 *
 * @param text
 * @param property
 * @param cursor
 * @returns undefined if nothing of a value has been found
 */
export function getCurrentStringValue(text: string, property: string, cursor: number): TextRange | undefined {
  const startIndex = getEndOfPropertyKey(text, property, cursor);

  // We have found where the colon ends, or the property ends
  // Now we find the " or anything that indicates the end of json,
  // Example of situations: ( | is the cursor )
  //   { "property": | }
  //   { "property": |
  //   { "property": | }]\n
  //   { "property": "query.variable + | " }
  let i = startIndex;
  for (; i < text.length; i++) {
    const c = text.charAt(i);
    // If whitespace, then we can continu on
    if (c.trim().length === 0) {
      continue;
    }

    // Did we found the start of the string?
    if (c === '"' || c === "'") {
      break;
    }

    return undefined;
  }

  return getCurrentElement(text, i);
}

export function getEndOfPropertyKey(text: string, property: string, start: number): number {
  if (!property.startsWith('"') && !property.endsWith('"')) {
    property = `"${property}"`
  }

  let startIndex = start;
  let lastColon = -1;

  for (; startIndex > 0; startIndex--) {
    // Have we found the colon?
    const s = text.slice(startIndex, startIndex + property.length);
    if (s.startsWith(":")) {
      // Record that position, and we can move the index back equal to the length of the property.
      lastColon = startIndex;
      startIndex -= (property.length - 1);
      continue;
    }

    // Have we found the property?
    if (s === property) {
      return lastColon === -1 ? startIndex + property.length + 1 : lastColon + 1;
    }
  }

  return 0;
}

/**
 *
 * @param Text
 * @param cursor
 * @returns
 */
export function getStartString(Text: string, cursor: number): number {
  for (let Index = cursor; Index > -1; Index--) {
    const c = Text.charAt(Index);

    if (c === '"') {
      if (Text.charAt(Index - 1) === "\\") {
        continue;
      }

      return Index;
    }
  }

  return -1;
}

/**
 *
 * @param Text
 * @param startIndex
 * @returns
 */
export function isProperty(Text: string, startIndex: number): boolean {
  for (let Index = startIndex; Index > -1; Index--) {
    const c = Text.charAt(Index);

    if (c === ":") {
      return true;
    } else if (c.trim() === "") continue;
    else break;
  }

  return false;
}
