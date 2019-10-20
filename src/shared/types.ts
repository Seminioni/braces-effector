interface RadioGroup {
  componentName: "BrRadioGroup";
  eventName: "change";
  params: any[];
}

interface CheckboxGroup {
  componentName: "BrCheckboxGroup";
  eventName: "change";
  params: any[];
}

interface Collapse {
  componentName: "BrCollapse";
  eventName: "item-click";
  params: [string | number];
}

interface Tab {
  componentName: "Tab";
  eventName: "item-click";
  params: [string | number];
}

type T = RadioGroup | CheckboxGroup | Collapse | Tab;

export default T;
