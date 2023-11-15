export function createClass(name: string, rules: string) {
  var style = document.createElement("style");
  document.getElementsByTagName("head")[0].appendChild(style);
  style.sheet?.insertRule(name + "{" + rules + "}");
}
