import { Meta, Story } from '@storybook/angular';
import { ButtonComponent} from './button.component';
import { MatButtonModule } from '@angular/material/button';
import {storiesOf} from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

//👇 This default export determines where your story goes in the story list
// export default {
//   title: 'YourComponent',
//   component: ButtonComponent,
// } as Meta;

//👇 We create a “template” of how args map to rendering
// const Template: Story<ButtonComponent> = (args) => ({
//   props: args,
// });

// export const YourStory = Template.bind({});
// YourStory.args = {
//   /* 👇 The args you need here will depend on your component */
// };

storiesOf('Button', module)
  .add('Basic', () => ({
    component: ButtonComponent,
    moduleMetadata: {
      imports: [MatButtonModule, BrowserAnimationsModule, FormsModule,
        BrowserModule]
    }
  }))

  // .add('Raised', () => ({
  //   template: `
  //   <div>
  //     <button mat-button>Basic</button>
  //     <button mat-button color="primary">Primary</button>
  //     <button mat-raised-button color="accent">Accent</button>
  //     <button mat-raised-button color="warn">Warn</button>
  //     <button mat-raised-button disabled>Disabled</button>
  //   </div>
  //   `,
  //   moduleMetadata: {
  //     imports: [MatButtonModule, BrowserAnimationsModule, FormsModule,
  //       BrowserModule,]
  //   }
  // }));
  //
