import { Meta, Story } from '@storybook/react/types-6-0';
import { CloneMe, CloneMeProps } from '.';

export default {
  title: 'Component Title',
  component: CloneMe,
  args: {
    propExample: 'Storybook example',
  },
} as Meta;

export const Template: Story<CloneMeProps> = (args) => {
  return (
    <div>
      <CloneMe {...args} />
    </div>
  );
};
