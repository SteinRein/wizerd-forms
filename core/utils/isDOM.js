export function isDOM(obj) {
  var tag = obj.tagName;
  try {
    obj.tagName = '';  // Read-only for DOM, should throw exception
    obj.tagName = tag; // Restore for normal objects
    return false;
  } catch (e) {
    return true;
  }
}
