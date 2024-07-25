import { Connecter } from ".";

export default {
  title: "Components/Connecter",
  component: Connecter,
  argTypes: {
    property1: {
      options: ["hover", "default"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    property1: "hover",
    divClassName: {},
    personCircle: "https://c.animaapp.com/NnydzBh0/img/person-circle-outline-2.svg",
  },
};
