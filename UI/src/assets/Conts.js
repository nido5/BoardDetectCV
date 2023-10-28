class Parameter {
  constructor(name, min, max, description, conditionFunk) {
    this.name = name;
    this.min = min;
    this.max = max;
    this.description = description;
    this.conditionFunk = conditionFunk;
  }
}
export const Parameters = [
  new Parameter("BlurMatrix", 0, 255, "pick 1,3,5,7 or 9"),
  new Parameter("Threshold", 0, 255, "pick 1,3,5,7 or 9"),
  new Parameter("Compare", 0, 255, "pick 1,3,5,7 or 9"),
  new Parameter("Sub Factor", 0, 255, "pick 1,3,5,7 or 9"),
  new Parameter("Add Images", 0, 255, "pick 1,3,5,7 or 9"),
];
