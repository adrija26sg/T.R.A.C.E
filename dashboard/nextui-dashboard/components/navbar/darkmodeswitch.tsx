import React from 'react';
import {useTheme as useNextTheme} from 'next-themes';
import {Switch, Text, useTheme} from '@nextui-org/react';

export const DarkModeSwitch = () => {
   const {setTheme} = useNextTheme();
   const {isDark} = useTheme();
   return (
      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
         <Text>{isDark ? 'Dark Mode' : 'Light Mode'}</Text>
         <Switch
            checked={isDark}
            onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
            size="lg"
            bordered
            color="secondary"
         />
      </div>
   );
};
