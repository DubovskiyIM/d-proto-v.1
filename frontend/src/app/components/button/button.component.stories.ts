import { Meta, Story } from '@storybook/angular';
import { ButtonComponent } from './button.component';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'ButtonComponent',
  component: ButtonComponent,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<ButtonComponent> = (args) => ({
  props: args,
});

export const YourStory = Template.bind({});
YourStory.args = {
  /* 👇 The args you need here will depend on your component */
};
