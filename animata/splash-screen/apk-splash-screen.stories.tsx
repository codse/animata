import ApkSplashScreen from "@/animata/splash-screen/apk-splash-screen";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Splash Screen/Apk Splash Screen",
  component: ApkSplashScreen,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ApkSplashScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
